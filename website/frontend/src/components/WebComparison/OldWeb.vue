<template>
  <div class="old-web">
    <!-- Conditionally render the top bar along with the search results -->
    <div v-if="showResults" class="top-bar">
      <img src="../../assets/boogle-old.png" alt="boogle-logo" class="logo" />
      <input type="text" placeholder="Search Free Speech Articles..." readonly class="search-input"/>
      <button @click="showResults = true; currentPage = ''">Search</button>
    </div>
    <div v-if="showResults && currentPage === ''">
      <div class="results">
        <h2 class="search-status">Search Results for Search Free Speech Articles... Results 1 - 3 of about 102,000,000. Search took 0.40seconds.</h2>
        <ul>
          <li>
            <a @click.prevent="openPage('pageOne')" class="link">The Evolution of Free Speech Online</a>
            <p>Let's talk of the evolution of <span style ="font-weight: bold">free speech</span> online...</p>
            <p><span style ="font-weight: bold">Description:</span> a article about how the...</p>
            <p><span style ="font-weight: bold">Category :</span> Computers > Internet > WWW ...</p>
            <span class="green">www.we-talk.com/ - 47k</span>
          </li>
          <li>
            <a @click.prevent="openPage('pageTwo')" class="link">Community Forums: Uniting Voices for Change</a>
            <p>Community forum online on <span style ="font-weight:bold">free speech</span></p>
            <p><span style ="font-weight: bold">Description:</span> a forum to discuss with everyone...</p>
            <p><span style ="font-weight: bold">Category :</span> Forum > Internet > Sharing ...</p>
            <span class="green">www.lets-share-about.com/ - 54k</span>
          </li>
          <li>
            <a @click.prevent="openPage('pageThree')" class="link">The Fuargian</a>
              <p>The unlimited <span style="font-weight:bold">Free Speech</span> Society...</p>
              <p><span style ="font-weight: bold">Description:</span> journalism...</p>
              <p><span style ="font-weight: bold">Category :</span> Media > Journalism ...</p>
              <span class="green">www.the-fuargian.com/ - 37k</span>
          </li>
        </ul>
      </div>
      <div class="footer-search">
      <p>Result page : <span style="color:red">1</span></p>
      </div>
    </div>

    <!-- Page content is shown based on the current page state -->

    <div v-if="currentPage === 'pageOne'">
      <div class="topBarInWebsite">
      <button @click="returnToMain"><-</button>
      <input type="text" placeholder="http://wwww.we-talk.com/article-48938.html" readonly class="search-input"/>
      <div class="page-content">

        <div class="bannerWeTalk">
          <pre>
 __        __       _____     _ _                            __  
 \ \      / /__    |_   _|_ _| | | __  ___ ___  _ __ ___    / /  
  \ \ /\ / / _ \_____| |/ _` | | |/ / / __/ _ \| '_ ` _ \  / /   
   \ V  V /  __/_____| | (_| | |   < | (_| (_) | | | | | |/ /    
    \_/\_/ \___|     |_|\__,_|_|_|\_(_)___\___/|_| |_| |_/_/     
                                                                
      </pre>
        </div>
        <div class="menu-weTalk">
          <button @click.prevent="" style="margin-right: 10px;">Home</button>
          <button @click.prevent="" style="margin-right: 10px;">About Us</button>
          <button @click.prevent="">Contact</button>
        </div>
        <h1>The Evolution of Free Speech Online</h1>
        <p><em>Date: April 5, 2000. Author: John Doe.</em></p>
        <hr>
        <p>
          From the inception of the World Wide Web in the early 1990s, the internet was envisioned as the 
          ultimate platform for free expression. It promised an era where information could be exchanged 
          freely, and voices from across the globe could be heard without the constraints of traditional 
          media gatekeepers.
        </p>
        <h2>The Dawn of Digital Discourse</h2>
        <p>
          The explosion of personal websites and forums in the late '90s provided a first taste of this new world. 
          People from all walks of life began to share their thoughts, creations, and criticisms online. This 
          era of digital discourse was marked by a sense of community and a shared belief in the democratizing 
          power of the internet.
        </p>
        <h2>Rise of the Blogosphere</h2>
        <p>

          By the turn of the millennium, the "blogosphere" had taken shape, offering a platform for more 
          structured and sustained narratives. Blogs ranged from personal diaries to specialized news services, 
          challenging traditional journalism and creating a new paradigm for news dissemination and public discourse.
        </p>
        <h2>Social Media: A Double-Edged Sword</h2>
        <p>
          The advent of social media platforms transformed the landscape once again. Initially celebrated as tools 
          for further democratization, these platforms soon faced criticism for facilitating echo chambers, spreading 
          misinformation, and enabling surveillance and censorship.
        </p>
        <h2>Legal and Ethical Challenges</h2>
        <p>
          The evolution of free speech online has not been without its legal and ethical challenges. The anonymity 
          and immediacy of the internet have sparked debates over privacy, hate speech, and the spread of 
          disinformation. Balancing the right to free expression with the need for accountability and safety online 

          remains a contentious issue.
        </p>
        <h2>Looking to the Future</h2>
        <p>
          Despite the challenges, the internet continues to offer unparalleled opportunities for free speech and 
          innovation. As we navigate the complexities of the digital age, it is crucial to preserve the open 
          and free nature of the internet while addressing the legitimate concerns that have arisen.
        </p>
        <p>
          The story of free speech online is still unfolding, and its trajectory will be shaped by the choices 
          we make today. It is up to us to ensure that the internet remains a force for good, empowering voices 
          around the world and fostering an informed and engaged global citizenry.
        </p>
        <h2>The Global Perspective</h2>
        <p>As the internet grew into a global network, the concept of free speech encountered varied interpretations influenced by cultural, political, and social differences. Countries with strong free speech protections saw the internet as a tool to reinforce democratic values, while in more restrictive regimes, it became a battleground for censorship and resistance. The Arab Spring, for instance, highlighted the internet's role in organizing and amplifying calls for freedom and democracy, showcasing its power to challenge the status quo and mobilize societal change on a global scale.
        </p>
        <hr>
        <center>we-talk© 1999 - 2002</center>
      </div>
      </div>
    </div>
    <div v-if="currentPage === 'pageTwo'">
      <div class="topBarInWebsite">
      <button @click="returnToMain"><-</button>
      <input type="text" placeholder="http://lets-share-about.com/forum.html" readonly class="search-input"/>
      </div>
    </div>
    <div v-if="currentPage === 'pageThree'">
      <div class="topBarInWebsite">
      <button @click="returnToMain"><-</button>
      <input type="text" placeholder="http://www.the-fuargian.com/news-3490.html" readonly class="search-input"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showResults = ref(true); // Initially show the search results
const currentPage = ref(''); // Initially, no specific page content is displayed

function openPage(pageName) {
  currentPage.value = pageName;
  showResults.value = false; // Hide the search results when a page is opened
}

function returnToMain() {

  currentPage.value = ''; // Reset to no specific page
  showResults.value = true; // Show the search results again
}
</script>


<style scoped>

.old-web {
  font-family: 'Courier New', Courier, monospace;
  color: #000;
  background-color: #F5F5F5;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.search-input {
  width: 350px;
  height: 30px;
}

.top-bar {
  display: flex;
  flex-direction: inline;
  max-width: 700px;
  align-items: center;
  justify-content: space-between;
}

.footer-search {
 position:absolute;
 display:flex;
 width: 50%;
 justify-content:center;
 bottom:20px;
}
.search-status {
  font-size: 14px;
  background-color: blue;
  color: white;
  font-weight:bold;
}

li p {
  font-family: "arial";
  font-size:12px;
  margin: 0px;
  padding: 0px;
}

.green {
  color: green;
}

.logo {
  max-height: 100px;
}

button {
  background: grey;
  color: #fff;
  border: none;
  padding: 7px 10px;
  cursor: pointer;
}

.link {
  color: #0000FF;
  text-decoration: underline;

}


.results {
  margin-top: 20px;
}

/* Transition for simulating slow page load */
.slow-fade-enter-active, .slow-fade-leave-active {
  transition: opacity 2s; /* Adjust the duration to simulate slower or faster loading */
}
.slow-fade-enter, .slow-fade-leave-to /* Starting and ending states for the transition */ {
  opacity: 0;
}


/* First page content style */

.menu-weTalk {
  text-align: center;
  margin-bottom: 20px;
}


.menu-weTalk button {
  background-color: lightblue;
  color: black;
  border: none;
  padding: 5px 15px;

  cursor: not-allowed; /* Indicates the buttons are inactive */
  font-family: 'Courier New', monospace;
}

.page-content {
  font-family: 'Courier New', Courier, monospace;
  color: #000;
  background-color: #F5F5F5;
  padding: 20px;
  overflow-y: auto;
}


.page-content h1, .page-content h2 {
  color: #000080;
}

.page-content hr {
  border: 0;
  height: 1px;
  background-color: #000080;
  margin: 20px 0;

}


.page-content p, .page-content em {
  text-align: justify;
  margin: 10px 0;
}

.link, .page-content a {
  color: #0000FF;
  text-decoration: underline;
}

.page-content em {
  font-style: italic;
}

.bannerWeTalk pre {
  font-family: 'Courier New', Courier, monospace;
  white-space: pre-wrap;
  word-wrap: break-word; /* Prevents long lines from overflowing */
  padding-left: 150px;
  font-weight: bold;
  line-height: 0.9;
  margin: 0;
}
</style>
