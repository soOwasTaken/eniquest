<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import OldWeb from './components/WebComparison/OldWeb.vue'
import NewWeb from './components/WebComparison/NewWeb.vue'
import anime from 'animejs/lib/anime.es.js'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime
  anime
    .timeline({
      easing: 'easeInOutQuad',
      duration: 1000
    })
    .add({
      targets: '.web-container',
      scale: [0.8, 1], // Start slightly scaled down and scale up to 100% of original size
      opacity: [0, 1] // Fade in
    })
    .add({
      targets: '.old-web',
      scale: [0.1, 1], // Start slightly scaled up and scale down to 100% of original size
      opacity: [0, 1], // Fade in
      rotate: '1turn' // Rotate twice during the animation
    })
    .add({
      targets: '.new-web',
      scale: [0.1, 1], // Start slightly scaled up and scale down to 100% of original size
      opacity: [0, 1], // Fade in
      rotate: '-1turn' // Rotate twice in the opposite direction
    })
})
</script>
<template>
  <div id="app2">
    <div class="web-container">
      <OldWeb />
      <div class="divider"></div>
      <NewWeb />
    </div>
  </div>
</template>
<style scoped>
/* .svg-logo {
  z-index: 999;
} */
#app {
  background-color: aqua;
}

.web-container {
  display: flex;
  height: 100vh; /* Use 100% of the viewport height */
  overflow: hidden; /* Prevent scrolling outside the containers */
}

/* Ensure each web component takes up half the width */
.old-web,
.new-web {
  width: 50%;
  overflow-y: auto; /* Enable vertical scrolling within each component */
  height: 100%;
}

.divider {
  background-color: #ccc; /* Light grey line for separation */
  width: 2px; /* Thickness of the divider line */
  height: 100vh; /* Take the full height available */
}
</style>
