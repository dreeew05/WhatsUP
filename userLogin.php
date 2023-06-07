<!DOCTYPE html>
<html>
<head>
  <title>Login</title>
  <link rel="stylesheet" type="text/css" href="css/login.css">

  <!-- [START] SWEETALERT -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!-- [END] SWEETALERT --> 

</head>
<body>

<?php
  $url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
  $queryString = parse_url($url, PHP_URL_QUERY);
  parse_str($queryString, $params);
  
  // DETERMINE IF LOGIN IS SUCCESSFUL
  if(isset($params['success'])) {
      $response = $params['success'];
      if($response == 'false') {
        echo "<script>
              Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: 'Invalid Username or Password'
              })
            </script>";
      }
  }
?>

<div class="carousel">

<div class="mySlides fade">
  <div class="numberText">1 / 4</div>
  <img id= "cas" src = "https://github.com/daneeeeeee/WhatsUP/blob/main/assets/images/cas.jpg?raw=true" alt = "CAS">
</div>

<div class="mySlides fade">
  <div class="numberText">2 / 4</div>
  <img id = "cfos" src="https://github.com/daneeeeeee/WhatsUP/blob/main/assets/images/cfos.jpg?raw=true" alt = "CFOS">
</div>

<div class="mySlides fade">
  <div class="numberText">3 / 4</div>
  <img id = "cm" src= "https://github.com/daneeeeeee/WhatsUP/blob/main/assets/images/cm.jpg?raw=true" alt = "CM">
</div>

<div class="mySlides fade">
  <div class="numberText">4 / 4</div>
  <img id = "sotech" src= "https://github.com/daneeeeeee/WhatsUP/blob/main/assets/images/sotech.jpg?raw=true" alt = "SOTECH">
</div>

<a class="prev" onclick="plusSlides(-1)">❮</a>
<a class="next" onclick="plusSlides(1)">❯</a>

</div>

<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span> 
  <span class="dot" onclick="currentSlide(2)"></span> 
  <span class="dot" onclick="currentSlide(3)"></span>
  <span class="dot" onclick="currentSlide(4)"></span> 
</div>
<br>

<img id="logo" class="projLogo" src="assets/images/logo.png"/>

<div class="container">
<div class="header">

 </div>

<form name="login" id="login-form" action = "php\login.php" method="post" enctype="multipart/form-data">
<ul>
<li>
  <label for = "username"> Username: </label>
  <input type = "text" id="username" name="username" required></li>
<li>
  <label for = "password">Password: </label>
  <input type="password" id="password" name="pass" required>
  <input type="checkbox" onclick="togglePassword()"></input>
</li>
</ul>
<input type="submit" class="submit" value="Submit" name="submit">

</form>
</div>

<script src="script/login.js"></script>

<svg class="wave" style="transform:rotate(0deg); transition: 0.3s" viewBox="0 0 1440 160" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stop-color="rgba(34, 139, 34, 1)" offset="0%"></stop><stop stop-color="rgba(0, 202.527, 61.875, 1)" offset="100%"></stop></linearGradient></defs><path style="transform:translate(0, 0px); opacity:1" fill="url(#sw-gradient-0)" d="M0,80L26.7,74.7C53.3,69,107,59,160,48C213.3,37,267,27,320,34.7C373.3,43,427,69,480,90.7C533.3,112,587,128,640,114.7C693.3,101,747,59,800,53.3C853.3,48,907,80,960,88C1013.3,96,1067,80,1120,72C1173.3,64,1227,64,1280,69.3C1333.3,75,1387,85,1440,96C1493.3,107,1547,117,1600,112C1653.3,107,1707,85,1760,74.7C1813.3,64,1867,64,1920,56C1973.3,48,2027,32,2080,26.7C2133.3,21,2187,27,2240,37.3C2293.3,48,2347,64,2400,61.3C2453.3,59,2507,37,2560,26.7C2613.3,16,2667,16,2720,21.3C2773.3,27,2827,37,2880,34.7C2933.3,32,2987,16,3040,26.7C3093.3,37,3147,75,3200,90.7C3253.3,107,3307,101,3360,90.7C3413.3,80,3467,64,3520,61.3C3573.3,59,3627,69,3680,72C3733.3,75,3787,69,3813,66.7L3840,64L3840,160L3813.3,160C3786.7,160,3733,160,3680,160C3626.7,160,3573,160,3520,160C3466.7,160,3413,160,3360,160C3306.7,160,3253,160,3200,160C3146.7,160,3093,160,3040,160C2986.7,160,2933,160,2880,160C2826.7,160,2773,160,2720,160C2666.7,160,2613,160,2560,160C2506.7,160,2453,160,2400,160C2346.7,160,2293,160,2240,160C2186.7,160,2133,160,2080,160C2026.7,160,1973,160,1920,160C1866.7,160,1813,160,1760,160C1706.7,160,1653,160,1600,160C1546.7,160,1493,160,1440,160C1386.7,160,1333,160,1280,160C1226.7,160,1173,160,1120,160C1066.7,160,1013,160,960,160C906.7,160,853,160,800,160C746.7,160,693,160,640,160C586.7,160, 533, 160, 480, 160C426.7, 160, 373, 160, 320, 160C266.7, 160, 213, 160, 160, 160C106.7, 160, 53, 160, 27, 160L0,160Z"></path></svg>

</body>
</html>