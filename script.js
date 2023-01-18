"use strict"

const windData = document.querySelector('.wind-data');
const humidityData = document.querySelector('.humidity-data');
const rainData = document.querySelector('.rain-data');
const temp = document.querySelector('.temperature');
const description = document.querySelector('.description');
const searchText = document.getElementById('input-location');
const unitChangeBtn = document.querySelector('.temp-btn');
const errMsg = document.querySelector('.err-msg');


const listOfIconsCodes = [200,202,230,233,500,511,521,522,523,610,611,621,622,623,701,800,802,802,803,804];


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

const request = new XMLHttpRequest();
searchText.addEventListener('keypress',(e)=>{
    if(e.key==="Enter"){
        request.open('GET',`https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&APPID=903507f17d707fecd352d38301efba77&units=imperial`);
        request.send();

        request.addEventListener('load',()=>{
            const data = JSON.parse(request.responseText);
            if(data.cod !== "404"){  
                errMsg.classList.add('hidden'); 
                console.log(data);
                windData.textContent = data.wind.speed + ' Km/h';
                humidityData.textContent = data.main.humidity + '%';
                rainData.textContent = data.clouds.all + '%';
                temp.firstChild.data = Math.round(data.main.temp.toFixed(1));

                if (listOfIconsCodes.includes(data.weather[0].id)){
                    const weatherImage = document.querySelector('.w-icon');
                    weatherImage.src = `./practice-assets/weather-icons/${data.weather[0].id}.svg`;
                }else{
                    description.textContent = data.weather[0].description;
                }
                
                console.log(typeof data.weather[0].id)
            }
            else{
                errMsg.classList.remove('hidden');
                console.log('Location Not Found')
            }   
        })

    }
})

console.log(temp.firstChild.data)
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










