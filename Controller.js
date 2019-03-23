"use strict";
function Controller() {
    var model = new Model();
    var view = new View();


    this.init = function () {
        model.map();
        view.setundoPopup();

        document.getElementById("tips").onclick = function (){
            view.showPopupForTips();
            model.setImage(Math.floor(Math.random() * (3 - 0 + 1) ) + 0);
        };

        document.getElementById("challenge").onclick =function (){
            view.showPopupForChallenges();
        };



    };
}
var controller = new Controller();
window.addEventListener("load", controller.init);