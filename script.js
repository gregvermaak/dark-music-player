const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prev');
const playBtn = document.getElementById('play');
const nextBtn = document.getElementById('next');

// Music
const song = [
	{
		name: 'camoufly - loving u (Drvmmer Remix)',
		displayName: 'loving u (Drvmmer Remix)',
		artist: 'camoufly',
	},
	{
		name: 'Drvmmer - Melody',
		displayName: 'Melody',
		artist: 'Drvmmer',
	},
	{
		name: 'Jack U - Mind (feat. Kai) [Drvmmer Remix]',
		displayName: 'Mind (feat. Kai) [Drvmmer Remix]',
		artist: 'Jack Ü',
	},
	{
		name: "We're Not Alone (Beatcore Remix)",
		displayName: "We're Not Alone (Beatcore Remix)",
		artist: 'Virtual Riot',
	},
];

// Check if playing
let isPlaying = false;

// Play
function playSong() {
	isPlaying = true;
	playBtn.classList.replace('fa-play', 'fa-pause');
	playBtn.setAttribute('title', 'Pause');
	music.play();
}

// Pause
function pauseSong() {
	isPlaying = false;
	playBtn.classList.replace('fa-pause', 'fa-play');
	playBtn.setAttribute('title', 'Play');
	music.pause();
}

// Play or pause event listener
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
	title.textContent = song.displayName;
	artist.textContent = song.artist;
	music.src = `music/${song.name}.mp3`;
	image.src = `img/${song.name}.jpeg`;
}

// Current song
let songIndex = 0;

// Previous song
function prevSong() {
	songIndex--;
	if (songIndex < 0) {
		songIndex = song.length - 1;
	}
	loadSong(song[songIndex]);
	playSong();
}

// Next song
function nextSong() {
	songIndex++;
	if (songIndex > song.length - 1) {
		songIndex = 0;
	}
	loadSong(song[songIndex]);
	playSong();
}

// On load - select first song
loadSong(song[songIndex]);

// Update progress bar & time
function updateProgressBar(e) {
	if (isPlaying) {
		const { duration, currentTime } = e.srcElement;
		// Update progress bar width
		const progressPercent = (currentTime / duration) * 100;
		progress.style.width = `${progressPercent}%`;
		// Calculate display for duration
		const durationMinutes = Math.floor(duration / 60);
		let durationSeconds = Math.floor(duration % 60);
		if (durationSeconds < 10) {
			durationSeconds = `0${durationSeconds}`;
		}
		// Dlay switching duration element to avoid NaN
		if (durationSeconds) {
			durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
		}
		// Calculate display for current
		const currentMinutes = Math.floor(currentTime / 60);
		let currentSeconds = Math.floor(currentTime % 60);
		if (currentSeconds < 10) {
			currentSeconds = `0${currentSeconds}`;
		}
		currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
	}
}

// Set progress bar
function setProgressBar(e) {
	const width = this.clientWidth;
	const clickX = e.offsetX;
	const { duration } = music;
	music.currentTime = (clickX / width) * duration;
}

// Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);
