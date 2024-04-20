<template>
  <div class="overlay" v-show="isVisible">
    <div class="overlay-content">
      <form @submit.prevent="handleSubmit" class="login-form">
        <div v-if="mode === 'login' || (!registrationSuccess && mode === 'signup')">
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
        </div>
        <div class="success-message" v-if="registrationSuccess">
          <p>User registered successfully. Please verify your email.</p>
          <button @click="checkVerificationStatus" class="button">Check Verification Status</button>
        </div>
      </form>
    </div>
    <div class="footer" v-if="!registrationSuccess">
      <p v-if="mode === 'login' && !registrationSuccess">Don't have an account?</p>
      <p v-else-if="mode === 'signup' && !registrationSuccess" class="message-spacing">Already have an account?</p>
      <button v-if="!registrationSuccess" class="button" @click="toggleMode">{{ mode === 'login' ? 'Sign up' : 'Login' }}</button>
    </div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      mode: 'login',
      email: '',
      password: '',
      confirmPassword: '',
      isVisible: false,

      registrationSuccess: false,
      pollingInterval: null
    };
  },
  methods: {
    async handleSubmit() {
      if (this.mode === 'login') {
        const response = await axios.post('/api/users/login', {
          email: this.email,
          password: this.password

        });
        this.$emit('login', response.data);
      } else {
        const response = await axios.post('/api/users/register', {
          email: this.email,
          password: this.password
        });

        if (response.status === 201) {
          this.registrationSuccess = true;
          this.startPolling();

        }
      }

    },
    startPolling() {
      this.stopPolling(); // Ensure no intervals are running before starting a new one
      this.pollingInterval = setInterval(this.checkVerificationStatus, 10000);
    },
    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);

        this.pollingInterval = null;
      }
    },
    async checkVerificationStatus() {
      try {

        const response = await axios.get(`/api/users/verify-status/${this.email}`);

        if (response.data.verified) {
          alert('Your email has been verified!');
          this.stopPolling();
          this.registrationSuccess = false; // Optionally hide success message

          // Perform any additional actions upon verification
        }

      } catch (error) {
        console.error('Error checking verification status:', error);
      }
    },
    toggleMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login';
      this.registrationSuccess = false;

      this.email = '';
      this.password = '';
      this.confirmPassword = '';
      this.stopPolling();
    }
  },
  beforeDestroy() {
    this.stopPolling(); // Clean up the interval when the component is destroyed
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

