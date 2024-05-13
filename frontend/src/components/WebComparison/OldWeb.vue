<template>
  <div class="old-web">
    <!-- Conditionally render the top bar along with the search results -->
    <div v-if="!showWebsite && !showResult" class="top-bar">
      <img src="../../assets/boogle-old.png" alt="boogle-logo" class="logo" />
      <input
        type="text"
        placeholder="Search Free Speech Articles..."
        readonly
        class="search-input"
      />
      <button @click="(showResults = true), (currentPage = '')">Search</button>
    </div>
    <div v-if="showResults && currentPage === ''">
      <div class="results">
        <h2 class="search-status">
          Search Results for Search Free Speech Articles... Results 1 - 3 of about 102,000,000.
          Search took 0.40seconds.
        </h2>
        <ul>
          <li>
            <a @click.prevent="openPage('pageOne')" class="link"
              >The Evolution of Free Speech Online</a
            >
            <p>
              Let's talk of the evolution of
              <span style="font-weight: bold">free speech</span> online...
            </p>
            <p><span style="font-weight: bold">Description:</span> a article about how the...</p>
            <p><span style="font-weight: bold">Category :</span> Computers > Internet > WWW ...</p>
            <span @click="openPage('pageOne')" class="green">www.we-talk.com/ - 47k</span>
          </li>
          <li>
            <a @click.prevent="openPage('pageTwo')" class="link"
              >Community Forums: Uniting Voices for Change</a
            >
            <p>Community forum online on <span style="font-weight: bold">free speech</span></p>
            <p>
              <span style="font-weight: bold">Description:</span> a forum to discuss with
              everyone...
            </p>
            <p><span style="font-weight: bold">Category :</span> Forum > Internet > Sharing ...</p>
            <span class="green" @click="openPage('pageTwo')">www.lets-share-about.com/ - 54k</span>
          </li>
          <li>
            <a @click.prevent="openPage('pageThree')" class="link">myspoce.com</a>
            <p>The unlimited <span style="font-weight: bold">Free Speech</span> first network.</p>
            <p><span style="font-weight: bold">Description:</span> social network...</p>
            <p><span style="font-weight: bold">Category :</span> Media > Social ...</p>
            <span class="green" @click="openPage('pageThree')">www.my-spoce.com/ - 37k</span>
          </li>
        </ul>
      </div>
      <div class="footer-search">
        <p>
          Result page :
          <span style="color: red">1</span>
          <a href="#two" class="clickable-number">2</a>
        </p>
        <div id="two" class="number-content">defend to</div>
      </div>
    </div>

    <!-- Page content is shown based on the current page state -->

    <div v-if="currentPage === 'pageOne'">
      <div class="topBarInWebsite">
        <button @click="returnToMain"><-</button>
        <input
          type="text"
          placeholder="http://wwww.we-talk.com/article-48938.html"
          readonly
          class="search-input"
        />
        <div class="page-content">
          <div class="bannerWeTalk">
            <pre>
 __        __       _____     _ _                            __  
 \ \      / /__    |_   _|_ _| | | __  ___ ___  _ __ ___    / /  
  \ \ /\ / / _ \_____| |/ _` | | |/ / / __/ _ \| '_ ` _ \  / /   
   \ V  V /  __/_____| | (_| | |   < | (_| (_) | | | | | |/ /    
    \_/\_/ \___|     |_|\__,_|_|_|\_(_)___\___/|_| |_| |_/_/     
                                                                
      </pre
            >
          </div>
          <div class="menu-weTalk">
            <button @click.prevent="" style="margin-right: 10px">Home</button>
            <button @click.prevent="" style="margin-right: 10px">About Us</button>
            <button @click.prevent="">Contact</button>
          </div>
          <h1>The Evolution of Free Speech Online</h1>
          <p><em>Date: April 5, 2000. Author: John Doe.</em></p>
          <hr />
          <p>
            From the inception of the World Wide Web in the early 1990s, the internet was envisioned
            as the ultimate platform for free expression. It promised an era where information could
            be exchanged freely, and voices from across the globe could be heard without the
            constraints of traditional media gatekeepers.
          </p>
          <h2>The Dawn of Digital Discourse</h2>
          <p>
            The explosion of personal websites and forums in the late '90s provided a first taste of
            this new world. People from all walks of life began to share their thoughts, creations,
            and criticisms online. This era of digital discourse was marked by a sense of community
            and a shared belief in the democratizing power of the internet.
          </p>
          <h2>Rise of the Blogosphere</h2>
          <p>
            By the turn of the millennium, the "blogosphere" had taken shape, offering a platform
            for more structured and sustained narratives. Blogs ranged from personal diaries to
            specialized news services, challenging traditional journalism and creating a new
            paradigm for news dissemination and public discourse.
          </p>
          <h2>Social Media: A Double-Edged Sword</h2>
          <p>
            The advent of social media platforms transformed the landscape once again. Initially
            celebrated as tools for further democratization, these platforms soon faced criticism
            for facilitating echo chambers, spreading misinformation, and enabling surveillance and
            censorship.
          </p>
          <span class="whatever">I disapprove</span>
          <br />
          <br />
          <h2>Legal and Ethical Challenges</h2>
          <p>
            The evolution of free speech online has not been without its legal and ethical
            challenges. The anonymity and immediacy of the internet have sparked debates over
            privacy, hate speech, and the spread of disinformation. Balancing the right to free
            expression with the need for accountability and safety online remains a contentious
            issue.
          </p>
          <h2>Looking to the Future</h2>
          <p>
            Despite the challenges, the internet continues to offer unparalleled opportunities for
            free speech and innovation. As we navigate the complexities of the digital age, it is
            crucial to preserve the open and free nature of the internet while addressing the
            legitimate concerns that have arisen.
          </p>
          <p>
            The story of free speech online is still unfolding, and its trajectory will be shaped by
            the choices we make today. It is up to us to ensure that the internet remains a force
            for good, empowering voices around the world and fostering an informed and engaged
            global citizenry.
          </p>
          <h2>The Global Perspective</h2>
          <p>
            As the internet grew into a global network, the concept of free speech encountered
            varied interpretations influenced by cultural, political, and social differences.
            Countries with strong free speech protections saw the internet as a tool to reinforce
            democratic values, while in more restrictive regimes, it became a battleground for
            censorship and resistance. The Arab Spring, for instance, highlighted the internet's
            role in organizing and amplifying calls for freedom and democracy, showcasing its power
            to challenge the status quo and mobilize societal change on a global scale.
          </p>
          <hr />
          <center>we-talk© 1999 - 2002</center>
        </div>
      </div>
    </div>
    <div v-if="currentPage === 'pageTwo'">
      <div class="topBarInWebsite">
        <button @click="returnToMain"><-</button>
        <input
          type="text"
          placeholder="http://lets-share-about.com/"
          readonly
          class="search-input"
        />
      </div>
      <div class="forum-page-content">
        <h1>LetsShareAbout.com</h1>
        <marquee class="marquee">
          📢 New Users: Please Read the Forum Rules Before Posting! 📢
        </marquee>
        <div class="forum-list">
          <div class="forum-item sticky">
            <button class="link forum-link">📌 Sticky: Welcome to the Forum - Start Here!</button>
          </div>
          <div class="forum-item announcement">
            <button class="link forum-link">
              📣 Announcement: Upcoming Maintenance on 30th March
            </button>
          </div>
          <!-- Multiple general discussion topics to simulate a "charged" look -->
          <div class="forum-item">
            <button @click.prevent="currentPage = 'forum_1'" class="link forum-link">
              General Discussion: Today's Hot Topic
            </button>
          </div>
          <div class="forum-item">
            <button class="link forum-link">How to Improve Your Internet Privacy</button>
          </div>
          <div class="forum-item">
            <button class="link forum-link">Favorite Retro Games - Share Yours!</button>
          </div>
          <div class="forum-item">
            <button class="link forum-link">Technical Support Thread: Post Your Issues Here</button>
          </div>
          <div class="forum-item">
            <button @click.prevent="currentPage = 'forum_2'" class="link forum-link">
              Windows XP Support Thread
            </button>
          </div>
          <div class="forum-item">
            <button class="link forum-link">Dealing with Spam: Tips and Tricks</button>
          </div>
          <!-- More technical support topics -->
          <div class="member-list-container">
            <h3>Active Members</h3>
            <ul class="member-list">
              <li><strong>franklinscott456</strong> - Administrator - Offline</li>
              <li><strong>ernestbailey9097</strong> - Administrator - Online</li>
              <!-- Add more members from the list here -->
              <li><strong>amberjohnson4669</strong> - Administrator - Online</li>
              <li><strong>samantha39109</strong> - Moderator - Offline</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="currentPage === 'forum_1'">
      <button @click="returnToForum"><-</button>
      <input
        type="text"
        placeholder="http://lets-share-about.com/general-dicussion.html"
        readonly
        class="search-input"
      />
      <h2>General Discussion</h2>
      <!-- List of clickable topics/posts -->
      <div class="forum-posts-list">
        <div class="forum-post-item" @click="openTopic('topic_1')">
          <h3>Bloggers & MySpace Heroes: Is the Web the Ultimate Free Speech Zone?</h3>
          <p>Started by User123 on March 10, 2024</p>
        </div>
        <div class="forum-post-item" @click="openTopic('topic_2')">
          <h3>The Birth of Wikipedia: A New Model for Knowledge Sharing</h3>
          <p>Started by WikiFan_2000 on March 12, 2024</p>
        </div>
        <!-- Add more topics as needed -->
      </div>
    </div>
    <div v-if="currentPage === 'forum_2'">
      <div class="topBarInWebsite">
        <button @click="returnToForum"><-</button>
        <input
          type="text"
          placeholder="http://lets-share-about.com/technical-support.html/"
          readonly
          class="search-input"
        />
      </div>
      <h2 class="answer-page-title">Exploring Cyber Expression</h2>
      <p class="web-clue">
        <span class="tabulation">You</span> will not regret on making it this far. You indeed
        embarked on a journey through the evolution of the internet. Here's the deal: hidden across
        the two versions of the web are parts of a famous quote about freedom of speech. Your
        mission, should you choose to accept it, is to find all the eight parts composing that quote
        which are scattered throughout the pages.
      </p>
      <p class="web-clue">
        <span class="tabulation">Once</span> you've gathered all those parts, type the complete
        sentence below. If you're successful, you'll unlock the next step of this adventure.
      </p>
      <form class="user-answer" @submit.prevent="submitAnswer">
        <div class="form-control">
          <input
            type="text"
            v-model="answer"
            name="answer"
            required=""
            placeholder=""
            class="input-web input-alt"
          />
          <span class="input-border input-border-alt"></span>
        </div>

        <!-- <button type="submit">Submit Answer</button> -->
      </form>
    </div>

    <div v-if="currentPage === 'topic_1'">
      <button @click="returnToForumPage('forum_1')"><-</button>
      <input
        type="text"
        placeholder="http://lets-share-about.com/general-dicussion.html/topic-43289"
        readonly
        class="search-input"
      />
      <!-- Add more posts as needed -->
      <h2>Bloggers & MySpace Heroes: Is the Web the Ultimate Free Speech Zone?</h2>
      <div class="post">
        <div class="post-header">
          <strong>BlogFanatic</strong> <span class="user-details">[Reg: Feb 1999 | Msg #156]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 1, 2000</span></div>
        </div>
        <p>
          Yo, have you guys seen how blogs are all the rage now? It's like everyone's diary is just
          out there. Super cool but kinda scary too, lol.
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>EarlyAdopter</strong> <span class="user-details">[Reg: May 1998 | Msg #202]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 1, 2000</span></div>
        </div>
        <p>
          Totally! And MySpace is like this giant party where everyone's invited. Makes you wonder
          though, can we just say whatever we want online?
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>PrivacyAdvocate</strong>
          <span class="user-details">[Reg: Oct 1999 | Msg #89]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 2, 2000</span></div>
        </div>
        <p>
          Speaking of which, isn’t it kinda creepy how everything we post is just... there? Like,
          forever? I’m all for sharing, but where’s the line?
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>NetizenNoir</strong> <span class="user-details">[Reg: Jan 2000 | Msg #47]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 2, 2000</span></div>
        </div>
        <p>
          It's a mess, haha. Free speech is cool and all, but then you see some real weird stuff.
          Internet’s wild, man.
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>DigitalPatriot</strong>
          <span class="user-details">[Reg: Jul 1997 | Msg #310]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 5, 2000</span></div>
        </div>
        <p>
          We gotta keep the net free, y’all. But let’s not be jerks about it, okay? Use your powers
          for good, not trolling. ✌️
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>CyberPhilosopher</strong>
          <span class="user-details">[Reg: Mar 1998 | Msg #134]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 5, 2000</span></div>
        </div>
        <p>
          Remember the good ol’ days of chat rooms? That was just the beginning. Now we're here,
          spilling our brains on blogs. History in the making, folks.
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>ArchiveLover</strong> <span class="user-details">[Reg: Dec 1998 | Msg #210]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 5, 2000</span></div>
        </div>
        <p>
          And don’t get me started on search engines deciding what we see. It’s like, let me find my
          own weird corner of the internet, thank you very much.
        </p>
      </div>

      <div class="post">
        <div class="post-header">
          <strong>EnigmaSeeker</strong> <span class="user-details">[Reg: Feb 2000 | Msg #58]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 8, 2000</span></div>
        </div>
        <p style="color: cyan">your right</p>
      </div>
    </div>
    <div v-if="currentPage === 'topic_2'">
      <button @click="returnToForumPage('forum_1')"><-</button>
      <input
        type="text"
        placeholder="http://lets-share-about.com/general-dicussion.html/topic-76289"
        readonly
        class="search-input"
      />
      <h2>The Birth of Wikipedia: A New Model for Knowledge Sharing</h2>
      <div class="post">
        <div class="post-header">
          <strong>WikiFan_2000</strong> <span class="user-details">[Reg: Mar 1999 | Msg #432]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 12, 2000</span></div>
        </div>
        <p>Hey everyone,</p>
        <p>
          Did you hear about the latest experiment in the world of the internet? It's called
          Wikipedia, a free encyclopedia that anyone can edit, launched by Jimmy Wales and Larry
          Sanger this January. It's a bold move towards democratizing knowledge, moving away from
          traditional encyclopedias that are expensive and updated infrequently.
        </p>

        <p>
          What makes Wikipedia stand out is its collaborative nature. The idea that knowledge should
          be freely accessible to everyone and that anyone can contribute to this body of knowledge
          is groundbreaking. But it also raises a lot of questions:
        </p>
        <ul>
          <li>
            Accuracy and Vandalism: With anyone able to edit, how do we ensure the information
            remains accurate and free from vandalism?
          </li>
          <li>
            Authority and Expertise: Can a community of volunteers match the depth of knowledge that
            experts bring to traditional encyclopedias?
          </li>
          <li>
            Sustainability: Without a clear business model, how will Wikipedia sustain itself in the
            long run?
          </li>
          <li>
            Impact on Traditional Knowledge Sources: What does the rise of Wikipedia mean for
            traditional encyclopedias and other sources of knowledge?
          </li>
        </ul>
        <p>
          I'm fascinated by the potential of Wikipedia to change how we access and contribute to
          knowledge. But I also wonder about the challenges it will face. What do you all think? Is
          Wikipedia the future of knowledge sharing, or is it an experiment that's bound to
          encounter insurmountable obstacles?
        </p>
        <p>Looking forward to hearing your thoughts!</p>
      </div>
      <div class="post">
        <div class="post-header">
          <strong>InfoSeeker21</strong> <span class="user-details">[Reg: Aug 2000 | Msg #78]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 13, 2000</span></div>
        </div>
        <p>
          I've been following Wikipedia's progress since its announcement, and I'm optimistic. The
          idea that knowledge can be built collaboratively and shared freely is revolutionary. I
          believe the community will find ways to tackle accuracy and vandalism. The potential for
          learning and sharing is too great to ignore. It's a bold step into the future of
          information sharing!
        </p>
      </div>
      <div class="post">
        <div class="post-header">
          <strong>DashOn23</strong> <span class="user-details">[Reg: Apr 1999 | Msg #599]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 13, 2000</span></div>
        </div>
        <p>
          I don't really know, the project is great but i'm pretty sure the people will troll on it,
          and this will endup having more desinformation instead of real knowledge sharing.
        </p>
      </div>
      <div class="post">
        <div class="post-header">
          <strong>TechGuru98</strong> <span class="user-details">[Reg: Jan 1998 | Msg #657]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 14, 2000</span></div>
        </div>
        <p>
          While I admire the idealism behind Wikipedia, I'm concerned about the potential for
          misinformation. Traditional encyclopedias have expert editors for a reason. That being
          said, the open model could invite experts to contribute, blending the best of both worlds.
          If Wikipedia can develop a robust system for verifying facts, it might just work out.
        </p>
      </div>
      <div class="post">
        <div class="post-header">
          <strong>HistoryBuff01</strong>
          <span class="user-details">[Reg: Jun 1999 | Msg #321]</span>
          <div class="post-meta"><span class="date-posted">Posted: April 15, 2000</span></div>
        </div>
        <p>
          I just contributed my first article on Wikipedia about the French Revolution, and I found
          the experience exhilarating! It's amazing to think that my knowledge can now be accessed
          by anyone around the world. This could be a game-changer for education, especially for
          those who can't afford traditional encyclopedias. Sure, there are hurdles to overcome, but
          the potential benefits are too significant to ignore.
        </p>
      </div>
    </div>
    <div v-if="currentPage === 'topic_3'">
      <button @click="returnToForumPage('forum_1')"><-</button>
      <h2>YouTube's Launch: Will It Change Video Sharing Forever?</h2>

      <div class="post">
        <div class="post-header">
          <strong>DigitalDreamer</strong>
          <span class="user-details">[Reg: Jun 2004 | Msg #258]</span>
          <div class="post-meta"><span class="date-posted">Posted: March 15, 2005</span></div>
        </div>
        <p>Greetings, fellow netizens!</p>
        <p>
          Exciting news for all of us who dream of a more connected and expressive internet! A new
          website called YouTube has just been launched, aiming to make video sharing easy for
          everyone...
        </p>
        <ul>
          <li>
            Accessibility: YouTube promises to make uploading and viewing videos accessible...
          </li>
          <li>Community Building: With the ability to comment on videos...</li>
          <li>Impact on Traditional Media: As video sharing becomes more straightforward...</li>
          <li>Creative Expression: For the aspiring filmmakers, comedians, and educators...</li>
        </ul>
        <p>
          Let's dive into these discussions. Share your thoughts on YouTube's potential and what you
          hope to see in the future of video sharing!
        </p>
        <p>Looking forward to an engaging conversation,</p>
        <p><strong>DigitalDreamer</strong></p>
      </div>

      <!-- Response 1 -->
      <div class="post">
        <div class="post-header">
          <strong>VisionaryVideographer</strong>
          <span class="user-details">[Reg: May 2003 | Msg #112]</span>
          <div class="post-meta"><span class="date-posted">Posted: March 16, 2005</span></div>
        </div>
        <p>
          The idea that I could share my short films with a global audience is mind-blowing. YouTube
          could really open doors for independent creators.
        </p>
      </div>

      <!-- Additional responses can follow the same structure. -->

      <!-- Sample structure for additional responses -->
      <!-- Response 2 -->
      <div class="post">
        <!-- Post details for Response 2 -->
      </div>

      <!-- Response 3 -->
      <div class="post">
        <!-- Post details for Response 3 -->
      </div>

      <!-- Continue adding responses up to Response 10 -->

      <!-- Placeholder for more posts if needed -->
    </div>
    <div v-if="currentPage === 'pageThree'">
      <div class="topBarInWebsite">
        <button @click="returnToMain"><-</button>
        <input
          type="text"
          placeholder="http://www.myspoce.com/index.html"
          readonly
          class="search-input"
        />
      </div>
      <div class="myspace-container">
        <!-- Top Navigation -->
        <div class="myspace-nav">
          <!-- MySpace Logo -->
          <img src="../../assets/myspoce.png" alt="MySpace logo" class="myspoceLogo" />
          <div class="nav-links">
            <a href="#">Home</a>
            <a href="#">Browse</a>
            <a href="#">Search</a>
            <a href="#">Invite</a>
            <a href="#">Rank</a>
            <a href="#">Mail</a>
            <a href="#">Blog</a>
            <a href="#">Favorites</a>
            <a href="#">Forum</a>
            <a href="#">Games</a>
            <a href="#">Music</a>
            <a href="#">Classifieds</a>
            <a href="#">SignUp</a>
          </div>
        </div>
        <div class="myspace-content">
          <div class="left-column">
            <div class="cool-new-people">
              <h2>Cool New People</h2>
              <div class="profiles">
                <div class="profile">
                  <img src="../../assets/voltaire.jpg" alt="Personality 1" />
                  <p>Voltaire</p>
                  <p>
                    The French Enlightenment writer, historian, and philosopher famous for his
                    advocacy of freedom of speech, freedom of religion, and separation of church and
                    state.
                  </p>
                </div>
                <div class="profile">
                  <img src="../../assets/mandela.jpg" alt="Personality 2" />
                  <p>Nelson Mandela</p>
                  <p>
                    he South African anti-apartheid revolutionary who became a symbol of the
                    struggle for freedom and equality, including the right to speak freely
                  </p>
                </div>
                <div class="profile">
                  <img src="../../assets/orwell.jpeg" alt="Personality 3" />
                  <p>George Orwell</p>
                  <p>
                    Known for his novels "1984" and "Animal Farm," which explore themes of
                    surveillance, censorship, and free will.
                  </p>
                </div>
              </div>
            </div>
            <div class="myspace-music">
              <h2>Featured Song</h2>
              <div class="music-feature">
                <img
                  src="../../assets/system-of-a-down-album-cover.jpg"
                  alt="System of a Down Album Cover"
                />
                <div class="song-description">
                  <p><strong>System of a Down - Holy Mountains</strong></p>
                  <p>
                    From their album 'Hypnotize', System of a Down's "Holy Mountains" is a powerful
                    anthem that addresses themes of freedom, identity, and resistance. Its driving
                    rhythms and poignant lyrics resonate with the struggle against oppression,
                    making it a compelling soundtrack for discussions on free speech.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="right-column">
            <div class="member-login">
              <strong>Member Login</strong>
              <form>
                <input type="text" placeholder="E-Mail" />
                <input type="password" placeholder="Password" />
                <div class="remember-me">
                  <input type="checkbox" id="rememberEmail" />
                  <label for="rememberEmail">Remember my E-mail</label>
                </div>
                <button @click.prevent="" class="button-myspoce">LOGIN</button>
                <div class="login-links">
                  <a href="#">SIGN UP!</a>
                  <a href="#">Forgot your password?</a>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="myspace-footer">
          <a href="#">About</a> | <a href="#">News</a> | <a href="#">FAQ</a> |
          <a href="#">Terms</a> | <a href="#" @click="handlePrivacyClick">Privacy</a> |
          <a href="#">Contact</a> | <a href="#">Promote</a> | <a href="#">Advertise</a> |
          <a href="#">MySpace Shop</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from 'vue'

import { inject } from 'vue'
import anime from '../../../node_modules/animejs/lib/anime.es'
import App4 from '../../App4.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import api from '../../stores/axios-setup.js'
const router = useRouter()
const store = useStore()
const showResults = ref(false) // Initially hide the search results
const showWebsite = ref(false) // Initially hide the website content
const showResultsContent = ref(false) // Initially hide the search results content
const currentPage = ref('') // Initially, no specific page content is displayed
const answer = ref('')
const changeComponent = inject('changeComponent')
let succeedWeb = false

function setSucceedWeb(value) {
  succeedWeb = value
}
function getSucceedWeb() {
  return succeedWeb
}
function openPage(pageName) {
  currentPage.value = pageName
  showResults.value = false // Hide the search results when a page is opened
  showResultsContent.value = pageName // Hide the search results content
  showWebsite.value = true // Show the website content
}

function returnToMain() {
  currentPage.value = '' // Reset to no specific page
  showResults.value = true // Show the search results again
  showResultsContent.value = false // Hide the search results content
  showWebsite.value = false // Hide the website content
}

let previousPage = '' // Variable to store the previous page

function returnToMenu() {
  currentPage.value = previousPage // Restore the previous page
  showMenu.value = true // Show the menu again
}

function returnToForum() {
  currentPage.value = 'pageTwo'
  showMenu.value = true
}

function openTopic(topicName) {
  currentPage.value = topicName
  // Additional logic can be added here if needed, like fetching topic details
}

function returnToForumPage(forumPage) {
  currentPage.value = forumPage
}

const submitAnswer = async () => {
  const fullAnswer = answer.value
  const game = 'game2'
  const token = localStorage.getItem('token')

  if (!token) {
    console.error('No token available')
    return // Optionally handle the lack of token
  }

  const response = await fetch('/checkOrder', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}` // Include the token in the Authorization header
    },
    body: JSON.stringify({ game, order: fullAnswer })
  })

  if (!response.ok) {
    throw new Error('Network response was not ok: ' + response.statusText)
  }

  const data = await response.json()
  let feedback = data.feedback
  answer.value = feedback.toUpperCase()
  if (data.feedback === 'Correct! The phrase matches exactly.') {
    console.log('succeed web game')
    store.dispatch('updateGameSuccess', { gameIndex: 2, success: true })
    document.body.style.backgroundColor = '#fff'
    transition()
  }
}
const transition = () => {
  setTimeout(() => {
    anime
      .timeline({
        easing: 'easeInOutQuad',
        duration: 2300,
        complete: () => {
          console.log(777)
          router.push('/app4')
        }
      })
      .add({
        targets: '.old-web',
        opacity: 0.5,
        translateX: '100%'
      })
      .add(
        {
          targets: ['.new-web', '.wiki-container', '.medium-article', '.news-page'],
          opacity: 0.5,
          translateX: '-100%'
        },
        0
      )
      .add({
        targets: '.old-web',
        translateX: '200%',
        translateY: '-200%',
        opacity: 0
      })
      .add(
        {
          targets: ['.new-web', '.wiki-container', '.medium-article', '.news-page'],
          translateX: '-200%',
          translateY: '200%',
          opacity: 0
        },
        '-=2500'
      )
  }, 1500)
}
const handlePrivacyClick = (event) => {
  event.preventDefault() // Prevent the default behavior of the link
  event.target.innerText = 'you say' // Change the text
  event.target.classList.add('red-text') // Add the red-text class
}
</script>
<style scoped>
.old-web {
  font-family: 'Courier New', Courier, monospace;
  color: #000;
  /* background-color: #f5f5f5; */ /*We changed from grey to white to have a better looking animation when transitioning to next page*/
  background-color: #fff;
  padding: 20px;
  height: 100%;
  overflow-y: auto;
}

.search-input {
  margin-left: 10px;
  width: 350px;
  height: 30px;
  background-color: #f5f5f5;
  /* border: 2px solid #000; */
}

.top-bar {
  display: flex;
  flex-direction: inline;
  max-width: 700px;
  align-items: center;
  justify-content: space-between;
}

.footer-search {
  position: absolute;
  display: flex;
  width: 50%;
  justify-content: center;
  bottom: 20px;
}
.search-status {
  font-size: 14px;
  background-color: blue;
  color: white;
  font-weight: bold;
}

li p {
  font-family: 'arial';
  font-size: 12px;
  margin: 0px;
  padding: 0px;
}

.red-text {
  color: red !important;
}

.green {
  color: green;
  cursor: pointer;
}

.logo {
  max-height: 100px;
}

.link {
  color: #0000ff;
  text-decoration: underline;
  cursor: pointer;
}

.results {
  margin-top: 20px;
}

.number-content {
  display: none;
  color: red; /* or any style you want for the '2' word appearance */
}

.number-content:target {
  display: block;
}

/* First page content style */

.menu-weTalk {
  text-align: center;
  margin-bottom: 20px;
}

.menu-weTalk button {
  background-color: light-blue;
  color: black;
  border: none;
  padding: 5px 15px;

  cursor: not-allowed; /* Indicates the buttons are inactive */
  font-family: 'Courier New', monospace;
}

.page-content {
  font-family: 'Courier New', Courier, monospace;
  color: #000;
  background-color: #f5f5f5;
  padding: 20px;
  overflow-y: auto;
}

.page-content h1,
.page-content h2 {
  color: #000080;
}

.page-content hr {
  border: 0;
  height: 1px;
  background-color: #000080;
  margin: 20px 0;
}

.page-content p,
.page-content em {
  text-align: justify;
  margin: 10px 0;
}

.link,
.page-content a {
  color: #0000ff;
  text-decoration: underline;
}

.page-content em {
  font-style: italic;
}

.whatever {
  color: white;
  user-select: all;
  position: absolute;
  left: 42%;
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

/* Forum styles */
.forum-page-content {
  font-family: 'Arial', sans-serif;
  padding: 20px;
}

/* Mimic table-like layouts with divs */
.forum-list {
  display: block;
  border: 2px solid #000099; /* Dark blue border */
  background-color: #ffffff;
  padding: 10px;
}

.forum-item {
  border-bottom: 1px solid #000099;
  padding: 10px;
  background-image: url('path/to/your/pattern.gif'); /* Optional: Add a patterned background */
}

.forum-item:last-child {
  border-bottom: none;
}

.forum-link {
  font-size: 16px;
  color: #000099; /* Dark blue text */
}

/* Hover effect for a more interactive feel */

.forum-link:hover {
  color: #ff0000; /* Change to red on hover */
  text-decoration: none; /* Remove underline on hover */
}

/* Add a retro flair with a marquee */
.marquee {
  font-family: 'Courier New', Courier, monospace;
  background-color: #ffff00; /* Yellow background for visibility */
  color: #ff00ff; /* Magenta text for that classic look */
}

.forum-posts-list {
  margin-top: 10px;
}

.forum-post-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 5px;
  cursor: pointer;
}

.forum-post-item:hover {
  background-color: #f0f0f0;
}

.post {
  background-color: #f8f8f8; /* A slightly off-white background for each post */
  border: 1px solid #d3d3d3; /* Light grey border, common in early web designs */
  margin-bottom: 8px; /* Space between posts */
  padding: 10px; /* Padding inside posts */
  font-size: 14px; /* Default font size, larger sizes were less common */
  color: #000000; /* Black text for readability */
}

.post p {
  margin-bottom: 10px; /* Space between paragraphs */
  line-height: 1.4; /* Slightly increased line height for readability */
}

.post strong {
  color: #000080; /* Navy blue for user names to stand out */
  font-weight: normal; /* Avoid too bold text, as it was not as common */
}

/* Mimic the look of hyperlinks */
.post a {
  color: #0000ee; /* Standard link blue */
  text-decoration: underline; /* Underlines were always on */
}

.post a:hover {
  color: #ff0000; /* Change to red on hover for visibility */
}

/* Add a classic touch with a bottom border on the last paragraph to separate posts */
.post p:last-child {
  padding-bottom: 5px;
}

.member-list-container {
  margin-top: 20px;
  padding: 10px;
  background-color: #f5f5f5; /* Light grey background for the member list section */
  border-top: 2px solid #000080; /* Dark blue border for separation */
}

.member-list {
  list-style-type: none; /* Remove default list styling */
  padding: 0;
}

.member-list li {
  margin: 5px 0;
  font-family: 'Arial', sans-serif; /* Use a simple, readable font */
}

.member-list li strong {
  color: #000080; /* Dark blue for usernames */
}

.member-list li:after {
  content: attr(data-status);

  margin-left: 10px;
  color: #008000; /* Green color for online status */
  font-weight: normal;
}

.member-list li[data-status='Offline']:after {
  color: #ff0000; /* Red color for offline status */
}

.post-header {
  margin-bottom: 8px;
}

.user-details,
.date-posted {
  font-size: 12px; /* Slightly smaller font size for details */
  color: #707070; /* A muted color for these details */
}

.user-details {
  margin-right: 10px; /* Space between user details and the date posted */
}

.post-meta {
  margin-bottom: 10px; /* Extra space before the post content begins */
}

/* myspoce */
.myspace-container {
  font-family: Arial, sans-serif;
  background-color: #fff;
}

.topBarInWebsite {
  /* background-color: #E5E5E5; */
  padding: 10px;
}

.search-input {
  border: 1px solid #00000053;
  padding: 5px;
}

.myspace-nav {
  background-color: blue;
  color: white;
  padding: 10px;
}

.myspoceLogo {
  width: 100%;
  height: auto;
}

.nav-links a {
  margin-right: 10px;
  text-decoration: none;
  color: white;
}

.login-form {
  display: flex;
  align-items: center;
}

.login-form input[type='text'],
.login-form input[type='password'] {
  margin-right: 5px;
}

.login-form button {
  background-color: #5f9ea0;
  color: #fff;
  border: none;
  padding: 5px 10px;
}

.cool-new-people,
.member-blogs,
.myspace-music {
  margin: 20px;
  padding: 15px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
}
.myspace-content {
  display: flex;
}

.left-column {
  width: 70%;
}

.right-column {
  width: 30%;
  padding: 20px;
}

.member-login {
  background-color: #f5f5f5;
  padding: 10px;

  border: 1px solid #ccc;
  margin-bottom: 10px;
}

.member-login strong {
  display: block;
  margin-bottom: 5px;
}

.member-login input[type='text'],
.member-login input[type='password'] {
  display: block;
  width: 100%;
  margin-bottom: 5px;
}

.remember-me {
  margin-bottom: 5px;
}

.button-myspoce {
  background-color: #5f9ea0;
  color: #fff;
  border: none;
  padding: 5px 10px;
  margin-bottom: 5px;
}

.login-links a {
  display: inline-block;
  margin-right: 5px;
  text-decoration: none;
  color: #000;
}

.myspace-footer {
  text-align: center;
  padding: 15px;
  background-color: #d3d3d3;
  clear: both;
}

.myspace-footer a {
  text-decoration: none;
  color: #000;
  margin: 0 5px;
}

.cool-new-people {
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 20px;
}

.cool-new-people h2 {
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
}

.profiles {
  display: flex;
  justify-content: space-around;

  flex-wrap: wrap;
}

.profile {
  width: 150px; /* adjust as needed */
  text-align: center;
  margin: 10px;
}

.profile img {
  width: 100%; /* adjust as needed */
  height: auto;
  border: 1px solid #000;
  margin-bottom: 5px;
}

.profile p {
  color: #000;
  font-size: 12px; /* adjust as needed */
}

.myspace-music {
  background-color: #f5f5f5;
  padding: 10px;
  border: 1px solid #ccc;
  margin: 20px;
}

.myspace-music h2 {
  color: #000;
  font-size: 18px;
  margin-bottom: 10px;
}

.music-feature {
  display: flex;
  align-items: center;
}

.music-feature img {
  width: 100px; /* adjust as needed */
  height: auto;
  margin-right: 10px;
}

.song-description p {
  color: #000;
  font-size: 12px; /* adjust as needed */
  margin: 0;
}

.song-description strong {
  display: block;
  margin-bottom: 5px;
}

.user-answer {
  margin-top: 10%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.input-web {
  color: #3b0101;
  text-align: center;
  font-size: 0.3rem;
  background-color: transparent;
  width: 100%;
  box-sizing: border-box;
  padding-inline: 0.5em;
  padding-block: 0.7em;
  border: none;
  border-bottom: var(--border-height) solid var(--border-before-color);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-family: 'Courier New', Courier, monospace;
}

.input-border {
  position: absolute;
  background: var(--border-after-color);
  height: 2px;
  width: 100%;
  bottom: 0;
  left: 0;
  transform: scaleX(0%);
  transition: transform 0.3s cubic-bezier(0.6, -0.28, 0.735, 0.045);
}

.input-web:focus {
  outline: none;
}

.input-web:focus + .input-border {
  transform: scaleX(100%);
}

.form-control {
  position: relative;
  /* --width-of-input: 300px; */
  width: 85%;
}

.input-alt {
  font-size: 1rem;
  padding-inline: 1em;
  padding-block: 0.8em;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.input-border-alt {
  height: 3px;
  background: linear-gradient(90deg, #ff6464 0%, #ffbf59 50%, #47c9ff 100%);
  transition: transform 0.4s cubic-bezier(0.42, 0, 0.58, 1);
}

.input-alt:focus + .input-border-alt {
  transform: scaleX(100%);
}
.answer-page-title {
  text-align: center;
  margin-bottom: 5%;
}
.web-clue {
  margin: 1%;
}
.tabulation {
  margin-left: 4%;
}
</style>
