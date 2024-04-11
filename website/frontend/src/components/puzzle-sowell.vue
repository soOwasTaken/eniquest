<template>
  <div class="puzzle-game">
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
import { ref, watch, onMounted } from 'vue'
import image from '../assets/george-modifieds.png'

const ROWS = 5
const COLS = 5
const EMPTY_TILE = ROWS * COLS - 1

const tiles = ref([])
const completed = ref(false)
let selectedTileIndex = null
let userInput = ref('')
const timer = ref(90) // TIME //////////////////////
const timerColor = ref('black')

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

  const response = await fetch('/checkOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
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
  timer.value = 90 // TIME ///////////////////////////////
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
  background: linear-gradient(205deg, rgba(67, 15, 48, 0.704) 38%, rgba(72, 72, 47, 0.789) 100%),
    url('../assets/forest-3119826_1280.jpg');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  color: #fff;
  height: 100vh;
  /* overflow-y: auto; */
  width: 100%;
  /* transform: translateY(-10%); */
}
.grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  transform: translateY(-50px);
  scale: 0.7;
}

/* DIMENSIONS */
.grid {
  display: grid;
  grid-template-columns: repeat(5, 120px);
  grid-template-rows: repeat(5, 120px);
  gap: 2px;
}

.button {
  scale: 1;
  display: flex;
  justify-content: center;
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
  transform: translate(25px, 45px);
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
  width: 120px;
  height: 120px;
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
  margin-top: 0;
  margin-bottom: 0;
  text-align: center;
  opacity: 0;
  transition: all 6s ease;
  transform: translateY(-50%);
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
  color: #ffffffb6;
  border-radius: 20px;

  /* border: 0.1px solid#3570a7;
  background-color: #3570a76b; */
}
.input-puzzle {
  color: #ffffff;
  font-size: 16px;
  text-align: center;
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #886a8195;
  border-radius: 10px;
  transition: all 0.5s;
  font-weight: bold;
}
.input-puzzle:hover,
.input-puzzle:focus {
  scale: 1.2;
  border: 2px solid #3570a7;
  box-shadow: 0px 0px 0px 7px rgba(74, 157, 236, 20%);
}
.timer {
  margin-top: 10px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  position: absolute;
  top: 80px;
  left: 25px;
  cursor: default;
  background-color: #98959581;
  background: transparent;
  border-radius: 8px;
  transition: all 0.3s ease;
}
.timer:hover {
  font-size: 28px;
}
</style>
