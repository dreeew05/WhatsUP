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

function uploadMedia($base64Data) {
    $base64    = explode(',', $base64Data);
    $metadata  = $base64[0];

    // CONVERT BASE64 TO IMAGE
    $imageData = base64_decode($base64[1]);
    $extension = explode(';', explode('/', $metadata)[1])[0];
    $fileName  = uniqid() . '.' . $extension;

    // UPLOAD FILE
    $folder    = '../assets/images/profiles/';
    $filePath  = $folder . $fileName;
    file_put_contents($filePath, $imageData);

    return $fileName;
}

if (isset($request['profileId']) 
    && isset($request['newUsername']) 
    && isset($request['newPassword']) 
    && isset($request['confirmPassword'])
    && isset($request['base64Data'])) {

    $profileId = $request['profileId'];
    $newUsername = $request['newUsername'];
    $newPassword = $request['newPassword'];
    $confirmPassword = $request['confirmPassword'];
    $imageFileName = uploadMedia($request['base64Data']);

    
    $updateSql = "UPDATE profile_credentials 
                  SET Username = '$newUsername', 
                    Password = '$newPassword' 
                  WHERE ProfileID = '$profileId'";

    $updateResult = $conn->query($updateSql);

    if ($updateResult) {
        $updateImg = "UPDATE profile
                      SET DisplayPicture = '$imageFileName'
                      WHERE ProfileID = '$profileId'";
        
        $updateImgResult = $conn -> query($updateImg);

        if($updateImgResult) {
            echo json_encode(
                array(
                    'operation' => 'success',
                    'message' => 'Data updated successfully'
                )
            );
        }
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
