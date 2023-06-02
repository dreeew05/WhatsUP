<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "sample";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT post.PostID, post.ProfileID, profile.Name AS profile_name, profile.DisplayPicture AS profile_pic, post.DateTime, post.PostContent AS post, post_media.MediaType AS type, post_coordinates.Latitude AS post_latitude, post_coordinates.Longtitude AS post_longitude, post_tags.Tags
FROM post
INNER JOIN profile ON post.ProfileID = profile.ProfileID
LEFT JOIN post_media ON post.PostID = post_media.PostID
LEFT JOIN post_coordinates ON post.PostID = post_coordinates.PostID
LEFT JOIN post_tags ON post.PostID = post_tags.PostID";

$result = $conn->query($sql);

if (!$result) {
    die("Query failed: " . $conn->error);
}

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $post = array(
            "id" => $row["PostID"],
            "post_id" => $row["PostID"],
            "profile_name" => $row["profile_name"],
            "profile_pic" => $row["profile_pic"],
            "date_time" => $row["DateTime"],
            "post" => $row["post"],
            "post_media" => array(
                "type" => $row["type"],
                "file" => array()
            ),
            "post_coordinates" => null,
            "tags" => array(),
            "reactions" => array(
                "like" => 0,
                "haha" => 0,
                "sad" => 0,
                "angry" => 0
            ),
            "type" => "thread",
            "has_thread" => true 
        );

        if ($row["post_latitude"] !== null && $row["post_longitude"] !== null) {
            $post["post_coordinates"] = array(
                "latitude" => $row["post_latitude"],
                "longitude" => $row["post_longitude"]
            );
        }

        if ($row["Tags"] !== null) {
            $tags = explode(",", $row["Tags"]);
            $post["tags"] = $tags;
        }

        $data[] = $post;
    }
}

$conn->close();

// Convert the data to JSON format
$jsonData = json_encode($data, JSON_PRETTY_PRINT);

// Output the JSON data
header('Content-Type: application/json');
echo $jsonData;
?>
