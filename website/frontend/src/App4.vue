<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import braille from './components/braille.vue'
import anime from 'animejs/lib/anime.es.js'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime({
    targets: '#brailleContainer',
    scale: [0.001, 1], // Scale up to 100% of original size
    duration: 1500, // Duration of animation
    translateX: ['-50%', '50%', '0%'],
    backgroundColor: ['#fff', '#000'],
    easing: 'easeInOutQuad'
  })
})
</script>

<template>
  <svgLogo class="svg-logo" />
  <div id="app4">
    <braille />
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
#app4 {
  scale: 0.9;
}
</style>
