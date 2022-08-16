// https://unsplash.com/oauth/applications/355038
// Access Key
// 7quauay68Y6bMOjfKele6JuJLCmkBytDFFZlL-MudxY

// https://api.unsplash.com/photos/random?orientation=landscape&query=nature&client_id=7quauay68Y6bMOjfKele6JuJLCmkBytDFFZlL-MudxY

// flickr
// Key:
// 5a09a75928dd091d8fb56df52d009d24
// Secret:
// 0b40eb71df44093d
 
const unsplashApiKey = '7quauay68Y6bMOjfKele6JuJLCmkBytDFFZlL-MudxY'
const flickrApiKey = '5a09a75928dd091d8fb56df52d009d24'

// кеш ранее запрошенных картинок из flickr, ключ - тег, значение - массив фото
let flickCash

const getUnsplashUrl = (apiKey, tag) => `https://api.unsplash.com/photos/random?orientation=landscape&query=${tag}&client_id=${apiKey}`
const getFlickrUrl = (apiKey, tag) => `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&tags=${tag}&extras=url_l&format=json&nojsoncallback=1`


const getUnsplashImage = async (tag = timeOfDay) => {
    const data = await apiCall(getUnsplashUrl(unsplashApiKey, tag))
    return data.urls.regular
}

const getFlickrImage = async (tag = timeOfDay) => {
    // если есть значения массива фото по данному тегу в кеше, то используем из него
    if (flickCash?.[tag]) {
        return flickCash[tag][getRandomNum(0, flickCash[tag].length - 1)]['url_l']
    }

    // если нет значений из кеша, то запрашиваем новое
    const data = await apiCall(getFlickrUrl(flickrApiKey, tag))
    // формируем новое значение кеша
    const newCashData = { [tag]: data.photos.photo }
    // сохраняем в кеш полученные данные
    // если кеш был не пустой, то добавляем к уже имеющимся данным - новые
    // иначе, если был пустой, то новое значение присваиваем кешу
    flickCash = flickCash ? {...flickCash, ...newCashData} : newCashData; 

    const selectedImage = getRandomNum(0, flickCash[tag].length - 1);

    return flickCash[tag][selectedImage]['url_l']
}
