<?php
    
    require_once 'InterfaceClasses.php';
    require_once 'DatabaseConnector.php';

    class AddPostThread implements DatabaseInterface,
        InsertEntriesInterface{

        private $data,
                $id,
                $postContent,
                $tags,
                $coordinates,
                $media,
                
                $dbConnect,
                $conn;

        private function getData() {
            return $this -> data;
        }

        private function getID() {
            return $this -> id;
        }

        private function getPostContent() {
            return $this -> postContent;
        }

        private function getTags() {
            return $this -> tags;
        }

        private function getCoordinates() {
            return $this -> coordinates;
        }

        private function getMedia() {
            return $this -> media;
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
            $this -> id          = $this -> getData()['profileID'];
            $this -> postContent = $this -> getData()['postContent'];
            $this -> tags        = $this -> getData()['tags'];
            $this -> coordinates = $this -> getData()['coordinates'];
            $this -> media       = $this -> getData()['media'];

        }

        public function insertData() {
            $currentDateTime = date('Y-m-d H:i:s');
            $type            = 'post';
            $hasThread       = 0;

            $QUERY = "INSERT INTO post(PostID, ProfileID, DateTime, 
                        PostContent, Type, HasThread)
                      VALUES(NULL, '{$this -> getID()}', '$currentDateTime',
                        '{$this -> getPostContent()}', '$type',
                        '$hasThread')";
            
            $RESULT = $this -> conn -> query($QUERY);

            if($RESULT) {
                $lastID = $this -> conn -> insert_id;
                // $this -> saveMedia($lastID);
                if($this -> getMedia() != null) {
                    $this -> saveMedia($lastID);
                }
                $this -> insertCoordinates($lastID);
                $this -> insertTags($lastID);

                echo json_encode(
                    array(
                        'success' => 'true'
                    )
                );

                $this -> killConnection();
            }
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
            $latitude   = $this -> getCoordinates()['latitude'];
            $longtitude = $this -> getCoordinates()['longtitude'];
            
            if($latitude != '' && $longtitude != '') {
                $QUERY = "INSERT INTO post_coordinates(PostID, Latitude,
                            Longtitude)
                          VALUES('$lastID', '$latitude', '$longtitude')";

                $RESULT = $this -> conn -> query($QUERY);
                
                if(!$RESULT) {
                    $this -> returnResult(FALSE);
                }
            }
        }

        private function insertTags($lastID) {
            if(count($this -> getTags()) != 0) {
                foreach($this -> getTags() as $tag) {
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
            $type  = $this -> getMedia()['type'];
            $files = $this -> getMedia()['data']; 

            switch($type) {
                case 'image':
                    $this -> addImageToDatabase($lastID, $type, $files);
                    break;
                case 'youtube':
                    $this -> addYtEmbedToDatabase($lastID, $type, $files);
                    break;
                default:
                    break;
            }
            
        }

        private function addYTEmbedToDatabase($lastID, $type, $files) {
            foreach($files as $file) {
                $embedLink = $this -> getYTEmbedLink($file);
                $QUERY = "INSERT INTO post_media(PostID, MediaType, URL)
                          VALUES('$lastID', '$type', '$embedLink')";
                
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

        private function addImageToDatabase($lastID, $type, $files) {
            foreach($files as $file) {
                $filename = $this -> uploadMedia($file);
                $QUERY = "INSERT INTO post_media(PostID, MediaType, URL)
                          VALUES('$lastID', '$type', '$filename')";
                
                $RESULT = $this -> conn -> query($QUERY);

                if(!$RESULT) {
                    $this -> returnResult(FALSE);
                }
                
            }
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