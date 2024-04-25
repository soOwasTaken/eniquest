<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import dot from './components/dot.vue'
import anime from 'animejs/lib/anime.es.js'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime({
    targets: '.main-container',
    scale: [0.001, 1], // Scale up to 100% of original size
    duration: 1500, // Duration of animation
    easing: 'easeInOutQuad'
  })
})
</script>

<template>
  <div id="app6">
    <div class="logowrap">
      <svgLogo class="svg-logo" />
    </div>
    <dot />
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
:root {
  --text-color: hsl(0, 0%, 100%);
}

body {
  background-color: rgba(32, 98, 19, 0.67);
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
