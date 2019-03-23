"use strict";
function View(){
    var tricksShown =false,
        challengesShown =false,
        endShown=false,
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
            document.getElementById("popup1").style.display = "none";
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
        window.history.back();
        document.getElementById("popup2").style.display= "none";
    };

}