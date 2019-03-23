"use strict";
function Controller() {
    var model = new Model();
    var view = new View();


    this.init = function () {
        model.initMap();
        view.setundoPopup();
        view.setundoEndPopup();

        document.getElementById("tips").onclick = function (){
            view.showPopup();
        };

        document.getElementById("startRoute").onclick = function () {
            model.setStartLocation();
        };

        document.getElementById("stopRoute").onclick = function () {
            model.setEndLocation();
            document.getElementById("distance").innerHTML = "Distance travelled on route - " + model.calcDistance() + " Metres.";
            view.showEndRoutePopup();
        };

        document.getElementById("confirmEnd").onclick = function () {
            model.calcEndScore();
            view.setundoEndPopup();
        };

    };
}
var controller = new Controller();
window.addEventListener("load", controller.init);