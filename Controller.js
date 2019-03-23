"use strict";
function Controller() {
    var model = new Model();
    var view = new View();


    this.init = function () {
        model.initMap();
        model.initWeather();
        view.setundoPopup();
        view.setundoEndPopup();

        document.getElementById("tips").onclick = function (){
            view.showPopupForTips();
            model.setImage(Math.floor(Math.random() * (3 - 0 + 1) ) + 0);
        };


        document.getElementById("challenge").onclick =function (){
            view.showPopupForChallenges();
        };

        document.getElementById("startRoute").onclick = function () {
            model.setStartLocation();
        };

        document.getElementById("stopRoute").onclick = function () {
            model.setEndLocation();
            //printing the total time of journey
            if(model.totalTime() < 2){
                document.getElementById("distance").innerHTML = "Distance travelled on route - " + model.calcDistance() + " Metres." +
                    " It took 1 minute.";
            }else {
                document.getElementById("distance").innerHTML = "Distance travelled on route - " + model.calcDistance() + " Metres." +
                    " It took " + model.totalTime() + " minutes.";
            }
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