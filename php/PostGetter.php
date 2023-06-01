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

   
// SQL query to fetch data
$sql = "SELECT post.ProfileID AS id, post.PostID AS post_id, post.DateTime AS date_time, post.PostContent AS post, post.HasThread AS has_thread,
    post_tags.Tags, post_coordinates.Latitude, post_coordinates.Longtitude, post_media.MediaType, post_media.URL, profile.Name, profile.DisplayPicture
    FROM post 
    LEFT JOIN post_tags ON post.PostID =  post_tags.PostID 
    LEFT JOIN post_coordinates ON post.PostID = post_coordinates.PostID
    LEFT JOIN post_media ON post.PostID = post_media.PostID
    LEFT JOIN profile ON post.ProfileID = profile.ProfileID";
        
$result = $conn->query($sql);

if ($result === false) {
    die("Query execution failed: " . mysqli_error($conn));
    }

// Array to store the fetched data
$output = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Store each row as an associative array in the output array
        $output[] = [
            "id" => $row["id"],
            // "post_id" => $row["post_id"],
            "profile_name" => $row["Name"],
            "profile_pic" => $row["DisplayPicture"],
            "date_time" => $row["date_time"],
            "post" => $row["post"],
            "post_media" =>[
                "Type" => $row ["MediaType"],
                "File" => $row ["URL"]
            ],
            "tags" => $row["Tags"],
            "post_coordinates" => [ 
                "Latitude" => $row ["Latitude"],
                "Longitude" => $row ["Longtitude"]
            ],
            "type" => $row["post"],
            "has_thread" => $row["has_thread"],
        ];
    }
}

// Convert the output array to JSON format
$output_json = json_encode($output, JSON_PRETTY_PRINT);

// Output the JSON data
echo $output_json;

// Close the connection
$conn->close();

?>