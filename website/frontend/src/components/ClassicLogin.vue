<!-- OverlayComponent.vue -->
<template>
  <div class="overlay" v-show="isVisible">
    <div class="overlay-content">
      <form @submit.prevent="handleSubmit" class="login-form">

        <div class="input-holder">
          <i class="icon far fa-user"></i>
          <input type="text" class="input" placeholder="Email" v-model="email" required />
        </div>
        <div class="input-holder" v-if="mode === 'login' || mode === 'signup'">
          <i class="icon fas fa-lock"></i>
          <input type="password" class="input" placeholder="Password" v-model="password" required />

        </div>
        <div class="input-holder" v-if="mode === 'signup'">
          <i class="icon fas fa-lock"></i>
          <input type="password" class="input" placeholder="Confirm Password" v-model="confirmPassword" required />
        </div>

        <div class="input-holder">
          <input type="submit" class="button larger-button" :value="mode === 'login' ? 'Log In' : 'Sign Up'" />
        </div>
      </form>
    </div>
        <div class="footer">
        <p v-if="mode === 'login'">Don't have an account?</p>
        <p v-else class="message-spacing">Already have an account?</p>
        <button class="button" @click="toggleMode">{{ mode === 'login' ? 'Sign up' : 'Login' }}</button>
      </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      mode: 'login', // 'login' or 'signup'
      email: '',
      password: '',
      confirmPassword: '', // New field for sign-up
      isVisible: false
      // ... other data properties required for the overlay
    };
  },

  methods: {
    handleSubmit() {
      if (this.mode === 'login') {

        // Handle login logic
        this.$emit('login', { email: this.email, password: this.password });
      } else {
        // Handle sign-up logic with password confirmation check

        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match');
          return;
        }
        this.$emit('signup', { email: this.email, password: this.password });

      }
    },
    toggleMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
      this.email = '';
      this.password = '';
      this.confirmPassword = ''; // Clear confirm password field when switching modes
    },
    toggleVisibility() {
      this.isVisible =!this.isVisible;
    },
    mounted() {
      // Define the animation on mount
      anime({
        targets: this.$refs.overlay,
        opacity: [0, 1], // Start opacity at 0 and end at 1
        translateY: ['-20px', '0px'], // Start translateY at -20px and end at 0px
        duration: 800, // Animation duration in milliseconds
        easing: 'easeInOutCubic', // Easing function for smooth transition
      });
    }
    // ... other methods required for the overlay
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  top: 45%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 100%; /* Full width */
  max-width: 500px; /* Max-width for better control */
  border: 0.5px solid #fff;
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.2);
}


.overlay-content {
  display: flex;
  flex-direction: column;
  padding: 38px;
}

.login-form {
  width: 100%;
}


.input-holder {
  display: flex;
  position: relative;
  justify-content: center;
  color: #ffffffc4;
  padding-top: 30px;
}

.input {
  font-family: 'Sedan', serif;
  font-size: 1.25rem;
  width: 100%;
  padding: 8px;
  margin-left: 12px;
  border: none;
  border-bottom: 0.5px solid #fffffff0;
  background: transparent;
  color: #fffffff0;
  caret-color: #fffffff0;
  outline: none;
}

.input:focus {
  border-bottom: 0.5px solid #fff;
}

.icon {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  color: #ffffffc4;
}

.button {
  width: auto;
  padding: 8px 30px;
  background: transparent;
  color: #fff;
  border: 1px solid white;
  font-family: 'Sedan', serif;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.button:hover {
  background: white;
  color: black;
}

.link {
  color: #ffffffb2;
  font-family: 'Sedan', serif;
  cursor: pointer;
  text-decoration: none;

}

.larger-button {
  font-size: 1.2rem; /* Adjust as needed */
}


.link:hover {
  color: #fff;
}

.footer {
  font-family : 'Sedan' , serif;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  padding:20px 50px 20px 50px;
  text-align: center;
  height: 100%;
  width: 100%;
  border-top : 0.5px solid #fff;
}
@media (max-width: 768px) {
  .overlay {
    width: 90%;
  }
}
</style>

