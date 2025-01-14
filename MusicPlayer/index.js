let nowPlaying = document.querySelector('.now-playing');
let trackArt = document.querySelector('.track-art');
let trackName = document.querySelector('.track-name');
let trackArtist = document.querySelector('.track-artist');

let playPauseBtn = document.querySelector('.playpause-track');
let nextBtn = document.querySelector('.next-track');
let prevBtn = document.querySelector('.prev-track');

let seekSlider = document.querySelector('.seek_slider');
let volumeSlider = document.querySelector('.volume_slider');
let currTime = document.querySelector('.current-time');
let totalDuration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let currTrack = document.createElement('audio');

let trackIndex = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const musicList = [
    {
        img: 'musicImages/Céline Dion - Ashes.jpg',
        musicName: 'Ashes',
        artist: 'Celine Dion',
        music: 'musicMp3/Celine Dion - Ashes (Lyrics).mp3'

    },
    {
        img: 'musicImages/☘ Black Clover ☘.jpg',
        musicName: 'Black Catcher',
        artist: 'Vickeblanka',
        music: 'musicMp3/Black Clover Opening 10 Fullã__Black Catcherã__by Vickeblanka  Lyrics.mp3'

    },
    {
        img: 'musicImages/billie via instagram!!!.jpg',
        musicName: 'Lovely',
        artist: 'Billie Eilish',
        music: 'musicMp3/Billie Eilish - lovely (Lyrics) ft. Khalid.mp3'

    },
    {
        img: 'musicImages/your name soundtrack cover.jpg',
        musicName: 'Sparkle',
        artist: 'AMV',
        music: 'musicMp3/Your Name - Sparkle (Official MV) (320 kbps).mp3'

    },
    {
        img: 'musicImages/download (1).jpg',
        musicName: 'Sunflower',
        artist: 'Post Malone, Swae Lee',
        music: 'musicMp3/Post Malone, Swae Lee - Sunflower (Lyrics) (Spider-Man Into the Spider-Verse).mp3'

    },
    {
        img: 'musicImages/duskTillDawn.jpg',
        musicName: 'Dusk Till Dawn',
        artist: 'Zayn ft. Sia',
        music: 'musicMp3/Dusk Till Dawn - ZAYN ft. Sia (Lyrics).mp3'

    },
];

loadTrack(trackIndex);

function loadTrack(trackIndex) {
    clearInterval(updateTimer);
    reset();

    currTrack.src = musicList[trackIndex].music;
    currTrack.load();

    trackArt.style.backgroundImage = "url('" + musicList[trackIndex].img + "')";
    trackName.textContent = musicList[trackIndex].musicName;
    trackArtist.textContent = musicList[trackIndex].artist;
    nowPlaying.textContent = "Playing music " + (trackIndex + 1) + " of " + musicList.length;

    updateTimer = setInterval(setUpdate, 1000);

    currTrack.addEventListener ("ended", nextTrack);
    randomBgColor();
}

function randomBgColor () {
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate (a) {
        for (let i = 0; i < 6; i++) {
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let color1 = populate('#');
    let color2 = populate('#');
    var ang = 'to right';

    let gradient = `linear-gradient( ${ang} , ${color1} , ${color2})`;
    document.body.style.background = gradient;
}

function reset() {
    currTime.textContent = "00:00";
    totalDuration.textContent = "00:00";
    seekSlider.value = 0;
}

function randomTrack() {
    isRandom ? pauseRandom() : playRandom();
}

function playRandom () {
    isRandom = true;
    randomIcon.classList.add('randomActive');
}

function pauseRandom() {
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}

function repeatTrack() {
    let currentIndex = trackIndex;
    loadTrack(currentIndex);
    playTrack();
}

function playPauseTrack() {
    isPlaying ? pauseTrack() : playTrack();
}

function playTrack () {
    currTrack.play();
    isPlaying = true;
    trackArt.classList.add('rotate');
    playPauseBtn.innerHTML = '<i class = "fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack () {
    currTrack.pause();
    isPlaying = false;
    trackArt.classList.remove('rotate');
    playPauseBtn.innerHTML = '<i class = "fa fa-play-circle fa-5x"></i>';
}

function nextTrack () {
    if (trackIndex < musicList.length - 1 && isRandom === false) {
        trackIndex += 1;
    }
    else if (trackIndex < musicList.length - 1 && isRandom === true) {
        trackIndex = randomIndex;
    }
    else {
        trackIndex = 0;
    }
    loadTrack (trackIndex);
    playTrack();
}

function prevTrack() {
    if (trackIndex > 0) {
        trackIndex -= 1;
    }
    else {
        trackIndex = musicList.length - 1;
    }
    loadTrack (trackIndex);
    playTrack();
}

function seekTo () {
    let seekTo = currTrack.duration * (seekSlider.value / 100);
    currTrack.currentTime = seekTo;
}

function setVolume() {
    currTrack.volume = volumeSlider.value / 100;
}

function setUpdate () {
    let seekPosition = 0;
    if (!isNaN (currTrack.duration)) {
        seekPosition = currTrack.currentTime * (100 / currTrack.duration);
        seekSlider.value = seekPosition;

        let currentMinutes = Math.floor(currTrack.currentTime / 60);
        let currentSeconds = Math.floor(currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(currTrack.duration / 60);
        let durationSeconds = Math.floor(currTrack.duration - durationMinutes * 60);

        if(currentSeconds < 10) {
            currentSeconds = "0" + currentSeconds;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }
        if (currentMinutes < 10) {
            currentMinutes = "0" + currentMinutes;
        }
        if (durationSeconds < 10) {
            durationSeconds = "0" + durationSeconds;
        }

        currTime.textContent = currentMinutes + ":" + currentSeconds;
        totalDuration.textContent = durationMinutes + ":" + durationSeconds;
    }
}