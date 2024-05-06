<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import terminalWeb from './components/terminal-web.vue'
import anime from 'animejs/lib/anime.es.js'
import endPage from './components/endPage.vue'
import svgLogo from './components/svgLogo.vue'
onMounted(() => {
  anime({
    targets: ['.end-wrapper'],
    /* scale: [0.001, 1], */ // Scale up to 100% of original size
    translateX: ['-300%', '0%'],
    translateY: ['-300%', '0%'],
    duration: 1500, // Duration of animation
    easing: 'easeInOutQuad'
  })
  //   anime({
  //     targets: ['body'],
  //     backgroundColor: '#fff'
  //   })
})
</script>

<template>
  <svgLogo class="svg-logo" />
  <div class="end-wrapper">
    <div id="end">
      <endPage />
    </div>
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
  background-color: #11151d;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.end-wrapper {
  background-color: black;
}
</style>
