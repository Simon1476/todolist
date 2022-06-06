const API_KEY = "572440beb4330e20ff0d9e7d14a4d3f8";

function onGeoOk(position) {

    console.log(position);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherSpan = document.querySelector('.weather');
        const tempSpan = document.querySelector('.temp');
        const locationSpan = document.querySelector('.location');
        
        weatherSpan.innerText = `Weather : ${data.weather[0].main}`;
        tempSpan.innerText = `Temp : ${data.main.temp}`;
        locationSpan.innerText = `Location : ${data.name}`;
        
        
    });
}

function onGeoError() {
    alert("Can't find you. No weather for you.")
}
navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError);