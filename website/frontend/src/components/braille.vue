<template>  
  <div id="brailleContainer" @keydown="handleKeyPress" tabindex="0">
    <span v-for="(item, index) in characters" :key="index"
          :style="{ left: `${item.x}%`, top: `${item.y}%` }"
          @mouseover="revealChar"
          :class="{ brailleChar: true, highlight: item.highlight }">{{ item.char }}</span>
  </div>
</template>

<script>
export default {
  data() {
    return {
      brailleText: '⠃⠗⠁⠊⠇⠇⠑⠑⠍⠏⠕⠺⠑⠗⠎⠞⠓⠑⠃⠇⠊⠝⠙⠺⠊⠞⠓⠞⠓⠑⠋⠗⠑⠑⠙⠕⠍⠞⠕⠗⠑⠁⠙⠁⠝⠙⠉⠕⠍⠍⠥⠝⠊⠉⠁⠞⠑',
      characters: [],
      currentIndex: 0,
    };
  },
  created() {
    this.distributeText();
  },
  mounted() {
    this.$el.focus(); // Focus on the container to catch keydown events
  },
  methods: {
    distributeText() {
      const chars = this.brailleText.split('');
      const columns = 10;
      const rows = Math.ceil(chars.length / columns);
      this.characters = chars.map((char, index) => {
        const row = Math.floor(index / columns);
        const col = index % columns;
        const x = (col / columns) * 100 + Math.random() * 5;
        const y = (row / rows) * 100 + Math.random() * 5;
        return { char, x, y, highlight: false };
      });
    },
    handleKeyPress(event) {
      const brailleAlphabet = {
        'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑', 'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
        'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
        'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵', ' ': ' ',
      };
      const brailleChar = brailleAlphabet[event.key.toLowerCase()];
      if (brailleChar && this.characters[this.currentIndex] && brailleChar === this.characters[this.currentIndex].char) {
        this.characters[this.currentIndex].highlight = true;
        this.$forceUpdate(); // Force update to apply the style change
        this.currentIndex++;
      }
    },
    revealChar(event) {
      const char = this.characters.find(char => char.char === event.target.innerText);
      event.target.classList.add('reveal');
      event.target.classList.remove('hide');
      event.target.addEventListener('animationend', () => {
        event.target.classList.remove('reveal');
        if (!char.highlight) {
          event.target.classList.add('hide');
        }
      }, { once: true });
    },
  },
};
</script>

<style>
#brailleContainer {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: black;
  outline: none; /* Ensure the div is focusable */
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
  font-size:60px;
  opacity: 1;
  text-shadow: 0 0 0px #34d399, 0 0 5px #34d399, 0 0 5px #34d399, 0 0 10px #34d399;
  transition: opacity 0.5s ease;
}
@keyframes reveal {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes hide {
  from { opacity: 1; }
  to { opacity: 0; }
}

</style>



