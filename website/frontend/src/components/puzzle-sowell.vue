<template>
  <div class="puzzle-game">
    <video autoplay muted loop id="myVideo">
      <source src="../assets/bgvid/5.mp4" type="video/mp4" />
    </video>
    <button @click="resetGame" class="button">
      <svg
        class="svg-icon"
        fill="none"
        height="20"
        viewBox="0 0 20 20"
        width="20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="#ff342b" stroke-linecap="round" stroke-width="1.5">
          <path
            d="m3.33337 10.8333c0 3.6819 2.98477 6.6667 6.66663 6.6667 3.682 0 6.6667-2.9848 6.6667-6.6667 0-3.68188-2.9847-6.66664-6.6667-6.66664-1.29938 0-2.51191.37174-3.5371 1.01468"
          ></path>
          <path
            d="m7.69867 1.58163-1.44987 3.28435c-.18587.42104.00478.91303.42582 1.0989l3.28438 1.44986"
          ></path>
        </g>
      </svg>
    </button>
    <div v-auto-animate class="grid-container">
      <div v-auto-animate class="grid">
        <div
          v-for="(tile, index) in tiles"
          :key="index"
          class="tile"
          :class="{ empty: tile.id === EMPTY_TILE }"
          @click="handleTileClick(index)"
          :style="{
            backgroundImage: `url(${tile.image})`,
            backgroundPosition: tile.backgroundPosition
          }"
        ></div>
      </div>
    </div>
    <div class="prompt-container">
      <p>reverse the system.</p>
      <div class="prompt">
        <input
          type="text"
          class="input-puzzle"
          id="userinput"
          v-model="userInput"
          @keyup.enter="handleInput"
          @keydown="handleKeyDown"
        />
      </div>
    </div>
    <div class="timer" :style="{ color: timerColor }">
      {{ formatTimer(timer) }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, Transition } from 'vue'
import image from '../assets/george-modifieds.png'
import image2 from '../assets/1puzzlebackground-2661283_1280.jpg'
import { inject } from 'vue'
import anime from '../../node_modules/animejs/lib/anime.es'
import App5 from '../App5.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const ROWS = 7
const COLS = 7
const EMPTY_TILE = ROWS * COLS - 1

const tiles = ref([])
const completed = ref(false)
let selectedTileIndex = null
let userInput = ref('')
const timer = ref(180) // TIME //////////////////////
const timerColor = ref('black')

const changeComponent = inject('changeComponent')
const router = useRouter()
const store = useStore()
let succeedPuzzle = false
function setSucceedPuzzle(value) {
  succeedPuzzle = value
}
function getSucceedPuzzle() {
  return succeedPuzzle
}

const startTimer = () => {
  const interval = setInterval(() => {
    timer.value--
    if (timer.value <= 0) {
      clearInterval(interval)
      resetGame()
      startTimer()
    }
  }, 1000)
}

watch(timer, (newValue) => {
  if (newValue <= 0) {
    timerColor.value = 'red'
  }
})

onMounted(() => {
  startTimer()
})

const shuffleTiles = () => {
  const imagePieces = []
  const imageWidth = 600 // image width
  const imageHeight = 600 // image height
  const pieceWidth = imageWidth / COLS
  const pieceHeight = imageHeight / ROWS
  for (let i = 0; i < ROWS * COLS; i++) {
    const row = Math.floor(i / COLS)
    const col = i % COLS
    const xPosition = -(col * pieceWidth)
    const yPosition = -(row * pieceHeight)
    imagePieces.push({
      id: i,
      image: image,
      backgroundPosition: `${xPosition}px ${yPosition}px`
    })
  }
  tiles.value = imagePieces.slice().sort(() => Math.random() - 0.5)
}

const handleKeyDown = (event) => {
  const key = event.key

  if (!/^\d$/.test(key) && key !== 'Backspace') {
    event.preventDefault()
  }
}

const handleInput = async () => {
  const userInputValue = userInput.value.replace(/\D/g, '')
  console.log('User input:', userInputValue)

  const game = 'game4'
  const token = localStorage.getItem('token')
  const response = await fetch('/checkOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Include the token in the Authorization header
    },
    body: JSON.stringify({ game, order: userInputValue })
  })

  const data = await response.json()

  const inputbox = document.getElementById('userinput')
  const inputtext = document.querySelector('.input-puzzle')
  console.log(inputtext)
  if (data.feedback === "Correct! You've solved the puzzle.") {
    inputbox.style.borderColor = 'green'
    inputtext.style.backgroundColor = 'green'
    setSucceedPuzzle(true)
    //    document.body.style.background =
    //      'linear-gradient(205deg, rgba(32, 98, 19, 0.4) 38%, rgba(72, 72, 47, 0.789) 100%)'
    setTimeout(() => {
      transition()
    }, 1000)
    store.dispatch('updateGameSuccess', { gameIndex: 4, success: true })
  } else {
    let feedback = data.feedback
    console.log(feedback)

    if (userInput.value !== feedback.toUpperCase()) {
      userInput.value = feedback.toUpperCase()
    }

    inputbox.style.borderColor = '#8c0f08'
    inputtext.style.backgroundColor = '#8c0f08'
  }
}
// const transition = () => {
//   setTimeout(() => {
//     // Number of fragments to break the element into
//     const numFragments = 20

//     // Get the dimensions of the window
//     const windowWidth = window.innerWidth
//     const windowHeight = window.innerHeight

//     // Create and append fragment elements to the body
//     for (let i = 0; i < numFragments * 2; i++) {
//       const fragment = document.createElement('div')
//       fragment.classList.add('fragment')
//       fragment.style.width = `${(windowWidth * 2) / numFragments}px`
//       fragment.style.height = `${(windowHeight * 2) / numFragments}px`
//       fragment.style.background = `url(${image2})`
//       fragment.style.position = 'absolute'
//       fragment.style.left = `${anime.random(0, windowWidth)}px`
//       fragment.style.top = `${anime.random(0, windowHeight)}px`
//       document.body.appendChild(fragment)
//     }

//     // Animate the fragments with randomized movement
//     const fragments = document.querySelectorAll('.fragment')
//     fragments.forEach((fragment) => {
//       anime({
//         targets: fragment,
//         translateX: anime.random(-windowWidth, windowWidth),
//         translateY: anime.random(-windowHeight, windowHeight),
//         /* rotate: anime.random(0, 360), */
//         opacity: 1,
//         duration: anime.random(1000, 2000),
//         easing: 'easeInOutQuad',
//         complete: () => fragment.remove() // Remove the fragment after animation completes
//       })
//     })

//     // Change component after animation completes
//     setTimeout(() => {
//       changeComponent(App5)
//     }, 300)
//   }, 2500)
// }

const transition = () => {
  // Duration of tile animation
  const tileDuration = 800

  // Range for random translations
  const translationRange = 500 // Adjust this value as needed

  // Get the dimensions of the window
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight

  // Store initial positions of the tiles
  const initialPositions = tiles.value.map((tile) => ({
    translateX: tile.translateX,
    translateY: tile.translateY
  }))

  // Animate each tile individually to different positions with staggered start times
  tiles.value.forEach((tile, index) => {
    anime({
      targets: `.tile:nth-child(${index + 1})`,
      translateX: anime.random(-translationRange, translationRange),
      translateY: anime.random(-translationRange, translationRange),
      duration: tileDuration,
      easing: 'easeInOutQuad',
      delay: index * 100, // Stagger the start time of each tile's animation
      complete: () => {
        // After the tile's animation completes, animate it back to its initial position
        anime({
          targets: `.tile:nth-child(${index + 1})`,
          translateX: initialPositions[index].translateX,
          translateY: initialPositions[index].translateY,
          duration: tileDuration,
          easing: 'easeInOutQuad',
          complete: () => {
            // After the tile returns to its initial position, if it's the last tile, start animating the whole .puzzle-game container
            if (index === tiles.value.length - 1) {
              anime({
                targets: '.puzzle-game',
                translateY: ['0%', '200%'],
                /* rotateY: [360, 0], */
                elasticity: 600,
                scale: [1, 0.1],
                duration: 3000,
                opacity: 0,
                easing: 'easeInOutQuad',
                begin: () => {
                  // Start the second animation sooner by setting a negative delay
                  anime.set('.puzzle-game', { translateY: '0%' }) // Reset translateY to initial position
                },
                complete: () => {
                  // After the container animation completes, change component
                  router.push('/app6')
                }
              })
            }
          }
        })
      }
    })
  })
}

const handleTileClick = (index) => {
  if (selectedTileIndex === null) {
    selectedTileIndex = index
  } else {
    swapTiles(selectedTileIndex, index)
    selectedTileIndex = null
  }
}

const swapTiles = (index1, index2) => {
  requestAnimationFrame(() => {
    if (!completed.value) {
      const temp = tiles.value[index1]
      const tile1 = document.querySelector(`.tile:nth-child(${index1 + 1})`)
      const tile2 = document.querySelector(`.tile:nth-child(${index2 + 1})`)

      tile1.classList.add('swap-out')
      tile2.classList.add('swap-in')

      tiles.value[index1] = tiles.value[index2]
      tiles.value[index2] = temp

      // Wait for the transition to complete before removing the classes
      setTimeout(() => {
        tile1.classList.remove('swap-out')
        tile2.classList.remove('swap-in')

        if (puzzleCompleted()) {
          completed.value = true
          console.log('Congratulations! You solved the puzzle!')
          const promptMessage = document.querySelector('.prompt-container')
          promptMessage.style.opacity = 1
          console.log('succeed')
        }
      }, 200)
    }
  })
}

const resetGame = () => {
  completed.value = false
  shuffleTiles()
  timer.value = 180 // TIME ///////////////////////////////
  timerColor.value = 'yellow'
}

const puzzleCompleted = () => {
  return tiles.value.every((tile, index) => tile.id === index)
}

const formatTimer = (time) => {
  const minutes = Math.floor(time / 60)
  const seconds = time % 60
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

shuffleTiles()
</script>

<style scoped>
.puzzle-game {
  color: #fff;
  height: 100vh;
  /* overflow-y: auto; */
  width: 100%;
  background: rgba(0, 0, 0, 0.2);
  overflow: hidden;
  /* transform: translateY(-10%); */
}
.grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(10%);
  scale: 1;
}

/* DIMENSIONS */
.grid {
  display: grid;
  grid-template-columns: repeat(7, 85.7142857px);
  grid-template-rows: repeat(7, 85.7142857px);
  gap: 2px;
}

.button {
  scale: 1;
  display: flex;
  justify-content: center;
  position: absolute;
  top: 25%;
  left: 25%;
  align-items: center;
  margin-bottom: 10px;
  padding: 6px 12px;
  gap: 8px;
  height: 34px;
  width: 40px;
  border: none;
  background-color: #01010134;
  /* background: transparent; */
  border-radius: 20px;
  cursor: pointer;
  color: #3570a7;
  scale: 1.5;
  /* transform: translate(25px, 100%); */
  z-index: 2;
  transition: all 0.3s ease;
}
.button:hover {
  transform: translateY(15%);
}
.button .svg-icon {
  scale: 1.5;
  transition: all 0.3s ease;
}
.lable {
  line-height: 20px;
  font-size: 17px;
  color: #8c0f08;
  font-family: sans-serif;
  letter-spacing: 1px;
}
.button:hover .svg-icon {
  scale: 1.7;
  animation: spin 2s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}

/* DIMENSIONS */
.tile {
  width: 85.7142857px;
  height: 85.7142857px;
  background-color: lightblue;
  border: 1px solid black;
  cursor: pointer;
  background-size: 600px 600px;
  transition: all 0.2s ease;
}
.swap-out {
  transform: translateY(50%);
  opacity: 0;
}

.swap-in {
  transform: translateY(-50%);
  opacity: 0;
}
.tile.empty {
  background-color: white;
}
.tile:hover {
  background-color: lightgreen;
}
.prompt-container {
  position: relative;
  margin: 5%;
  margin-top: 7%;
  margin-bottom: 0;
  text-align: center;
  opacity: 0;
  transition: all 4s ease;
  transform: translateY(-50%);
  cursor: default;
}
.prompt-container p {
  text-align: center;
  word-spacing: 10px;
  text-transform: uppercase;
  font-weight: bold;
  letter-spacing: 10px;
  margin: 1%;
  margin-left: 36%;
  padding: 0;
  width: 28%;
  color: #3d3b40;
  border-radius: 20px;

  /* border: 0.1px solid#3570a7;
  background-color: #2062136b; */
}
.input-puzzle {
  color: white;
  font-size: 16px;
  text-align: center;
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background: rgba(61, 59, 64, 0.4);
  border-radius: 10px;
  transition: all 0.5s;
  font-weight: bold;
}
.input-puzzle:hover,
.input-puzzle:focus {
  scale: 1.2;
  border: 2px solid #3570a7;
  box-shadow: 0px 0px 0px 7px rgba(74, 157, 236, 20%);
  cursor: text;
}
.input-puzzle:hover:not(:focus) {
  cursor: default;
}
.timer {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
  font-family: math;
  font-weight: bold;
  position: absolute;
  top: 80px;
  left: 25px;
  cursor: default;
  background-color: #98959581;
  background: transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
  top: 12%;
  left: 24.8%;
  scale: 2;
}
.timer:hover {
  transform: translateY(-10%);
}

#myVideo {
  position: fixed; /* Fixed position to cover all the page */
  right: 0;
  bottom: 0;
  min-width: 100%; /* Minimum width 100% */
  min-height: 100%; /* Minimum height 100% */
  z-index: -1; /* Positioned behind all other elements */
  opacity: 0.7;
}
</style>
