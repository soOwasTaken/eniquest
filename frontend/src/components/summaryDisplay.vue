<template>
  <div id="summaryDisplay" ref="summaryDisplayRef"></div>
</template>

<script>
import { inject, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import anime from 'animejs/lib/anime.es.js'
import { useStore } from 'vuex'

export default {
  name: 'SummaryDisplay',
  setup() {
    const summaryDisplayRef = ref(null)
    const store = useStore()
    const router = useRouter()

    const gameSuccess = computed(() => store.getters.gameSuccess)

    const setSummary = (data) => {
      const summaryParagraph = document.createElement('p')
      summaryParagraph.textContent = data.summary

      if (data.scoreResult === 0) {
        summaryParagraph.style.color = '#A0153E'
      } else {
        summaryParagraph.style.color = '#65B741'
        setTimeout(() => {
          console.log('newversionk7')
          store.dispatch('updateGameSuccess', { gameIndex: 0, success: true })
          anime({
            targets: '#app1',
            scale: [1, 0.1],
            opacity: 0,
            borderRadius: ['0%', '70%'],
            duration: 2000,
            easing: 'easeInOutQuad',
            complete: () => {
              setTimeout(() => {
                router.push('/app2')
              }, 1500)
            }
          })
        }, 7000) //might change later the time here
      }

      summaryParagraph.classList.add('text-reveal')
      summaryDisplayRef.value.innerHTML = ''
      summaryDisplayRef.value.appendChild(summaryParagraph)

      setTimeout(() => {
        summaryParagraph.style.animation = 'fadeOut 1s ease-in-out forwards'
      }, 6000)
    }

    return { summaryDisplayRef, gameSuccess, setSummary }
  }
}
</script>

<style>
#summaryDisplay {
  text-align: center;
}

.text-reveal {
  opacity: 0;
  font-family: 'Oswald', sans-serif;
  font-size: 30px;
  animation: fadeIn 2s ease-in-out forwards;
  text-transform: uppercase;
  font-style: italic;
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
