<?php
session_start();
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

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['pass'];

    $result = ("SELECT * 
                FROM profile_credentials 
                WHERE Username = '$username' AND Password = '$password'");
                
    $log = $conn->query($result);

    if ($log->num_rows > 0){
        while ($row = $log->fetch_assoc()){
            $profileID          = $row['ProfileID'];
            $_SESSION['userID'] = $profileID;
            header("Location: ../profilePage.html?id=" . 
                $profileID); 
            exit();
        }
    }
    else {
        echo "Invalid Username or Password.";
    }
}

?>