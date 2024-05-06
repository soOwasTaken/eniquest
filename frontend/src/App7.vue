<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import login from './components/login.vue';
import anime from 'animejs/lib/anime.es.js';

console.log("login page loaded")
</script>

<template>
  <div id="app7">
    <login />
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

