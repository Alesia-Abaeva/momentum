const name = document.querySelector('.name')

function setLocalStorageName() {
    localStorage.setItem('name', name.value);
  }
window.addEventListener('beforeunload', setLocalStorageName)


function getLocalStorage() {
    if(localStorage.getItem('name')) {
      name.value = localStorage.getItem('name');
    }
  }
  window.addEventListener('load', getLocalStorage)