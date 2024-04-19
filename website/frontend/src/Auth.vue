<template>
  <div class="auth">
    <login-signup @login="loginUser" @signup="signupUser" v-if="!isLoggedIn" />
    <div v-else>
      <!-- Your main application content goes here -->
      <button @click="logoutUser">Logout</button>
      <button @click="startAgain">Continue</button>
      <!-- Logout button -->
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router' // Import useRouter from Vue Router
import LoginSignup from './components/ClassicLogin.vue'
// import LoginSignup from './components/oldlogin.vue'
import axios from 'axios'

export default {
  components: {
    LoginSignup
  },
  setup() {
    const store = useStore()
    const router = useRouter() // Use useRouter hook to access the router

    const loginUser = async (userData) => {
      try {
        const response = await axios.post('/api/users/login', userData)
        if (response.data.success) {
          console.log('Login successful')
          store.dispatch('login', {
            token: response.data.token,
            user: response.data.user
          })
          // Redirect to App1 after successful login
          router.push('/app1')
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
    }

    const signupUser = async (userData) => {
      try {
        const response = await axios.post('/api/users/register', userData)
        if (response.data.success) {
          // Registration successful, do something (e.g., redirect user to login)
          console.log('Registration successful')
          alert('Registration successful, you are directly logged in')
          store.dispatch('login', {
            token: response.data.token,
            user: response.data.user
          })
          // Redirect to App1 after successful signup
          router.push('/app1')
        } else {
          // Registration failed, display error message
          alert(response.data.message)
          console.log('Failed signing up')
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert('Email already exists')
        }
        console.error('Error signing up:', error)
      }
    }
    const logoutUser = () => {
      store.dispatch('logout') // Dispatch logout action
      router.push('/') // Redirect to home page after logout
    }
    const startAgain = () => {
      const gameSuccess = store.getters.gameSuccess
      const unsucceededGameIndex = gameSuccess.findIndex((success) => !success)
      if (unsucceededGameIndex !== -1) {
        // Redirect to the first unsucceeded game
        router.push(`/app${unsucceededGameIndex + 1}`)
      } else {
        // If all games are succeeded, redirect to the first game
        router.push('/app1')
      }
    }
    return {
      loginUser,
      signupUser,
      logoutUser,
      startAgain,
      isLoggedIn: computed(() => store.getters.isLoggedIn)
    }
  }
}
</script>

<style>
.auth {
  position: absolute;
}
</style>
