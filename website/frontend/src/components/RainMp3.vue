<template>
  <div>
    <!-- No buttons or visible UI elements needed for playing sound -->
  </div>
</template>

<script>
import soundFile from '../assets/rain-ambiant.mp3';

export default {
  data() {
    return {
      audio: new Audio(soundFile),
    };
  },
  mounted() {
    this.audio.volume = 0.1; // Set volume to 10%
    this.playSound();
  },
  methods: {
    playSound() {
      // Attempt to play sound; this might not work without user interaction due to browser policies
      this.audio.play().catch(e => {
        console.error("Audio playback failed due to browser autoplay policy:", e);
      });
    },
  },
  beforeDestroy() {
    this.audio.pause(); // Stop playing the sound when the component is destroyed
    this.audio.currentTime = 0; // Reset the sound
    this.audio.loop = true; // Enable looping
  },
};
</script>

