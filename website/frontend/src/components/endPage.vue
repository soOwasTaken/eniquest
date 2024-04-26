<template>
  <div class="achievement-container">
    <h1 class="achievement-title">Congratulations!</h1>
    <p class="achievement-subtitle">
      You have completed all the enigmas. More enigmas will be added soon. Stay tuned!
    </p>
    <div class="email-notification">
      <div class="checkbox-wrapper-46">
        <input type="checkbox" id="cbx-46" class="inp-cbx" v-model="wantsUpdate" />
        <label for="cbx-46" class="cbx"
          ><span>
            <svg viewBox="0 0 12 10" height="10px" width="12px">
              <polyline points="1.5 6 4.5 9 10.5 1"></polyline></svg></span
          ><span class="email-label"
            >Do you want to receive an email when there are more enigmas ?</span
          >
        </label>
      </div>

      <!-- <input type="checkbox" id="email-check" v-model="wantsUpdate" />
      <label for="email-check" class="email-label"
        >Do you want to receive an email when there are more enigmas ?</label
      > -->
    </div>
    <!-- <button class="submit-button" @click="submitUpdatePreference">Submit</button> -->
    <button @click="submitUpdatePreference">
      Submit
      <span></span>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      wantsUpdate: false
    }
  },
  methods: {
    submitUpdatePreference() {
      fetch('/api/update-user-preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ wantsUpdate: this.wantsUpdate })
      })
        .then((response) => {
          if (response.ok) {
            alert('Your preference has been updated.')
          } else {
            throw new Error('Network response was not ok.')
          }
        })
        .catch((error) => {
          console.error('There was a problem with the fetch operation:', error)
        })
    }
  }
}
</script>

<style scoped>
.achievement-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #78161638;
}

.achievement-title {
  font-size: 3em;
  font-weight: bold;
  color: #b59207;
  margin-top: 0;
  text-transform: uppercase;
  letter-spacing: 15px;
}

.achievement-subtitle {
  font-size: 1.5em;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva,
    Verdana, sans-serif;
  color: #b2b2b2;
  margin-top: 20px;
  text-align: center;
  letter-spacing: 5px;
  word-spacing: 5px;
}

.email-notification {
  display: flex;
  align-items: center;
  margin-top: 50px;
  scale: 2;
}

.email-label {
  font-size: 0.8em;
  color: #7d7d7db8;
  margin-left: 2px;
}

.submit-button {
  background-color: #4caf50;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 60px;
  margin-top: 50px;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.submit-button:hover {
  background-color: #1d6921;
  transform: translateY(-10%);
}
.checkbox-wrapper-46 input[type='checkbox'] {
  display: none;
  visibility: hidden;
}

.checkbox-wrapper-46 .cbx {
  margin: auto;
  -webkit-user-select: none;
  user-select: none;
  cursor: pointer;
}
.checkbox-wrapper-46 .cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.checkbox-wrapper-46 .cbx span:first-child {
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  transform: scale(1);
  vertical-align: middle;
  border: 1px solid #9098a9;
  transition: all 0.2s ease;
}
.checkbox-wrapper-46 .cbx span:first-child svg {
  position: absolute;
  top: 3px;
  left: 2px;
  fill: none;
  stroke: #ffffff;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
}
.checkbox-wrapper-46 .cbx span:first-child:before {
  content: '';
  width: 100%;
  height: 100%;
  background: #506eec;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
}
.checkbox-wrapper-46 .cbx span:last-child {
  padding-left: 8px;
}
.checkbox-wrapper-46 .cbx:hover span:first-child {
  border-color: #506eec;
}

.checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child {
  background: #000;
  border-color: #506eec;
  animation: wave-46 0.4s ease;
}
.checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.checkbox-wrapper-46 .inp-cbx:checked + .cbx span:first-child:before {
  transform: scale(3.5);
  opacity: 0;
  transition: all 0.6s ease;
}
button {
  border: none;
  display: block;
  position: relative;
  margin-top: 2%;
  padding: 0.7em 2.4em;
  font-size: 18px;
  background: transparent;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  color: rgb(15, 124, 24);
  z-index: 1;
  font-family: monospace;
  font-weight: bold;
  letter-spacing: 5px;
  text-transform: uppercase;
  transition: all 0.3s ease;
}

button span {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  z-index: -1;
  border: 4px solid rgb(15, 124, 24);
}

button span::before {
  content: '';
  display: block;
  position: absolute;
  width: 8%;
  height: 500%;
  background: var(--lightgray);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-60deg);
  transition: all 0.3s;
}

button:hover span::before {
  transform: translate(-50%, -50%) rotate(-90deg);
  width: 100%;
  background: rgb(15, 124, 24);
}

button:hover {
  color: white;
  transform: translateY(8%);
}

button:active span::before {
  background: #2751cd;
}
@keyframes wave-46 {
  50% {
    transform: scale(0.9);
  }
}
</style>
