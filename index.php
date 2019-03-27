<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
    <meta name="mobile-web-app-capable" content="yes">
<meta name="viewport" content="width-device-width, initial-scale-1.0,maximum-scale-1.0, user-scalable = 0 " />
<title>Smart Commute</title>
<link rel="stylesheet" type="text/css" href="Normalise.css" />
<link rel="stylesheet" type="text/css" href="ownStyle.css" />
</head>
<body>


<nav id="nav" class="closedmenu">
    <p id="navmenu"> <img src="res/hamburger.png" alt="Menu" width="80" height="80"></p>
    <div id="navelem">
        <div id="tipnChallenge">



                        <button id="challenge" >CHALLENGE</button>


                        <button id="socialMedia">SOCIAL MEDIA</button>


                        <button id="tips" >TIPS</button>

                        <button id ="login">LOGIN</button>


                        <button id ="logout" hidden>LOGOUT</button>

        </div>
    </div>
</nav>
<main id="main" class="closedmenu">
    <div id = "top">
<div id = "weather">
    <div id="weatherImg"><img alt = "cloudy" src="res/Cloud.png"> </div>
    <div id="city"></div>
    <div id = "desc"></div>
    <div id = "temp"></div>
    <div id = "wind"></div>
</div>
<div id="scoreBoard">
    <?php

    $host = "devweb2018.cis.strath.ac.uk";
    $user = "cs317madb";
    $pass = "ri6nai5Oighe";
    $dbname = "cs317madb";
    $conn = new mysqli($host, $user, $pass, $dbname);

    if($conn->connect_error){
        die("Connection failed : ".$conn->connect_error);
        }


        $sql = "SELECT * FROM `players` ORDER BY `score` DESC";
        $result = $conn->query($sql);

        if(!$result){
        die("Query failed : ".$conn->error);
        }

        echo "<table>\n";
    echo "<th>"."Position"."</th>";
    echo "<th>"."Name"."</th>";
    echo "<th>"."Score"."</th>";


    if($result->num_rows > 0){
        $counter = 1;
    while($row = $result->fetch_assoc()){

    echo "<tr>\n";
        echo "<td>".$counter."</td>\n";
        echo "<td>".$row["name"]."</td>\n";
        echo "<td>".$row["score"]."</td>\n";
        echo "</tr>\n";
        $counter = $counter+ 1;
    }
    echo "</table>\n";
    }

    $conn->close();
    ?>
</div>
        <div id = "totalScore">
            <div id = "score">Your Total Score -  <?php ?></div> <!--- TODO use database to get score or use local storage -->

    </div>
    </div>
    <p id="distance"></p>
<div id="googleMap"></div>
    <input type="button" value="START"  id="startRoute" />

<section id="popup1" class="popup" style="height: 100%; width: 100%; display: none">
    <div class="popupbackgroud">
        <p id="water" style="display: none;" ><img alt = "Water" src="res/water.jpg" > </p>
        <p id="apple" style="display: none;" ><img alt = "Apple" src="res/apple.jpg" > </p>
        <p id="walk" style="display: none;" ><img alt = "Walk" src = "res/walk.jpg" > </p>
        <p id="greentea" style="display: none;" ><img alt = "Green Tea" src="res/greentea.jpg" > </p>

        <div id = "tip">Stay healthy!</div>
        <button id = "tipButton"> OK </button>
    </div>
</section>
<section id="popup12" class="popup" style="height: 100%; width: 100%; display: none">
    <div class="popupbackgroud">
        <p>Drink more water</p>
        <p>Go for a run</p>
        <p> Eat more fruit</p>
        <p>... so on ...</p>
    </div>
</section>

<section id="popup2" class="popup" style="height: 100%; width: 100%; display: none">
    <div class="popupbackgroud" id = "confirm">
        <p>Roughly what percentage of the Journey did you Walk/Cycle/Run?</p>
        <div class="slidecontainer">
            <input type="range" min="0" max="100" value="50" class="slider" id="myRange">
            <p><span id="sliderValue"></span>%</p>
        </div>
        <button id="confirmEnd" >CONFIRM</button>
    </div>
</section>

    <section id="loginPopup" class="popup" style="height: 100%; width: 100%; display: none">
        <div class="popupbackgroud">

        <label for="username"><b>Username</b></label>
        <input id ="username" type="text" placeholder="Enter Username" name="username">


        <label for="pass"><b>Password</b></label>
        <input type="password" placeholder="Enter Password" name="pass">

        <button id ="submitLogin">Login</button>

        </div>
    </section>

</main>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src ="Model.js"></script>
<script src ="View.js"></script>
<script src ="Controller.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZohgfaGjEU4KAQHg_CyfxeTcmDjIdCpk&callback=myMap&libraries=geometry"></script>

</body>
</html>