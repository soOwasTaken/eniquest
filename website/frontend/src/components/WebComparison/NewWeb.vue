<template>
  <div v-if="!showWikipedia && !showMedium" class="new-web">
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
          <div v-if="item.type === 'result'" class="result" @click="handleResultClick(item.link)">
            <div class="result-header">
              <div class="circle" :style="{ backgroundColor: item.circleColor }"></div>

              <img class="website-logo" :src="item.websiteLogo" alt="" />

              <div class="website-name">
                <a href="#" class="link">{{ item.websiteName }}</a>
              </div>
            </div>
            <div class="result-url">
              <a :href="item.url">{{ item.url }}</a>
            </div>

            <h3 class="result-title">
              <a href="#" class="link">{{ item.title }}</a>
            </h3>
            <p class="result-snippet">{{ item.snippet }}</p>
          </div>
          <div v-else-if="item.type === 'ad'" class="ad">
            <h3 class="ad-title">
              <a href="#" class="link">{{ item.title }}</a>
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
  <div v-if="showWikipedia">
    <div class="wiki-container">
      <header class="wiki-header">
        <div class="wiki-logo-container">
          <img src="../../assets/wiki-logo.png" alt="Wackypedium logo" class="wiki-logo" />
          <h1 class="wiki-title">Wackypedium</h1>
        </div>
        <button class="toc-toggle" @click="toggleTableOfContents">
          <span class="toc-toggle-icon"></span>
        </button>
      </header>
      <nav
        ref="tableOfContents"
        class="table-of-contents"
        :class="{ hidden: isTableOfContentsHidden }"
      >
        <h2>menu</h2>
        <hr />
        <ul>
          <li>
            <a href="#introduction" @click="toggleTableOfContentsAndScrollToId('#introduction')"
              >Introduction</a
            >
          </li>
          <li>
            <a href="#history" @click="toggleTableOfContentsAndScrollToId('#history')">History</a>
          </li>
          <li>
            <a href="#importance" @click="toggleTableOfContentsAndScrollToId('#importance')"
              >Importance</a
            >
          </li>
          <li>
            <a href="#limitations" @click="toggleTableOfContentsAndScrollToId('#limitations')"
              >Limitations</a
            >
          </li>
          <li>
            <a href="#controversies" @click="toggleTableOfContentsAndScrollToId('#controversies')"
              >Controversies</a
            >
          </li>
          <li>
            <a href="#see-also" @click="toggleTableOfContentsAndScrollToId('#see-also')"
              >See Also</a
            >
          </li>
        </ul>
      </nav>
      <article class="article" @click="hideTableOfContents">
        <h1 id="title">Freedom of speech</h1>
        <div id="introduction">
          <div class="image-container">
            <img
              src="../../assets/roosevelt.jpg"
              alt="Description of the image"
              class="introduction-image"
            />
            <p class="image-description">
              Eleanor Roosevelt and the Universal Declaration of Human Rights (1948)—Article 19
              states that "Everyone has the right to freedom of opinion and expression; this right
              includes freedom to hold opinions without interference and to seek, receive and impart
              information and ideas through any media and regardless of frontiers."
            </p>
          </div>
          <div class="text">
            <h2>Introduction</h2>
            <p>
              Freedom of speech is a principle that supports the freedom of an individual or a
              community to articulate their opinions and ideas without fear of retaliation,
              censorship, or legal sanction. The term "freedom of expression" is sometimes used
              synonymously, but includes any act of seeking, receiving and imparting information or
              ideas, regardless of the medium used.
            </p>
            <p>
              In a democratic society, freedom of speech is seen as a fundamental right that allows
              citizens to participate in political decision-making and to hold their elected
              officials accountable. It is also seen as a means of promoting social progress, as it
              allows for the free exchange of ideas and the debate of controversial issues.
            </p>
          </div>
        </div>

        <h2 id="history">History</h2>
        <p>
          The concept of freedom of speech has its roots in ancient Greece, where citizens were
          encouraged to participate in public debate and to criticize their leaders. However, it was
          not until the Enlightenment era that the idea of freedom of speech as a fundamental human
          right began to take hold.
        </p>
        <p>
          In the United States, freedom of speech is protected by the First Amendment to the
          Constitution, which states that "Congress shall make no law...abridging the freedom of
          speech, or of the press." This protection has been interpreted broadly by the courts, and
          includes not only political speech, but also artistic expression, commercial speech, and
          even hate speech.
        </p>
        <h2 id="importance">Importance</h2>
        <p>
          Freedom of speech is considered to be one of the most important rights in a democratic
          society. It allows citizens to express their opinions and ideas freely, without fear of
          retaliation or censorship. This is essential for a healthy democracy, as it allows for the
          free exchange of ideas and the debate of controversial issues.
        </p>
        <p>
          Freedom of speech also allows for the exposure of corruption and abuse of power. Without
          it, those in power would be able to silence their critics and maintain their power without
          accountability.
        </p>
        <h2 id="limitations">Limitations</h2>
        <p>
          While freedom of speech is considered a fundamental right, it is not absolute. There are
          certain limitations to freedom of speech that are necessary to protect other rights and
          values.
        </p>
        <p>
          For example, speech that incites violence or hatred against a particular group of people
          is generally not protected. This includes speech that is intended to incite violence or
          discrimination based on race, religion, gender, sexual orientation, or other protected
          characteristics.
        </p>
        <p>
          Similarly, speech that is considered to be defamatory or libelous is not protected. This
          includes false statements that are made with the intent to harm someone's reputation or
          livelihood.
        </p>
        <h2 id="controversies">Controversies</h2>
        <p>
          Freedom of speech is a controversial issue, and there are many debates surrounding its
          limits and boundaries. Some argue that certain types of speech, such as hate speech or
          pornography, should be banned outright, while others argue that any restrictions on speech
          are a slippery slope towards censorship and authoritarianism.
        </p>
        <p>
          There are also debates surrounding the role of social media platforms in regulating
          speech. Some argue that these platforms have a responsibility to remove hate speech and
          other harmful content, while others argue that this would amount to censorship.
        </p>
        <h2 id="see-also">See Also</h2>
        <ul>
          <li><a href="#">Censorship</a></li>
          <li><a href="#">Freedom of the press</a></li>
          <li><a href="#">Hate speech</a></li>
          <li><a href="#">Libel</a></li>
          <li><a href="#">Slander</a></li>
        </ul>
      </article>
      <button @click="returnToMain">Return</button>
    </div>
  </div>
  <div v-if="showMedium">
    <div class="medium-article">
      <!-- Header -->
      <header class="header">
        <div class="left">
          <img src="../../assets/medium-logo.png" alt="Medium Logo" class="logo" />
          <input type="text" placeholder="Search Medium" class="search-bar" />
        </div>
        <div class="right">
          <button class="btn">Sign Up</button>
          <button class="btn">Sign In</button>
        </div>
      </header>

      <!-- Article Header -->
      <div class="article-header">
        <h1>{{ articleData.title }}</h1>
        <div class="theme">{{ articleData.theme }}</div>
        <div class="author-info">
          <img :src="articleData.author.image" alt="Author" class="author-image" />
          <div class="author-details">
            <p>{{ articleData.author.name }}</p>
            <p>{{ articleData.date }} &bull; {{ articleData.readingStats }}</p>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="main-content">
        <img :src="articleData.imageUrl" alt="Article Image" class="article-image" />
        <!-- <p class="image-caption">{{ article.imageCaption }}</p> -->
        <div class="article-text">
          <span class="opacity-1">
            {{ articleData.text1 }}
          </span>
          <span class="opacity-09">
            {{ articleData.text2 }}
          </span>
          <span class="opacity-08">
            {{ articleData.text3 }}
          </span>
          <span class="opacity-07">
            {{ articleData.text4 }}
          </span>
          <span class="opacity-06">
            {{ articleData.text5 }}
          </span>
          <span class="opacity-05">
            {{ articleData.text6 }}
          </span>
          <span class="opacity-04">
            {{ articleData.text7 }}
          </span>
          <span class="opacity-03">
            {{ articleData.text8 }}
          </span>
          <span class="opacity-02">
            {{ articleData.text9 }}
          </span>
          <span class="opacity-01">
            {{ articleData.text10 }}
          </span>
          <div class="signup">
            <span class="account-section">
              <p class="create-account">Create an account to read the full story.</p>
              <p>The author made this story available to Medium members only.</p>
              <p>If you’re new to Medium, create a new account to read this story on us.</p>
              <button class="btn">
                <img src="../../assets/boogle_but_just_b.png" alt="Boogle Logo" class="app-logo" />
                Sign up with Boogle
              </button>
              <button class="btn">
                <img src="../../assets/facebook-logo.png" alt="Fakebook Logo" class="app-logo" />
                Sign up with Fakebook
              </button>
              <button class="btn">
                <img src="../../assets/email-logo.png" alt="email Logo" class="app-logo" />Sign up
                with Email
              </button>
            </span>
          </div>
        </div>
        <div class="author-profile">
          <img :src="articleData.author.image" alt="Author Profile" class="author-profile-image" />
          <p>Written by {{ articleData.author.name }}</p>
          <p>{{ articleData.author.description }}</p>
          <button class="btn">Follow</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import wikilogo from '../../assets/wiki-logo.png'
import mediumlogo from '../../assets/medium-logo.png'
import studilogo from '../../assets/studi.png'

const showResults = ref(false)
const showWikipedia = ref(false)
const showMedium = ref(false)

const results = ref([
  {
    id: 2,
    websiteName: 'Wackypedium',
    websiteLogo: wikilogo,
    title: 'Freedom of speech',
    snippet:
      'Social media platforms have become a battleground for free speech. Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: 'wackypedia.org',
    url: 'https://en.wackypedium.org',
    circleColor: '#2CCED2'
  },
  {
    id: 3,
    websiteName: 'Medimu',
    websiteLogo: mediumlogo,
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: 'medimu.io',
    url: 'https://medimu.io',
    circleColor: '#CA3C66'
  },
  {
    id: 4,
    websiteName: 'Fake News',
    websiteLogo: studilogo,
    title: 'The Challenges of Free Speech in Social Media',
    snippet:
      'Social media platforms have become a battleground for free speech.Social media platforms have become a battleground for free speech. While they provide a platform for diverse voices...',
    link: '#',
    url: 'https://fakenews.com',
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
    snippet: 'Get fit with our personalized workout and nutrition plans.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Experience the thrill of adventure sports with our outdoor gear',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Get the entertainment you love with our streaming services and devices.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Upgrade your wardrobe with the latest fashion trends from top brands.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Relax and unwind with our luxurious spa and wellness products.',
    link: '#'
  },
  {
    id: 1,
    title: 'Advertisement',
    snippet: 'Upgrade your kitchen with our top-of-the-line appliances and cookware.',
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
}

function returnToMain() {
  showResults.value = false
  showWikipedia.value = false
  showMedium.value = false
}

function handleResultClick(link) {
  event.preventDefault()
  if (link === 'wackypedia.org') {
    showWikipedia.value = true
  }
  if (link === 'medimu.io') {
    showMedium.value = true
  }
}

const isTableOfContentsHidden = ref(true)

function toggleTableOfContents() {
  isTableOfContentsHidden.value = !isTableOfContentsHidden.value
}

function toggleTableOfContentsAndScrollToId(id) {
  toggleTableOfContents()
  const element = document.querySelector(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

function hideTableOfContents(event) {
  const toggleButton = event.target.closest('.toc-toggle')
  if (
    !isTableOfContentsHidden.value &&
    !event.target.closest('.table-of-contents') &&
    !toggleButton
  ) {
    isTableOfContentsHidden.value = true
  }
}

document.addEventListener('click', hideTableOfContents)
const articleData = ref({
  title: 'The Cancel Culture Is Deeper Than You Think',
  theme: 'Free Speech',
  author: {
    name: 'Johnny Bravo',
    description:
      'Former counselor and current diligent observer of our sociopolitical scene. I celebrate the spirit AND reason, and try to ‘connect the dots’ in my writing.',
    image: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  date: 'March 28, 2024',
  readingStats: '1000 Reads',
  imageUrl: 'https://source.unsplash.com/1600x900/?censorship',
  imageCaption: 'Image caption',
  text1: `Free speech stands as a cornerstone of democratic societies, championing the fundamental right of individuals to express their thoughts, opinions, and beliefs without fear of censorship or retribution. It serves as `,
  text2: `a catalyst for progress, fostering open dialogue, challenging entrenched ideas, and paving the way for societal change. Yet, the concept o`,
  text3: `f free speech is not without its complexities and limitations, as it navigates the delicat`,
  text4: `e balance between protecting individual liberties `,
  text5: `and safeguarding against harm. In its esse`,
  text6: `nce, however, the freedom to express one`,
  text7: `self freely remains a bed`,
  text8: `rock principl`,
  text9: `e, essen`,
  text10: `tial.`
})
</script>

<style scoped>
.new-web {
  font-family: 'Roboto', sans-serif;
  color: #333;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100%;
  width: 50%;
  position: relative; /* added */
  z-index: 1; /* added */
  overflow-y: auto;
}

.new-web .header {
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
.website-name .link {
  color: #000;
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
.result-header .result-url {
  font-size: 12px;
  color: #555;
  opacity: 0.6;
  margin-bottom: 5px;
}
.result-url a {
  color: #000;
  text-decoration: none;
}
.website-logo {
  width: 40px;
  height: 40px;
  margin-right: 5px;
}

.website-name {
  font-size: 20px;
  margin-left: 10px;
}
.circle {
  width: 30px;
  height: 30px;
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

/* WIKIPEDIA STYLES */

.wiki-container {
  position: fixed;
  display: block;
  overflow-y: auto;
  width: 50%;
  height: 100%;
  background-color: #fff;
  color: #000;
}

.wiki-container header {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ccc;
  height: 100px;
  position: relative;
  left: 10%;
}

.wiki-logo-container {
  display: flex;
  align-items: center;
}

.wiki-logo {
  height: 70px;
  margin-right: 20px;
}

.wiki-title {
  font-size: 2rem;
  margin: 0;
}
.wiki-container .table_and_article {
  display: flex;
}
.wiki-container .table-of-contents {
  position: fixed;
  flex: 0 0 200px;
  padding: 20px;
  border-right: 1px solid #ccc;
  overflow-y: auto;
  margin-top: 100px;
  background-color: #666464f4;
  color: #fff;
  border-radius: 0 38px 38px 0;
}

.wiki-container .table-of-contents h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.wiki-container .table-of-contents ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.wiki-container .table-of-contents a {
  display: block;
  font-size: 1.1rem;
  color: #f9f9f9;
  text-decoration: none;
  padding: 5px 0;
}

.wiki-container .table-of-contents a:hover {
  background-color: #f5f5f5;
  color: #000;
  border-radius: 0 10px 10px 0;
}

.wiki-container .article {
  flex: 1;
  margin-left: 50px;
  padding: 20px;
  overflow-y: auto;
}

.wiki-container .article h1 {
  margin-top: 0;
  font-size: 2.5rem;
}

.wiki-container .article h2,
.wiki-container .article h3,
.wiki-container .article h4,
.wiki-container .article h5,
.wiki-container .article h6 {
  margin-top: 0;
}

.wiki-container .article p {
  margin-bottom: 20px;
}

.wiki-container .toc-toggle {
  position: fixed;
  top: 130px;
  left: 50.5%;
  width: 46px;
  height: 46px;
  background-color: #474646da;
  color: #fff;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
}

.wiki-container .toc-toggle-icon {
  display: block;
  width: 18px;
  height: 2px;
  background-color: #fff;
  margin-bottom: 4px;
  position: relative;
}

.wiki-container .toc-toggle-icon::before,
.wiki-container .toc-toggle-icon::after {
  content: '';
  display: block;
  width: 18px;
  height: 2px;
  background-color: #fff;
  position: absolute;
}

.wiki-container .toc-toggle-icon::before {
  margin-bottom: 4px;
  top: -8px;
}

.wiki-container .toc-toggle-icon::after {
  bottom: -8px;
}

.hidden {
  display: none;
}
#introduction {
  display: flex;
  flex-direction: row-reverse;
}

.wiki-container .image-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: 5%;
  border: 2px solid #00000041; /* Add this line */
  border-radius: 6px;
  padding: 10px; /* You can optionally add some padding for better spacing */
  width: 60%;
  background-color: #b2b1b1;
}

.wiki-container .introduction-image {
  width: 190px;
  height: auto;
}

.wiki-container .image-description {
  margin-top: 10px;
  margin-left: 10%;
  font-style: italic;
  font-size: 12px;
  width: 80%;
}

/* MEDIUM */

.medium-article {
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-width: 50%;
  background-color: #ffffff;
  color: #000000;
}

/* Header Styles */
.medium-article .header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.medium-article .logo {
  position: relative;
  width: 40px;
  vertical-align: middle;
  left: 1px;
}
.create-account {
  font-size: 30px;
}
.medium-article .app-logo {
  width: 20px; /* Adjust the size as needed */
  height: auto;
  margin-right: 5px; /* Adjust the spacing between the logo and text */
  vertical-align: middle;
}

.medium-article .search-bar {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 200px;
}

/* Article Header Styles */
.medium-article .article-header {
  padding: 20px;
}

.medium-article .theme {
  color: #999;
  font-size: 14px;
}

.medium-article .author-info {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.medium-article .author-image {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

/* Main Content Styles */
.medium-article .main-content {
  padding: 20px;
}

.medium-article .article-image {
  width: 100%;
  margin-bottom: 20px;
}
.medium-article .signup {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%; /* Adjust the height if needed */
  margin: 5%;
}
.medium-article .image-caption {
  font-style: italic;
  color: #888;
}

.medium-article .article-text p {
  margin-bottom: 20px;
}

.opacity-1 {
  opacity: 1;
}
.opacity-09 {
  opacity: 0.8;
}
.opacity-08 {
  opacity: 0.6;
}
.opacity-07 {
  opacity: 0.4;
}
.opacity-06 {
  opacity: 0.3;
}
.opacity-05 {
  opacity: 0.25;
}
.opacity-04 {
  opacity: 0.24;
}
.opacity-03 {
  opacity: 0.22;
}
.opacity-02 {
  opacity: 0.2;
}
.opacity-01 {
  opacity: 0.15;
}

.medium-article .account-section {
  opacity: 1;
  text-align: center;
}

.medium-article .author-profile {
  margin-top: 20px;
  text-align: center;
}

.medium-article .author-profile-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.medium-article .btn {
  display: inline-block;
  padding: 10px 20px;
  margin-right: 10px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  border: 1px solid #0f0f0f34;
}
.medium-article .header .btn {
  background-color: #000000;
  color: #ffffff;
  font-weight: 20px;
}
.medium-article .signup .btn {
  display: block;
  width: 210px;
  position: relative;
  left: 25%;
  margin: 2%;
  text-align-last: left;
}
.medium-article .btn:hover {
  background-color: #e7be07ca;
  color: #000000;
  font-weight: 400;
}

@media screen and (max-width: 768px) {
  .wiki-container {
    flex-direction: column;
  }
  .wiki-container .table-of-contents {
    border-right: none;
    border-bottom: 1px solid #ccc;
  }
  .wiki-container .article {
    padding: 20px 20px 0;
  }
}
</style>
