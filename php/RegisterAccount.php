<?php

    // Author: fiVe
    // Description: Register Account

    require_once 'DatabaseConnector.php';
    require_once 'InterfaceClasses.php';

    class RegisterAccount implements InsertEntriesInterface,
        DatabaseInterface {

        private $username,
                $password,
                $profileName, 
                $category,
                $briefDescription,
                $classification,
                $department,
                $address, 
                $email, 
                $mobile,
                $telephone, 
                $website,
                $facebook, 
                $twitter,
                $youtube,
                $tiktok,

                $dbConnect,
                $conn;

        public function __construct() {
            // GLOBAL VARIABLES
            $this -> dbConnect = new DatabaseConnector();

            // METHODS
            $this -> setAttributes();
            $this -> initializeDBConnection();
            // $this -> helperMethod();
            $this -> insertData();
        }

        // private function helperMethod() {
        //     echo $this -> username . "<br>" .
        //         $this -> password . "<br>" .
        //         $this -> profileName . "<br>" .
        //         $this -> category . "<br>" .
        //         $this -> briefDescription . "<br>" .
        //         $this -> classification . "<br>" .
        //         $this -> department . "<br>" .
        //         $this -> address . "<br>" .
        //         $this -> email . "<br>" .
        //         $this -> telephone . "<br>" .
        //         $this -> website . "<br>" .
        //         $this -> facebook . "<br>" .
        //         $this -> twitter . "<br>" .
        //         $this -> youtube . "<br>" .
        //         $this -> tiktok . "<br>";
        // }

        public function initializeDBConnection() {
            $this -> conn = $this -> dbConnect -> connectDatabase();
        }

        public function killConnection() {
            die();
        }

        public function setAttributes() {
            $this -> username         = $_POST['username'];
            $this -> password         = $_POST['password'];
            $this -> profileName      = $_POST['profileName'];
            $this -> category         = $_POST['category'];
            $this -> briefDescription = $_POST['briefDescription'];
            $this -> classification   = $_POST['classification'];
            $this -> department       = $_POST['department'];
            $this -> address          = $_POST['address'];

            // ATTRIBUTES THAT CAN BE NULL
            $this -> email     = $this -> setDefault($_POST['email']);
            $this -> mobile    = $this -> setDefault($_POST['mobile']);
            $this -> telephone = $this -> setDefault($_POST['telephone']);
            $this -> website   = $this -> setDefault($_POST['website']);
            $this -> facebook  = $this -> setDefault($_POST['facebook']);
            $this -> twitter   = $this -> setDefault($_POST['twitter']);
            $this -> youtube   = $this -> setDefault($_POST['youtube']);
            $this -> tiktok    = $this -> setDefault($_POST['tiktok']);
        }

        private function setDefault($postData) {
            if($postData == "") {
                return NULL;
            }
            return $postData;
        }

        public function insertData() {
            $this -> insertCredentials();
        }

        private function returnResult($result) {
            if($result) {
                header("Location: http://whatsup.gg/superAdminAccounts.html?creationSuccess=true");
            }
            else {
                header("Location: http://whatsup.gg/superAdminAccounts.html?creationSuccess=false");
            }
            $this -> killConnection();
        }

        private function insertCredentials() {
            $query = "INSERT INTO profile_credentials(ProfileID, Username, Password)
                     VALUES(NULL, '{$this -> username}', '{$this -> password}')";

            $result = $this -> conn -> query($query);

            if($result) {
                $lastID = $this -> conn -> insert_id;
                $this -> insertProfileDetails($lastID);
                $this -> insertContacts($lastID);
                $this -> insertSocials($lastID);
                $this -> returnResult(TRUE);
            }
            else {
                $this -> returnResult(FALSE);
            }
        }

        private function insertProfileDetails($profileID) {
            $selectQuery = "SELECT DepartmentID
                           FROM departments
                           WHERE DepartmentName = '{$this -> department}'";

            $selectResult = $this -> conn -> query($selectQuery);

            $selectRow = $selectResult -> fetch_assoc();
            
            $departmentID = $selectRow['DepartmentID'];

            $imageFileName = $this -> uploadImage();

            $insertQuery = "INSERT INTO profile(ProfileID, Name, Details, Category, 
                                ImageSRC, DepartmentID)
                            VALUES('$profileID', '{$this -> profileName}',
                                '{$this -> briefDescription}', 
                                '{$this -> category}', '$imageFileName', 
                                '$departmentID')";

            $result = $this -> conn -> query($insertQuery);

            if(!$result) {
                $this -> returnResult(FALSE);
            }
        }

        private function uploadImage() {
            $image      = $_FILES['imageSRC'];
            $imageError = $_FILES['imageSRC']['error'];
            $imageName  = $_FILES['imageSRC']['name'];
            $tmpName    = $_FILES['imageSRC']['tmp_name'];

            if(isset($image) && $imageError === UPLOAD_ERR_OK) {

                // UPLOAD IMAGE TO THE SERVER
                $directory = '../assets/images/profiles/'; 
                $imageFile = $directory . basename($imageName);
                move_uploaded_file($tmpName, $imageFile);

                // // GET EXTENSION
                // $extension = pathinfo($tmpName, PATHINFO_EXTENSION);
                // return $imageFile;
                return $imageName;
            }
        }

        private function insertContacts($profileID) {
            $query = "INSERT INTO profile_contacts(ProfileID, Address, Email,
                        Mobile, Telephone)
                     VALUES('$profileID', '{$this -> address}', '{$this -> email}',
                        '{$this -> mobile}', '{$this -> telephone}')";

            $result = $this -> conn -> query($query);

            if(!$result) {
                $this -> returnResult(FALSE);
            }
        }   

        private function insertSocials($profileID) {
            $query = "INSERT INTO profile_socials(ProfileID, Website, Facebook,
                        Youtube, Twitter, Tiktok)
                     VALUES('$profileID', '{$this -> website}', 
                        '{$this -> facebook}', '{$this -> youtube}',
                        '{$this -> twitter}', '{$this -> tiktok}')";

        $result = $this -> conn -> query($query);

        if(!$result) {
            $this -> returnResult(FALSE);
        }

        }

    }

    new RegisterAccount();

?>