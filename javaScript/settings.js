const containers = {
    weather: 'weather',
    todo: 'todo',
    player: 'player',
    time: 'time',
    greeting: 'greeting',
    quote: 'quote',
}

const containerNodeMap = {
    [containers.weather]: '.weather',
    [containers.todo]: ['.todo-list', '.flex-wrapper'],
    [containers.player]: '.player',
    [containers.time]: ['.time', '.date'],
    [containers.greeting]: '.greeting-container',
    [containers.quote]: '.quote-container',

}

// массив ключей параметров в локал сторедж для их начальной установки
Object.values(containers).forEach((key) => {
    const hidden = JSON.parse(localStorage.getItem(key))
    if (hidden) {
        const selector = containerNodeMap[key];

        if (Array.isArray(selector)) {
            selector.forEach((elem) => {
                node = document.querySelector(elem)
                node.classList.add('hide-options')
            })
        } else {
            node = document.querySelector(selector)
            node.classList.add('hide-options');
        }

        const param = document.getElementById(`${key}-checkbox`);
        param.removeAttribute('checked')
    }
})

const buttonSettings = document.querySelector('.button-setting')
const setWrap = document.querySelector('.settinds-wrapper')



buttonSettings.addEventListener('click', function(){
    console.log('ppisa')
    setWrap.classList.toggle('active-set');
   
}) // open settings on click by button


function hideOptions(containerName){
    const selector = containerNodeMap[containerName];
    let node

    if (Array.isArray(selector)) {
        selector.forEach((elem) => {
            node = document.querySelector(elem)
            node.classList.toggle('hide-options')
        })
    } else {
        node = document.querySelector(selector)
        node.classList.toggle('hide-options');
    }



    if(!node.classList.contains('hide-options')){
        setLocalStorage(false, containerName)
        } else setLocalStorage(true, containerName)
   
}

// hide-options
function setLocalStorage(value, key) {
    localStorage.setItem(key,  JSON.stringify(value));
}

