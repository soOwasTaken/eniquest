<template>
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
      <h1>{{ article.title }}</h1>
      <div class="theme">{{ article.theme }}</div>
      <div class="author-info">
        <img :src="article.author.image" alt="Author" class="author-image" />
        <div class="author-details">
          <p>{{ article.author.name }}</p>
          <p>{{ article.date }} &bull; {{ article.readingStats }}</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <img :src="article.imageUrl" alt="Article Image" class="article-image" />
      <!-- <p class="image-caption">{{ article.imageCaption }}</p> -->
      <div class="article-text">
        <span class="opacity-1">
          {{ article.text1 }}
        </span>
        <span class="opacity-09">
          {{ article.text2 }}
        </span>
        <span class="opacity-08">
          {{ article.text3 }}
        </span>
        <span class="opacity-07">
          {{ article.text4 }}
        </span>
        <span class="opacity-06">
          {{ article.text5 }}
        </span>
        <span class="opacity-05">
          {{ article.text6 }}
        </span>
        <span class="opacity-04">
          {{ article.text7 }}
        </span>
        <span class="opacity-03">
          {{ article.text8 }}
        </span>
        <span class="opacity-02">
          {{ article.text9 }}
        </span>
        <span class="opacity-01">
          {{ article.text10 }}
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
              <img src="../../assets/facebook-logo.png" alt="Fakebook Logo" class="app-logo" /> Sign
              up with Fakebook
            </button>
            <button class="btn">
              <img src="../../assets/email-logo.png" alt="email Logo" class="app-logo" />Sign up
              with Email
            </button>
          </span>
        </div>
      </div>
      <div class="author-profile">
        <img :src="article.author.image" alt="Author Profile" class="author-profile-image" />
        <p>Written by {{ article.author.name }}</p>
        <p>{{ article.author.description }}</p>
        <button class="btn">Follow</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MediumArticle',
  data() {
    return {
      article: {
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
      },
      isContentVisible: true
    }
  }
}
</script>

<style scoped>
.medium-article {
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
</style>
