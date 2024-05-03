<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import braille from './components/braille.vue'
import anime from 'animejs/lib/anime.es.js'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime({
    targets: ['#app4'],
    scale: [0.001, 1], // Scale up to 100% of original size
    duration: 2500, // Duration of animation
    translateX: ['-90%', '9%', '0%'],
    /* backgroundColor: ['#fff', '#000'], */
    easing: 'easeInOutQuad'
  })
  // anime({
  //   targets: ['body'],

  //   duration: 10, // Duration of animation

  //   backgroundColor: ['#fff'],
  //   easing: 'easeInOutQuad'
  // })
})
</script>

<template>
  <div id="app4">
    <svgLogo class="svg-logo" />
    <braille />
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
  background-color: rgb(0, 0, 0);
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
#app4 {
  overflow: hidden;
}
</style>
