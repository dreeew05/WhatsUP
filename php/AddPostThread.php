<?php
    
    require_once 'InterfaceClasses.php';
    require_once 'DatabaseConnector.php';

    class AddPostThread implements DatabaseInterface,
        InsertEntriesInterface{

        private $data,
                $action,
                
                $dbConnect,
                $conn;

        private function getData() {
            return $this -> data;
        }

        private function getAction() {

            return $this -> action;
        }

        private function getCurrentTime() {
            return date('Y-m-d H:i:s');
        }
        
        public function __construct($data) {
            // PASSED
            $this -> data = $data;

            // GLOBAL
            $this -> dbConnect = new DatabaseConnector();

            // METHODS
            $this -> setAttributes();
            $this -> initializeDBConnection();
            $this -> insertData();

            // OUTPUT
        }

        public function initializeDBConnection() {
            $this -> conn = $this -> dbConnect -> connectDatabase();
        }

        public function killConnection() {
            die();
        }

        public function setAttributes() {
            $this -> action = $this -> getData()['action'];
        }

        public function insertData() {
            $QUERY = null;

            // ATTRIBUTES
            $profileID   = $this -> getData()['profileID'];
            $postContent = addslashes($this -> getData()['postContent']);
            $media       = $this -> getData()['media'];
            $tags        = $this -> getData()['tags'];
            $hasThread   = 0;

            switch($this -> getAction()) {
                case 'post':
                    // $this -> insertPost();
                    $QUERY = "INSERT INTO post(PostID, ProfileID, DateTime, 
                                PostContent, HasThread)
                              VALUES(NULL, '$profileID', '{$this -> getCurrentTime()}',
                                '$postContent', '$hasThread')";
                    break;
                case 'thread':
                    // $this -> insertThread();
                    $postID = $this -> getData()['postID'];
                    $QUERY = "INSERT INTO thread(ThreadID, ProfileID, PostID, DateTime,
                                PostContent)
                              VALUES(NULL, '$profileID', '$postID', 
                                '{$this -> getCurrentTime()}', '$postContent')";
                    break;
                default:
                    break;
            }

            $RESULT = $this -> conn -> query($QUERY);

            if($RESULT) {
                $lastID = $this -> conn -> insert_id;
                if($media != null) {
                    $this -> saveMedia($lastID);
                }
                if($tags != null) {
                    $this -> insertTags($lastID);
                }
                $this -> insertCoordinates($lastID);

                echo json_encode(
                    array(
                        'success' => 'true'
                    )
                );

                $this -> killConnection();
            }
        }

        private function getTableAttribute() {
            $tableAttribute = null;

            switch($this -> getAction()) {
                case 'post':
                    $tableAttribute = array(
                        'table' => array(
                            'coordinates' => 'post_coordinates',
                            'media' => 'post_media'
                        ),
                        'attribute' => array(
                            'id' => 'PostID'
                        )
                    );
                    break;
                case 'thread':
                    $tableAttribute = array(
                        'table' => array(
                            'coordinates' => 'thread_coordinates',
                            'media' => 'thread_media'
                        ),
                        'attribute' => array(
                            'id' => 'ThreadID'
                        )
                    );
                    break;
                default:
                    break;
            }

            return $tableAttribute;
        }

        private function returnResult($result) {
            if(!$result) {
                $this -> killConnection();
                echo json_encode(
                    array(
                        'success' => 'false'
                    )
                );
            } 
        }

        private function insertCoordinates($lastID) {
            // TABLE NAME
            $tableName = $this -> getTableAttribute()['table']['coordinates'];
            $idName    = $this -> getTableAttribute()['attribute']['id'];

            // ATTRIBUTES
            $coordinates = $this -> getData()['coordinates'];
            $latitude    = $coordinates['latitude'];
            $longtitude  = $coordinates['longtitude'];
            
            if($latitude != '' && $longtitude != '') {
                $QUERY = "INSERT INTO $tableName($idName, Latitude,
                            Longtitude)
                          VALUES('$lastID', '$latitude', '$longtitude')";

                $RESULT = $this -> conn -> query($QUERY);
                
                if(!$RESULT) {
                    $this -> returnResult(FALSE);
                }
            }
        }

        private function insertTags($lastID) {
            $tags = $this -> getData()['tags']; 

            if(count($tags) != 0) {
                foreach($tags as $tag) {
                    $QUERY = "INSERT INTO post_tags(PostID, Tags)
                              VALUES('$lastID', '$tag')";

                    $RESULT = $this -> conn -> query($QUERY);

                    if(!$RESULT) {
                        $this -> returnResult(FALSE);
                    }

                }
            }
        }

        private function saveMedia($lastID) {
            // TABLE NAME
            $tableName = $this -> getTableAttribute()['table']['media'];
            $idName    = $this -> getTableAttribute()['attribute']['id'];

            // ATTRIBUTES
            $media = $this -> getData()['media'];
            $type  = $media['type'];
            $files = $media['data']; 
            $URL   = null;

            foreach($files as $file) {
                switch($type) {
                    case 'image':
                        $URL = $this -> uploadMedia($file);
                        break;
                    case 'youtube':
                        $URL = $this -> getYTEmbedLink($file);
                        break;
                    default:
                        break;
                } 
                $QUERY = "INSERT INTO $tableName($idName, MediaType, URL)
                          VALUES('$lastID', '$type', '$URL')";
                
                $RESULT = $this -> conn -> query($QUERY);

                if(!$RESULT) {
                    $this -> returnResult(FALSE);
                }
            }
            
        }

        private function getYTEmbedLink($link) {
            $urlSplit  = explode('=', $link);
            $baseEmbed = 'https://www.youtube.com/embed/';
            $embedLink = $baseEmbed . $urlSplit[1];
            return $embedLink;
        }

        private function uploadMedia($base64Data) {
            $base64    = explode(',', $base64Data);
            $metadata  = $base64[0];

            // CONVERT BASE64 TO IMAGE
            $imageData = base64_decode($base64[1]);
            $extension = explode(';', explode('/', $metadata)[1])[0];
            $fileName  = uniqid() . '.' . $extension;

            // UPLOAD FILE
            $folder    = '../assets/images/files/images/';
            $filePath  = $folder . $fileName;
            file_put_contents($filePath, $imageData);

            return $fileName;
        }

    }

    // DRIVER
    $data = json_decode(file_get_contents('php://input'), true);
    new AddPostThread($data);
?>