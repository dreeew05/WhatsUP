<?php

    session_start();

    $userID = $_SESSION['userID'];

    $response = array(
        'userID' => null
    );

    if(isset($userID)) {
        $response = array(
            'userID' => $userID
        );
    }

    echo json_encode($response);

?>