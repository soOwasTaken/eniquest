<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import terminalWeb from './components/terminal-web.vue'
import anime from 'animejs/lib/anime.es.js'

onMounted(() => {
  anime({
    targets: ['.terminal'],
    scale: [0.001, 1], // Scale up to 100% of original size
    translateX: ['100%', '-10%', '0%'],
    translateY: ['100%', '0%'],
    duration: 2500, // Duration of animation
    backgroundColor: ['#fff', '#11151d'],
    easing: 'easeInOutQuad'
  })
})
</script>

<template>
  <div id="app5">
    <terminalWeb />
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
