"use strict";
function Controller() {
    var model = new Model();
    var view = new View();


    this.init = function () {
        model.map();
        view.setundoPopup();

        document.getElementById("tips").onclick = function (){
            view.showPopup();
        }



    };
}
var controller = new Controller();
window.addEventListener("load", controller.init);