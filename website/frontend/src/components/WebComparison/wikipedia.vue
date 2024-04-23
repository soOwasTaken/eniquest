<template>
  <div class="wiki-container">
    <header class="wiki-header">
      <div class="wiki-logo-container">
        <img src="../../assets/wiki-logo.png" alt="Wackypedia logo" class="wiki-logo" />
        <h1 class="wiki-title">Wackypedia</h1>
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
          <a href="#see-also" @click="toggleTableOfContentsAndScrollToId('#see-also')">See Also</a>
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
            Eleanor Roosevelt and the Universal Declaration of Human Rights (1948)—Article 19 states
            that "Everyone has the right to freedom of opinion and expression; this right includes
            freedom to hold opinions without interference and to seek, receive and impart
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
            citizens to participate in political decision-making and to hold their elected officials
            accountable. It is also seen as a means of promoting social progress, as it allows for
            the free exchange of ideas and the debate of controversial issues.
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
        Freedom of speech also allows for the exposure of corruption and abuse of power. Without it,
        those in power would be able to silence their critics and maintain their power without
        accountability.
      </p>
      <h2 id="limitations">Limitations</h2>
      <p>
        While freedom of speech is considered a fundamental right, it is not absolute. There are
        certain limitations to freedom of speech that are necessary to protect other rights and
        values.
      </p>
      <p>
        For example, speech that incites violence or hatred against a particular group of people is
        generally not protected. This includes speech that is intended to incite violence or
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
        There are also debates surrounding the role of social media platforms in regulating speech.
        Some argue that these platforms have a responsibility to remove hate speech and other
        harmful content, while others argue that this would amount to censorship.
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
  </div>
</template>

<script>
export default {
  data() {
    return { isTableOfContentsHidden: true }
  },
  methods: {
    toggleTableOfContents() {
      this.isTableOfContentsHidden = !this.isTableOfContentsHidden
    },
    toggleTableOfContentsAndScrollToId(id) {
      this.toggleTableOfContents()
      const element = document.querySelector(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    },
    hideTableOfContents(event) {
      const toggleButton = event.target.closest('.toc-toggle')
      if (
        !this.isTableOfContentsHidden &&
        !event.target.closest('.table-of-contents') &&
        !toggleButton
      ) {
        this.isTableOfContentsHidden = true
      }
    }
  },
  mounted() {
    document.addEventListener('click', this.hideTableOfContents)
  },
  beforeDestroy() {
    document.removeEventListener('click', this.hideTableOfContents)
  }
}
</script>

<style scoped>
.wiki-container {
  display: block;
  overflow-y: auto;
  width: 50%;
  overflow-x: hidden;
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
  top: 30px;
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
