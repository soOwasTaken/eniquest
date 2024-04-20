<template>
  <div class="terminal">
    <div class="header">Linux Terminal Emulator</div>
    <div class="output" ref="output">
      <div v-for="line in outputLines" :key="line" v-html="line"></div>
    </div>
    <div class="input-line">
      <span class="prompt">user@vuejs:</span>

      <input class="user-input" v-model="command" @keyup.enter="executeCommand" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      command: '',
      currentDirectory: '/',
      fileSystem: {
        '/': {
          'file1.txt': 'Content of file1.txt',
          'file2.txt': 'Content of file2.txt',
          'file3.txt': 'Content of file3.txt'
        }
      },
      commands: {
        help: 'Available commands:\n helps, clear, ls, cat, echo, cp, rm',
        about: 'This is a simple Linux terminal emulator built with Vue.js',
        contact: 'You can contact me at example@example.com',
        projects: 'Check out my projects on GitHub: https://github.com/example',
        clear: ''
      },
      outputLines: []
    }
  },
  methods: {
    executeCommand() {
      const [commandName, ...args] = this.command.trim().split(' ')
      console.log('User input:', this.command)
      const terminal = document.querySelector('body')
      if (this.command === 'why not') {
        terminal.style.backgroundColor = 'blue'
      }

      switch (commandName) {
        case 'help':
          this.printOutput(this.commands.help)
          break
        case 'about':
          this.printOutput(this.commands.about)
          break
        case 'clear':
          this.clearOutput()
          break
        case 'ls':
          this.printOutput(this.listDirectory(args[0]))
          break
        case 'cat':
          if (args.length === 1) {
            this.printOutput(this.readFile(args[0]))
          } else {
            this.printOutput('Usage: cat <filename>')
          }
          break
        case 'echo':
          this.echoCommand(args)
          break

        case 'cp':
          if (args.length === 2) {
            this.copyFile(args[0], args[1])
          } else {
            this.printOutput('Usage: cp <source_file> <destination>')
          }
          break
        case 'rm':
          if (args.length === 1) {
            this.removeFile(args[0])
          } else {
            this.printOutput('Usage: rm <filename>')
          }
          break
        default:
          this.printOutput(`${commandName}: command not found`)
      }

      this.command = ''
    },
    printOutput(output) {
      const prompt =
        this.currentDirectory === '/' ? 'user@vuejs:~$' : `user@vuejs:${this.currentDirectory}$`

      this.outputLines.push(
        `<p><span class="prompt" style="color: green;">${prompt}</span> <span class="command">${this.command}</span></p>`
      )
      if (output) {
        this.outputLines.push(`<p>${output}</p>`)
      }
    },
    clearOutput() {
      this.outputLines = []
    },
    listDirectory(directory) {
      directory = directory || this.currentDirectory // If no directory specified, use current directory
      const currentDirContent = this.fileSystem[directory]
      if (!currentDirContent) {
        return `Error: Cannot list contents of ${directory}. It may not exist or is not a directory.`
      }

      const items = Object.keys(currentDirContent)
      if (!Array.isArray(items)) {
        return 'Error: Directory contents could not be retrieved.'
      }

      let output = ''
      for (const item of items) {
        if (typeof currentDirContent[item] === 'object') {
          output += `<span style="color: blue;">${item}</span><br>`
        } else {
          output += `${item}<br>`
        }
      }

      return output
    },

    copyFile(source, destination) {
      const files = this.fileSystem[this.currentDirectory]
      if (files[source] !== undefined) {
        if (files[destination] === undefined) {
          const sourceContent = this.readFile(source)
          this.fileSystem[this.currentDirectory][destination] = sourceContent
          this.printOutput(`File '${source}' copied to '${destination}'.`)
        } else {
          this.printOutput(`File '${destination}' already exists.`)
        }
      } else {
        this.printOutput(`File '${source}' does not exist.`)
      }
    },
    removeFile(filename) {
      const files = this.fileSystem[this.currentDirectory]
      if (files[filename] !== undefined) {
        delete files[filename]
        this.printOutput(`File '${filename}' removed.`)
      } else {
        this.printOutput(`File '${filename}' does not exist.`)
      }
    },
    updateCursorPosition() {
      const input = this.$refs.input
      const cursor = this.$refs.cursor
      const inputWidth = input.clientWidth
      const cursorWidth = cursor.offsetWidth
      const cursorPosition = input.value.length * 8 // Assuming each character is 8 pixels wide
      cursor.style.left = `${cursorPosition - cursorWidth}px`
    },
    hideCursor() {
      document.body.style.cursor = 'none'
    },

    showCursor() {
      document.body.style.cursor = 'default'
    },
    echoCommand(args) {
      if (args.length >= 4 && (args[args.length - 2] === '>' || args[args.length - 2] === '>>')) {
        const content = args.slice(0, -2).join(' ').replace(/^"|"$/g, '') // Extract content from arguments (excluding redirection operators) and remove leading and trailing quotes
        const filename = args[args.length - 1]
        if (args[args.length - 2] === '>>') {
          // Append content to the file
          this.fileSystem[this.currentDirectory][filename] += ' ' + content
        } else {
          // Overwrite content of the file
          this.fileSystem[this.currentDirectory][filename] = content
        }
        this.printOutput('')
      } else {
        this.printOutput('Usage: echo "content" > filename or echo "content" >> filename')
      }
    }
  }
}
</script>

<style scoped>
.terminal {
  font-size: 24px;
  font-family: monospace;
  background-color: #000;
  color: #fff;
  padding: 20px;
  border-radius: 5px;
  max-width: 100%;
  margin: auto;
  height: 100%;
}

.header {
  font-size: 1.5em;
  margin-bottom: 24px;
}

.output {
  margin-bottom: 10px;
}

.input-line {
  display: flex;
}

.user-input {
  position: relative;
  display: inline-block;
  background-color: #000;
  color: #fff;
  border: none;
  font-size: 24px;
}
.input-line::after {
  content: '';
  position: absolute;
  top: 0;
  right: -15px;
  /* Remove display: inline-block if not required to be on the same line as text etc */
  display: inline-block;
  background-color: #606060;
  vertical-align: top;
  width: 10px;
  /* Set height to the line height of .text */
  height: 24px;
  /* 
	Animation paramaters:
	blink = animation-name, 
	1s = animation-duration, 
	step-end = animation-timing-function,
	infinite = animation-iteration-count
	*/
  -webkit-animation: blink 1s step-end infinite;
  animation: blink 1s step-end infinite;
}
@-webkit-keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.user-input:focus {
  border: none !important;
  border-color: #000 !important;
  outline: none;
}

.prompt {
  font-weight: bold;
  margin-right: 5px;
  color: green; /* Apply green color to all prompts */
}
</style>
