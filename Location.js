
var latitude;
var longitude;
getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    var mapProp= {
        center:new google.maps.LatLng(latitude,longitude),
        zoom:16,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}
