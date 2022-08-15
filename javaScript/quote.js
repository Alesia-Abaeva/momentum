

const quotesAuthor = document.querySelector('.author');
const quotesQ = document.querySelector('.quote');


async function getQuotes(language = 'english') {  
    const quotes = `javaScript/json/data-${language}.json`;
    const res = await fetch(quotes);
    const data = await res.json(); 
    let rundomNumQuotes = getRandomNum(0, 14)   
    let arrQuotesNumber = data[rundomNumQuotes]
    let {text, author} = arrQuotesNumber
    quotesAuthor.textContent = author;
    quotesQ.textContent = text
  }
  const prevLanguage = JSON.parse(localStorage.getItem('language'))

getQuotes(prevLanguage);

// 1. вывести на экран блок с цитатами
// получить переменные джейсона
// 2. рандомно при загрузке страницы от 1 - до 15 вывести цитату
// 3. при нажатии кнопки цитата обновляется 