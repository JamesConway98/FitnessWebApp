"use strict";
function Model() {

    var map,
        startLocation,
        endLocation,
        startTime,
        endTime,
        latitude,
        longitude;

    this.initMap = function () {
        getLocation();
    };

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
            return {lat: latitude, lng: longitude};
        } else {
            map.innerHTML = "Geolocation is not supported by this browser.";
        }
    }

    function showPosition(position) {
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var myLatLng = {lat: latitude, lng: longitude};
        var mapProp= {
            center:new google.maps.LatLng(latitude,longitude),
            zoom:16,
        };
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'You are here'
        });
        map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
        marker.setMap(map);
    }

    this.setStartLocation = function () {
        startLocation = getLocation();
        startTime = new Date();
        console.log(getLocation());
    };
    this.setImage=function (number){
        if(number ===0){
            document.getElementById("water").style.display="block";

        }else if(number === 1){
            document.getElementById("apple").style.display="block";
        }else if(number ===2){
            document.getElementById("walk").style.display="block";
        }else{
            document.getElementById("greentea").style.display="block";
        }
    };

    this.setEndLocation = function () {
        endLocation = getLocation();
        endTime = new Date();
        console.log(getLocation());
    };

    this.totalTime = function () {
        //Working out time it took
        var diff =(endTime.getTime() - startTime.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    };

    this.calcDistance = function () {//p1 and p2 in the form of google.maps.LatLng object
        var p1 = new google.maps.LatLng(startLocation.lat, startLocation.lng);
        var p2 = new google.maps.LatLng(endLocation.lat, endLocation.lng);
        console.log(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
        return google.maps.geometry.spherical.computeDistanceBetween(p1, p2); //distance in KiloMeters
    };

    this.calcEndScore = function(){
        //TODO use percentage ran/walked/cycled with distance travelled to calculate a score
        return this.calcDistance() * document.getElementById("myRange").value;
    };
    this.addScoreTotal = function () {
        localStorage.setItem("totalScore", localStorage.getItem("totalScore")+this.calcEndScore());
    };
    this.initWeather = function () {
        $(document).ready(function() {
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=5c1d1e70f61769dbce60cd3876f79c98&units=metric', function (data) {
                var temp = data.main.temp;
                document.getElementById('temp').innerHTML = "The current temperature is: " + temp  + "&#8451";
                var wind = Math.round(data.wind.speed*3.6*10)/10;
                document.getElementById('wind').innerHTML = "Wind: " + wind + " km/h";
                var desc = data.weather[0].main;
                document.getElementById('desc').innerHTML = desc;

            });
        });
    };

}