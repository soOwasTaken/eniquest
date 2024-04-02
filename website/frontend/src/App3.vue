<script setup>
import { ref } from 'vue';
import FireFly from './components/fireflies.vue';
import RainEffect from './components/RainEffect.vue';
import MiddleText from './components/MiddleText.vue';
import RainMp3 from './components/RainMp3.vue';
import InputField from './components/InputField.vue';
import summaryDisplay from './components/summaryDisplay.vue';
import gq from './components/gq.vue';
const showApp1 = ref(false); // Initially set to false for App.vue 2

const switchToApp1 = () => {
  showApp1.value = true;
};
</script>

<template>
  <div id="app">
    <transition name="fade">
      <gq />
    </transition>
    <!-- Button to switch back to App.vue 1 -->
    <button @click="switchToApp1">Switch to App.vue 1</button>
  </div>
</template>



<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

