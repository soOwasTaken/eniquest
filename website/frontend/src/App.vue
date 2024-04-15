<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <component :is="currentComponent"></component>
    </transition>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue'
import App1 from './App1.vue'
import App2 from './App2.vue'
import App3 from './App3.vue'
import App4 from './App4.vue'
import App5 from './App5.vue'
import App6 from './App6.vue'
import App7 from './App7.vue'
import login from './components/login.vue'
import Auth from './Auth.vue'
// Import all the components you want to switch between

let currentComponent = ref(Auth) // Default component

// Function to change the component
const changeComponent = (newComponent) => {
  currentComponent.value = newComponent
}
provide('changeComponent', changeComponent)
// Example usage:
//changeComponent(App2);
// changeComponent(App6)
// changeComponent(App4);
// etc.
</script>

<style>
:root {
  --background-color: black;
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
