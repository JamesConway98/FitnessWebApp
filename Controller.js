"use strict";
function Controller() {
    var model = new Model();
    var view = new View();
    var randNumber;


    this.init = function () {
        model.initMap();
        view.setundoPopup();
        view.setundoEndPopup();
        view.setundoLoginPopup();
        view.setNewScore();

        if(localStorage.getItem("loggedIn") != ""){
            view.showLogoutButton();
        }else{
            view.showLoginButton();
        }

        document.getElementById("tips").onclick = function (){
            view.showPopupForTips();
            view.setImage(Math.floor(Math.random() * (3 - 0 + 1) ) + 0);
        };


        document.getElementById("challenge").onclick =function (){
            randNumber= Math.floor(Math.random() * (3 - 0 + 1) ) + 0;
            view.showPopupForChallenges();
            view.showChallengeContent(randNumber);
        };

        document.getElementById("accept").onclick =function (){
            view.acceptChallenge(randNumber);
        };

        document.getElementById("accept").ontouchstart= function (){
            view.acceptChallenge(randNumber);
        };

        document.getElementById("done").onclick = function (){
            view.deleteTickedChallenges(randNumber);
        };



        document.getElementById("cancel").onclick = function(){
            window.history.back();
            document.getElementById("acceptedChallenges").style.display="none";
            view.setAccchall(false);
        };

        document.getElementById("ongoingChallenges").onclick=function(){
            view.showPopupForAcceptedChallenges();
        };


        document.getElementById("navmenu").onclick = function (){
            view.openCloseNav();
        };

        var startStop = document.getElementById("startRoute");
        startStop.addEventListener("click", Start);
        function Start () {
            model.initDestServices();
            model.drawRoute(1);
            model.setStartLocation();
            startStop.removeEventListener("click", Start);
            startStop.addEventListener("click", Stop);
            startStop.value = "STOP";
            startStop.style.backgroundColor = "rgba(255, 0, 0, 0.3)";
        };

        function Stop () {
            model.setEndLocation();
            model.drawRoute(0);
            view.showEndRoutePopup();
            startStop.removeEventListener("click", Stop);
            startStop.addEventListener("click", Start);
            startStop.value = "START";
            startStop.style.backgroundColor = "rgba(0, 255, 0, 0.3)";
        };

        document.getElementById("confirmEnd").onclick = function () {
            if(model.calcEndScore() < 0){
                document.getElementById("distance").innerHTML = "You cannot walk/run/cycle that fast.";
            } else if(model.totalTime() < 2){
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

    document.getElementById("login").onclick = function () {
        view.showLoginPopup();
    };

    document.getElementById("submitLogin").onclick = function () {
        var username = document.getElementById("username").value;
        if(username != ""){
            model.setLogin(username);
            view.showLogoutButton();
        }
        view.setundoLoginPopup();
    };

    document.getElementById("logout").onclick = function () {
        model.logout();
        view.showLoginButton();
    };

    this.showATip = function () {
        view.showPopupForTips();
        view.setImage(Math.floor(Math.random() * (3 - 0 + 1) ) + 0);
    };
}
var controller = new Controller();
window.addEventListener("load", controller.init);
window.addEventListener("load", controller.showATip);