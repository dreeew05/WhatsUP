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
    
    switch($request['mode']) {
        case 'tag':
            $profileID = $request['id'];
            $SQL = "SELECT ProfileID, Name, Category,
                        DisplayPicture, Details
                    FROM profile
                    WHERE ProfileID = '$profileID'";
            break;
        case 'profile':
            $profile = $request['profile'];
            $SQL = "SELECT ProfileID, Name, Category,
                        DisplayPicture, Details
                    FROM profile
                    WHERE Name LIKE '%$profile%'";
            break;
        default:
            break;
    }

    $RESULT = $conn -> query($SQL);

    $output = [];

    if($RESULT -> num_rows > 0) {
        $profileArray = null;
        while($row = $RESULT -> fetch_assoc()) {
            $profileArray = array(
                'profile_id'          => $row['ProfileID'],
                'profile_name'        => $row['Name'],
                'profile_image'       => $row['DisplayPicture'],
                'profile_category'    => $row['Category'],
                'profile_description' => $row['Details']
            );
            array_push($output, $profileArray);
        }
        // $output = $profileArray;
    }

    echo json_encode($output);

?>