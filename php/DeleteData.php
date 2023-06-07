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

if (isset($request['id'])) {
    $profileID = $request['id'];

    
    $deleteSql = "DELETE FROM profile WHERE ProfileID = '$profileID'";
    $delSql = "DELETE FROM profile_credentials WHERE ProfileID = '$profileID'";
    $deleteResult = $conn->query($deleteSql);
    $delResult = $conn->query($delSql);

    if ($deleteResult && $delResult) {
        echo json_encode(
            array(
                'operation' => 'success',
                'message' => 'Data deleted successfully'
            )
        );
    } else {
        echo json_encode(
            array(
                'operation' => 'error',
                'message' => 'Failed to delete data'
            )
        );
    }
} else {
    echo json_encode(
        array(
            'operation' => 'error',
            'message' => 'Invalid request. Missing ID parameter'
        )
    );
}

$conn->close();
?>