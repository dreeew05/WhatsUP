<?php

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "whatsup";

    // Create a connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check the connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // Request from the front-end
    $request = json_decode(
        file_get_contents('php://input'),
        true
    );

    $tag = $request['tag'];
    $SQL = "SELECT PostID
            FROM post_tags
            WHERE Tags LIKE '%$tag%'";

    $RESULT = $conn -> query($SQL);

    $output = [];

    while($row = $RESULT -> fetch_assoc()) {
        array_push(
            $output, 
            array(
                'post_id' => $row['PostID']
            )
        );
    }

    echo json_encode($output);

?>