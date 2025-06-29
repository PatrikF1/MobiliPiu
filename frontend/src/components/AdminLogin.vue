<template>
  <div class="min-h-screen bg-brown-50 flex items-center justify-center">
    <div class="max-w-md w-full space-y-8 p-8">
      <div class="text-center">
        <h1 class="font-display text-4xl font-light text-brown-900 mb-2">
          Admin <span class="text-gold-600">Prijava</span>
        </h1>
        <p class="text-brown-600">Mobili più - Upravljanje sadržajem</p>
      </div>

      <div class="bg-white rounded-2xl shadow-elegant p-8 border border-brown-100">
        <form @submit.prevent="login" class="space-y-6">
          <div>
            <label for="username" class="block font-display font-medium text-brown-800 mb-3">
              Korisničko ime
            </label>
            <input
              id="username"
              v-model="credentials.username"
              type="text"
              required
              class="form-input"
              placeholder="admin"
            />
          </div>

          <div>
            <label for="password" class="block font-display font-medium text-brown-800 mb-3">
              Lozinka
            </label>
            <input
              id="password"
              v-model="credentials.password"
              type="password"
              required
              class="form-input"
              placeholder="••••••••"
            />
          </div>

          <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <p class="text-red-800 text-sm">{{ error }}</p>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Prijavljujem...' : 'Prijaviť se' }}
          </button>
        </form>

        <div class="mt-8 pt-6 border-t border-brown-100">
          <p class="text-sm text-brown-500 text-center">
            Demo pristupni podaci:<br>
            <strong>admin</strong> / <strong>admin123</strong>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminLogin',
  data() {
    return {
      credentials: {
        username: '',
        password: ''
      },
      loading: false,
      error: null
    }
  },
  methods: {
    async login() {
      this.loading = true;
      this.error = null;

      try {
        // Jednostavna autentifikacija (za demo)
        if (this.credentials.username === 'admin' && this.credentials.password === 'admin123') {
          // Postaviti admin token
          localStorage.setItem('admin_token', 'admin_authenticated');
          localStorage.setItem('admin_user', JSON.stringify({
            username: this.credentials.username,
            role: 'admin'
          }));
          
          this.$router.push('/admin/dashboard');
        } else {
          this.error = 'Neispravno korisničko ime ili lozinka';
        }
      } catch (error) {
        this.error = 'Greška pri prijavi';
      } finally {
        this.loading = false;
      }
    }
  }
}
</script> 