<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import MiddleText from './components/MiddleText.vue';
import InputField from './components/InputField.vue';
import summaryDisplay from './components/summaryDisplay.vue';

const summaryDisplayRef = ref(null);
</script>

<template>
  <div id="app">
    <!-- Other components and elements -->
    <MiddleText />
    <InputField />
    <summaryDisplay :ref="summaryDisplayRef" />
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
  background-color:black;
  margin: 0;
}
</style>

