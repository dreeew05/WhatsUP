<?php

    // Author: fiVe
    // Description: Get All the Data from Departments Table

    require_once 'InterfaceClasses.php';
    require_once 'DatabaseConnector.php';

    class DepartmentGetter implements ParseResultsInterface, 
        DatabaseInterface {

        private $classification,
                $dbConnect,
                $conn;

        public function __construct($classification) {
            // PASSED VARIABLES
            $this -> classification = $classification;

            // GLOBAL VARIABLES
            $this -> dbConnect     = new DatabaseConnector();

            // METHODS
            $this -> initializeDBConnection();

            // CLASS OUTPUT
            echo $this -> parseResults();
            $this -> killConnection();
        }

        public function initializeDBConnection() {
            $this -> conn = $this -> dbConnect -> connectDatabase();
        }

        public function killConnection() {
            die();
        }

        public function getClassification() {
            return $this -> classification;
        }

        public function parseResults() {
            $QUERY = "SELECT DepartmentName
                      FROM departments
                      WHERE Classification = '{$this -> getClassification()}'";
            
            $result = $this -> conn -> query($QUERY);

            $jsonResult = array(
                'result' => null
            );
            
            if($result -> num_rows > 0) {

                $data = [];

                while($row = $result -> fetch_assoc()) {
                    array_push($data, $row['DepartmentName']);
                }

                $jsonResult['result'] = $data;
            }
            
            return json_encode($jsonResult);
        }
    }
    
    // DRIVER
    $data = json_decode(file_get_contents('php://input'), true);
    new DepartmentGetter($data['query']);

?>