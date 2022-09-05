var key = "896885b9e2ac420488d202351222908";
var baseURL = "http://api.weatherapi.com/v1/";

function getCurrentDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const fullDate = `${year}-${month}-${day}`;
  return fullDate;
}

function getCurrentWeather(location, forecastRange) {

  // this if for getting and looping through the local data.json

  $.get(
    `${baseURL}forecast.json?key=${key}&q=${location}&days=${forecastRange + 1}&aqi=no&alerts=no`,
    (data) => {
      populateCurrentData(data, forecastRange);
      // then foor loop to generate future day cards?
    }
  ).fail(function (e) {
    alert("Can't get weather right now.");
  });
}

function populateCurrentData(data, forecastRange) {
  console.log(data);
  $(".weatherDisplayArea").css("display", "block");

  $("#area").text(`${data.location.name},`);
  $("#region").text(data.location.region);
  $("#time").text(data.location.localtime);

  $("#tempF").text(`${data.current.temp_f}F`);
  $("#tempC").text(`${data.current.temp_c}C`);
  $("#condition").text(data.current.condition.text);
  $("#weatherIcon").attr("src", data.current.condition.icon);

  $("#windMPH").text(`Wind: ${data.current.wind_mph} MPH`);
  $("#windKPH").text(`${data.current.wind_kph} KPH`);
  $("#windDeg").text(`${data.current.wind_degree} Deg`);
  $("#windDir").text(data.current.wind_dir);
  $("#precipIN").text(`Precipitation: ${data.current.precip_in} in`);
  $("#humidity").text(`Humidity: ${data.current.humidity}%`);
  $("#cloudCoverage").text(`Coverage: ${data.current.cloud}%`);
  $("#feelsF").text(`Feels like: ${data.current.feelslike_f}F`);
  $("#feelsC").text(`${data.current.feelslike_c}C`);
  $("#UV").text(`UV index: ${data.current.uv}`);
  $("#gustMPH").text(`Wind gust: ${data.current.gust_mph} MPH`);
  $("#gustKPH").text(`${data.current.gust_kph} KPH`);

  $("#sunrise").text(`Sunrise: ${data.forecast.forecastday[0].astro.sunrise}`);
  $("#sunset").text(`Sunset: ${data.forecast.forecastday[0].astro.sunset}`);
  $("#moonrise").text(
    `Moonrise: ${data.forecast.forecastday[0].astro.moonrise}`
  );
  $("#moonset").text(`Moonset: ${data.forecast.forecastday[0].astro.moonset}`);
  $("#moonphase").text(
    `Moon phase: ${data.forecast.forecastday[0].astro.moon_phase}`
  );
  $("#moonIllu").text(
    `Illumination: ${data.forecast.forecastday[0].astro.moon_illumination}%`
  );

  $("#maxF").text(`High: ${data.forecast.forecastday[0].day.maxtemp_f}F`);
  $("#maxC").text(`${data.forecast.forecastday[0].day.maxtemp_c}C`);
  $("#minF").text(`Low: ${data.forecast.forecastday[0].day.mintemp_f}F`);
  $("#minC").text(`${data.forecast.forecastday[0].day.mintemp_c}C`);
  $("#maxWindMPH").text(
    `Max wind: ${data.forecast.forecastday[0].day.maxwind_mph} MPH`
  );
  $("#maxWindKPH").text(`${data.forecast.forecastday[0].day.maxwind_kph} KPH`);
  $("#totalPrecip").text(
    `Total percip.: ${data.forecast.forecastday[0].day.totalprecip_in} in`
  );
  $("#avgHumidity").text(
    `Average humidity: ${data.forecast.forecastday[0].day.avghumidity}%`
  );
  $("#rainChance").text(
    `Chance of rain: ${data.forecast.forecastday[0].day.daily_chance_of_rain}%`
  );
  $("#overallUV").text(`Overall UV: ${data.forecast.forecastday[0].day.uv}`);

  populateFutureData(data, forecastRange);
}

function populateFutureData(data, forecastRange) {
    $("#futureDays").html("");

  for (let i = 1; i <= forecastRange; i++) {
    console.log(i);
    $("#futureDays").append(
      `<div class="weatherPanel">
            <div class="header">
              <div class="areaName">
                <p id="area">${data.location.name},</p>
                <p id="region">${data.location.region}</p>
              </div>
              <p id="time">${data.forecast.forecastday[i].date}</p>
            </div>
    
            <div class="currentStatus">
              <div class="tempConditionArea">
                <div class="tempArea">
                  <p id="tempF">${data.forecast.forecastday[i].day.avgtemp_f}F</p>
                  <p id="tempC">${data.forecast.forecastday[i].day.avgtemp_c}C</p>
                </div>
                <p id="condition">${data.forecast.forecastday[i].day.condition.text}</p>
              </div>
              <p><img id="weatherIcon" src="${data.forecast.forecastday[i].day.condition.icon}" alt="weather icon" /></p>
            </div>
    
            <div class="otherStats">
              <div class="windStats">
                <div class="windSpeed">
                  <p id="windMPH">Wind: ${data.forecast.forecastday[i].day.maxwind_mph} MPH</p>
                  <p id="windKPH">${data.forecast.forecastday[i].day.maxwind_kph} KPH</p>
                </div>
              </div>
              <div class="rainStats">
                <p id="precipIN">Precipitation: ${data.forecast.forecastday[i].day.totalprecip_in} in</p>
                <p id="humidity">Humidity: ${data.forecast.forecastday[i].day.avghumidity}%</p>
              </div>
            </div>
    
            <div class="astroStats">
              <div class="sunStats">
                <p id="sunrise">Sunrise: ${data.forecast.forecastday[i].astro.sunrise}</p>
                <p id="sunset">Sunset: ${data.forecast.forecastday[i].astro.sunset}</p>
              </div>
              <div class="moonStats">
                <p id="moonrise">Moonrise: ${data.forecast.forecastday[i].astro.moonrise}</p>
                <p id="moonset">Moonset: ${data.forecast.forecastday[i].astro.moonset}</p>
              </div>
              <div class="moonInfo">
                <p id="moonphase">Moon phase: ${data.forecast.forecastday[i].astro.moon_phase}</p>
                <p id="moonIllu">Illumination: ${data.forecast.forecastday[i].astro.moon_illumination}%</p>
              </div>
            </div>
    
            <div class="futureStats">
              <div class="futureTemp">
                <div class="maxTemps">
                  <p id="maxF">High: ${data.forecast.forecastday[i].day.maxtemp_f}F</p>
                  <p id="maxC">${data.forecast.forecastday[i].day.maxtemp_c}C</p>
                </div>
                <div class="minTemps">
                  <p id="minF">Low: ${data.forecast.forecastday[i].day.mintemp_f}F</p>
                  <p id="minC">${data.forecast.forecastday[i].day.mintemp_c}C</p>
                </div>
              </div>
              <div class="futureWindStats">
                <p id="maxWindMPH">Max wind: ${data.forecast.forecastday[i].day.maxwind_mph} MPH</p>
                <p id="maxWindKPH">${data.forecast.forecastday[i].day.maxwind_kph} KPH</p>
              </div>
              <div class="futureRainStats">
                <p id="totalPrecip">Total percip.: ${data.forecast.forecastday[i].day.totalprecip_in} in</p>
                <p id="avgHumidity">Average humidity: ${data.forecast.forecastday[i].day.avghumidity}%</p>
                <p id="rainChance">Chance of rain: ${data.forecast.forecastday[i].day.daily_chance_of_rain}%</p>
              </div>
              <p id="overallUV">Overall UV: ${data.forecast.forecastday[i].day.uv}</p>
            </div>
          </div>`
    );
  }
}

export { getCurrentWeather };
