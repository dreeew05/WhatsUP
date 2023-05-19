<?php 

    class DatabaseConnector {

        public function connectDatabase() {
            define('SERVERNAME', 'localhost', false);
            define('USERNAME', 'root', false);
            define('PASSWORD', '', false);
            define('DB_NAME', 'whatsup', false);

            $connection = new mysqli(SERVERNAME,
                                     USERNAME,
                                     PASSWORD,
                                     DB_NAME);

            if($connection -> connect_error) {
                die("Connection Failed: " . $connection -> connect_error);
            }

            return $connection;    
        }

    }

?>