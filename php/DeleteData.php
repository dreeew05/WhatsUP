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

$request = json_decode(
    file_get_contents('php://input'),
    true
);

if (isset($request['profile'])){
    $profile = $request['profile'];

    $sql = "SELECT DisplayPicture, Name FROM profile WHERE Name LIKE '%$profile%'";
    $result = $conn->query($sql);

    if($result){
        $rows = array();
        while($row = $result->fetch_assoc()){
            $rows[] = $row;
        }
        
        echo json_encode(
            array(
                'operation' => 'success',
                'results' => $rows
            )
        );
    }
    else{
        echo json_encode(
            array(
                'operation' => 'error',
                'message' => 'No result found'
            )
        );
    }
}
else{
    echo json_encode(
        array(
            'operation' => 'error',
            'message' => 'Invalid request. Missing profile parameter'
        )
    );
}

$conn->close();
?>
