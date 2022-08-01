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


function call (){
    showTime()
    showDate()
    showGreeting()
}

call()

function showTime() {
    dateNow = new Date();
    const currentTime = dateNow.toLocaleTimeString();
    time.textContent = currentTime;
}


function showDate(){
    const options = {weekday: 'long', month: 'long', day: 'numeric'};
    const currentDate = dateNow.toLocaleDateString('en-US', options);
    date.textContent = currentDate
}


function showGreeting(){
    const hours = dateNow.getHours()
      
    for(let key in greeting){
        if((greeting[key].includes(hours))){
            timeOfDay = key}
    }
    // console.log(timeOfDay, 'in time')

    const greetingText = `Good ${timeOfDay}`;
    greetContain.textContent = greetingText
    return timeOfDay

}




setInterval(call,  1000);

// console.log( timeOfDay, 'timeOfDay')











