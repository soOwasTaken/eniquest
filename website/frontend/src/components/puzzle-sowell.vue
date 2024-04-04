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
    <div class="grid-container">
      <div class="grid">
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
      <p>We must reverse world order.</p>
      <div class="prompt">
        <!-- Your prompt content goes here -->
        <input
          type="text"
          class="input"
          id="userinput"
          v-model="userInput"
          @keyup.enter="handleInput"
          @keydown="handleKeyDown"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import image from '../assets/george-modifieds.png'

const ROWS = 3 // nombre de lignes
const COLS = 3 // nombre de colones
const EMPTY_TILE = ROWS * COLS - 1

const tiles = ref([])
const completed = ref(false)
let selectedTileIndex = null
const userInput = ref('')

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

// MY KEYBOARD
const handleKeyDown = (event) => {
  const key = event.key

  if (!/^\d$/.test(key) && key !== 'Backspace') {
    event.preventDefault()
  }
}

// DIFFERENT KEYBOARDS
// const handleKeyDown = (event) => {

//   const keyCode = event.keyCode

//   if (!((keyCode >= 48 && keyCode <= 57) || keyCode === 8)) {
//     event.preventDefault()
//   }
// }
const handleInput = () => {
  userInput.value = userInput.value.replace(/\D/g, '')
  console.log('User input:', userInput.value)

  const inputbox = document.getElementById('userinput')
  const inputtext = document.querySelector('.input')
  console.log(inputtext)
  if (userInput.value === '4891') {
    inputbox.style.borderColor = 'green'
    inputtext.style.backgroundColor = 'green'
  } else {
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
  if (!completed.value) {
    const temp = tiles.value[index1]
    tiles.value[index1] = tiles.value[index2]
    tiles.value[index2] = temp
    if (puzzleCompleted()) {
      completed.value = true
      console.log('Congratulations! You solved the puzzle!')
      const promptMessage = document.querySelector('.prompt-container')
      promptMessage.style.opacity = 1
      console.log('succeed')
    }
  }
}

const resetGame = () => {
  completed.value = false
  shuffleTiles()
}

const puzzleCompleted = () => {
  return tiles.value.every((tile, index) => tile.id === index)
}

shuffleTiles()
</script>

<style scoped>
.puzzle-game {
  color: #fff;
  height: 100%;
  overflow-y: auto;
  width: 100%;
  transform: translateY(-10%);
}
.grid-container {
  display: flex;
  justify-content: center;
  align-items: center;
  scale: 0.7;
}

/*DIMENSION*/
.grid {
  display: grid;
  grid-template-columns: repeat(
    3,
    200px
  ); /*(5 x 120 = 600)  it will always be 600px (image width)*/
  grid-template-rows: repeat(3, 200px);
  gap: 2px;
}

.button {
  margin-bottom: 10px;
}
.button {
  scale: 1.5;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  height: 34px;
  width: 40px;
  border: none;
  background: #b6b1b100;
  border-radius: 20px;
  cursor: pointer;
}

.lable {
  line-height: 20px;
  font-size: 17px;
  color: #8c0f08;
  font-family: sans-serif;
  letter-spacing: 1px;
}

.button:hover .svg-icon {
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
.tile {
  width: 200px; /* DIMENSIONS*/
  height: 200px;
  background-color: lightblue;
  border: 1px solid black;
  cursor: pointer;
  background-size: 600px 600px;
}

.tile.empty {
  background-color: white;
}

.tile:hover {
  background-color: lightgreen;
}
.prompt-container {
  margin: 5%;
  margin-top: 0;
  text-align: center;
  opacity: 0;
  transition: all 6s ease;
  transform: translateY(-50%);
}
.prompt-container p {
  text-transform: uppercase;
  margin: 1%;
}

.input {
  color: #fff;
  font-size: 16px;
  text-align: center;
  border: 2px solid transparent;
  width: 15em;
  height: 2.5em;
  padding-left: 0.8em;
  outline: none;
  overflow: hidden;
  background-color: #ffffff3f;
  border-radius: 10px;
  transition: all 0.5s;
  font-weight: bold;
}

.input:hover,
.input:focus {
  border: 2px solid #4a9dec;
  box-shadow: 0px 0px 0px 7px rgba(74, 157, 236, 20%);
}
</style>
