"use strict";
function View(){
    var tricksShown =false,
        challengesShown =false,
        openNav = false,
        endShown=false,
        accchall=false,
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

    this.showChallangeContent = function (num) {
        if(num==0){
            document.getElementById("ch1").innerText="WALKING CHALLENGE";
            document.getElementById("ch2").innerText="Go for a 20 min walk everyday for the next 3 days!";
            document.getElementById("ch3").innerText="Helps reducing the stress and frees your mind";
        } else if(num==1){
            document.getElementById("ch1").innerText="SUGAR FREE";
            document.getElementById("ch2").innerText="Can you go without any sugar for 3 day ?";
            document.getElementById("ch3").innerText="naturally-occurring sugar (in fruit) is okay but try to avoid goods with added sugar.";
        }else if(num==2){
            document.getElementById("ch1").innerText="EXERCISE ";
            document.getElementById("ch2").innerText="Do 15 min worth intensive exercise for a week!";
            document.getElementById("ch3").innerText="Whether it is running, swimming or gym classes is up to you.";
        }
    };

    this.acceptChallenge = function (number) {
        var table=document.getElementById("table"),
            row = table.insertRow(1),
            chb = document.createElement("INPUT"),
            column1 = row.insertCell(0),
            column2 = row.insertCell(1);
        column1.innerText = document.getElementById("ch1").textContent;
        chb.setAttribute("type","checkbox");
        chb.setAttribute("id","checkbox"+number.toString());
        // chb.setAttribute("width","10rem");
        // chb.setAttribute("height","10rem");
        window.alert("accepted the challenge "+ "checkbox"+number.toString())
        column2.appendChild(chb);

    };

    this.setDeleteChallenge = function (number) { //DOES NOT WORK
        var elementName = "checkbox"+number.toString();
        window.alert(elementName.rowIndex.toString());
        document.getElementById(elementName).addEventListener("click",function () {
            var myTable= document.getElementById("table");
            myTable.deleteRow(elementName.rowIndex);
            console.log(elementName.rowIndex);
            window.alert(elementName.rowIndex);
        });
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

}