<template>
  <div class="new-web">
    <div class="header">
      <img src="../../assets/boogle.png" alt="Logo" class="logo" />
      <div class="searchBox">
        <input class="searchInput" type="text" name="" value="Free speech" readonly />
        <button @click="showAllResults" class="searchButton" href="#">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
          >
            <g clip-path="url(#clip0_2_17)">
              <g filter="url(#filter0_d_2_17)">
                <path
                  d="M23.7953 23.9182L19.0585 19.1814M19.0585 19.1814C19.8188 18.4211 20.4219 17.5185 20.8333 16.5251C21.2448 15.5318 21.4566 14.4671 21.4566 13.3919C21.4566 12.3167 21.2448 11.252 20.8333 10.2587C20.4219 9.2653 19.8188 8.36271 19.0585 7.60242C18.2982 6.84214 17.3956 6.23905 16.4022 5.82759C15.4089 5.41612 14.3442 5.20435 13.269 5.20435C12.1938 5.20435 11.1291 5.41612 10.1358 5.82759C9.1424 6.23905 8.23981 6.84214 7.47953 7.60242C5.94407 9.13789 5.08145 11.2204 5.08145 13.3919C5.08145 15.5634 5.94407 17.6459 7.47953 19.1814C9.01499 20.7168 11.0975 21.5794 13.269 21.5794C15.4405 21.5794 17.523 20.7168 19.0585 19.1814Z"
                  stroke="white"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  shape-rendering="crispEdges"
                ></path>
              </g>
            </g>
            <defs>
              <filter
                id="filter0_d_2_17"
                x="-0.418549"
                y="3.70435"
                width="29.7139"
                height="29.7139"
                filterUnits="userSpaceOnUse"
                color-interpolation-filters="sRGB"
              >
                <feFlood flood-opacity="0" result="BackgroundImageFix"></feFlood>
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                ></feColorMatrix>
                <feOffset dy="4"></feOffset>
                <feGaussianBlur stdDeviation="2"></feGaussianBlur>
                <feComposite in2="hardAlpha" operator="out"></feComposite>
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                ></feColorMatrix>
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_2_17"
                ></feBlend>
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_2_17"
                  result="shape"
                ></feBlend>
              </filter>
              <clipPath id="clip0_2_17">
                <rect
                  width="28.0702"
                  height="28.0702"
                  fill="white"
                  transform="translate(0.403503 0.526367)"
                ></rect>
              </clipPath>
            </defs>
          </svg>
        </button>
      </div>
    </div>
    <div v-if="showResults" class="separator">
      <h2 class="separator-text">All results</h2>
      <p class="separator-subtext">About 598,416,515 results (0.28 seconds)</p>
    </div>
    <div v-if="showResults" class="results-container">
      <div class="results">
        <div v-for="(item, index) in combinedResults" :key="index">
          <div v-if="item.type === 'result'" class="result">
            <div class="result-header">
              <div class="circle" :style="{ backgroundColor: item.circleColor }"></div>
              <div class="website-name">
                <a :href="item.link" class="link">{{ item.websiteName }}</a>
              </div>
            </div>
            <div class="result-url">{{ item.url }}</div>
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
      <div class="related-container">
        <div class="image-grid">
          <img src="../../assets/free_speech_2.jpg" alt="Image 1" class="image" id="censor" />
          <img src="../../assets/free_speech.jpg" alt="Image 2" class="image" id="hand" />
          <img
            src="../../assets/free-speech-issue-image.jpg"
            alt="Image 3"
            class="image"
            id="mouth"
          />
        </div>
        <h2 class="related-header">Freedom of speech</h2>

        <p class="related-text">
          Freedom of speech is a principle that supports the freedom of an individual or a community
          to articulate their opinions and ideas without fear of retaliation, censorship, or legal
          sanction.
        </p>
        <div class="people-also-search-for">
          <h3>People also search for</h3>
          <hr />
          <div class="images">
            <div class="image">
              <img src="../../assets/press.jpg" alt="Freedom of the press" />
              <p>Freedom of the press</p>
            </div>
            <div class="image">
              <img src="../../assets/assembly.jpg" alt="Freedom of assembly" />
              <p>Freedom of assembly</p>
            </div>
            <div class="image">
              <img src="../../assets/rights.png" alt="Human rights" />
              <p>Human rights</p>
            </div>
            <div class="image">
              <img src="../../assets/association.jpg" alt="Freedom of association" />
              <p>Freedom of association</p>
            </div>
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
      'Social media platforms have become a battleground for free speech. Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#',
    url: 'yessirmonsieuroui.io',
    circleColor: '#955149'
  },
  {
    id: 3,
    websiteName: 'Website3',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#',
    url: 'yessirmonsieuroui.io',
    circleColor: '#CA3C66'
  },
  {
    id: 4,
    websiteName: 'Website4',
    websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#',
    url: 'yessirmonsieuroui.io',
    circleColor: '#FFBF66'
  }
  // {
  //   id: 5,
  //   websiteName: 'Website5',
  //   websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
  //   title: 'The Challenges of Free Speech in Social Media',
  //   snippet:
  //     'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
  //   link: '#',
  //   url: 'yessirmonsieuroui.io',
  //   circleColor: '#BED3C3'
  // },
  // {
  //   id: 6,
  //   websiteName: 'Website6',
  //   websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
  //   title: 'The Challenges of Free Speech in Social Media',
  //   snippet:
  //     'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
  //   link: '#',
  //   url: 'yessirmonsieuroui.io',
  //   circleColor: '#2CCED2'
  // },
  // {
  //   id: 7,
  //   websiteName: 'Website7',
  //   websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
  //   title: 'The Challenges of Free Speech in Social Media',
  //   snippet:
  //     'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
  //   link: '#',
  //   url: 'yessirmonsieuroui.io',
  //   circleColor: '#317AC1'
  // },
  // {
  //   id: 8,
  //   websiteName: 'Website8',
  //   websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
  //   title: 'The Challenges of Free Speech in Social Media',
  //   snippet:
  //     'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
  //   link: '#',
  //   url: 'yessirmonsieuroui.io',
  //   circleColor: '#D4D3DC'
  // },
  // {
  //   id: 9,
  //   websiteName: 'Website9',
  //   websiteLogo: '../../assets/original-cd7890c4b80f3da5be1c485b0ea15f5c.jpg',
  //   title: 'The Challenges of Free Speech in Social Media',
  //   snippet:
  //     'Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
  //   link: '#',
  //   url: 'yessirmonsieuroui.io',
  //   circleColor: '#80586D'
  // }
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
  let resultsAndAds = []
  let adIndex = 0

  for (let i = 0; i < results.value.length; i++) {
    if (adIndex < ads.value.length) {
      resultsAndAds.push({ type: 'ad', ...ads.value[adIndex] })
      adIndex++
    }
    resultsAndAds.push({ type: 'result', ...results.value[i] })
  }

  resultsAndAds.splice(1, 0, { type: 'peopleAlsoAsk', ...peopleAlsoAsk.value[0] })

  combinedResults.value = resultsAndAds
}

combineResults()
function showAllResults() {
  showResults.value = true
  showRelatedSearches.value = true
}
function returnToMain() {
  showResults.value = false
  showRelatedSearches.value = false
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
  margin-bottom: 50px;
  margin-top: 20px;
}

.logo {
  width: 200px;
  height: 60px;
  margin-right: 40px;
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
  margin: 25px 0 0 40px;
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
.results-container {
  display: flex;
  flex-wrap: wrap;
}
.results {
  flex: 2;
  margin-right: 20px;
  margin-top: 20px;
  margin-left: 40px;
}
.related-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;

  border-radius: 8px;
  border: 2px solid #ccc;
  height: 100%;
  max-height: 51rem;
  /* overflow-y: auto; */
}
.image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 0;
  grid-auto-rows: minmax(100px, auto);
  overflow: hidden;
}
.image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
.image-grid > :first-child {
  grid-row: 1 / span 2;
  grid-column: 1;
  height: 195px;
  object-position: 70% 20%;
  border-radius: 8px 0 0 0;
}
.image-grid > :nth-child(2) {
  grid-row: 1;
  grid-column: 2;
  border-radius: 0 8px 0 0;
}

.image-grid > :last-child {
  grid-row: 2;
  grid-column: 1 / span 2; /* span full width */
}

.related-header {
  font-size: 22px;
  font-weight: bold;
  text-align: center;
  opacity: 0.8;
}

.related-text {
  font-size: 13px;
  text-align: center;
  max-width: 100%;
  opacity: 0.7;
}

.people-also-search-for {
  margin-top: 3rem;
}

.people-also-search-for h3 {
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 1rem;
  opacity: 0.8;
}

.people-also-search-for .images {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
}

.people-also-search-for .image {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.people-also-search-for .image img {
  width: 100px;
  height: 58px;
  max-width: 150px;
  margin-bottom: 0.5rem;
  border-radius: 8px;
}

.people-also-search-for .image p {
  font-size: 0.9rem;
  opacity: 0.7;
  text-align: center;
}

.result,
.ad {
  margin-bottom: 20px;
  margin-top: 40px;
}

.result-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.result-url {
  font-size: 12px;
  color: #555;
  opacity: 0.6;
  margin-bottom: 5px;
}

.website-logo {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}

.website-name {
  font-size: 20px;
  margin-left: 10px;
}
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 5px;
  position: relative;
  clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
  animation: rotate 2.2s infinite;
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.website-name .link:hover {
  text-decoration: none;
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
  background-color: #d8d6d6;
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
  font-weight: bold;
  color: #333;
  margin: 0;
}

.question {
  margin-bottom: 0px;
  cursor: pointer;
}

.question .separator {
  margin-left: 0;
}

.question-text {
  font-size: 16px;
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
  opacity: 0.9;
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

/* SEARCH BUTTON */
.searchBox {
  display: flex;
  width: 430px;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  background: #2f3640;
  border-radius: 50px;
  position: relative;
}

.searchButton {
  color: white;
  position: absolute;
  right: 0.5px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: var(--gradient-2, linear-gradient(90deg, #07ad0a 0%, #fbe600 100%));
  border: 0;
  display: inline-block;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
}
/*hover effect*/
button:hover {
  color: #fff;
  background-color: #1a1a1a;
  box-shadow: rgba(0, 0, 0, 0.5) 0 10px 20px;
  transform: translateY(-3px);
}
/*button pressing effect*/
button:active {
  box-shadow: none;
  transform: translateY(0);
}

.searchInput {
  border: none;
  background: none;
  outline: none;
  color: white;
  font-size: 17px;
  padding: 14px 15px 14px 26px;
}

.group {
  display: flex;
  line-height: 28px;
  align-items: center;
  position: relative;
  max-width: 190px;
}

hr {
  border: none;
  height: 1px;
  background-color: #cccccc;
  margin: 20px 0;
}
</style>
