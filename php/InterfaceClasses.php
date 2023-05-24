<?php 

    // Author: fiVe
    // Description: Interface Classes

    interface ParseResultsInterface {
        
        public function parseResults();

    }

    interface InsertEntriesInterface {

        public function insertData();

    }

    interface DatabaseInterface {

        public function initializeDBConnection();
        public function killConnection();

    }

?>