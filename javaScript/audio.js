
const playList = [
    {      
      title: 'The Blaze - Queens',
      src: '/assets/sounds/audioFile/The Blaze - Queens.mp3',
      duration: '03:54'
    },  {      
      title: 'Black - Wonderful Life',
      src: '/assets/sounds/audioFile/Black - Wonderful Life.mp3',
      duration: '04:49'
    },
    {      
      title: 'Kate Bush - Running Up That Hill',
      src: '/assets/sounds/audioFile/Kate Bush - Running Up That Hill.mp3',
      duration: '04:58'
    },
    {      
      title: 'Nina Kraviz - Skyscrapers',
      src: '/assets/sounds/audioFile/Nina Kraviz - Skyscrapers.mp3',
      duration: '05:03'
    }
  ]



const player = document.querySelector('.player'),
      playBtn = document.querySelector('.play'),
      prevBtn = document.querySelector('.play-prev'),
      nextBtn = document.querySelector('.play-next'),
      audio = document.querySelector('.audio'),
      playIcon = document.querySelector('.play'),
    //   title = document.querySelectorAll('.title'),
      songTitle = document.querySelector('.song-title'),
      progressContainer = document.querySelector('.progress__container'),
      progressSong= document.querySelector('.progress'),
      songDurations= document.querySelector('.song-endTime'),
      songCurrentTime= document.querySelector('.song-currentTime')

// Song Index
let songIndex = 0


//  Load song
function loadSong (song){
    let {title, src, duration} = playList[songIndex]
    songTitle.innerHTML = title
    songDurations.innerHTML = duration
    audio.src = src
}

loadSong(playList[songIndex])

// Play and pause song
function playSong(){
    playBtn.classList.add('pause')
    audio.play()

}

function pauseSong(){
    playBtn.classList.remove('pause')
    audio.pause()
}

playBtn.addEventListener('click', () =>{
    const isPlay = playBtn.classList.contains('pause')
    if(isPlay){
        pauseSong()
        
    } else {
        playSong()
        changePlayList(songIndex)

        
    }
})




// Play song on click
prevBtn.addEventListener('click', () => {
  changeSong('prev')
  // playToPause(songIndex)

})

nextBtn.addEventListener('click', () => {
  changeSong('next')
  // playToPause(songIndex)
})

function changeSong(destination){
  if(destination === 'next' ){
     songIndex++
     
      if(songIndex == playList.length){
         songIndex = 0}}
         else if(destination === 'prev'){
          
                songIndex--
                  if(songIndex < 0){
                  songIndex = playList.length-1
                }
              }
  loadSong(playList[songIndex])
  changePlayList(songIndex)

  // playSong()
  // audio.play()
}

// Format tinme
function formatTime(seconds) {
  minutes = Math.floor(seconds / 60);
  minutes = minutes >= 10 ? minutes : "0" + minutes;
  seconds = Math.floor(seconds % 60);
  seconds = seconds >= 10 ? seconds : "0" + seconds;
  return minutes + ":" + seconds;
}

// Progress Bar
function updateProgress(event){
  const {duration, currentTime} = event.srcElement;
  songCurrentTime.innerHTML = formatTime(currentTime)
  const prigressPercent = (currentTime / duration) * 100
  progressSong.style.width = `${prigressPercent}%`
}
audio.addEventListener('timeupdate', updateProgress)


// set progress
function setProgress(event){
  const widthProgress = this.clientWidth 
  const widthClickX = event.offsetX
  const durationF = audio.duration
  audio.currentTime = (widthClickX / widthProgress) * durationF 
}

progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended', ()=> changeSong('next'))


// play list
var itemList = document.getElementsByClassName("play-item");


function changePlayList(n){
  playListItem(songIndex = n);
  loadSong(playList[songIndex])
  playSong()
}


function playListItem(n){
if(n === (playList.length)){
  songIndex = 0
}else if( n < 0 ) {
  songIndex = playList.length-1
}

for (let i = 0; i < itemList.length; i++) {
  itemList[i].className = itemList[i].className.replace(" item-active", "" );
}
itemList[songIndex].className += " item-active";
}


// volume
const volIcon = document.querySelector('.soundOn'),
      volBox = document.querySelector('.volume-box')


function handleVolume() {
    volIcon.classList.toggle('soundOff')
    // volBox.classList.toggle('active')
}

function toggleMute(){
  var btnMute = document.querySelector('.toggle-mute');
  if (audio.muted == false) {
      audio.muted = true

  }else{
      audio.muted = false
  }
  handleVolume()
}


const range = document.querySelector('.volume-range');

range.onchange = function(){
  audio.volume = this.value/100
  if(audio.volume == 0){
    volIcon.classList.add('soundOff')
  } else volIcon.classList.remove('soundOff')
}
