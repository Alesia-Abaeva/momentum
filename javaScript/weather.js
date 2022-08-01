// API key 
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=4c102c5162c2e589741c6254f364ed59&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const airHumiditys = document.querySelector('.weather-air');
const windS = document.querySelector('.weather-wind');
const city = document.querySelector('.city')


if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
  
  } else city.value = 'Minsk'


city.addEventListener('change', getWeather)

async function getWeather (){
    try{    
        const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=4c102c5162c2e589741c6254f364ed59&units=metric`
        const response = await fetch(url)
        const data = await response.json()
    
        const {weather, main, wind} = data
        const {id, description} = weather[0]
        const {temp, humidity} = main
        const {speed} = wind
    
        console.log(description)
        weatherIcon.classList.add(`owf-${id}`)
        temperature.textContent = `${temp}°C`
        weatherDescription.textContent = description
        airHumiditys.textContent = `${humidity}%`
        windS.textContent = `${speed} m/s`
        console.log(url)

    } catch (err){
        console.error('errrrrrrrrrrrrr')
        city.value = "ERROR"
    }
}   
getWeather ()




function setLocalStorageWeather() {
    localStorage.setItem('city', city.value);
  }
window.addEventListener('beforeunload', setLocalStorageWeather)
