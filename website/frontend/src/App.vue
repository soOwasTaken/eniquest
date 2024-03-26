<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import OldWeb from './components/WebComparison/OldWeb.vue';
import NewWeb from './components/WebComparison/NewWeb.vue';
</script>
<template>
  <div id="app">
    <div class="web-container">
      <OldWeb />
      <div class="divider"></div>
      <NewWeb />
    </div>
  </div>
</template>
<style>
.web-container {
  display: flex;
  height: 100vh; /* Use 100% of the viewport height */
  overflow: hidden; /* Prevent scrolling outside the containers */
}

/* Ensure each web component takes up half the width */
.old-web, .new-web {
  width: 50%;
  overflow-y: auto; /* Enable vertical scrolling within each component */
  height: 100%;
}


.divider {
  background-color: #ccc; /* Light grey line for separation */
  width: 2px; /* Thickness of the divider line */
  height: auto; /* Take the full height available */
}
</style>
