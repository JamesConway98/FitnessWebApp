"use strict";
function View(){
    var tricksShown =false,
        challengesShown =false,
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
            document.getElementById("popup2").style.display= "none";
            challengesShown=false;
        }else{
            document.getElementById("popup2").style.display= "block";
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

        addMouseAndTouchUp("popup2",function () {
            window.history.back();
            document.getElementById("popup2").style.display="none";
            challengesShown=false;
        })
    };

}