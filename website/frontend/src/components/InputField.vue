<template>
  <div id="input" ref="input"></div>
  <input type="text" id="hiddenInput" ref="hiddenInput" />
</template>
<script>
export default {
  name: 'InputField',
  data() {
    return {
      content: [],
      lastContent: '',
      targetContent: '',
      inputLock: false,
      autoWriteTimer: null,
      isMobile: false,
      isIE: false,
      cursor: null
    }
  },
  mounted() {
    this.isMobile =
      navigator && navigator.platform && navigator.platform.match(/^(iPad|iPod|iPhone)$/)
    this.isIE = navigator.appName === 'Microsoft Internet Explorer'

    this.$refs.hiddenInput.focus()

    this.cursor = document.createElement('span')
    this.cursor.setAttribute('class', 'blink')
    this.cursor.innerHTML = '|'
    if (!this.isMobile && !this.isIE) this.$refs.input.appendChild(this.cursor)

    this.autoWriteTimer = setTimeout(() => {
      if (this.lastContent !== '') return
      this.targetContent = 'You can type here to answer the above question.'
      this.refresh()
    }, 1000)

    this.addEventListeners()

    this.$refs.hiddenInput.addEventListener('keypress', this.handleKeyPress)
  },
  beforeUnmount() {
    this.removeEventListeners()
  },
  methods: {
    refresh() {
      this.inputLock = false // This debugged the click locking the input.

      if (this.targetContent.length - this.lastContent.length === 0) return

      let v = this.targetContent.substring(0, this.lastContent.length + 1)

      this.content = []

      let blinkPadding = false

      for (let i = 0; i < v.length; i++) {
        let l = v.charAt(i)

        let d = document.createElement('div')
        d.setAttribute('class', 'letterContainer')

        let d2 = document.createElement('div')

        let animClass = i % 2 === 0 ? 'letterAnimTop' : 'letterAnimBottom'

        let letterClass = this.lastContent.charAt(i) === l ? 'letterStatic' : animClass

        if (letterClass !== 'letterStatic') blinkPadding = true

        d2.setAttribute('class', letterClass)

        d.appendChild(d2)

        d2.innerHTML = l
        this.content.push(d)
      }

      this.$refs.input.innerHTML = ''

      for (let i = 0; i < this.content.length; i++) {
        this.$refs.input.appendChild(this.content[i])
      }

      this.cursor.style.paddingLeft = blinkPadding ? '22px' : '0'

      if (!this.isMobile && !this.isIE) this.$refs.input.appendChild(this.cursor)

      if (this.targetContent.length - this.lastContent.length > 1)
        setTimeout(() => this.refresh(), 60)
      else this.inputLock = false

      this.lastContent = v
    },
    addEventListeners() {
      document.addEventListener('touchstart', this.onTouchStart)
      document.addEventListener('click', this.onClick)

      if (!this.isIE) {
        this.$refs.hiddenInput.addEventListener('input', this.onInput)
      } else {
        this.autoWriteTimer = this.targetContent = this.$refs.hiddenInput.value
      }
    },
    removeEventListeners() {
      document.removeEventListener('touchstart', this.onTouchStart)

      if (!this.isIE) {
        this.$refs.hiddenInput.removeEventListener('input', this.onInput)
      } else {
        clearInterval(this.autoWriteTimer)
      }
    },
    onTouchStart() {
      clearInterval(this.autoWriteTimer)
      this.targetContent = this.lastContent
    },
    onClick() {
      if (
        this.targetContent === 'You can type here to answer the above question' &&
        this.lastContent !== ''
      ) {
        this.targetContent = this.lastContent
      }
      this.$refs.hiddenInput.focus()
    },
    onInput(e) {
      e.preventDefault()
      this.targetContent = this.$refs.hiddenInput.value
      if (!this.inputLock) this.refresh()
    },
    handleKeyPress(e) {
      if (e.key === 'Enter') {
        const userInput = e.target.value
        const token = localStorage.getItem('token');
        if (userInput.length >= 1) {
          fetch('/processPrompt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}` // Include the token in the Authorization header
            },
            body: JSON.stringify({ content: userInput })
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok')
              }
              return response.json()
            })
            .then((data) => {
              this.$parent.$refs.summaryDisplay.setSummary(data)
            })
            .catch((error) => console.error('Error:', error))
        }
      }
    }
  }
}
</script>
<style>
#hiddenInput {
  font-family: 'Oswald', sans-serif;
  font-size: 32px;
  background-color: #808080;
  align-content: center;
  opacity: 0.4;
  margin-top: -22px;
  margin-left: -125px;
  opacity: 0;
  filter: alpha(opacity = 0);
  pointer-events: none;
}

#input {
  font-family: 'Oswald', sans-serif;
  color: #ffffff;
  align-content: center;
  font-size: 32px;
  white-space: pre-wrap;
  word-wrap: break-word;
  text-transform: uppercase;
  width: 1000px;
  margin-bottom: 20px;
}

.letterContainer {
  display: inline;
}

.letterStatic {
  display: inline;
}

.letterAnimTop {
  display: inline;
  position: absolute;
  -webkit-animation: dropTop 0.1s ease;
  -moz-animation: dropTop 0.1s ease;
}

.letterAnimBottom {
  display: inline;
  position: absolute;
  -webkit-animation: dropBottom 0.1s ease;

  -moz-animation: dropBottom 0.1s ease;
}

/*.letterAnimTop, .letterAnimBottom {
    position:relative;
}*/

.blink {
  position: static;
  top: -5px;
  animation: blink 0.35s ease-in-out infinite alternate;
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes dropTop {
  from {
    -moz-transform: translateX(0) translateY(-20px) translateZ(20px) rotateX(90deg);
    transform: translateX(0) translateY(-20px) translateZ(20px) rotateX(90deg);
  }

  to {
    -moz-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
    transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
  }
}

@-moz-keyframes dropBottom {
  from {
    -moz-transform: translateY(20px) translateZ(20px) rotateX(-90deg);
    transform: translateY(20px) translateZ(20px) rotateX(-90deg);
  }
  to {
    -moz-transform: rotateX(0deg);
    transform: rotateX(0deg);
  }
}

@-webkit-keyframes dropTop {
  from {
    -webkit-transform: translateX(0) translateY(-20px) translateZ(20px) rotateX(90deg);
  }
  to {
    -webkit-transform: translateX(0) translateY(0) translateZ(0) rotateX(0deg);
  }
}

@-webkit-keyframes dropBottom {
  from {
    -webkit-transform: translateY(20px) translateZ(20px) rotateX(-90deg);
  }
  to {
    -webkit-transform: rotateX(0deg);
  }
}

#summaryDisplay {
  font-size: 50;
}
</style>
