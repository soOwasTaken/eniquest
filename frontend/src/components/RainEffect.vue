<template>
  <div class="back-row-toggle splat-toggle">
    <div class="rain front-row"></div>
    <div class="rain back-row"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      isSplatActive: true,
      isBackRowActive: true,
      isSingleActive: false
    }
  },
  methods: {
    makeItRain() {
      const frontRow = this.$el.querySelector('.rain.front-row')
      const backRow = this.$el.querySelector('.rain.back-row')
      frontRow.innerHTML = ''
      backRow.innerHTML = ''

      let increment = 0
      let drops = ''
      let backDrops = ''

      while (increment < 100) {
        const randoHundo = Math.floor(Math.random() * (98 - 1 + 1) + 1)
        const randoFiver = Math.floor(Math.random() * (5 - 2 + 1) + 2)
        increment += randoFiver
        drops += `<div class="drop" style="left: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"><div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div><div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div></div>`
        backDrops += `<div class="drop" style="right: ${increment}%; bottom: ${randoFiver + randoFiver - 1 + 100}%; animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"><div class="stem" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div><div class="splat" style="animation-delay: 0.${randoHundo}s; animation-duration: 0.5${randoHundo}s;"></div></div>`
      }

      frontRow.innerHTML = drops
      backRow.innerHTML = backDrops
    },
    toggleEffect(effect) {
      if (effect === 'splat') {
        this.isSplatActive = !this.isSplatActive
      } else if (effect === 'backRow') {
        this.isBackRowActive = !this.isBackRowActive
      } else if (effect === 'single') {
        this.isSingleActive = !this.isSingleActive
      }
      this.makeItRain()
    }
  },
  mounted() {
    this.makeItRain()
  }
}
</script>

<style>
.rain {
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  overflow: hidden;
  pointer-events: none;
}

.rain.back-row {
  display: none;
  z-index: 1;
  bottom: 60px;
  opacity: 1;
}

body.back-row-toggle .rain.back-row {
  display: block;
}

.drop {
  overflow: hidden;
  position: absolute;
  bottom: 100%;
  width: 15px;
  height: 120px;
  pointer-events: none;
  animation: drop 0.5s linear infinite;
}

@keyframes drop {
  0% {
    transform: translateY(0vh);
  }
  75% {
    transform: translateY(90vh);
  }
  100% {
    transform: translateY(90vh);
  }
}

.stem {
  width: 1px;
  height: 80%;
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.5));
  animation: stem 0.5s linear infinite;
}

@keyframes stem {
  0% {
    opacity: 1;
  }
  65% {
    opacity: 1;
  }
  75% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

.splat {
  width: 15px;
  height: 10px;
  border-top: 2px dotted rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  opacity: 1;
  transform: scale(0);
  animation: splat 0.5s linear infinite;
}

body.splat-toggle .splat {
  display: block;
}

@keyframes splat {
  0% {
    opacity: 1;
    transform: scale(0);
  }
  80% {
    opacity: 0.8;
    transform: scale(0);
  }
  90% {
    opacity: 0.6;
    transform: scale(1);
  }
  100% {
    opacity: 0.3;
    transform: scale(1.5);
  }
  120% {
    opacity: 0.5;
    transform: scale(2);
  }
}

.toggles {
  position: absolute;
  top: 0;

  left: 0;
  z-index: 3;
}

.toggle {
  position: absolute;
  left: 20px;
  width: 50px;
  height: 50px;
  line-height: 51px;
  box-sizing: border-box;
  text-align: center;
  font-family: sans-serif;
  font-size: 10px;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.toggle:hover {
  background-color: rgba(255, 255, 255, 0.25);
}

.toggle:active {
  background-color: rgba(255, 255, 255, 0.3);
}

.toggle.active {
  background-color: rgba(255, 255, 255, 0.4);
}

.splat-toggle {
  top: 20px;
}

.back-row-toggle {
  top: 90px;
  line-height: 12px;
}

.single-toggle {
  top: 160px;
}

body.single-toggle .drop {
  display: none;
}

body.single-toggle .drop:nth-child(10) {
  display: block;
}
</style>
