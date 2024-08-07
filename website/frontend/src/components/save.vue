<template>
  <div class="main-container">
    <div class="color-picker-container">
      <div class="color-picker">
        <div class="dot red-dot" ref="redDot" @mousedown="startDrag('red')" @touchstart="startDrag('red')">
          <div class="dot-inner">
            <span class="dot-value">{{ updateDotValue('red') }}</span>
          </div>
        </div>
        <div class="dot green-dot" ref="greenDot" @mousedown="startDrag('green')" @touchstart="startDrag('green')">
          <div class="dot-inner">
            <span class="dot-value">{{ updateDotValue('green') }}</span>
          </div>
        </div>
        <div class="dot blue-dot" ref="blueDot" @mousedown="startDrag('blue')" @touchstart="startDrag('blue')">
          <div class="dot-inner">
            <span class="dot-value">{{ updateDotValue('blue') }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="picture-container" :style="{ filter: colorFilter }">
      <img src="../assets/color.png" alt="dot-image">
    </div>
  </div>
</template>

<script>
  import anime from 'animejs';

  export default {
    data() {
      return {
        red: 42,
        green: 160,
        blue: 254,
        percentValues: {
          red: 53,
          green: 53,
          blue: 53,
        },
        dragging:null,
        initialMouseY: null,
      };
    },
    computed: {
      colorFilter() {
        return `brightness(${((this.red / 255) * 100) * 4 }%) contrast(${((1 - (this.green / 255)) * 100) * 2}%) hue-rotate(${(this.blue / 255) * 360}deg)`;
      },
    },
    methods: {
      startDrag(color, event) {
        this.dragging = color;
        this.initialMouseY = event.clientY || event.touches[0].clientY;
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('touchmove', this.handleDrag);
        document.addEventListener('mouseup', this.endDrag);
        document.addEventListener('touchend', this.endDrag);
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

          if (this.dragging === 'red') {
            this.red = value;
          } else if (this.dragging === 'green') {
            this.green = value;
          } else if (this.dragging === 'blue') {
            this.blue = value;
          }

          this.setDotColor(dot, value, this.dragging);
          this.percentValues[this.dragging] = 100 - newPosPercent;
        }
      },
      endDrag() {
        document.removeEventListener('mousemove', this.handleDrag);
        document.removeEventListener('mouseup', this.endDrag);
        document.removeEventListener('touchmove', this.handleDrag);
        document.removeEventListener('touchend', this.endDrag);
        this.dragging = null;
      },
      setDotColor(dot, value, colorType) {
        let newColor = '';

        if (colorType === 'red') {

          const greyscale = (255 - value) / 255;
          newColor = `rgb(${greyscale * 255}, ${greyscale * 255}, ${greyscale * 255})`;
        } else if (colorType === 'green') {
          const lightGrey = 220;
          const greyscale = (255 - value) / 255;
          const redComponent = lightGrey + (greyscale * (255 - lightGrey));
          newColor = `rgb(${redComponent}, ${greyscale * 255}, ${greyscale * 255})`;
        } else if (colorType === 'blue') {
          newColor = `rgb(${this.red}, ${this.green}, ${this.blue})`;
        }

        anime({
          targets: dot,
          backgroundColor: newColor,
          easing: 'linear',
          duration: 0, // Instant color change
        });
      },
    endDrag() {
      document.removeEventListener('mousemove', this.handleDrag);
      document.removeEventListener('mouseup', this.endDrag);
      document.removeEventListener('touchmove', this.handleDrag);
      document.removeEventListener('touchend', this.endDrag);
      this.dragging = null;
    },
    updateDotValue(color) {
      return Math.round(this.percentValues[color]) + '%';
    },
    mounted() {
      this.setDotColor(this.$refs.redDot, this.red, 'red');
      this.setDotColor(this.$refs.greenDot, this.green, 'green');
      this.setDotColor(this.$refs.blueDot, this.blue, 'blue');
    },
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
.dot {
  position: absolute;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  cursor: pointer;
  filter: blue(2px);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot-inner {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.dot-value {
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  color: white;
  user-select: none;
  pointer-events: none;
}


/* Specific dot positioning */
.red-dot {
  left: calc(50% - 100px);
}

.green-dot {
  left: 50%;
}

.blue-dot {
  left: calc(50% + 100px);

}
</style>

