<template>
  <section class="wrapper">
    <div class="above-top">Where does the</div>
    <div class="top">Freespeech</div>
    <div class="bottom" aria-hidden="true">Freespeech</div>
    <div class="under-bottom"> stop for you?</div>
  </section>
</template>

<script>
export default {
  name: 'MiddleText',
};
</script>

<style scoped>

.wrapper {
  margin-top: 18vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: white;
  font-family: "Oswald", sans-serif;
  align-items: center;
  position: relative; /* Add position relative here */
  font-size: clamp(1.5rem, 1rem + 18vw, 7rem);
  font-weight: 700;
  text-transform: uppercase;
}
.above-top, .under-bottom {
  font-size: calc(0.3em + 1vw);
  justify-content:center;
  margin: 40px 0;
}

.top, .bottom {
  position: absolute; /* Change display: grid to position: absolute */
  width: max-content;
}

.top {
  clip-path: polygon(0% 0%, 100% 0%, 100% 48%, 0% 58%);
}

.bottom {
  clip-path: polygon(0% 60%, 100% 50%, 100% 100%, 0% 100%);
  color: transparent;
  background: -webkit-linear-gradient(177deg, black 53%, white 65%);
  background: linear-gradient(177deg, black 53%, white 65%);
  background-clip: text;
  -webkit-background-clip: text;
  transform: translateX(-0.02em);
}
</style>

