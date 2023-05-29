<?php 

    // Author: fiVe
    // Description: Get All Pages from Database

    require_once 'InterfaceClasses.php';
    require_once 'DatabaseConnector.php';

    class PageGetter implements ParseResultsInterface, 
        DatabaseInterface {
        
        private $classfication,
                $dbConnect,
                $conn;

        public function __construct($classfication) {
            // PASSED VARIABLES
            $this -> classfication = $classfication;

            // GLOBAL VARIABLES
            $this -> dbConnect = new DatabaseConnector();

            // METHODS
            $this -> initializeDBConnection();

            // CLASS OUTPUT
            echo $this -> parseResults();
            $this -> killConnection();

        }

        private function getClassification() {
            return $this -> classfication;
        }

        public function initializeDBConnection() {
            $this -> conn = $this -> dbConnect -> connectDatabase();
        }

        public function killConnection() {
            die();
        }

        public function parseResults() {
            $QUERY = "SELECT DepartmentName, DepartmentID
                      FROM departments 
                      WHERE Classification = '{$this -> getClassification()}'";
            
            $result = $this -> conn -> query($QUERY);

            $jsonResult = array(
                'result' => []
            );

            while($row = $result -> fetch_assoc()) {

                $departmentID   = $row['DepartmentID'];
                $departmentName = $row['DepartmentName'];

                $jsonResult['result'][0][$departmentName] = $this -> parsePages($departmentID); 

            }

            return json_encode($jsonResult);
        }

        private function parsePages($departmentID) {
            $QUERY = "SELECT ProfileID, Name, DisplayPicture
                     FROM profile
                     WHERE DepartmentID = '$departmentID'";
            
            $result = $this -> conn -> query($QUERY);

            $pages  = array(
                'pages' => []
            );

            $BASE_LINK = "http://whatsup.gg/profilePage.html?id=";

            while($row = $result -> fetch_assoc()) {

                $id       = $row['ProfileID'];
                $pageName = $row['Name'];
                $image    = $row['DisplayPicture'];

                $pages['pages'][$pageName] = array(
                    'image' => $image,
                    'link' => $BASE_LINK . $id
                );

            }
            
            return $pages;

        }

    }

    // DRIVER 
    $data = json_decode(file_get_contents('php://input'), true);
    new PageGetter($data['query']);

?>