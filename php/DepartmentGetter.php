<?php

    // Author: fiVe
    // Description: Get All the Data from Departments Table

    require_once 'InterfaceClasses.php';
    require_once 'DatabaseConnector.php';

    // use AbstractParseResults;

    class DepartmentGetter implements AbstractParseResults {

        private $classification,
                $connection;

        public function __construct($classification) {
            $this -> classification = $classification;
            $this -> connection     = new DatabaseConnector();

            // CLASS OUTPUT
            echo $this -> parseResults();
        }

        public function getClassification() {
            return $this -> classification;
        }

        public function parseResults() {
            $QUERY = "SELECT DepartmentName
                      FROM departments
                      WHERE Classification = '{$this -> getClassification()}'";
            
            $result = $this -> connection -> connectDatabase() 
                      -> query($QUERY);

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