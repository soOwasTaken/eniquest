<template>
  <div class="main-container">
    <div class="color-picker-container">
      <div class="color-picker">
        <div class="dot red-dot" ref="redDot" @mousedown="startDrag('red')" @touchstart="startDrag('red')"></div>
        <div class="dot green-dot" ref="greenDot" @mousedown="startDrag('green')" @touchstart="startDrag('green')"></div>
        <div class="dot blue-dot" ref="blueDot" @mousedown="startDrag('blue')" @touchstart="startDrag('blue')"></div>
      </div>
    </div>
    <div class="picture-container">
      <img src="../assets/color.png" alt="dot-image">
    </div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  methods: {
    startDrag(color) {
      document.addEventListener('mousemove', this.handleDrag);
      document.addEventListener('mouseup', this.endDrag);
      document.addEventListener('touchmove', this.handleDrag);
      document.addEventListener('touchend', this.endDrag);
      this.dragging = color;
    },
    handleDrag(event) {
      if (this.dragging) {
        const dot = this.$refs[this.dragging + 'Dot'];
        const rect = dot.parentElement.getBoundingClientRect();
        const y = event.clientY || event.touches[0].clientY;
        const yOffset = y - rect.top;

        // Calculate newPos as a percentage of the rect height
        const newPosPercent = Math.max(0, Math.min(100, (yOffset / rect.height) * 100));
        dot.style.top = newPosPercent + '%';

        // Calculate the value based on the new position
        let value = Math.round(((100 - newPosPercent) / 50) * 127);
        value = Math.min(Math.max(value, 10), 255); // Clamp value between 0 and 255

        let newColor = '';

        if (this.dragging === 'red') {
          newColor = `rgb(${value}, 0, 0)`; /* Updated to only change the red value */
        } else if (this.dragging === 'green') {
          newColor = `rgb(0, ${value}, 0)`;
        } else if (this.dragging === 'blue') {
          newColor = `rgb(0, 0, ${value})`;
        }

        anime({
          targets: dot,
          backgroundColor: newColor,
          easing: 'linear',
          duration: 0, // Instant color change
        });

        this.$emit('color-change', { [this.dragging]: value });
      }
    },
    endDrag() {
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchmove', this.handleDrag);
      document.removeEventListener('touchend', this.endDrag);
      this.dragging = null;
    }
  },
};
</script>

<style>

.main-container {
  display: flex;
  height: 100vh; /* Use the full height of the viewport */
  width: 100vw; /* Use the full width of the viewport */
}

.color-picker-container {
  width: 20%; /* Take up 20% of the screen width */
  display: flex;
  justify-content: center; /* Center children horizontally */
  align-items: center; /* Center children vertically */
  height: 100%; /* Take up the full height of the parent container */
}

.picture-container {
  width: 80%; /* Take up 80% of the screen width */
  display: flex;

  justify-content: center; /* Center the image horizontally */
  align-items: center; /* Center the image vertically */
  height: 100%; /* Take up the full height of the parent container */
}

.picture-container img {
  max-width: 100%; /* Ensure the image is responsive and fits within the container */
  max-height: 100%;
  height: auto; /* Maintain aspect ratio */
}

.color-picker {
  position: relative;
  width: 100%; /* Ensure the container uses the full width */
  height: 600px; /* Adjust height to fit dots */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Dot base styles remain unchanged */

.dot {
  position: absolute; /* You might adjust this if needed */
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;

  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  filter: blur(2px);
}

/* Specific dot positioning */
.red-dot {
  background-color: rgb(127, 0, 0);
  left: calc(50% - 60px); /* Adjust based on the total width and desired gap */
}

.green-dot {
  left: 50%; /* Center dot */
  background-color: rgb(0, 127, 0);
}

.blue-dot {
  left: calc(50% + 60px); /* Adjust based on the total width and desired gap */
  background-color: rgb(0, 0, 127);
}
</style>

