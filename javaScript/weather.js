// API key 
// https://api.openweathermap.org/data/2.5/weather?q=Minsk&lang=en&appid=4c102c5162c2e589741c6254f364ed59&units=metric

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const airHumiditys = document.querySelector('.humidity');
const windS = document.querySelector('.wind');
const city = document.querySelector('.city')


if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city')
  
  } else city.value = 'Minsk'


city.addEventListener('change', getWeather)

async function getWeather (language = 'english'){
    
  let langWeather 

    switch(language){
      case 'english' : 
        langWeather = 'en';
        break;
      case 'russian' :
        langWeather = 'ru';
        break;
    }

    const weatherTranslations = {
      en: {
        speed: 'Speed',
        humidity: 'Humidity',
        speedCount: 'm/s'
      },
      ru: {
        speed: 'Скорость',
        humidity: 'Влажность',
        speedCount: 'м/с'
      }
    }

    try{    
        const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${langWeather}&appid=4c102c5162c2e589741c6254f364ed59&units=metric`
        const response = await fetch(url)
        const data = await response.json()
    
        const {weather, main, wind} = data
        const {id, description} = weather[0]
        const {temp, humidity} = main
        const {speed} = wind
    
        // console.log(description)
        weatherIcon.classList.add(`owf-${id}`)
        temperature.textContent = `${temp}°C`
        weatherDescription.textContent = description
        airHumiditys.textContent = `${weatherTranslations[langWeather].humidity}: ${humidity}%`
        windS.textContent = `${weatherTranslations[langWeather].speed}: ${speed} ${weatherTranslations[langWeather].speedCount}`
        // console.log(url)

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
