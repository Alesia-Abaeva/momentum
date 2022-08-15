const time = document.querySelector('.time');
const date = document.querySelector('.date');
const greetContain = document.querySelector('.greeting');
let  timeOfDay
let dateNow



const greeting = {
    morning: [6,7,8,9,10,11],
    afternoon: [12,13,14,15,16,17],
    evening: [18,19,20,21,22,23],
    night: [0,1,2,3,4,5]
};

// При переводе, нужно будет так же изменить ссылку на изображение

// const greeting = {
//     'Goog morning': [6,7,8,9,10,11],
//     'Goog afternoon': [12,13,14,15,16,17],
//     'Goog evening': [18,19,20,21,22,23],
//     'Goog night': [0,1,2,3,4,5]
// };

const greetingRu = {
    morning: 'Доброе утро',
    afternoon: 'Добрый день',
    evening: 'Добрый вечер',
    night: 'Доброй ночи'
}


function call (){
    const currentLanguage = JSON.parse(localStorage.getItem('language'))

    showTime()
    showDate(currentLanguage)
    showGreeting(currentLanguage)
}

call()

function showTime() {
    dateNow = new Date();
    const currentTime = dateNow.toLocaleTimeString();
    time.textContent = currentTime;
}


function showDate(language = 'english'){
    let languageTime
    if(language === 'english'){
        languageTime = 'en-US'
    } else if (language === 'russian'){
        languageTime = 'ru-RU'
    }

    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = dateNow.toLocaleDateString(`${languageTime}`, options);
    date.textContent = currentDate
}


// const greetingTranslation = {
//     en:v
//     ru:
// }


function showGreeting(language = 'english'){
    const hours = dateNow.getHours()
    let greetingText
    console.log(language)
      
    for(let key in greeting){
        if((greeting[key].includes(hours))){
            timeOfDay = key}
    }

    if(language === 'russian'){
        greetingText = greetingRu[timeOfDay]
    } else greetingText = `Good ${timeOfDay}`;

    
    greetContain.textContent = greetingText
    return timeOfDay

}




setInterval(call,  1000);

// console.log( timeOfDay, 'timeOfDay')











