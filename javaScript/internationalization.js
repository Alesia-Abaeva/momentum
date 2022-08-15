const languages = {
    english: 'english',
    russian: 'russian'
}

let currentLanguage = JSON.parse(localStorage.getItem('language')) ?
    JSON.parse(localStorage.getItem('language')) :
    languages.english

// ключ - языки
const translation = {
    // ключи - id dom nodes, значение - их содержимое
    [languages.english]: {
        // morning: 'Goog morning',
        // day: 'Goog afternoon',
        // evening: 'Goog evening',
        // night: 'Goog night',
        
        ['header-set']: 'General',
        ['descr-set']: 'Customize your dashboard',
        ['show-settings-header']: 'SHOW',
        ['weather-set']: 'Weather',
        ['time-set']: 'Clock',
        ['audio-set']: 'Audioplayer',
        ['todo-set']: 'Todo',
        ['quotes']: 'Quotes',
        ['greeet-set']: 'Greeting',

        ['languages-settings-header']: 'LANGUAGE',
        ['en-set']: 'English',
        ['ru-set']: 'Russian',

        ['background-settings-header']: 'BACKGROUND',
        ['def-set']: 'Default',

        ['todo-header-set']: 'Todo'

        
        // ['wind']: 'Ветер',

    },
    [languages.russian]:{
        // morning: 'Доброе утро',
        // day: 'Добрый день',
        // evening: 'Добрый вечер',
        // night: 'Доброй ночи',
        ['header-set']: 'Настройки',
        ['descr-set']: 'Настрой свою панель',
        ['show-settings-header']: 'ВИД',
        ['weather-set']: 'Погода',
        ['time-set']: 'Часы',
        ['audio-set']: 'Аудиоплеер',
        ['todo-set']: 'Задачи',
        ['quotes']: 'Цитаты',
        ['greeet-set']: 'Приветсвие',

        ['languages-settings-header']: 'ЯЗЫК',
        ['en-set']: 'Английский',
        ['ru-set']: 'Русский',
        ['background-settings-header']: 'ФОН',
        ['def-set']: 'По-умолчанию',

        // ['wind']: 'Ветер',

        ['todo-header-set']: 'Задачи'
        


     }
}

// функция для смены языка
const changeLanguage = (language) => {
    // устанавливаем выбранный язык в сторедж
    currentLanguage = language
        setLocalStorage(language, 'language')

        // логика переключения ползунков в настройках
        Object.values(languages).forEach((settingLanguage) => {
            const languageSettingNode = document.getElementById(`${settingLanguage}-language-checkbox`)
    
            if (language === settingLanguage) {
                return languageSettingNode.checked = true
            }
    
            return languageSettingNode.checked = false
        })

        // находим в объекте выбранный язык, делаем entries, перебираем массив ключей (id dom nodes) и значений
        Object.entries(translation[language]).forEach(([key, value]) => {
            // находим ноду
            const node = document.getElementById(key)
            // меняем текст
            node.innerText = value
        })

        getQuotes(language);
        showDate(language);
        getWeather(language);
        showGreeting(language)
}

changeLanguage(currentLanguage)
