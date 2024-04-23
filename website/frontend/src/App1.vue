<script setup>
import { ref, computed, onMounted, watch, inject } from 'vue'
import anime from 'animejs/lib/anime.es.js'
import MiddleText from './components/MiddleText.vue'
import InputField from './components/InputField.vue'
import RainEffect from './components/RainEffect.vue'
import summaryDisplay from './components/summaryDisplay.vue'
import RainMp3 from './components/RainMp3.vue'
import FireFly from './components/fireflies.vue'
import svgLogo from './components/svgLogo.vue'
import App3 from './App3.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

function testButtonClick() {
  console.log('Button clicked!')
}
// const changeComponent = inject('changeComponent')

// // Function to toggle the value of suceedValue
// function toggleSuceedValue() {
//   suceedValue.value = !suceedValue.value
// }
// // Event listener to toggle suceedValue when "j" key is pressed
// window.addEventListener('keydown', function (event) {
//   if (event.key === 'j') {
//     console.log(changeComponent)
//     toggleSuceedValue()
//     console.log(suceedValue.value) // Log the value for debugging
//   }
// })

// // Define a computed property to dynamically calculate the background CSS class
// const backgroundClass = computed(() => {
//   return suceedValue.value ? 'success-background' : ''
// })
// const router = useRouter()
// const store = useStore()

// // Animation for the background when suceedValue is true
// function destroyAnimation() {
//   const elements = [FireFly, RainEffect, MiddleText, RainMp3, InputField, summaryDisplay]

//   anime({
//     targets: '#app1',
//     scale: suceedValue.value ? 0.1 : 1, // Scale down to 10% of original size if succeedValue is true
//     opacity: suceedValue.value ? 0 : 1, // Fade out if succeedValue is true
//     borderRadius: ['0%', '70%'],
//     duration: 2000, // Duration of animation
//     easing: 'easeInOutQuad',
//     complete: () =>
//       // Your complete callback function here
//       router.push('/app2')
//   })
// }

// // Watch for changes in suceedValue and trigger the animation accordingly
// watch(suceedValue, (newValue) => {
//   destroyAnimation()
// })
</script>

<template>
  <div id="app1" :class="backgroundClass">
    <svgLogo class="svg-logo" />
    <!-- Other components and elements -->
    <FireFly class="absolute" />
    <RainEffect class="absolute" />
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
  --text-color: hsl(0, 0%, 100%);
}

#app1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  transition:
    transform 1s,
    opacity 1s; /* Add transition for smoother effect */
}

.absolute {
  display: absolute;
}
</style>
