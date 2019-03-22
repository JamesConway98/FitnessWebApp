"use strict";
function Model() {

    var map,
        startLocation,
        endLocation,
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
            x.innerHTML = "Geolocation is not supported by this browser.";
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
        console.log(getLocation());
    };

    this.setEndLocation = function () {
        endLocation = getLocation();
        console.log(getLocation());
    };

    this.calcDistance = function () {//p1 and p2 in the form of google.maps.LatLng object
        var p1 = new google.maps.LatLng(startLocation.lat, startLocation.lng);
        var p2 = new google.maps.LatLng(endLocation.lat, endLocation.lng);
        console.log(google.maps.geometry.spherical.computeDistanceBetween(p1, p2));
        return google.maps.geometry.spherical.computeDistanceBetween(p1, p2); //distance in KiloMeters
    }

}