"use strict";
function Model() {

    var map,
        startLocation,
        endLocation,
        startTime,
        endTime,
        latitude,
        destMarker,
        currPosMarker,
        longitude;
    var setup = false;
    var markers = [];
    var directionsService,directionsDisplay;

    this.initMap = function () {
        getLocation();

        //update location every 20 seconds
        setInterval(function () {
            getLocation();
        }, 20000);


        setTimeout(function () {
            $(document).ready(function () {
                $.getJSON('https://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&APPID=5c1d1e70f61769dbce60cd3876f79c98&units=metric', function (data) {

                    var temp = Math.round(data.main.temp);
                    localStorage.setItem('storeTemp', temp);
                    document.getElementById('temp').innerHTML = temp + "&#8451";

                    var wind = Math.round(data.wind.speed * 3.6 * 10) / 10;
                    localStorage.setItem('storeWind', wind);
                    document.getElementById('wind').innerHTML = wind + " km/h";

                    var desc = data.weather[0].main;
                    localStorage.setItem('storeDesc', desc);
                    document.getElementById('desc').innerHTML = desc;

                    var city = data.name;
                    localStorage.setItem('storeCity', city);
                    document.getElementById('city').innerHTML = city;


                })
                    .fail(function () {
                        var temp = Math.round(localStorage.getItem('storeTemp'));
                        document.getElementById('temp').innerHTML = temp + "&#8451";

                        var wind = localStorage.getItem('storeWind');
                        document.getElementById('wind').innerHTML = wind + " km/h";

                        var desc = localStorage.getItem('storeDesc');
                        document.getElementById('desc').innerHTML = desc;

                        var city = localStorage.getItem('storeCity');
                        document.getElementById('city').innerHTML = city;
                    });

            });
            var input = document.getElementById('pac-input');
            var searchBox = new google.maps.places.SearchBox(input);
            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
            map.addListener('bounds_changed', function () {
                searchBox.setBounds(map.getBounds());
                // Listen for the event fired when the user selects a prediction and retrieve
                // more details for that place.

                searchBox.addListener('places_changed', function () {
                    var places = searchBox.getPlaces();

                    if (places.length == 0) {
                        return;
                    }
                    markers.forEach(function (marker) {
                        marker.setMap(null);
                    });
                    markers = [];


                    // For each place, get the icon, name and location.
                    var bounds = new google.maps.LatLngBounds();
                    places.forEach(function (place) {
                        if (!place.geometry) {
                            console.log("Returned place contains no geometry");
                            return;
                        }
                        var icon = {
                            url: place.icon,
                            size: new google.maps.Size(71, 71),
                            origin: new google.maps.Point(0, 0),
                            anchor: new google.maps.Point(17, 34),
                            scaledSize: new google.maps.Size(25, 25)
                        };

                        // Create a marker for each place.
                        markers.push(new google.maps.Marker({
                            map: map,
                            icon: icon,
                            title: place.name,
                            position: place.geometry.location
                        }));

                        if (place.geometry.viewport) {
                            // Only geocodes have viewport.
                            bounds.union(place.geometry.viewport);
                        } else {
                            bounds.extend(place.geometry.location);
                        }
                    });
                    map.fitBounds(bounds);

                });
            });
        }, 1000);

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
        if (setup) {
            currPosMarker.setMap(null);
        }
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
        var myLatLng = {lat: latitude, lng: longitude};
        var mapProp = {
            center: new google.maps.LatLng(latitude, longitude),
            zoom: 16,
        };
        currPosMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            title: 'You are here'
        });
        if (!setup) {
            map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
            setup = true;
        }
        currPosMarker.setMap(map);
    }


    this.setStartLocation = function () {
        startLocation = getLocation();
        startTime = new Date();
        console.log(getLocation());
    };

    this.setEndLocation = function () {
        endLocation = getLocation();
        //endLocation = {lat: 1, lng: 1}; this is for test
        endTime = new Date();
        console.log(getLocation());
    };

    this.totalTime = function () {
        //Working out time it took
        var diff = (endTime.getTime() - startTime.getTime()) / 1000;
        diff /= 60;
        return Math.abs(Math.round(diff));
    };

    this.calcDistance = function () {//p1 and p2 in the form of google.maps.LatLng object
        var p1 = new google.maps.LatLng(startLocation.lat, startLocation.lng);
        var p2 = new google.maps.LatLng(endLocation.lat, endLocation.lng);
        console.log(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
        return google.maps.geometry.spherical.computeDistanceBetween(p1, p2); //distance in KiloMeters
    };

    this.calcSpeed = function () {
        return this.calcDistance() / (endTime - startTime);
    };

    this.calcEndScore = function () {
        //if average speed is > 25 mph and user says they walk/cycle/ran more than 50% then something isnt right
        if (this.calcSpeed() > 670 && document.getElementById("myRange").value > 50) {
            return -1;
        }

        if (localStorage.getItem("lastDayWalked") == null) {
            localStorage.setItem("totalDaysWalked", "1");
            localStorage.setItem("lastDayWalked", new Date().toDateString());
            localStorage.setItem("totalScore", "0");
        }
        //if last walked day isnt today then add one day on
        else if (localStorage.getItem("lastDayWalked") != new Date().toDateString()) {
            var currentDays = localStorage.getItem("totalDaysWalked");
            localStorage.setItem("totalDaysWalked", parseInt(currentDays) + 1);
            localStorage.setItem("lastDayWalked", new Date().toDateString());
        }
        return (this.calcDistance() * document.getElementById("myRange").value) /10;
    };
    this.addScoreTotal = function () {
        var currentScore = localStorage.getItem("totalScore");
        localStorage.setItem("totalScore", parseInt(currentScore) + this.calcEndScore());

    };

    this.addScore = function (score) {
        var currentScore = localStorage.getItem("totalScore");
        localStorage.setItem("totalScore", parseInt(currentScore) + score);
    };

    this.setLogin = function (username) {
        localStorage.setItem("loggedIn", username);
    };

    this.logout = function () {
        localStorage.setItem("loggedIn", "");
    };
    this.initDestServices = function () {
        directionsService = new google.maps.DirectionsService;
        directionsDisplay = new google.maps.DirectionsRenderer({map: map});
    };

    this.drawRoute = function(n) {
        if (n === 0) {
            directionsDisplay.setMap(null);
            directionsDisplay = null;

        }
        else {

            if (markers.length == 1) {

                directionsService.route({
                    origin: getLocation(),
                    destination: document.getElementById('pac-input').value,
                    travelMode: 'WALKING'
                }, function (response, status) {
                    // Route the directions and pass the response to a function to create
                    // markers for each step.
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }
        };

    };

}