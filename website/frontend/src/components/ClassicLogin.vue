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
          <a v-if="mode === 'login'" class="link" @click="toggleMode">Don't have an account?</a>
          <a v-else class="link" @click="toggleMode">Already have an account?</a>
          <input type="submit" class="button" :value="mode === 'login' ? 'Log In' : 'Sign Up'" />
        </div>
      </form>
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
    }
    // ... other methods required for the overlay
  }
};
</script>

<style scoped>
.overlay {
  position: fixed;
  padding: 40px;
  top: 45%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 100%; /* Full width */
  max-width: 500px; /* Max-width for better control */
  border: 0.5px solid #fff;
  border-radius: 8px;
}


.overlay-content {
  display: flex;
  flex-direction: column;
}

.login-form {
  width: 100%;
}


.input-holder {
  position: relative;
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
  float: right;
  padding: 8px 30px;
  background: transparent;
  color: #fff;
  border: 2px solid white;
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
  font-size: 20px;
  cursor: pointer;
  text-decoration: none;

}


.link:hover {
  color: #fff;
}

@media (max-width: 768px) {
  .overlay {

    width: 90%;
  }
}
</style>

