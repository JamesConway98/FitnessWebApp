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
        setTimeout(function(){
            $(document).ready(function() {
                $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=5c1d1e70f61769dbce60cd3876f79c98&units=metric', function (data) {

                    var temp = Math.round(data.main.temp);
                    localStorage.setItem('storeTemp', temp);
                    document.getElementById('temp').innerHTML = temp + "&#8451";

                    var wind = Math.round(data.wind.speed * 3.6 * 10) / 10;
                    localStorage.setItem('storeWind', wind);
                    document.getElementById('wind').innerHTML = wind+ " km/h";

                    var desc = data.weather[0].main;
                    localStorage.setItem('storeDesc', desc);
                    document.getElementById('desc').innerHTML = desc;

                    var city = data.name;
                    localStorage.setItem('storeCity', city);
                    document.getElementById('city').innerHTML = city;


                })
                    .fail(function() {
                        var temp = Math.round(localStorage.getItem('storeTemp'));
                        document.getElementById('temp').innerHTML =  temp + "&#8451";

                        var wind = localStorage.getItem('storeWind');
                        document.getElementById('wind').innerHTML =  wind + " km/h";

                        var desc = localStorage.getItem('storeDesc');
                        document.getElementById('desc').innerHTML = desc;

                        var city = localStorage.getItem('storeCity');
                        document.getElementById('city').innerHTML = city;
                    });

            });

        }, 100);

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
        var currentScore = localStorage.getItem("totalScore");
        localStorage.setItem("totalScore",  parseInt(currentScore)+this.calcEndScore());
    };

    this.setLogin = function (username){
        localStorage.setItem("loggedIn", username);
    };

    this.logout = function (){
        localStorage.setItem("loggedIn", "");
    };
    this.initWeather = function () {

        console.log(latitude);
        $(document).ready(function() {
            $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat='+latitude+'&lon='+longitude+'&APPID=5c1d1e70f61769dbce60cd3876f79c98&units=metric', function (data) {

                    var temp = Math.round(data.main.temp);
                    localStorage.setItem('storeTemp', temp);
                    document.getElementById('temp').innerHTML = temp + "&#8451";

                    var wind = Math.round(data.wind.speed * 3.6 * 10) / 10;
                    localStorage.setItem('storeWind', wind);
                    document.getElementById('wind').innerHTML = wind+ " km/h";

                    var desc = data.weather[0].main;
                    localStorage.setItem('storeDesc', desc);
                    document.getElementById('desc').innerHTML = desc;

                    var city = data.name;
                    localStorage.setItem('storeCity', city);
                    document.getElementById('city').innerHTML = city;


            })
            .fail(function() {
                var temp = Math.round(localStorage.getItem('storeTemp'));
                document.getElementById('temp').innerHTML =  temp + "&#8451";

                var wind = localStorage.getItem('storeWind');
                document.getElementById('wind').innerHTML =  wind + " km/h";

                var desc = localStorage.getItem('storeDesc');
                document.getElementById('desc').innerHTML = desc;

                var city = localStorage.getItem('storeCity');
                document.getElementById('city').innerHTML = city;
            });

        });
    };

}