<template>
  <div class="login-signup">
    <h2>Welcome</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>

        <input type="password" id="password" v-model="password" required />

      </div>
      <!-- Show additional field for sign-up -->
      <div v-if="mode === 'signup'">
        <label for="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" v-model="confirmPassword" required />
      </div>
      <button type="submit">{{ mode === 'login' ? 'Login' : 'Sign Up' }}</button>
    </form>
    <p v-if="mode === 'login'">

      Don't have an account? <button @click="toggleMode">Sign Up</button>
    </p>
    <p v-else>Already have an account? <button @click="toggleMode">Login</button></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mode: 'login', // 'login' or 'signup'
      email: '',
      password: '',
      confirmPassword: '' // New field for sign-up
    }
  },
  methods: {
    handleSubmit() {
      if (this.mode === 'login') {
        // Handle login logic
        this.$emit('login', { email: this.email, password: this.password })
      } else {
        // Handle sign-up logic with password confirmation check
        if (this.password !== this.confirmPassword) {
          alert('Passwords do not match')
          return
        }
        this.$emit('signup', { email: this.email, password: this.password })
      }
    },
    toggleMode() {
      this.mode = this.mode === 'login' ? 'signup' : 'login'

      this.email = ''
      this.password = ''
      this.confirmPassword = '' // Clear confirm password field when switching modes
    }
  }
}
</script>

<style scoped>
.login-signup {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;

  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  margin-top: 10px;
}

</style>
