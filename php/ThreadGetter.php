pa try bi ni wu 
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "whatsup";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT thread.ThreadID, thread.ProfileID, profile.Name AS profile_name, profile.DisplayPicture AS profile_pic, thread.DateTime, thread.ThreadContent AS post, thread_media.MediaType AS type, thread_coordinates.Latitude AS post_latitude, thread_coordinates.Longtitude AS post_longitude, thread_tags.Tags
FROM thread
INNER JOIN profile ON thread.ProfileID = profile.ProfileID
LEFT JOIN thread_media ON thread.ThreadID = thread_media.ThreadID
LEFT JOIN thread_coordinates ON thread.ThreadID = thread_coordinates.ThreadID
LEFT JOIN thread_tags ON thread.ThreadID = thread_tags.ThreadID";

$result = $conn->query($sql);

if (!$result) {
    die("Query failed: " . $conn->error);
}

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $post = array(
            "id" => $row["ThreadID"],
            "post_id" => $row["ThreadID"],
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
