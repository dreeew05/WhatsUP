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

// Request from the front-end
$request = json_decode(
    file_get_contents('php://input'),
    true
);

switch($request['mode']) {
    case 'all':
        $sql = "SELECT thread.ThreadID, thread.ProfileID, 
                    thread.PostID, 
                    profile.Name AS profile_name, 
                    profile.DisplayPicture AS profile_pic, 
                    thread.DateTime, thread.PostContent AS thread, 
                    thread_media.MediaType AS type, 
                    GROUP_CONCAT(DISTINCT post_tags.Tags) AS tags, 
                    GROUP_CONCAT(DISTINCT thread_media.URL) AS urls, 
                    thread_coordinates.Latitude AS latitude, 
                    thread_coordinates.Longtitude AS longtitude 
                FROM thread 
                LEFT JOIN thread_coordinates 
                ON thread.ThreadID = thread_coordinates.ThreadID 
                LEFT JOIN profile 
                ON thread.ProfileID = profile.ProfileID 
                LEFT JOIN thread_media 
                ON thread.ThreadID = thread_media.ThreadID 
                LEFT JOIN post_tags 
                ON thread.PostID = post_tags.PostID 
                GROUP BY thread.DateTime DESC";
        break;
    case 'profile':
        $profileID = $request['profileID'];
        $sql = "SELECT thread.ThreadID, thread.ProfileID, 
                    thread.PostID, 
                    profile.Name AS profile_name, 
                    profile.DisplayPicture AS profile_pic, 
                    thread.DateTime, thread.PostContent AS thread, 
                    thread_media.MediaType AS type, 
                    GROUP_CONCAT(DISTINCT post_tags.Tags) AS tags, 
                    GROUP_CONCAT(DISTINCT thread_media.URL) AS urls, 
                    thread_coordinates.Latitude AS latitude, 
                    thread_coordinates.Longtitude AS longtitude 
                FROM thread 
                LEFT JOIN thread_coordinates 
                ON thread.ThreadID = thread_coordinates.ThreadID 
                LEFT JOIN profile 
                ON thread.ProfileID = profile.ProfileID 
                LEFT JOIN thread_media 
                ON thread.ThreadID = thread_media.ThreadID 
                LEFT JOIN post_tags 
                ON thread.PostID = post_tags.PostID 
                WHERE profile.ProfileID = '$profileID'
                GROUP BY thread.DateTime DESC";
        break;
    case 'showThread':
        $postID = $request['id'];
        $sql = "SELECT thread.ThreadID, thread.ProfileID, 
                    thread.PostID, 
                    profile.Name AS profile_name, 
                    profile.DisplayPicture AS profile_pic, 
                    thread.DateTime, thread.PostContent AS thread, 
                    thread_media.MediaType AS type, 
                    GROUP_CONCAT(DISTINCT post_tags.Tags) AS tags, 
                    GROUP_CONCAT(DISTINCT thread_media.URL) AS urls, 
                    thread_coordinates.Latitude AS latitude, 
                    thread_coordinates.Longtitude AS longtitude 
                FROM thread 
                LEFT JOIN thread_coordinates 
                ON thread.ThreadID = thread_coordinates.ThreadID 
                LEFT JOIN profile 
                ON thread.ProfileID = profile.ProfileID 
                LEFT JOIN thread_media 
                ON thread.ThreadID = thread_media.ThreadID 
                LEFT JOIN post_tags 
                ON thread.PostID = post_tags.PostID 
                WHERE thread.PostID = '$postID'
                GROUP BY thread.DateTime DESC";
        break;
    default:
        break;
}

$result = $conn->query($sql);

if (!$result) {
    die("Query failed: " . $conn->error);
}


$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {

        $tags = explode(",", $row["tags"]); 
        $urls = explode(",", $row["urls"]);

        $post = array(
            "id" => $row["ThreadID"],
            "thread_post_id" => $row["PostID"],
            "profile_id" => $row["ProfileID"],
            "post_id" => $row["ThreadID"],
            "profile_name" => $row["profile_name"],
            "profile_pic" => $row["profile_pic"],
            "date_time" => $row["DateTime"],
            "post" => $row["thread"],
            "post_media" => array(
                "type" => $row["type"],
                "file" => array_unique($urls)
            ),
            "post_coordinates" => null,
            "tags" => array_unique($tags),
            "type" => "thread",
            "has_thread" => true 
        );

        if ($row["latitude"] !== null && $row["longtitude"] !== null) {
            $post["post_coordinates"] = array(
                "latitude" => $row["latitude"],
                "longtitude" => $row["longtitude"]
            );
        }

        $data[] = $post;
    }
}

// Convert the data to JSON format
$jsonData = json_encode($data, JSON_PRETTY_PRINT);

// Output the JSON data
header('Content-Type: application/json');
echo $jsonData;
$conn->close();
?>
