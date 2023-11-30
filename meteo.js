
let key = "YOUR_API_KEY";

const City = document.querySelector(".city");
const Icon = document.querySelector(".icon");
const Desc = document.querySelector(".description");
const Temp = document.querySelector(".temp");
const Humidity = document.querySelector(".humidity");
const Feel = document.querySelector(".feel");

//appel au fichier json
function callJson() {
    const Fjson = "./conf.json";
    fetch(Fjson)
        .then(res => res.json())
        .then(data => dataApi(JSON.stringify(data.name)));
    // .then(data => console.log(data.name));
}

//appel à l'api openweathermap
function dataApi(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.replace(/"/g, "")}&units=metric&appid=${key}&lang=fr`)
        .then((resp) => resp.json())
        // .then((data) => console.log(data))
        .then((data) => displayWeather(data))
        .catch((error) => {
            console.log(error);
        });
};

function displayWeather(dataM) {
    City.innerText = dataM.name; //affichage du nom de la ville
    Icon.src = "https://openweathermap.org/img/wn/" + dataM.weather[0].icon + ".png"; //affichage de l'image du temps actuel
    Desc.innerText = dataM.weather[0].description; //affichage du type de temps
    Temp.innerText = Math.round(dataM.main.temp) + "°C"; //affichage de la température
    Humidity.innerText = "Humidité: " + dataM.main.humidity + "%"; //affichage du taux d'humidité
    Feel.innerText = "Ressenti: " + Math.round(dataM.main.feels_like) + "°C" //affichage de la température ressenti
     
}

//appel de la fonction
callJson();

//reload de la page après 1 heure
setTimeout(() => {
    window.location.reload();
}, 3600000);

