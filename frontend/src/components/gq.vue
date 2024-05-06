<template>
  <div>
    <p>
      In a universe where censorship reigns, a paradise of free speech exists.
    </p>
    <p>This paradise resembles a unique pink planet.</p>
    <p>Find out what this paradise is.</p>
    <div class="container">
      <p class="questionMark">
    01011001 01101111 01110101 00100000 01110011 01101000 01101111 01110101 01101100 01100100 00100000 01110010 01100101 01100001 01101100 01101100 01111001 00100000 01100011 01101000 01100101 01100011 01101011 01101111 01110101 01110100 00100000 01110100 01101000 01101001 01110011 00100000 01101100 01101001 01101110 01101011 00100000 01110100 01101111 00100000 01100110 01101001 01101110 01100100 00100000 01100001 00100000 01100001 01101110 01110011 01110111 01100101 01110010 00100000 01100110 01101111 01110010 00100000 01110011 01110101 01110010 01100101 00001010 01101000 01110100 01110100 01110000 01110011 00111010 00101111 00101111 01100111 01100001 01101100 01100001 01111000 01111001 01110001 01110101 01100101 01110011 01110100 00101101 00110001 01100011 00111000 00110010 00110100 01100011 00110100 00110100 00110000 00110101 01100100 01100110 00101110 01101000 01100101 01110010 01101111 01101011 01110101 01100001 01110000 01110000 00101110 01100011 01101111 01101101 00001010 01000011 01101111 01101110 01100111 01110010 01100001 01110100 01110101 01101100 01100001 01110100 01101001 01101111 01101110 00100000 01101111 01101110 00100000 01100110 01101001 01101110 01100100 01101001 01101110 01100111 00100000 01110100 01101000 01100001 01110100 00100000 01110100 01101000 01101001 01110011 00100000 01101101 01100101 01110011 01110011 01100001 01100111 01100101 00100000 01110111 01100001 01110011 00100000 01101001 01101110 00100000 01010101 01101110 01101001 01100011 01101111 01100100 01100101 00101110

      </p>
    </div>
    <form @submit.prevent="checkAnswer">
      <input
        v-for="i in 8"
        :key="i"
        type="text"
        :id="'letter' + i"
        maxlength="1"
        size="1"
        style="width: 20px"
        @input="handleInput($event, i)"
        @keydown="handleKeyDown($event, i)"
      />
      <button type="submit">Check</button>
    </form>
  </div>
</template>

<script>
export default {
  methods: {
    checkAnswer() {
      let answer = "";
      for (let i = 1; i <= 8; i++) {
        answer += this.$refs['letter' + i][0].value.toLowerCase();
      }
      if (answer === "aetheria") {
        alert("Correct ! Vous avez trouvé le paradis de la liberté d'expression.");
      } else {
        alert("Désolé, ce n'est pas correct. Veuillez réessayer.");
      }
    },
    handleInput(event, index) {
      if (event.target.value.length >= 1) {
        if (index < 8) {
          this.$refs['letter' + (index + 1)][0].focus();
        }
      }
    },
    handleKeyDown(event, index) {
      if (event.key === "Backspace" && event.target.value.length === 0) {
        if (index > 1) {
          this.$refs['letter' + (index - 1)][0].focus();
        }
      }
    }
  }
}
</script>
<style scoped>
body {
  font-family: Arial, sans-serif;
  background-color: blue;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Make sure the body takes the full viewport height */
  margin: 0; /* Remove default margin */
}

.questionMark {
  background-color: #000; /* Dark background */
  color: #fff; /* White text */
  width: 50%; /* Take up 50% of the container's width */
  margin: 0 auto; /* Center horizontally, effectively leaving 25% on both sides */
  overflow-y: auto; /* Enable vertical scrolling if content overflows */
  padding: 20px; /* Add some padding inside the dark background */
  box-sizing: border-box; /* Include padding in the width calculation */
  line-height: 1.6; /* Increase line height for readability */
  word-wrap: break-word; /* Ensure words do not overflow the container */
  font-size:54px;
}

/* If you want the container to specifically take up less height, you can adjust this as needed */
.questionMark {
  max-height: 70vh; /* Example: Limit the height to encourage scrolling */
}

</style>

