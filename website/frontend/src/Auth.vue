<template>
  <div>
    <login-signup @login="loginUser" @signup="signupUser" v-if="!isLoggedIn" />
    <div v-else>
      <!-- Your main application content goes here -->
    </div>
  </div>
</template>

<script>
import LoginSignup from './components/login.vue'
import axios from 'axios'

export default {
  components: {
    LoginSignup
  },
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    async loginUser(userData) {
      try {
        const response = await axios.post('/api/users/login', userData)
        if (response.data.success) {
          console.log('Login successful')
          alert('Login successful')
          // Login successful, do something (e.g., store token, redirect user)
          this.isLoggedIn = true
        } else {
          // Login failed, display error message
          alert('Failed to login. Please try again.')
        }
      } catch (error) {
        console.error('Error logging in:', error)
        if (error.response && error.response.status === 401) {
          alert('Invalid email or password.')
        } else {
          alert('Error logging in. Please try again later.')
        }
      }
    },
    async signupUser(userData) {
      try {
        const response = await axios.post('/api/users/register', userData)
        if (response.data.success) {
          // Registration successful, do something (e.g., redirect user to login)
          console.log('Registration successful')
          alert('Registration successful, you are directly loged in')
          /* this.isLoggedIn = true */
        } else {
          // Registration failed, display error message
          alert(response.data.message)
          console.log('failed singing up')
        }
      } catch (error) {
        console.error('Error signing up:', error)
      }
    }
  }
}
</script>
