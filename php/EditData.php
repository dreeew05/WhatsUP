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

$request = json_decode(file_get_contents('php://input'), true);

if (isset($request['profileId']) && isset($request['newUsername']) && isset($request['newPassword']) && isset($request['confirmPassword'])) {
    $profileId = $request['profileId'];
    $newUsername = $request['newUsername'];
    $newPassword = $request['newPassword'];
    $confirmPassword = $request['confirmPassword'];

    
    $updateSql = "UPDATE profile_credentials SET Username = '$newUsername', Password = '$newPassword' WHERE ProfileID = '$profileId'";
    $updateResult = $conn->query($updateSql);

    if ($updateResult) {
        echo json_encode(
            array(
                'operation' => 'success',
                'message' => 'Data updated successfully'
            )
        );
    } else {
        echo json_encode(
            array(
                'operation' => 'error',
                'message' => 'Failed to update data'
            )
        );
    }
} else {
    echo json_encode(
        array(
            'operation' => 'error',
            'message' => 'Invalid request. Missing parameters'
        )
    );
}

$conn->close();
?>
