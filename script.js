"use strict"

const windData = document.querySelector('.wind-data');
const humidityData = document.querySelector('.humidity-data');
const rainData = document.querySelector('.rain-data');
const temp = document.querySelector('.temperature');
const description = document.querySelector('.description');
const searchText = document.getElementById('input-location');
const unitChangeBtn = document.querySelector('.temp-btn');
const errMsg = document.querySelector('.err-msg');
const weatherImage = document.querySelector('.w-icon');


const listOfIconsCodes = [804,200,202,230,233,500,511,521,522,523,610,611,621,622,623,700,800,802,803];


// ------------------functions--------------------//

function f2c(f){
    const celc = (f - 32) * (5/9);
    return celc
 }
 
 function c2f(c){
     const faren = c*(9/5) + 32;
     return faren
 }   


// const apiLink = `https://api.openweathermap.org/data/2.5/weather?q=bhopal&APPID=903507f17d707fecd352d38301efba77&units=imperial`

searchText.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        const request = fetch(`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&APPID=903507f17d707fecd352d38301efba77&units=imperial`)
        .then(response=>{return response.json()})
        .then(result=>{
            if(result.cod !== "404"){  
                errMsg.classList.add('hidden'); 
                console.log(result);
                windData.textContent = result.wind.speed + ' Km/h';
                humidityData.textContent = result.main.humidity + '%';
                rainData.textContent = result.clouds.all + '%';
                temp.firstChild.result = Math.round(result.main.temp.toFixed(1));

                weatherImage.setAttribute('src','');
                description.textContent = '';
                if (listOfIconsCodes.includes(result.weather[0].id)){
                    console.log(listOfIconsCodes.includes(result.weather[0].id));
                    weatherImage.setAttribute('src',`./assets/${result.weather[0].id}.svg`)
                    // weatherImage.src = `./assets/${result.weather[0].id}.svg`;
                }else{
                    description.textContent = result.weather[0].description;
                }
            }
        });
    }
})

unitChangeBtn.addEventListener('click',()=>{
    if(unitChangeBtn.innerText==='°C'){
        temp.firstChild.data = Math.round((Number(c2f(temp.firstChild.data))).toFixed(1));
        unitChangeBtn.innerText = '°F';
    }else{
        f2c(temp.firstChild.data)
        temp.firstChild.data = Math.round((Number(f2c(temp.firstChild.data))).toFixed(1));
        unitChangeBtn.innerText = '°C';
    }

})

searchText.addEventListener('click',()=>{
    errMsg.classList.add('hidden');
})










