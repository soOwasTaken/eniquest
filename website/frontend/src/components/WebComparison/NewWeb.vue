<template>
  <div class="new-web">
    <div class="header">
      <img src="../../assets/boogle.png" alt="Logo" class="logo" />
      <input type="text" placeholder="Find Insights on Free Speech..." class="search-input" />
      <button @click="showResults = true">Search</button>
    </div>
    <div v-if="showResults" class="separator">
      <h2 class="separator-text">All results</h2>
      <p class="separator-subtext">About 598,416,515 results (0.28 seconds)</p>
    </div>
    <div v-if="showResults" class="results">
      <div v-for="(item, index) in combinedResults" :key="index">
        <div v-if="item.type === 'result'" class="result">
          <div class="result-header">
            <div class="website-name">{{ item.websiteName }}</div>
          </div>
          <h3 class="result-title">
            <a :href="item.link" class="link">{{ item.title }}</a>
          </h3>
          <p class="result-snippet">{{ item.snippet }}</p>
        </div>
        <div v-else-if="item.type === 'ad'" class="ad">
          <h3 class="ad-title">
            <a :href="item.link" class="link">{{ item.title }}</a>
          </h3>
          <p class="ad-snippet">{{ item.snippet }}</p>
        </div>
        <div v-else-if="item.type === 'peopleAlsoAsk'" class="people-also-ask">
          <h3 class="people-also-ask-title">People also ask</h3>
          <div v-for="(question, qIndex) in item.questions" :key="qIndex" class="question">
            <div @click="question.showAnswer = !question.showAnswer" class="question-text">
              <span class="question-symbol">{{ question.showAnswer ? '-' : '+' }}</span>
              {{ question.text }}
            </div>
            <div v-if="question.showAnswer" class="answer-text">{{ question.answer }}</div>
            <div v-if="qIndex < item.questions.length - 1" class="separator"></div>
          </div>
        </div>
      </div>
    </div>
    <button @click="returnToMain">Return</button>
    <footer class="footer">
      <p class="footer-text">Consumer information</p>
      <p class="footer-text">Report inappropriate content</p>
    </footer>
  </div>
</template>
<script setup>
import { ref } from 'vue'

const showResults = ref(false)

const results = ref([
  {
    id: 2,
    websiteName: 'Website2',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 3,
    websiteName: 'Website3',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 4,
    websiteName: 'Website4',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 5,
    websiteName: 'Website5',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 6,
    websiteName: 'Website6',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 7,
    websiteName: 'Website7',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 8,
    websiteName: 'Website8',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  },
  {
    id: 9,
    websiteName: 'Website9',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#'
  }
  // Add more results here
])

const ads = ref([
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Discover the best communication tools for your business.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Discover the best communication tools for your business.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Discover the best communication tools for your business.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Discover the best communication tools for your business.',
    link: '#'
  }
  // Add more ads here
])

const peopleAlsoAsk = ref([
  {
    id: 1,
    questions: [
      {
        text: 'What is the message of freedom of speech?',
        answer:
          'Everyone has the right to freedom of opinion and expression; this right includes freedom to hold opinions without interference and to seek, receive and impart information and ideas through any media and regardless of frontiers.',
        showAnswer: false
      },
      {
        text: 'What is the justification for free speech?',
        answer:
          "The Basic Justification— The most familiar argument for freedom of speech is that speech promotes the discovery of truth. Found in Milton's Areopagitica11 and in eloquent opinions by Holmes12 and Brandeis,13 the argument is the core of John Stuart Mill's defense of freedom of speech in On Liberty.",
        showAnswer: false
      },
      {
        text: 'What is the primary purpose of free speech?',
        answer:
          'The right to freedom of speech allows individuals to express themselves without government interference or regulation. The Supreme Court requires the government to provide substantial justification for interference with the right of free speech when it attempts to regulate the content of the speech.',
        showAnswer: false
      }
      // Add more questions here
    ]
  }
])

const combinedResults = ref([])

function combineResults() {
  let resultsAndAds = [...results.value]
  let adIndex = 0

  for (let i = 0; i < resultsAndAds.length; i++) {
    if ((i + 1) % 3 === 0 && adIndex < ads.value.length) {
      resultsAndAds.splice(i + 1, 0, { type: 'ad', ...ads.value[adIndex] })
      adIndex++
    }
  }

  resultsAndAds.splice(1, 0, { type: 'peopleAlsoAsk', ...peopleAlsoAsk.value[0] })

  combinedResults.value = resultsAndAds.map((result) => ({ type: 'result', ...result }))
}

combineResults()

function returnToMain() {
  showResults.value = false
}
</script>

<style scoped>
.new-web {
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  overflow-y: auto;
}

.header {
  display: flex;
  align-items: center;
}

.logo {
  width: 100px;
  height: 60px;
  margin-right: 10px;
}

.search-input,
button {
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
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.separator {
  border-top: 1px solid #ccc;
  margin: 40px 0 0 0;
}

.separator-text {
  font-size: 15px;
  font-weight: normal;
  color: #666;

  display: inline-block;
  position: relative;
  top: -25px;
  left: 0px;
  margin: 0;
}

.separator-subtext {
  font-size: 13px;
  color: #666;
  margin: 0;
  position: relative;
  top: -10px;
  left: 10px;
}

.results {
  margin-top: 20px;
}

.result,
.ad {
  margin-bottom: 20px;
}

.result-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.website-logo {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.website-name {
  font-size: 14px;
  color: #555;
}

.result-title,
.ad-title {
  margin: 0;
}

.result-snippet,
.ad-snippet {
  color: #555;
  margin: 0;
}

.ad {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}

.people-also-ask {
  border-top: 1px solid #ccc;
  padding-top: 10px;
  margin-top: 20px;
}

.people-also-ask-title {
  font-size: 18px;
  font-weight: normal;
  color: #333;
  margin: 0;
}

.question {
  margin-bottom: 10px;
  cursor: pointer;
}

.question-text {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  display: flex;
  align-items: center;
  margin: 0;
}

.question-symbol {
  font-size: 18px;
  font-weight: bold;
  margin-right: 5px;
}

.answer-text {
  font-size: 14px;
  color: #555;
  margin: 0;
}

.footer {
  border-top: 1px solid #ccc;
  padding: 10px 0;
  margin-top: 20px;
  text-align: center;
}

.footer-text {
  font-size: 14px;
  color: #666;
  margin: 0;
}
</style>
