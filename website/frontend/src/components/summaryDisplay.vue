<template>
  <div id="summaryDisplay" ref="summaryDisplay"></div>
</template>

<script>
export default {
  name: "SummaryDisplay",
  methods: {
    setSummary(data) {
      const summaryParagraph = document.createElement("p");
      summaryParagraph.textContent = data.summary;

      if (data.scoreResult === 0) {
        summaryParagraph.style.color = "#A0153E";
      } else {
        summaryParagraph.style.color = "#65B741";
      }

      summaryParagraph.classList.add("text-reveal");
      this.$refs.summaryDisplay.innerHTML = "";
      this.$refs.summaryDisplay.appendChild(summaryParagraph);

      setTimeout(() => {
        summaryParagraph.style.animation = "fadeOut 1s ease-in-out forwards";
      }, 6000);
    },
  },
};
</script>
<style>
#summaryDisplay {
  text-align: center;
}


.text-reveal {
  opacity: 0;
  font-family: "Oswald", sans-serif;
  font-size:30px;
  animation: fadeIn 2s ease-in-out forwards;
  text-transform:uppercase;
  font-style:italic;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

</style>

