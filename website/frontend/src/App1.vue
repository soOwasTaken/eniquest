<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import MiddleText from './components/MiddleText.vue';
import InputField from './components/InputField.vue';
import RainEffect from './components/RainEffect.vue'; // Import the RainEffect component
import summaryDisplay from './components/summaryDisplay.vue';
import RainMp3 from './components/RainMp3.vue';
import FireFly from './components/fireflies.vue';
import anime from 'animejs/lib/anime.es.js';
</script>

<template>
  <div id="app1">
    <!-- Other components and elements -->
      <FireFly />
      <RainEffect />
      <MiddleText />
      <RainMp3 />
      <InputField />
      <summaryDisplay ref="summaryDisplay" />
    <!-- Other components and elements -->
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
  background-color:black;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

