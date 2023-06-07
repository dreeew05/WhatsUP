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

$profileName = $request['profile'];

$SQL = "SELECT ProfileID, Name, DisplayPicture, Category
        FROM profile
        WHERE Name = '$profileName'";

$RESULT = $conn -> query($SQL);

$row = $RESULT -> fetch_assoc();

echo json_encode(
    array(
        'id'       => $row['ProfileID'],
        'name'     => $row['Name'],
        'image'    => $row['DisplayPicture'],
        'category' => $row['Category'] 
    )
)

?>