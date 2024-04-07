<template>
  <div class="music-page">
    <input
      type="text"
      name="text"
      class="input-player"
      placeholder="Paste the most recent comment under its youtube version."
      v-model="userInput"
      @keyup.enter="confirmInput"
    />
    <button @click="toggleDarkMode" class="dark-mode-toggle">
      {{ darkMode ? '🔆' : '🌙' }}
    </button>
    <header class="page-header">
      <h1>Music as the Art of Expression</h1>
      <p class="instruction1"><span>*</span>discover what song it truly is</p>
    </header>
    <div class="media-player">
      <div class="playlist-button">
        <button @click="togglePlaylist" class="hamburger">≡</button>
        <div v-if="showPlaylist" class="playlist">
          <ul>
            <li v-for="(song, index) in songs" :key="index" @click="playSong(index)">
              <span class="list-song-title">{{ song.title }}</span> -
              <span class="list-song-artist">{{ song.artist }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div class="player">
        <div class="song-info">
          <img :src="currentSong.image" alt="Current Song Image" class="song-image" />
          <div class="song-details">
            <div>{{ currentSong.title }}</div>
            <div>{{ currentSong.artist }}</div>
          </div>
        </div>
        <div class="progress-bar">
          <div class="progress-time">{{ formattedCurrentTime }}</div>
          <input
            type="range"
            min="0"
            :max="duration"
            v-model="currentTime"
            class="progress-slider"
            @input="seek"
          />

          <div class="duration">{{ formattedDuration }}</div>
          <div
            class="volume"
            style="display: inline-block; position: absolute; transform: translateY(1px)"
          >
            <input @click="toggleVolume" id="checkboxInput" type="checkbox" v-model="muted" />
            <label class="toggleSwitch" for="checkboxInput">
              <div class="speaker">
                <svg viewBox="0 0 75 75" version="1.0" xmlns="http://www.w3.org/2000/svg">
                  <path
                    style="stroke: #fff; stroke-width: 5; stroke-linejoin: round; fill: #fff"
                    d="M39.389,13.769 L22.235,28.606 L6,28.606 L6,47.699 L21.989,47.699 L39.389,62.75 L39.389,13.769z"
                  ></path>
                  <path
                    style="fill: none; stroke: #fff; stroke-width: 5; stroke-linecap: round"
                    d="M48,27.6a19.5,19.5 0 0 1 0,21.4M55.1,20.5a30,30 0 0 1 0,35.6M61.6,14a38.8,38.8 0 0 1 0,48.6"
                  ></path>
                </svg>
              </div>

              <div class="mute-speaker">
                <svg stroke-width="5" stroke="#fff" viewBox="0 0 75 75" version="1.0">
                  <path stroke-linejoin="round" fill="#fff" d="m39,14-17,15H6V48H22l17,15z"></path>
                  <path stroke-linecap="round" fill="#fff" d="m49,26 20,24m0-24-20,24"></path>
                </svg>
              </div>
            </label>

            <div class="volume-controls" :class="{ hidden: !showVolumeControls }">
              <input
                type="range"
                min="0"
                max="100"
                v-model="volume"
                class="volume-slider"
                @input="changeVolume"
              />
            </div>
          </div>
        </div>

        <div class="controls">
          <button @click="previousSong" class="prev">⟪</button>
          <button @click="togglePlay" class="play-pause">
            <span class="play-logo">{{ isPlaying ? '⏸︎' : '⏵︎' }}</span>
          </button>
          <button @click="nextSong" class="next">⟫</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import typetheirfirstalbum from '../assets/music/unknown.mp3'
import brokme from '../assets/music/broke-me-115146.mp3'
import dirtypiano from '../assets/music/dirty-piano-vocal-hip-hop-175870.mp3'
import bouncegone from '../assets/music/bounce-gone-crazy.mp3'
import byenow from '../assets/music/bye-now-marilyn-ford-135787.mp3'
import fox from '../assets/music/foxistance-118353.mp3'
import balloons from '../assets/music/leonell-cassio-chasinx27-balloons-ft-krista-marina-118649.mp3'
import heart from '../assets/music/heart-ft-rfly-141378.mp3'
import pleaseyou from '../assets/music/please-you-marilyn-ford-137328.mp3'
import sayyoubemine from '../assets/music/say-you-be-mine-thebasspapa-3896.mp3'
import stillalive from '../assets/music/still-alive-151278.mp3'

import error from '../assets/errorbruh.png'
import imagebrokeme from '../assets/newbrokeme.jpg'
import imagedirtypiano from '../assets/rockot-dirtypiano.jpg'
import imagebouncegone from '../assets/boucegonecrazy.jpg'
import imagebyenow from '../assets/ByeNow.jpg'
import imagefox from '../assets/foxistance.jpg'
import imageheart from '../assets/newheart.jpg'
import imageballoons from '../assets/newballoons.png'
import imagepleaseyou from '../assets/newpleaseyou.jpg'
import imagesayyoubemine from '../assets/thebasspapa-sayyoubemine.jpg'
import imagestillalive from '../assets/newstillalive.png'

export default {
  data() {
    return {
      darkMode: false,
      showPlaylist: false,

      songs: [
        { title: 'Dirty Piano', artist: 'Rockot', image: imagedirtypiano, audio: dirtypiano },
        { title: 'Broke Me', artist: 'HVRDVR', image: imagebrokeme, audio: brokme },
        { title: 'Bye Now', artist: 'Marilyn Ford', image: imagebyenow, audio: byenow },
        { title: 'Foxistance', artist: 'DayFox', image: imagefox, audio: fox },
        {
          title: 'Chasin Balloons',
          artist: 'Leonell Cassio',
          image: imageballoons,
          audio: balloons
        },
        { title: 'Heart', artist: 'Rangga Fermata', image: imageheart, audio: heart },
        { title: 'Bounce Gone Crazy', artist: 'Rockot', image: imagebouncegone, audio: bouncegone },
        { title: '*', artist: '', image: error, audio: typetheirfirstalbum },
        { title: 'Still Alive', artist: 'Snoxxy', image: imagestillalive, audio: stillalive },
        { title: 'Please You', artist: 'Marilyn Ford', image: imagepleaseyou, audio: pleaseyou },
        {
          title: 'Say You Be Mine',
          artist: 'TheBassPapa',
          image: imagesayyoubemine,
          audio: sayyoubemine
        }
      ],
      currentSongIndex: 0,
      audio: new Audio(),
      currentTime: 0,
      duration: 0,
      isPlaying: false,
      volume: 15,
      muted: false,
      previousVolume: null,
      userInput: '',
      succeeded: false
    }
  },

  computed: {
    currentSong() {
      return this.songs[this.currentSongIndex]
    },
    formattedCurrentTime() {
      return this.formatTime(this.currentTime)
    },
    formattedDuration() {
      return this.formatTime(this.duration)
    }
  },
  methods: {
    toggleDarkMode() {
      const musicPage = document.querySelector('.music-page')
      musicPage.classList.remove('yellow-success')
      this.darkMode = !this.darkMode

      if (this.darkMode) {
        musicPage.classList.add('dark-mode')
      } else {
        musicPage.classList.remove('dark-mode')
      }
    },
    togglePlaylist() {
      this.showPlaylist = !this.showPlaylist
    },
    playSong(index) {
      this.currentSongIndex = index
      this.audio.src = this.currentSong.audio
      this.audio.load()
      this.audio.play()
      this.isPlaying = true
      this.audio.volume = this.volume / 100
    },
    pauseSong(index) {
      this.currentSongIndex = index
      this.audio.src = this.currentSong.audio
      this.audio.load()
      this.audio.pause()
      this.isPlaying = false
      this.audio.volume = this.volume / 100
    },
    togglePlay() {
      if (this.audio.paused) {
        this.audio.play()
        this.isPlaying = true
      } else {
        this.audio.pause()
        this.isPlaying = false
      }
    },
    previousSong() {
      this.currentSongIndex = (this.currentSongIndex - 1 + this.songs.length) % this.songs.length
      this.playSong(this.currentSongIndex)
      /* this.isPlaying ? this.playSong(this.currentSongIndex) : this.pauseSong(this.currentSongIndex) */
    },
    nextSong() {
      this.currentSongIndex = (this.currentSongIndex + 1) % this.songs.length
      this.playSong(this.currentSongIndex)
      /* this.isPlaying ? this.playSong(this.currentSongIndex) : this.pauseSong(this.currentSongIndex) */
    },
    updateTime() {
      this.currentTime = Math.floor(this.audio.currentTime)
    },
    setDuration() {
      this.duration = Math.floor(this.audio.duration)
    },
    seek() {
      this.audio.currentTime = this.currentTime
    },
    changeVolume() {
      this.audio.volume = this.volume / 100
    },
    toggleVolume() {
      this.muted = !this.muted
      if (this.muted) {
        this.previousVolume = this.volume
        this.volume = 0
      } else {
        this.volume = this.previousVolume || 100
      }
      this.changeVolume()
    },
    //     cutVolume() {
    //       this.previousVolume = this.volume
    //       this.volume = 0
    //     },
    //     bringBackVolume() {
    //       if (this.previousVolume !== null) {
    //         this.volume = this.previousVolume // Restore previous volume
    //         this.previousVolume = null // Reset previous volume to null
    //       } else {
    //         this.volume = 30 // If previousVolume is null (no previous volume stored), set volume to default value
    //       }
    //     },
    // 	toggleVolumeControls() {
    //    if (this.audio.volume == 0) this.bringBackVolume()
    //    else this.cutVolume()
    // }
    // ,
    formatTime(time) {
      const minutes = Math.floor(time / 60)
      const seconds = Math.floor(time % 60)
      return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
    },

    ///////////////////////////////////////////////////////////
    ////////////////////CHECKING ANSWER/////////////////////////
    /////////////////////////////////////////////////////////
    confirmInput() {
      const expectedString = 'Beautiful! In the realm of music, freedom knows no bounds!'
      const alternativeString =
        'Thank you from the bottom of my heart. Please continue to enjoy my rampaging music!!!'
      const trimmedInput = this.userInput.trim().toLowerCase()
      console.log('Trimmed input:', trimmedInput)
      console.log('Expected string:', expectedString.toLowerCase())

      if (
        trimmedInput === expectedString.toLowerCase() ||
        trimmedInput === alternativeString.toLowerCase()
      ) {
        /* alert('well done') */
        const musicPage = document.querySelector('.music-page')
        musicPage.classList.add('yellow-success')
      } else {
        alert('Wrong... Try again.')
      }

      this.refs.userInput = ''
    },
    adjustStyles() {
      const player = document.querySelector('.player')
      const clue = document.querySelector('.instruction1')
      if (!player) return

      const windowsScaling = window.devicePixelRatio || 1
      if (windowsScaling === 1.25) {
        // Windows scaling set to 125%
        player.style.transform = 'scale(1.7)'
        player.style.marginTop = '12%'
      } else {
        // Windows scaling set to 100%
        player.style.transform = 'scale(2.3)'
        player.style.marginTop = '15%'
        clue.style.marginLeft = '3%'
      }
    }
  },

  mounted() {
    this.adjustStyles()
    window.addEventListener('resize', this.adjustStyles)

    this.audio.addEventListener('timeupdate', this.updateTime)
    this.audio.addEventListener('loadedmetadata', this.setDuration)
    this.audio.addEventListener('ended', this.nextSong)
    this.audio.addEventListener('error', (error) => {
      console.error('Audio error:', error)
    })
    /* this.playSong(this.currentSongIndex) */
    this.pauseSong(this.currentSongIndex)
  },
  beforeDestroy() {
    this.audio.removeEventListener('timeupdate', this.updateTime)
    this.audio.removeEventListener('loadedmetadata', this.setDuration)
    this.audio.removeEventListener('ended', this.nextSong)
    this.audio.removeEventListener('error', () => {})
    window.removeEventListener('resize', this.adjustStyles)
  }
}
</script>

<style>
.music-page {
  /* height: 120vh; */
  height: 100vh;
  overflow-y: hidden;
  background: linear-gradient(205deg, rgba(34, 109, 104, 0.816) 38%, rgba(0, 251, 255, 0.48) 100%),
    url('../assets/ai-generated-bg.png') !important;
  /* animation: gradient-show-light 30s infinite !important; */
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
  background-attachment: fixed !important;
  background-color: #226d68 !important; /* 34, 109, 104, */
}
.page-header {
  text-align: center;
  h1 {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    word-spacing: 25px;
    text-transform: uppercase;
    letter-spacing: 5px;
  }
  p {
    opacity: 0;
    letter-spacing: 5px;
    color: #226d68;
  }
}
.dark-mode {
  background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(1, 3, 26, 0.752)),
    url('../assets/ai-generated-bg.png') !important;
  /* animation: gradient-show-dark 30s infinite !important; */
  background-repeat: no-repeat !important;
  background-position: center center !important;
  background-size: cover !important;
  background-attachment: fixed !important;
  color: #fff;
  .controls .prev,
  .controls .next {
    color: #fff;
  }
  h1 {
    color: #8d733a;
  }
  p {
    opacity: 0.3;
  }
  p span {
    color: #8d733a;
    font-weight: bold;
  }
  /* p.instruction1 {
    position: absolute;
    top: 49.6%;
    left: 6%;
  } */
  .hamburger {
    background-color: #8d733a;
    color: #000;
  }
  .playlist {
    color: #6f5b2fc0;
  }
}
.dark-mode-toggle {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 9999;
  padding: 10px 20px;
  border: none;
  font-size: 24px;
  border-radius: 5px;
  background: transparent;
  color: #fff;
  cursor: pointer;
  opacity: 0.4;
  transition: all 0.3s ease;
}
.dark-mode-toggle:hover {
  opacity: 1;
  scale: 1.3;
}
.media-player {
  /* scale: 0.2; */
  position: relative;
  display: flex;
  justify-content: space-between;
  /* flex-direction: column; */
  width: 100%;
  margin: 0;
  color: #ffffffcf;
}

.playlist-button {
  scale: 1.5;
  margin-left: 10%;
  width: 20%;
  height: 50%;
  /* transform: translateY(50px);
  transform: translateY(50px); */
  transform: translateY(-30px);
}

.playlist {
  position: absolute;
  width: 100%;
  margin-top: 10px;
  color: #ffffff;
  /* background-color: #656464;
  border: 1px solid #ddd; */
  border-radius: 5px;
  /* box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  outline: none; */
}

.playlist ul {
  list-style-type: none;
  padding: 0;
  width: 100%;
}

.playlist ul li {
  cursor: pointer;
  margin-bottom: 5px;
}
.list-song-title {
  font-weight: bold;
}
.list-song-artist {
  font-style: italic;
  font-size: small;
}

/*125% scaling*/
.player {
  /* scale: 1.7; */
  /* scale: 2.3; */
  /* margin-top: 10%; */
  /* margin-top: 15%; */
  margin-right: 43%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Media query for 100% scaling */
/* @media screen and (-webkit-min-device-pixel-ratio: 0.75), screen and (min-resolution: 120dpi) {
  .player {
    scale: 2.3;
    margin-top: 15%;
  }
} */

.song-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}
.song-details {
  width: 200px;
  text-align: center;
}
.song-image {
  width: 160px;
  height: 160px;
  border-radius: 10px;
}

.progress-bar {
  width: 100%;
  margin-bottom: 40px;
}

.progress-time,
.duration {
  font-size: 0.8rem;
}
.progress-time {
  position: absolute;
  transform: translate(8px, 20px);
}
.duration {
  position: absolute;
  right: 5px;
  transform: translateY(-5px);
}
.progress-slider {
  width: 90%;
  margin: 0 10px;
  cursor: pointer;
  background-color: #000;
}
.progress-slider::-webkit-slider-thumb {
  background-color: #ccc;
  border: none;
  height: 16px;
  width: 16px;
  border-radius: 50%;
}
.controls {
  position: relative;
  display: flex;
  button {
    color: #0b0b0b;
  }
}

.controls button {
  margin: 0 5px;
}
.hamburger {
  background-color: #000000c7;
  color: #fff;
  font-size: large;
  border-radius: 12px;
  border: 0.2px solid #00000060;

  transition: all 0.3s ease;
}
.hamburger:hover {
  scale: 1.07;
}

.prev,
.next {
  border: none;
  border-radius: 102px;
  background: transparent;
  color: #ffffff !important;
  opacity: 0.6;
  transition: all 0.3s ease;
}
.prev:hover,
.next:hover {
  scale: 1.2;
  opacity: 1;
}
.play-pause {
  border: none;
  padding-bottom: 3px;
  border-radius: 28px;
  font-size: 30px;
  opacity: 0.8;
  transition: all 0.3s ease;
}
.play-pause:hover {
  scale: 1.05;
  box-shadow:
    rgba(0, 0, 0, 0.3) 0px 19px 38px,
    rgba(0, 0, 0, 0.22) 0px 15px 12px;
  opacity: 1;
}

input[type='range'] {
  accent-color: rgb(255, 255, 255);
  height: 4px;
  opacity: 0.8;
  transition: all 0.3s all;
}
input[type='range']:hover {
  opacity: 1;
}
.volume {
  scale: 0.5;
  /* cursor: pointer; */
  opacity: 0.3;
  transition: all 0.3s ease;
  width: 70px;
}
.volume-controls {
  scale: 1.5;
  transform: translate(-10px, -100px) rotateZ(-90deg);
  opacity: 0;

  transition: all 0.3s ease;
}
.volume:hover {
  opacity: 0.8;
}
.volume:hover .volume-controls {
  opacity: 1;
}
.volume path {
  fill: #ffffff;
}

.input-player {
  position: fixed;
  top: 90px;
  left: 50%;
  transform: translateX(-295px);
  z-index: 9999;
  padding: 10px 20px;
  background-color: #6d223a;
  border: 1ex solid none;
  border-top-width: 1.7em;
  margin: 0;
  padding: 0;
  color: #ffffff;
  word-wrap: break-word;
  opacity: 0;
  /* outline: 7px solid #383838; */
  outline: none;
  height: 30px;
  font-size: 17px;
  text-align: center;
  transition: all 0.7s;
  width: 600px;
  font-weight: bold;
  font-family: 'Courier New', Courier, monospace;
}

.input-player:hover {
  border-top-width: 0.2em;
  background-color: #226d68;
  opacity: 0.45;
}

.input-player:focus {
  border-top-width: 0.2em;
  background-color: #226d68;
}

.toggleSwitch {
  width: 50px;
  height: 50px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(39, 39, 39);
  border-radius: 50%;
  cursor: pointer;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13);
  transform: translate(-1px, -30px);
  overflow: hidden;
}

#checkboxInput {
  display: none;
}

.bell {
  width: 18px;
}

.bell path {
  fill: white;
}

.speaker {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition-duration: 0.3s;
}

.speaker svg {
  width: 18px;
}

.mute-speaker {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  z-index: 3;
  transition-duration: 0.3s;
}

.mute-speaker svg {
  width: 18px;
}

#checkboxInput:checked + .toggleSwitch .speaker {
  opacity: 0;
  transition-duration: 0.3s;
}

#checkboxInput:checked + .toggleSwitch .mute-speaker {
  opacity: 1;
  transition-duration: 0.3s;
  background-color: red;
}

#checkboxInput:active + .toggleSwitch {
  transform: scale(0.7) translateY(-40px);
}

#checkboxInput:hover + .toggleSwitch {
  background-color: rgb(54, 54, 54);
}
.yellow-success {
  background: #e1a624 !important;
}

/* @keyframes gradient-show-light {
  0% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated-bg.png') !important;
  }
  25% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated3-bg.jpg') !important;
  }
  50% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated2-bg.jpg') !important;
  }
  75% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated5-bg.jpg') !important;
  }
  100% {
    background: linear-gradient(rgb(34, 109, 104), rgba(232, 206, 140, 0.817)),
      url('../assets/ai-generated4-bg.jpg') !important;
  }
}
@keyframes gradient-show-dark {
  0% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated-bg.png') !important;
  }
  25% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated3-bg.jpg') !important;
  }
  50% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated2-bg.jpg') !important;
  }
  75% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated5-bg.jpg') !important;
  }
  100% {
    background: linear-gradient(rgba(3, 1, 19, 0.975), rgba(16, 15, 15, 0.866)),
      url('../assets/ai-generated4-bg.jpg') !important;
  }
} */
</style>
