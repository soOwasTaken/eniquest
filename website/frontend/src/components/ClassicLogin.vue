<!-- OverlayComponent.vue -->
<template>
  <div class="overlay" v-show="isVisible">
    <div class="overlay-content">
      <form @submit.prevent="handleSubmit" class="login-form">
        <!-- New Password Inputs for passwordChange Mode -->
        <div v-if="mode === 'passwordChange'">
          <div class="input-holder">
            <i class="icon fas fa-lock"></i>
            <input
              type="password"
              class="input"
              placeholder="New Password"
              v-model="newPassword"
              required
            />
          </div>
          <div class="input-holder">
            <i class="icon fas fa-lock"></i>
            <input
              type="password"
              class="input"
              placeholder="Confirm New Password"
              v-model="confirmNewPassword"
              required
            />

            <input
              type="password"
              class="input"
              placeholder="New Password"
              v-model="newPassword"
              required
            />
          </div>
          <div class="input-holder">
            <i class="icon fas fa-lock"></i>
            <input
              type="password"
              class="input"
              placeholder="Confirm New Password"
              v-model="confirmNewPassword"
              required
            />
          </div>
          <div class="input-holder">
            <input type="submit" class="button larger-button" value="Confirm New Password" />
          </div>
        </div>

        <!-- Inputs for Forgot Password Mode -->
        <template v-else>
          <div v-if="mode === 'forgotPassword'">
            <p class="email-recovery">{{ resetPasswordParagraph }}</p>
          </div>
          <div
            class="input-holder"
            v-if="mode !== 'enterKey' && !showResetKeyInput && mode !== 'passwordChange'"
          >
            <i class="icon far fa-user"></i>
            <input type="email" class="input" placeholder="Email" v-model="email" required />
          </div>
          <div class="input-holder" v-if="showResetKeyInput && mode !== 'passwordChange'">
            <i class="icon fas fa-key"></i>
            <input type="text" class="input" placeholder="Reset Key" v-model="resetKey" required />
          </div>
          <div
            class="input-holder"
            v-if="(mode === 'login' || mode === 'signup') && mode !== 'passwordChange'"
          >
            <i class="icon fas fa-lock"></i>
            <input
              type="password"
              class="input"
              placeholder="Password"
              v-model="password"
              required
            />
          </div>
          <div class="input-holder" v-if="mode === 'signup' && mode !== 'passwordChange'">
            <i class="icon fas fa-lock"></i>
            <input
              type="password"
              class="input"
              placeholder="Confirm Password"
              v-model="confirmPassword"
              required
            />
          </div>
          <div class="input-holder" v-if="mode !== 'passwordChange'">
            <input type="submit" class="button larger-button" :value="getButtonValue()" />
            <p class="link" v-if="mode === 'login'" @click="toggleForgotPassword">
              Forgot your password ?
            </p>
          </div>
        </template>
      </form>
    </div>
    <div class="footer">
      <p class="small-text" v-if="mode === 'login' || mode === 'forgotPassword'">
        Don't have an account ?
      </p>
      <p class="small-text" v-else>Already have an account ?</p>
      <button class="button medium-button" @click="toggleMode">
        {{ mode === 'login' || mode === 'forgotPassword' ? 'Sign up' : 'Login' }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      mode: 'login', // 'login' or 'signup'
      email: '',
      password: '',
      confirmPassword: '', // New field for sign-up
      isVisible: true,
      emailValid: false,
      resetKey: '',
      resetPasswordParagraph: 'Please enter your email to reset your password.',
      showResetKeyInput: false,
      newPassword: '',
      confirmNewPassword: ''
      // ... other data properties required for the overlay
    }
  },

  methods: {
    handleSubmit() {
      if (this.mode === 'login') {
        this.$emit('login', { email: this.email, password: this.password })
      } else if (this.mode === 'signup') {
        if (!this.validatePassword(this.password)) {
          alert(
            'Password is not strong enough. Please use a combination of uppercase, lowercase, numbers, and special characters.'
          )
          return
        }
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match')
          return
        }
        this.$emit('signup', { email: this.email, password: this.password })
        this.toggleMode('login') // Assuming toggleMode can take a specific mode as an argument
      } else if (this.mode === 'forgotPassword') {
        if (this.showResetKeyInput) {
          this.verifyResetKey(this.email, this.resetKey)
        } else {
          this.checkEmail(this.email)
        }
      } else if (this.mode === 'passwordChange') {
        if (!this.validatePassword(this.newPassword)) {
          alert(
            'Password is not strong enough. Please use a combination of uppercase, lowercase, numbers, and special characters.'
          )
          return
        }
        if (this.newPassword !== this.confirmNewPassword) {
          alert('New passwords do not match')
          return
        }
        this.resetPassword() // Call to reset the password using the new password
      }
    },
    toggleMode() {
      this.mode = this.mode === 'login' || this.mode === 'forgotPassword' ? 'signup' : 'login'
      this.email = ''
      this.password = ''
      this.confirmPassword = ''
      this.resetPasswordParagraph = 'Please enter your email to reset your password.'
      this.showResetKeyInput = false
      this.emailValid = false
      this.resetKey = ''
    },
    toggleVisibility() {
      this.isVisible = !this.isVisible
    },
    getButtonValue() {
      switch (this.mode) {
        case 'login':
          return 'Log In'
        case 'signup':
          return 'Sign Up'
        case 'forgotPassword':
          return this.showResetKeyInput ? 'Verify Key' : 'Send Reset Email'
        default:
          return 'Submit'
      }
    },
    mounted() {
      // Define the animation on mount
      anime({
        targets: this.$refs.overlay,
        opacity: [0, 1], // Start opacity at 0 and end at 1
        translateY: ['-20px', '0px'], // Start translateY at -20px and end at 0px
        duration: 800, // Animation duration in milliseconds
        easing: 'easeInOutCubic' // Easing function for smooth transition
      })
    },
    toggleForgotPassword() {
      this.mode = 'forgotPassword'
    },
    checkEmail(email) {
      axios
        .post('/api/request-reset', { email })
        .then((response) => {
          if (response.data) {
            this.resetPasswordParagraph = 'Email found. A reset key will be sent to your email.'
            this.showResetKeyInput = true
          } else {
            this.resetPasswordParagraph = 'No account found with that email.'
            this.showresetKeyInput = false
          }
        })
        .catch((error) => {
          console.error('Error checking email:', error)
          this.resetPasswordParagraph = 'No account registered on that email.'
          this.showResetKeyInput = false
        })
    },
    verifyResetKey() {
      // Data includes the email and the key from the component's data properties
      const payload = {
        email: this.email,
        key: this.resetKey
      }

      axios
        .post('/api/verify-reset-key', payload)
        .then((response) => {
          if (response.data.success) {
            this.mode = 'passwordChange' // Switch mode to allow password reset
            this.resetpasswordParagraph = 'Please enter your new password'
          } else {
            alert(response.data.message) // Show why the key is invalid
          }
        })

        .catch((error) => {
          console.error('Error verifying reset key:', error)
          alert('There was an error processing your request.')
        })
    },
    resetPassword() {
      const payload = {
        email: this.email,
        key: this.resetKey,
        newPassword: this.newPassword
      }

      axios
        .post('/api/reset-password', payload)
        .then((response) => {
          if (response.data.success) {
            alert('Your password has been successfully reset.')
            this.toggleMode()
            this.mode = 'login' // Redirect user to login page
          } else {
            alert(response.data.message)
          }
        })
        .catch((error) => {
          console.error('Error resetting password:', error)
          alert('Failed to reset password.')
        })
    },
    validatePassword(password) {
      const hasUppercase = /[A-Z]/.test(password)
      const hasLowercase = /[a-z]/.test(password)
      const hasNumber = /\d/.test(password)
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

      if (password.length < 8) {
        return false
      }

      if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
        return false
      }

      return true
    }
  }
}
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
  gap: 20px;
  color: #ffffffc4;
  padding-top: 30px;
}

.input {
  font-family: 'Sedan', serif;
  font-size: 1.4rem;
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
  padding-left: 23%;
  color: #ffffff6e;
  font-family: 'Sedan', serif;
  cursor: pointer;
  text-decoration: none;
  font-size: 16px;
  transform: translateX(5%) translateY(-50%);
}

.larger-button {
  font-size: 1.2rem; /* Adjust as needed */
}
.medium-button {
  font-size: 1rem; /* Adjust as needed */
  transform: translateX(10%);
}
.small-text {
  font-size: 1.1rem;
  cursor: default;
  transform: translateX(50%) translateY(15%);
}
.link:hover {
  color: #fff;
}

.email-recovery {
  font-family: 'Sedan', serif;
  font-size: 1.1rem;
}
.footer {
  font-family: 'Sedan', serif;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  padding: 20px 50px 20px 50px;
  text-align: center;
  height: 100%;
  width: 100%;
  border-top: 0.5px solid #fff;
}
@media (max-width: 768px) {
  .overlay {
    width: 90%;
  }
}
</style>
