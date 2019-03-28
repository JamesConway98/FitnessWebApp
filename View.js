"use strict";
function View(){
    var tricksShown =false,
        challengesShown =false,
        openNav = false,
        endShown=false,
        accchall=false,//accepted challenges = accchall
        walking=true, // booleans to decide if a challenge is already accepted or not
        running =true,
        exercise = true,
        sugar =true,
        loginShown = false,
        model =  new Model(),
        score=0,
        listOfCheckboxes=[],
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
            document.getElementById("t1").innerText = "Drink 2 Liters of water per day";
            document.getElementById("t2").innerText="to keep your body hydrated and fresh!";


        }else if(number === 1){
            document.getElementById("apple").style.display="block";
            document.getElementById("walk").style.display="none";
            document.getElementById("greentea").style.display="none";
            document.getElementById("water").style.display="none";
            document.getElementById("t1").innerText = "have your 5-a-day!";
            document.getElementById("t2").innerText="Eating fruit supplies the vitamins needed ";

        }else if(number ===2){
            document.getElementById("walk").style.display="block";
            document.getElementById("greentea").style.display="none";
            document.getElementById("water").style.display="none";
            document.getElementById("apple").style.display="none";
            document.getElementById("t1").innerText="Go for a walk!";
            document.getElementById("t2").innerText = "Walking keeps you fit & is environmentally friendly too!";
        }else{
            document.getElementById("greentea").style.display="block";
            document.getElementById("water").style.display="none";
            document.getElementById("apple").style.display="none";
            document.getElementById("walk").style.display="none";
            document.getElementById("t1").innerText = "Green tea is full of antioxidants";
            document.getElementById("t2").innerText="that prevents the formation of cancer!";
        }
    };

    this.showChallengeContent = function (num) {
        if(num==0 && walking){
            walking=false;
            score=10;
            document.getElementById("ch1").innerText="WALKING CHALLENGE";
            document.getElementById("ch2").innerText="Go for a 20 min walk everyday for the next 3 days!";
            document.getElementById("ch3").innerText="Helps reducing the stress and frees your mind.";
            document.getElementById("ch4").innerText="(Score: 10)";
        } else if(num==1 && sugar){
            sugar=false;
            score=40;
            document.getElementById("ch1").innerText="SUGAR FREE";
            document.getElementById("ch2").innerText="Can you go without any sugar for 3 day ?";
            document.getElementById("ch3").innerText="naturally-occurring sugar (in fruit) is okay but try to avoid goods with added sugar.";
            document.getElementById("ch4").innerText="(Score: 40)";
        }else if(num==2 && exercise){
            exercise =false;
            score=25;
            document.getElementById("ch1").innerText="EXERCISE ";
            document.getElementById("ch2").innerText="Do 15 min worth intensive exercise for a week!";
            document.getElementById("ch3").innerText="Whether it is running, swimming or gym classes is up to you.";
            document.getElementById("ch4").innerText="(Score: 25)";
        } else if(num==3 && running){
            running=false;
            score=30;
            document.getElementById("ch1").innerText="RUNNING CHALLENGE ";
            document.getElementById("ch2").innerText="Go for a 20 min run for the next 5days!";
            document.getElementById("ch3").innerText="Running strengthens your heart.";
            document.getElementById("ch4").innerText="(Score: 30)";
        } else {

            }
    };

    this.acceptChallenge = function (number) {
        var table=document.getElementById("table"),
            row = table.insertRow(1),
            go=true,
            acceptedchallenges=[],
            chb = document.createElement("INPUT"),
            column1 = row.insertCell(0),
            column2 = row.insertCell(1);
        for(var x=0;x<acceptedchallenges.length;x++){
            if(acceptedchallenges[x]===number){
                window.alert("You are already doing this challenge.")
                go =false;
            };
        }
        if(go){
            acceptedchallenges.push(number);
            column1.innerText = document.getElementById("ch1").textContent;
            chb.setAttribute("type","checkbox");
            chb.setAttribute("id","checkbox"+number.toString());
            chb.setAttribute("width","30px");
            chb.setAttribute("height","30px");
            row.setAttribute("id",number.toString());
            column2.appendChild(chb);
            listOfCheckboxes.push(chb);
            acceptedchallenges.push(number);
            model.addScore(score);
        }




    };

    this.deleteTickedChallenges = function () {
        for(var i=0;i<listOfCheckboxes.length;i++){
            if(listOfCheckboxes[i].checked){
                var elementId = listOfCheckboxes[i].id;
                var pos =  elementId.charAt(8);
                var elem = document.getElementById(pos);
                 elem.parentNode.removeChild(elem);
            }
        }
         if(pos===0){
             walking=true;
         }else if(pos===1){
             sugar=true;
         }else if(pos===2){
             exercise=true;
         }else{
             running=true;
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
    this.showPopupForAcceptedChallenges =function () {
        if(accchall){
            document.getElementById("acceptedChallenges").style.display="none";
            accchall=false;
        }else{
            document.getElementById("acceptedChallenges").style.display="block";
            history.pushState(null,null,"#trick");
            accchall=false;
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
        });

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
        if(localStorage.getItem("totalDaysWalked") == null){
            document.getElementById("totalScore").innerHTML = "Your Total Score 0" +
                " <br>Your Total Days Walked 0";
        }else {
            document.getElementById("totalScore").innerHTML = "Your Total Score " + localStorage.getItem("totalScore") +
                " <br>Your Total Days Walked " + localStorage.getItem("totalDaysWalked");
        }
    };

    this.getAccchall = function () {
        return accchall;
    };

    this.setAccchall = function (boolean) {
        accchall=boolean;
    }

}