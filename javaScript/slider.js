const sliderVariants = {
    default: 'default',
    unsplash: 'unsplash',
    flickr: 'flickr'
}

let currentBackgroundTags = timeOfDay;


let currentBackgroundVariant = sliderVariants.default

const changeBackgroundVariant = async (variant, tag = timeOfDay) => {
    currentBackgroundVariant = variant
    currentBackgroundTags = timeOfDay;


    // перебираем ключи вариантов бекграундов
    Object.values(sliderVariants).forEach((settingVariant) => {
        // на каждый ключ находим ноду
        const backgroundSettingNode = document.getElementById(`${settingVariant}-background-checkbox`)
        const tagInput = document.getElementById(`${settingVariant}-tags`)


        // если вариант совпадает с тем, который был нажат на переключателе, то устаналиваем checked
        if (variant === settingVariant) {
            tagInput.readOnly = false
            // tagInput.style.color = 'red'
            return backgroundSettingNode.checked = true

        }

        // все остальные выключаем
        tagInput.readOnly = true
        tagInput.value = ''

        return backgroundSettingNode.checked = false
    })

    await showImg({ timeD: tag, numberBg: randomNum, variant })
}

const slidePrev = document.querySelector('.slide-prev')
const slideNext = document.querySelector('.slide-next ')
let randomNum
let imgBg

const buildImageSource = (times, number) => `https://raw.githubusercontent.com/Alesia-Abaeva/stage1-tasks/assets/images/${times}/${number}.jpg`// генерит строку (ссылку) на изображение

const getRandomNum = (min, max) => Math.floor(Math.random()*(max - min + 1)+min) // получаем рандомное число в промежутке

function setBg(){
    randomNum = (getRandomNum(1,20)).toString().padStart(2,0)
    showImg({ timeD: timeOfDay, numberBg: randomNum })
}// присваивает верное время дня изображению и геренирует число в диапазоне от 1-20 - вызывет с ним функцию генерирующая изображение

setBg()



async function showImg({ timeD, numberBg, variant = sliderVariants.default }){
    const img = new Image();

    switch (variant) {
        case sliderVariants.default: 
            img.src = buildImageSource(timeOfDay, numberBg)
            break;
        case sliderVariants.unsplash: 
            img.src = await getUnsplashImage(timeD)
            break;
        case sliderVariants.flickr: 
            img.src = await getFlickrImage(timeD)
            break;
        default: 
            img.src = buildImageSource(timeD, numberBg)
    }


    img.addEventListener('load', () => {
        document.body.style.backgroundImage = `url('${img.src}')`
        document.body.style.backgroundSize = '100% 100%'
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
    showImg({ timeD: currentBackgroundTags, numberBg: randomNum, variant: currentBackgroundVariant })

}


async function changeBackroundTag(event){
    if (event.code == 'Enter') {
        currentBackgroundTags = event.target.value
        await showImg({ timeD: currentBackgroundTags, variant: currentBackgroundVariant })
  
    }
}
