<template>
  <div class="auth">
    <login-signup @login="loginUser" @signup="signupUser" v-if="!isLoggedIn" />
    <div v-else>
      <!-- Your main application content goes here -->
      <button @click="logoutUser">Log out</button>
      <button @click="startAgain">Continue where you left</button>
      <!-- Logout button -->
    </div>
    <!-- Alert message for email verification -->
    <div v-if="showVerifyEmailAlert" class="alert">Please verify your email to proceed.</div>
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
    const showVerifyEmailAlert = ref(false)
    // Reference to the OverlayComponent
    const loginUser = async (userData) => {
      try {
        const response = await axios.post('/api/users/login', userData)
        if (response.data.success) {
          // Check if the user is verified
          const isVerified = await checkEmailVerification(userData.email)
          if (isVerified) {
            console.log('Login successful')
            store.dispatch('login', {
              token: response.data.token,
              user: response.data.user
            })
            // Redirect to App1 after successful login
            startAgain()
          } else {
            // User is not verified, show alert message
            showVerifyEmailAlert.value = true
            // Log out the user
            store.dispatch('logout')
            setTimeout(() => {
              showVerifyEmailAlert.value = false
            }, 3000)
          }
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
          // Registration successful, show alert message to verify email
          alert('Registration successful. Please verify your email.')
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

    // Function to check if the user's email is verified
    const checkEmailVerification = async (email) => {
      try {
        const response = await axios.get(`/api/users/verify-status/${email}`)
        return response.data.verified
      } catch (error) {
        console.error('Error checking email verification status:', error)
        return false
      }
    }

    const logoutUser = () => {
      store.dispatch('logout') // Dispatch logout action
      router.push('/') // Redirect to home page after logout
    }
    // const startAgain = () => {
    //   const gameSuccess = store.getters.gameSuccess
    //   console.log(gameSuccess)
    //   const unsucceededGameIndex = gameSuccess.findIndex((success) => !success)
    //   if (unsucceededGameIndex !== -1) {
    //     // Redirect to the first unsucceeded game
    //     router.push(`/app${unsucceededGameIndex + 1}`)
    //   } else {
    //     // If all games are succeeded, redirect to the first game
    //     router.push('/app1')
    //   }
    // }
    const startAgain = async () => {
      const currentUser = await fetchCurrentUser()
      if (!currentUser) {
        router.push('/app1')
        console.log('continue button failed')
      } else router.push(`/app${currentUser.level + 1}`)
    }
    async function fetchCurrentUser() {
      try {
        const response = await fetch('/api/current-user')
        if (response.ok) {
          const currentUser = await response.json()
          return currentUser
        } else {
          throw new Error('Failed to fetch current user')
        }
      } catch (error) {
        console.error('Error fetching current user:', error)
        return null
      }
    }
    return {
      loginUser,
      signupUser,
      logoutUser,
      startAgain,
      showVerifyEmailAlert,

      isLoggedIn: computed(() => store.getters.isLoggedIn)
    }
  }
}
</script>

<style>
.auth {
  position: absolute;
}
.alert {
  font-size: 16px;
  text-transform: uppercase;
  position: fixed;
  width: 40vw;
  top: 10%;
  right: 11%;
}
</style>
