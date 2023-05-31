<?php

// Database connection configuration
$servername = "";
$username = "root";
$password = "";
$dbname = "sample";

// Create a connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check the connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// SQL query to fetch data
$sql = "SELECT profile.Name AS profile_name, profile.DisplayPicture AS display_picture, profile.DisplayBanner AS banner_image, profile.Details AS details,
        profile.Category, profile_contacts.Address, profile_contacts.Email, profile_contacts.Mobile, profile_contacts.Telephone,
        profile_socials.Website, profile_socials.Facebook, profile_socials.Youtube, profile_socials.Twitter, profile_socials.Tiktok
        FROM profile
        LEFT JOIN profile_contacts ON profile.ProfileID = profile_contacts.ProfileID
        LEFT JOIN profile_socials ON profile.ProfileID = profile_socials.ProfileID";

$result = $conn->query($sql);

// Array to store the fetched data
$output = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        // Store each row as an associative array in the output array
        $output[] = [
            "profile_name" => $row["profile_name"],
            "display_picture" => $row["display_picture"],
            "banner_image" => $row["banner_image"],
            "details" => $row["details"],
            "category" => $row["Category"],
            "contact" => [
                "address" => $row["Address"],
                "email" => $row["Email"],
                "mobile" => $row["Mobile"],
                "telephone" => $row["Telephone"]
            ],
            "socials" => [
                "website" => $row["Website"],
                "facebook" => $row["Facebook"],
                "youtube" => $row["Youtube"],
                "twitter" => $row["Twitter"],
                "tiktok" => $row["Tiktok"]
            ]
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
