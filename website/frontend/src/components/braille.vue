<template>
  <div class="braille-app">
    <div id="brailleContainer" @keydown="handleKeyPress" tabindex="0">
      <span
        v-for="(item, index) in characters"
        :key="index"
        :style="{ left: `${item.x}%`, top: `${item.y}%` }"
        @mouseover="revealChar"
        :class="{ brailleChar: true, highlight: item.highlight }"
        >{{ item.char }}</span
      >
    </div>
  </div>
</template>

<script>
import { setActivePinia } from 'pinia'
import { useRouter } from 'vue-router'
import { Transition, inject } from 'vue'
import anime from '../../node_modules/animejs/lib/anime.es'
import App7 from '../App8.vue'
import { useStore } from 'vuex'

export default {
  data() {
    return {
      brailleText: '⠃⠗⠁⠊⠇⠇⠑⠑⠍⠏⠕⠺⠑⠗⠎⠞⠓⠑⠃⠇⠊⠝⠙⠺⠊⠞⠓⠞⠓⠑⠋⠗⠑⠑⠙⠕⠍⠞⠕⠗⠑⠁⠙⠁⠝⠙⠉⠕⠍⠍⠥⠝⠊⠉⠁⠞⠑',
      characters: [],

      currentIndex: 0,
      succeedBraille: false,
      changeComponent: inject('changeComponent'),
      router: useRouter(),
      store: useStore()
    }
  },
  created() {
    this.distributeText()
  },
  mounted() {
    this.$el.focus() // Focus on the container to catch keydown events

    /////////////TO DELETE/////////////////
    // setTimeout(() => {
    //   this.cheating()
    // }, 5000)
  },
  methods: {
    distributeText() {
      const chars = this.brailleText.split('')
      const columns = 10
      const rows = Math.ceil(chars.length / columns)
      this.characters = chars.map((char, index) => {
        const row = Math.floor(index / columns)

        const col = index % columns

        const x = (col / columns) * 100 + Math.random() * 5
        const y = (row / rows) * 100 + Math.random() * 5
        return { char, x, y, highlight: false }
      })
    },
    /////////////////TO BE DELETED /////////////
    cheating() {
      this.currentIndex = 57
    },
    /////////////////////////////////////////
    async handleKeyPress(event) {
      const brailleAlphabet = {
        a: '⠁',
        b: '⠃',
        c: '⠉',
        d: '⠙',
        e: '⠑',
        f: '⠋',
        g: '⠛',
        h: '⠓',
        i: '⠊',
        j: '⠚',

        k: '⠅',
        l: '⠇',
        m: '⠍',
        n: '⠝',
        o: '⠕',
        p: '⠏',
        q: '⠟',
        r: '⠗',
        s: '⠎',
        t: '⠞',
        u: '⠥',
        v: '⠧',
        w: '⠺',
        x: '⠭',
        y: '⠽',
        z: '⠵',
        ' ': ' '
      }
      const brailleChar = brailleAlphabet[event.key.toLowerCase()]

      if (
        brailleChar &&
        this.characters[this.currentIndex] &&
        brailleChar === this.characters[this.currentIndex].char
      ) {
        this.characters[this.currentIndex].highlight = true
        this.$forceUpdate() // Force update to apply the style change
        this.currentIndex++
        //console.log(this.currentIndex);
      }

      if (event.key === 'Enter') {
        const response = await fetch('/checkIndex', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ index: this.currentIndex })
        })

        const data = await response.json()

        if (data.result) {
          console.log('Correct!')
          this.setSucceedBraille(true)
          const allPage1 = document.querySelector('#brailleContainer')
          const allPage = document.querySelector('.braille-app')
          allPage1.style.backgroundColor = '#232826'
          allPage.style.backgroundColor = '#232826'
          document.body.style.background = '#232826'
          this.store.dispatch('updateGameSuccess', { gameIndex: 3, success: true })
          this.transition()
          // Here we can setup later transition.
        } else {
          console.log('Incorrect. Please try again.')
        }
      }
    },
    revealChar(event) {
      const char = this.characters.find((char) => char.char === event.target.innerText)
      event.target.classList.add('reveal')
      event.target.classList.remove('hide')
      event.target.addEventListener(
        'animationend',
        () => {
          event.target.classList.remove('reveal')
          if (!char.highlight) {
            event.target.classList.add('hide')
          }
        },
        { once: true }
      )
    },
    setSucceedBraille(value) {
      this.succeedBraille = value
    },
    getSucceedBraille() {
      return this.succeedBraille
    },
    transition() {
      setTimeout(() => {
        anime({
          targets: '#brailleContainer',
          translateX: '-100%',
          /* translateY: '100%', */
          duration: 2000, // Duration of animation
          /* borderRadius: ['0%', '70%'], */
          /* backgroundColor: ['#000', '#955149'], */
          easing: 'easeInOutQuad',
          complete: () => this.router.push('/app5')
        })
      }, 1500)
    }
  }
}
</script>
<style>
.braille-app {
  height: 100vh;
  background-color: black;
}
#brailleContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0);
  outline: none; /* Ensure the div is focusable */
  scale: 0.9;
}

.brailleChar:not(.highlight) {
  position: absolute;
  opacity: 0;
  font-family: 'braille';
  font-size: 60px;
  color: white;
  transition: opacity 0.5s ease;
}

.brailleChar:not(.highlight).reveal {
  opacity: 1;
  animation: reveal 1s forwards;
}
.brailleChar:not(.highlight).hide {
  animation: hide 1s forwards;
}

.brailleChar.highlight {
  position: absolute;
  color: #34d399;
  font-size: 60px;
  opacity: 1;
  text-shadow:
    0 0 0px #34d399,
    0 0 5px #34d399,
    0 0 5px #34d399,
    0 0 10px #34d399;
  transition: opacity 0.5s ease;
}
@keyframes reveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
