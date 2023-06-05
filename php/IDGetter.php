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

   switch($request['type']) {
      case 'post':
         $SQL = "SELECT MAX(PostID) As MaxID
                 FROM post";
         break;
      case 'thread':
         $SQL = "SELECT MAX(ThreadID) As MaxID
                 FROM thread";
         break;
      case 'getPostID':
         $id = $request['id'];
         $SQL = "SELECT PostID AS MaxID
                 FROM thread
                 WHERE ThreadID = '$id'";
      default:
         break;
   }

   $RESULT = $conn -> query($SQL);

   if($RESULT) {
      $row   = $RESULT -> fetch_assoc();
      $maxID = $row['MaxID'];
   }

   echo json_encode(
      array(
         'maxID' => $maxID
      )
   );

   $conn -> close();
      
?>