var key="896885b9e2ac420488d202351222908"; 
var baseURL="http://api.weatherapi.com/v1/";

function getCurrentDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const fullDate = `${year}-${month}-${day}`;
    console.log(fullDate);
    return fullDate;
}

function getForcastRange() {
    const range = 3; // get from input and limit to 1 - 10.

    return range;
}

function getCurrentWeather(location) {
    const forcastRange = getForcastRange();

    // this if for getting and looping through the local data.json

    $.get(`${baseURL}forecast.json?key=${key}&q=${location}&days=${forcastRange}&aqi=no&alerts=no`, (data) => {
        console.log(data);
    }).fail(function(e) {
        alert("Can't get weather right now.");
    })
}

function utility(name) {
    return name + " hello";
}

export { getCurrentWeather };