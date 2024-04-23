<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import puzzle from './components/puzzle-sowell.vue'
import anime from 'animejs/lib/anime.es.js'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime
    .timeline({
      easing: 'easeInOutQuad',
      duration: 3000
    })
    .add({
      targets: '.puzzle-game',
      translateX: ['-100%', '0%'], // Move from left to right
      opacity: [0, 1], // Fade in
      scale: [0.2, 1], // Start small and scale up to 100% of original size
      rotateX: [180, -180, 0], // Rotate two full turns
      elasticity: 600 // Add elasticity for a bouncing effect
    })
})
</script>

<template>
  <div id="app5">
    <svgLogo class="svg-logo" />
    <puzzle />
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
  background-color: black;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
