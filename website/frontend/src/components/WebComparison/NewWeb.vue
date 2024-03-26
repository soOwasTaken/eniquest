<template>
  <div class="new-web">
    <h1>New Web Search on Free Speech</h1>
    <input type="text" placeholder="Find Insights on Free Speech..." readonly class="search-input" />
    <button @click="showResults = true">Search</button>
    <div v-if="showResults" class="results">
      <h2>Search Results:</h2>
      <div class="ad">Ad: Discover the Best Communication Tools</div>
      <ul>
        <li><a href="#" class="link">Op-Ed: The Challenges of Free Speech in Social Media</a></li>
        <li><a href="#" class="link">Sponsored: Why Free Speech Matters in Tech Innovations</a></li>
      </ul>
      <div class="ad">Ad: Join Our Newsletter for More Free Speech Insights</div>
    </div>
    <button @click="returnToMain">Return</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showResults = ref(false);

function returnToMain() {
  // This function resets the showResults to hide the search results,
  // simulating a return to the main view. Adjust according to your app's flow.
  showResults.value = false;
}
</script>

<style scoped>
.new-web {
  font-family: 'Arial', sans-serif;
  color: #333;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  height: 100%;
  overflow-y: auto;
}

.search-input, button {
  display: block;
  margin: 10px 0;
}

button {
  background: linear-gradient(to right, #6a11cb 0%, #2575fc 100%);
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.link {
  color: #007BFF;
}

.ad {
  background-color: #FFFF00;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
}

.results {
  margin-top: 20px;
}
</style>

