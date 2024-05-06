<template>
  <div class="color-picker">
    <div class="dot" :style="{ backgroundColor: redColor }" @mousedown="startDrag('red')"></div>
    <div class="dot" :style="{ backgroundColor: greenColor }" @mousedown="startDrag('green')"></div>
    <div class="dot" :style="{ backgroundColor: blueColor }" @mousedown="startDrag('blue')"></div>
  </div>
</template>

<script>
import anime from 'animejs';

export default {
  data() {
    return {
      dragging: null,
    };
  },
  methods: {
    startDrag(color) {
      // ...
    },
    handleDrag(event) {
      // ...
    },
    endDrag() {
      // ...
    },
  },
  computed: {
    redColor() {
      return `rgb(${this.colorValues.red}, 0, 0)`;
    },
    greenColor() {
      return `rgb(0, ${this.colorValues.green}, 0)`;
    },
    blueColor() {
      return `rgb(0, 0, ${this.colorValues.blue})`;
    },
  },
  props: {
    colorValues: {
      type: Object,
      required: true,
    },
  },
};
</script>

