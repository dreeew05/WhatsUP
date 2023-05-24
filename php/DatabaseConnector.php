<?php 

    class DatabaseConnector {

        public function connectDatabase() {
            // define('SERVERNAME', 'localhost', false);
            // define('DB_USERNAME', 'root', false);
            // define('DB_PASSWORD', '', false);
            // define('DB_NAME', 'whatsup', false);

            $SERVERNAME  = 'localhost';
            $DB_USERNAME = 'root';
            $DB_PASSWORD = '';
            $DB_NAME     = 'whatsup';

            $connection = new mysqli($SERVERNAME,
                                     $DB_USERNAME,
                                     $DB_PASSWORD,
                                     $DB_NAME);

            if($connection -> connect_error) {
                die("Connection Failed: " . $connection -> connect_error);
            }

            return $connection;    
        }

    }

?>