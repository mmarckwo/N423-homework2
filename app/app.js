import * as MODEL from "./model.js";

function initListeners() {
    $("#gw").click((e) => {
        const location = $("#gwInput").val();
        const range = $("#forecastRange").val();
        if(location != "") {
            getWeather(location, range);
        } else {
            alert("You need to put in a location first.");
        }
    });
}

function getWeather(location, range) {
    var data = MODEL.getCurrentWeather(location, range);
    $("#gwInput").val("");
}

$(document).ready(function () {
    initListeners();
});