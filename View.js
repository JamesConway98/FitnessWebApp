"use strict";
function View(){
    var tricksShown =false,
        challengesShown =false,
        openNav = false,
        endShown=false,
        loginShown = false,
        addMouseAndTouchUp = function (elementID, handler) {
            //utility function to add both mouseup and touchend events and prevent double events
            var element = document.getElementById(elementID),
                f = function (e) {
                    e.preventDefault();//stops mobile browsers faking the mouse events after touch events
                    handler(e);
                    return false;
                };
            element.addEventListener("mouseup", f, false);
            element.addEventListener("touchend", f, false);
        };
    this.openCloseNav = function () {
        //dogle the side menu reveal
        // window.alert("openCloseNav is working");
        if (openNav) {
            openNav = false;
            document.getElementById("nav").className = "closedmenu";
            document.getElementById("main").className = "closedmenu";
            document.getElementById("navelem").style.display = "none";
        } else {
            openNav = true;
            document.getElementById("nav").className = "";
            document.getElementById("main").className = "";
            document.getElementById("navelem").style.display = "block";
        }
    };


    this.setImage=function (number){
        if(number ===0){
            document.getElementById("water").style.display="block";
            document.getElementById("apple").style.display="none";
            document.getElementById("walk").style.display="none";
            document.getElementById("greentea").style.display="none";
            document.getElementById("tip").innerHTML= "Always remember to stay hydrated!";


        }else if(number === 1){
            document.getElementById("apple").style.display="block";
            document.getElementById("walk").style.display="none";
            document.getElementById("greentea").style.display="none";
            document.getElementById("water").style.display="none";
            document.getElementById("tip").innerHTML= "Eat your 5-a day!";
        }else if(number ===2){
            document.getElementById("walk").style.display="block";
            document.getElementById("greentea").style.display="none";
            document.getElementById("water").style.display="none";
            document.getElementById("apple").style.display="none";
            document.getElementById("tip").innerHTML= "Go for a walk!";
        }else{
            document.getElementById("greentea").style.display="block";
            document.getElementById("water").style.display="none";
            document.getElementById("apple").style.display="none";
            document.getElementById("walk").style.display="none";
            document.getElementById("tip").innerHTML= "Relax after exercise!";
        }
    };


    this.showPopupForTips = function () {
        if(tricksShown){
            document.getElementById("popup1").style.display= "none";
            tricksShown=false;
        }else{
            document.getElementById("popup1").style.display= "block";
            history.pushState(null, null, "#trick");
            tricksShown = true;

        }
    };

    this.showPopupForChallenges = function () {
        if(challengesShown){
            document.getElementById("popup12").style.display= "none";
            challengesShown=false;
        }else{
            document.getElementById("popup12").style.display= "block";
            history.pushState(null, null, "#trick");
            challengesShown = true;

        }
    };
    this.setundoPopup =function (){
        addMouseAndTouchUp("popup1", function () {
            window.history.back();
            document.getElementById("popup1").style.display= "none";
            tricksShown=false;
        });

        addMouseAndTouchUp("popup12",function () {
            window.history.back();
            document.getElementById("popup12").style.display="none";
            challengesShown=false;
        })
    };

    this.showEndRoutePopup = function () {
        if(endShown) {
            document.getElementById("popup2").style.display = "none";
            tricksShown = false;
        }else{
            document.getElementById("popup2").style.display = "block";
            history.pushState(null, null, "#trick");
            endShown = true;
        }

        //this shows value of slider
        var slider = document.getElementById("myRange");
        var output = document.getElementById("sliderValue");
        output.innerHTML = slider.value;

        slider.oninput = function() {
            output.innerHTML = this.value;
        }
    };
    this.setundoEndPopup =function (){
        document.getElementById("popup2").style.display= "none";
        endShown=false;
    };

    this.showLoginPopup = function () {
        if(loginShown) {
            document.getElementById("loginPopup").style.display = "none";
            tricksShown = false;
        }else{
            document.getElementById("loginPopup").style.display = "block";
            history.pushState(null, null, "#trick");
            loginShown = true;
        }

        var email = document.getElementById("emailEntry");
        var password = document.getElementById("passwordEntry");

    };
    this.setundoLoginPopup =function (){
        document.getElementById("loginPopup").style.display= "none";
        loginShown=false;
    };

    this.showStartButton = function () {
        document.getElementById("stopRoute").hidden = true;
        document.getElementById("startRoute").hidden= false;
    };

    this.showStopButton = function () {
        document.getElementById("startRoute").hidden = true;
        document.getElementById("stopRoute").hidden = false;
    };

    this.showLoginButton = function (){
        document.getElementById("logout").hidden = true;
        document.getElementById("login").hidden = false;
    };

    this.showLogoutButton = function (){
        document.getElementById("login").hidden = true;
        document.getElementById("logout").hidden = false;
    };

    this.setNewScore = function(){
        document.getElementById("totalScore").innerHTML = "Your Total Score - " + localStorage.getItem("totalScore");
    };

}