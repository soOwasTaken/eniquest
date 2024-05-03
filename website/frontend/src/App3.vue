<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import musicPlayer from './components/musicplayer.vue'
import anime from 'animejs/lib/anime.es.js'
// import { getSucceedMusic, setSucceedMusic } from './components/succeedMusic'
import App2 from './App2.vue'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime
    .timeline({
      easing: 'easeInOutQuad',
      duration: 3500
    })
    .add({
      targets: '#app3',
      scale: [0.1, 1], // Start slightly scaled down and scale up to 100% of original size
      translateY: ['-100%', '30%', '0%'] // Start slightly above and move to original position
    })
})
</script>
<template>
  <div id="app3">
    <musicPlayer />
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}
:root {
  --text-color: hsl(0, 0%, 100%);
}

body {
  overflow: hidden;
  background-color: black;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#app3 {
  overflow: hidden;
}
.svg-logo {
  z-index: 9999;
}
</style>
