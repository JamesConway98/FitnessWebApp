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
            view.setImage(Math.floor(Math.random() * (3 - 0 + 1) ) + 0);
        };


        document.getElementById("challenge").onclick =function (){
            view.showPopupForChallenges();
        };

        document.getElementById("navmenu").onclick = function (){
            view.openCloseNav();
        }

        document.getElementById("startRoute").onclick = function () {
            model.setStartLocation();
            view.showStopButton();
        };

        document.getElementById("stopRoute").onclick = function () {
            model.setEndLocation();
            view.showEndRoutePopup();
            view.showStartButton();
        };

        document.getElementById("confirmEnd").onclick = function () {
            //printing the total time of journey
            if(model.totalTime() < 2){
                document.getElementById("distance").innerHTML = "Distance travelled on route - " + model.calcDistance() + " Metres." +
                    " It took 1 minute. This scored " + model.calcEndScore() + " points.";
            }else {
                document.getElementById("distance").innerHTML = "Distance travelled on route - " + model.calcDistance() + " Metres." +
                    " It took " + model.totalTime() + " minutes. This scored " + model.calcEndScore() + " points.";
            }
            model.calcEndScore();
            model.addScoreTotal();
            view.setNewScore();
            view.setundoEndPopup();
        };

    };

    this.showATip = function () {
        view.showPopupForTips();
        view.setImage(Math.floor(Math.random() * (3 - 0 + 1) ) + 0);
    }
}
var controller = new Controller();
window.addEventListener("load", controller.init);
window.addEventListener("load", controller.showATip);