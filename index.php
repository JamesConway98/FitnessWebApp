<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width-device-width, initial-scale-1.0,maximum-scale-1.0, user-scalable-no " />
<title>Smart Commute</title>
<link rel="stylesheet" type="text/css" href="Normalise.css" />
<link rel="stylesheet" type="text/css" href="ownStyle.css" />
</head>
<header>
Smart Commute
</header>
<body>
<div id = "weather">
    <p id = "temp"></p>
    <p id = "wind"></p>
    <p id = "desc"></p>
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

<div id="googleMap" style="width:100%;height:40vh;"></div>
<div id="tipnChallenge" style="width: 100%;height: 10vh">
    <table id="table" style="width: 100%; height: 100%">
        <tr>
            <td style="width: 33%; height: 100%">
                <button id="tips" style="width:100%; height:100% "> TIPS</button>
            </td>
            <td style="width: 33%; height: 100%">
                <button id="challenge" style="width:100%; height: 100%">CHALLENGE</button>
            </td >
            <td style="width: 33%; height: 100%">
                <button id="socialMedia" style="width:100%; height: 100%">SOCIAL MEDIA</button>
            </td>
        </tr>
        <tr>
            <td></td> <!--these are to centre start and stop-->
            <td id = "startTd" style="width: 33%; height: 100%">
                <button id="startRoute" style="width:100%; height: 100%">START ROUTE</button>
            </td>
            <td id = "stopTd" style="width: 33%; height: 100%" hidden>
                <button id="stopRoute" style="width:100%; height: 100%">STOP ROUTE</button>
            </td>
            <td></td>
        </tr>
    </table>
    <p>tips and challenges</p>
    <p id = "distance"></p>
</div>
<section id="popup1" class="popup" style="height: 100%; width: 100%; display: none">
    <div class="popupbackgroud">
        <p id="water" style="display: none;" ><img alt = "Water" src="water.jpg" style="width:100%; height: 40%"> </p>
        <p id="apple" style="display: none;" ><img alt = "Apple" src="apple.jpg" style="width:100%; height: 40%"> </p>
        <p id="walk" style="display: none;" ><img alt = "Walk" src = "walk.jpg" style="width:100%; height: 40%"> </p>
        <p id="greentea" style="display: none;" ><img alt = "Green Tea" src="greentea.jpg" style="width:100%; height: 40%"> </p>

        <p>Go for a run</p>
        <p> Eat more fruit</p>
        <p>... so on ...</p>
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
    <div class="popupbackgroud">
        <p>Roughly what percentage of the Journey did you Walk/Cycle/Run?</p>
        <div class="slidecontainer">
            <input type="range" min="0" max="100" value="50" class="slider" id="myRange">
            <p>Value: <span id="sliderValue"></span></p>
        </div>
        <button id="confirmEnd" style="width:100%; height: 100%">CONFIRM</button>
    </div>
</section>

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script src ="Model.js"></script>
<script src ="View.js"></script>
<script src ="Controller.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAZohgfaGjEU4KAQHg_CyfxeTcmDjIdCpk&callback=myMap&libraries=geometry"></script>

</body>
</html>