<?php

    // Author: fiVe
    // Description: Verify if Link is Valid Youtube Link

    class VerifyYoutubeLink {

        private $url;

        public function __construct($url) {
            // GLOBAL VARIABLES
            $this -> url = $url;
        }

        private function getURL() {
            return $this -> url;
        }

        public function checkYoutubeLink() {
            $parsedURL = parse_url($this -> getURL());

            if($parsedURL['host'] != "www.youtube.com") {
                return false;
            }
            if($parsedURL['path'] !== "/watch") {
                return false; 
            }
            return true;
        }

    }

    // DRIVER
    $data    = json_decode(file_get_contents('php://input'),true);
    $process = new VerifyYoutubeLink($data['url']);
    // RETURN OUTPUT IN JSON
    echo json_encode(array('result' => $process -> checkYoutubeLink()));
?>