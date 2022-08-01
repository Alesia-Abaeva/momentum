
const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next ')
let randomNum
let imgBg

const buildImageSource = (times, number) => `https://raw.githubusercontent.com/Alesia-Abaeva/stage1-tasks/assets/images/${times}/${number}.jpg`// генерит строку (ссылку) на изображение

const getRandomNum = (min, max) => Math.floor(Math.random()*(max - min + 1)+min) // получаем рандомное число в промежутке

function setBg(){
    randomNum = (getRandomNum(1,20)).toString().padStart(2,0)
    // timeOfDay = showGreeting()
    showImg(timeOfDay, randomNum)
    // return randomNum
}// присваивает верное время дня изображению и геренирует число в диапазоне от 1-20 - вызывет с ним функцию генерирующая изображение

setBg()




function showImg(timeD, numberBg){
    const img = new Image();
    img.src = buildImageSource(timeD, numberBg)

    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${img.src}')`
    })
  
}//генерим ссылку на изображение и что-то делаем с загрузкой







slidePrev.addEventListener('click', () => {
    changeSlide('prev')
})

slideNext.addEventListener('click', () => {
    changeSlide('next')
})

// let count = Number(randomNum)

function changeSlide(direction){

    if(direction === 'next'){
        randomNum++
        console.log(randomNum, 'randomNum')
        // changeSlide(randomNum )
                
        if(randomNum  > 20){
            randomNum  = 1
         }
        

    }else if (direction === 'prev'){
            randomNum--
            if(randomNum  <= 0){
                randomNum  = 20   
            } 
         }

    randomNum = randomNum.toString().padStart(2,0)  
    console.log(timeOfDay)
    showImg(timeOfDay, randomNum)

    // document.body.style.backgroundImage =  ('url("' + (buildImageSource(timeOfDay, randomNum)) + '")')

}

