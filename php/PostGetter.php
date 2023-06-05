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
    case 'all':
        // SQL query to fetch data
        $sql = "SELECT post.ProfileID AS id, post.PostID AS post_id, post.DateTime 
                    AS date_time, post.PostContent AS post, post.HasThread AS has_thread,
                    GROUP_CONCAT(DISTINCT post_tags.Tags) AS tags, 
                    post_coordinates.Latitude, post_coordinates.Longtitude, 
                    post_media.MediaType, GROUP_CONCAT(DISTINCT post_media.URL) 
                    AS urls, profile.Name, profile.DisplayPicture
                FROM post 
                LEFT JOIN post_tags ON post.PostID = post_tags.PostID 
                LEFT JOIN post_coordinates ON post.PostID = post_coordinates.PostID
                LEFT JOIN post_media ON post.PostID = post_media.PostID
                LEFT JOIN profile ON post.ProfileID = profile.ProfileID
                GROUP BY post.DateTime DESC";
        break;
    case 'profile':
        $profileID = $request['profileID'];
        $sql = "SELECT post.ProfileID AS id, post.PostID AS post_id, post.DateTime 
                    AS date_time, post.PostContent AS post, post.HasThread AS has_thread,
                    GROUP_CONCAT(DISTINCT post_tags.Tags) AS tags, 
                    post_coordinates.Latitude, post_coordinates.Longtitude, 
                    post_media.MediaType, GROUP_CONCAT(DISTINCT post_media.URL) 
                    AS urls, profile.Name, profile.DisplayPicture
                FROM post 
                LEFT JOIN post_tags ON post.PostID = post_tags.PostID 
                LEFT JOIN post_coordinates ON post.PostID = post_coordinates.PostID
                LEFT JOIN post_media ON post.PostID = post_media.PostID
                LEFT JOIN profile ON post.ProfileID = profile.ProfileID
                WHERE post.ProfileID = '$profileID'
                GROUP BY post.DateTime DESC";
        break;
    case 'showPost':
        $postID = $request['id'];
        $sql = "SELECT post.ProfileID AS id, post.PostID AS post_id, post.DateTime 
                    AS date_time, post.PostContent AS post, post.HasThread AS has_thread,
                    GROUP_CONCAT(DISTINCT post_tags.Tags) AS tags, 
                    post_coordinates.Latitude, post_coordinates.Longtitude, 
                    post_media.MediaType, GROUP_CONCAT(DISTINCT post_media.URL) 
                    AS urls, profile.Name, profile.DisplayPicture
                FROM post 
                LEFT JOIN post_tags ON post.PostID = post_tags.PostID 
                LEFT JOIN post_coordinates 
                    ON post.PostID = post_coordinates.PostID
                LEFT JOIN post_media ON post.PostID = post_media.PostID
                LEFT JOIN profile ON post.ProfileID = profile.ProfileID
                WHERE post.PostID = '$postID'
                GROUP BY post.DateTime DESC";
        break;
    default:
        break;
}

    // -- GROUP BY post.ProfileID, post.PostID, post.DateTime, post.PostContent, post.HasThread, post_coordinates.Latitude, post_coordinates.Longtitude, post_media.MediaType, profile.Name, profile.DisplayPicture";

$result = $conn->query($sql);

if ($result === false) {
    die("Query execution failed: " . mysqli_error($conn));
}

// Array to store the fetched data
$output = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Store each row as an associative array in the output array
        $tags = explode(",", $row["tags"]);
        $urls = explode(",", $row["urls"]);

        // MAKE COORDINATES NULL IF LAT AND LNG ARE NULL
        $latitude   = $row['Latitude'];
        $longtitude = $row['Longtitude'];
        if($latitude == NULL || $longtitude == NULL) {
            $coordinates = NULL;
        }
        else {
            $coordinates = array(
                'latitude'   => $latitude,
                'longtitude' => $longtitude
            );
        }

        // MAKE MEDIA NULL IF TYPE IS NULL
        $mediaType = $row["MediaType"];
        if($mediaType == NULL) {
            $postMedia = NULL;
        }
        else {
            $postMedia = array(
                'type' => $mediaType,
                'file' => array_unique($urls)
            );
        }
        
        $output[] = [
            "id" => $row["post_id"],
            "profile_id" => $row["id"],
            "profile_name" => $row["Name"],
            "profile_pic" => $row["DisplayPicture"],
            "date_time" => $row["date_time"],
            "post" => $row["post"],
            "post_media" => $postMedia,
            "tags" => array_unique($tags),
            "post_coordinates" => $coordinates,
            "type" => "post",
            "has_thread" => (bool)$row["has_thread"],
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
