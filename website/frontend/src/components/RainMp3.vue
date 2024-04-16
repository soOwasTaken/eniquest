<template>
  <div>
    <!-- No buttons or visible UI elements needed for playing sound -->
  </div>
</template>

<script>
import soundFile from '../assets/rain-ambiant.mp3'
import { computed, watch } from 'vue'
// import { suceedValue } from './summaryDisplay.vue'

export default {
  data() {
    return {
      audio: new Audio(soundFile)
    }
  },
  // computed: {
  //   tryPause: function () {
  //     return this.suceedValue ? console.log('YESSSS') : ''
  //   }
  // },
  mounted() {
    this.audio.volume = 0.1 // Set volume to 10%
    this.playSound()
    // watch(suceedValue, (newValue) => {
    //   if (newValue) {
    //     this.stopSound() // Stop the sound if suceedValue is true
    //   }
    // })
  },
  methods: {
    playSound() {
      // Attempt to play sound; this might not work without user interaction due to browser policies
      this.audio.play().catch((e) => {
        console.error('Audio playback failed due to browser autoplay policy:', e)
      })
    },
    stopSound() {
      this.audio.pause() // Pause the sound
      this.audio.currentTime = 0 // Reset the sound
    }
  },
  beforeDestroy() {
    this.audio.pause() // Stop playing the sound when the component is destroyed
    this.audio.currentTime = 0 // Reset the sound
    this.audio.loop = true // Enable looping
  }
}
</script>
