<template>
  <div class="old-web">
    <h1>Old Web Search on Free Speech</h1>
    <input type="text" placeholder="Search Free Speech Articles..." readonly class="search-input"/>
    <button @click="showResults = true">Search</button>
    <div v-if="showResults" class="results">
      <h2>Search Results:</h2>
      <ul>
        <li><a href="#" class="link">The Evolution of Free Speech Online</a></li>
        <li><a href="#" class="link">Community Forums: Uniting Voices for Change</a></li>
        <li><a href="#" class="link">Blog Post: The Power of Words in the Digital Age</a></li>
      </ul>
    </div>
    <button @click="returnToMain">Return</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const showResults = ref(false);

function returnToMain() {
  // Implement returning logic here. For demonstration, it could just hide results
  showResults.value = false;
}
</script>

<style scoped>
.old-web {
  font-family: 'Courier New', Courier, monospace;
  color: #000;
  background-color: #F5F5F5;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.search-input, button {
  display: block;
  margin: 10px 0;
}

button {
  background: #008000;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.link {
  color: #0000FF;
  text-decoration: underline;
}

.results {
  margin-top: 20px;
}
</style>

