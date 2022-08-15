

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

