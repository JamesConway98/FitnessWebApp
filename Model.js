"use strict";
function Model() {


    this.map = function () {

    };
    this.setImage=function (number){
        if(number ===0){
            document.getElementById("water").style.display="block";

        }else if(number === 1){
            document.getElementById("aplle").style.display="block";
        }else if(number ===2){
            document.getElementById("walk").style.display="block";
        }else{
            document.getElementById("greentea").style.display="block";
        }
    };

}