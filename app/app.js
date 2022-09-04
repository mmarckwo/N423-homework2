import * as MODEL from "./model.js";

function initListeners() {
    $("#gw").click((e) => {
        const location = $("#gwInput").val();
        if(location != "") {
            getWeather(location);
        } else {
            alert("You need to put in a location first.");
        }
    });
}

function getWeather(location) {
    MODEL.getCurrentWeather(location);
    $("#gwInput").val("");
}

$(document).ready(function () {
    initListeners();
});