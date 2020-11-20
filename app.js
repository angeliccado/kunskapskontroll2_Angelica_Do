// Selecta knapp och input för att användaren ska kunna ange stad
let button = document.querySelector('.submit-btn');
let inputValue = document.querySelector('.input-value');

// Hämta användarens stad när vi klickar på knappen
// Skicka request till API för att hämta data 
// Gör om data till json  
button.addEventListener('click', function(){
 removeImg(); // tar bort regnbågens bilden


    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputValue.value+'&appid=8ffaae2494b76fe1e0918e1d30509e76')
    .then(
    function(response){
        return response.json();
    }

// Ändrar elementen dynamiskt genom datan vi hämtar från API 
    ).then(function(data){
        let cityName = document.querySelector('.city'); 
        cityName.innerText = data.name;

        let desc = document.querySelector('.desc');
        desc.innerText = data.weather[0].description;

        let temp = document.querySelector('.temperature');
//kunde inte få till unit=metric, så löste med uträkning istället till Celsius
        temp.innerHTML = `${Math.round(data.main.temp - 273.15) }<span>°C</span>`;
        let background = document.querySelector('.weather-background');

// Condition för när bakgrundfärg ska ändras 
        if ((data.main.temp - 273.15) > 15 ){
            background.style.backgroundColor = "#E3646F";
        };

        let humidity = document.querySelector('.humidity'); 
        humidity.innerHTML = `<span>Luftfuktighet:</span> ${data.main.humidity} <span> % </span>`;

        let wind = document.querySelector('.wind');
        wind.innerHTML = `<span>Vindhastighet: </span> ${data.wind.speed} <span> m/s </span>`;

// Select div, och lägger in ikonen till webbsidan 
        let iconImg = document.querySelector('.iconImg');
        iconImg.innerHTML = `<img src= http://openweathermap.org/img/wn/${data.weather[0].icon}.png>`;
    
//Felkod om användarens input inte är en stad
    }).catch(function(error) {
        alert("Wopsie! Det du sökte på är ingen stad. Kolla stavningen och försök igen! ");
    })
});

function removeImg(){
let img = document.querySelector('.rainbow');
img.remove();

};

