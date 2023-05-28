<?php 

    // Author: fiVe
    // Description: Interface Classes

    interface ParseResultsInterface {
        
        public function parseResults();

    }

    interface InsertEntriesInterface {

        public function insertData();
        public function setAttributes();

    }

    interface DatabaseInterface {

        public function initializeDBConnection();
        public function killConnection();

    }

?>