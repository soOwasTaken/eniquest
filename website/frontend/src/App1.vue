<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import MiddleText from './components/MiddleText.vue';
import InputField from './components/InputField.vue';
import RainEffect from './components/RainEffect.vue'; // Import the RainEffect component
import summaryDisplay from './components/summaryDisplay.vue';
import RainMp3 from './components/RainMp3.vue';
</script>

<template>
  <div id="app">
    <!-- Other components and elements -->
    <RainEffect />
    <MiddleText />
    <RainMp3 />
    <InputField />
    <summaryDisplay ref="summaryDisplay" />
    <!-- Other components and elements -->
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}
:root {
  --background-color: black;
  --text-color: hsl(0, 0%, 100%);
}

body {
  height:100%;
  background-color:black;
  margin: 0;
  overflow: hidden;
}
</style>

