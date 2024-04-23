<template>
  <div class="firefly-container">
    <div
      v-for="(firefly, index) in numberOfFireflies"
      :key="index"
      class="firefly"
      :style="fireflyStyles[index]"
      :ref="'firefly_' + index"
    ></div>
  </div>
</template>

<script>
import anime from 'animejs/lib/anime.es.js'

export default {
  data() {
    return {
      numberOfFireflies: 30,
      fireflyStyles: [] // Store initial styles for each firefly
    }
  },
  mounted() {
    // Generate initial styles for each firefly
    this.generateInitialStyles()
    this.animateFireflies()
  },
  methods: {
    generateInitialStyles() {
      const middleX = window.innerWidth / 2
      const middleY = window.innerHeight / 2
      const spawnRadius = Math.min(window.innerWidth, window.innerHeight) * 0.3 // Adjust spawn radius as needed
      for (let i = 0; i < this.numberOfFireflies; i++) {
        const angle = Math.random() * Math.PI * 2 // Random angle in radians
        const distance = Math.random() * spawnRadius
        const startX = middleX + Math.cos(angle) * distance
        const startY = middleY + Math.sin(angle) * distance
        const randomColor = this.getRandomColor()
        this.fireflyStyles.push({
          left: `${startX}px`,
          top: `${startY}px`,
          background: randomColor
        })
      }
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF'
      let color = '#'
      do {
        for (let i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)]
        }
      } while (color === '#000000') // Repeat until a non-black color is generated
      return color
    },
    animateFireflies() {
      for (let i = 0; i < this.numberOfFireflies; i++) {
        this.animateFirefly(i)
      }
    },
    animateFirefly(index) {
      anime({
        targets: this.$refs['firefly_' + index],
        translateX: function () {
          return anime.random(-400, 400)
        },
        translateY: function () {
          return anime.random(-100, -200)
        },
        scale: [{ value: 0.6 }, { value: 1.2 }],
        opacity: [{ value: 0.2 }, { value: 1 }],
        easing: 'easeInOutQuad',
        duration: function () {
          return anime.random(2000, 4000)
        },
        complete: () => this.animateFirefly(index)
      })
    }
  }
}
</script>

<style scoped>
.firefly-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  pointer-events: none;
}
.firefly {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  filter: blur(10px);
  position: absolute;
}
</style>
