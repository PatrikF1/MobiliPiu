<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="bg-brown-900 shadow-sm sticky top-0 z-50 border-b border-brown-700">
      <div class="container-max">
        <div class="flex justify-between items-center py-4">
          <!-- Logo -->
          <router-link to="/" class="flex items-center group">
            <div class="font-display text-2xl font-light text-white group-hover:text-brown-100 transition-colors duration-300">
              Mobili <span class="text-gold-400 group-hover:text-gold-300 font-normal">più</span>
            </div>
          </router-link>
          
          <!-- Desktop Navigation -->
          <div class="hidden md:flex items-center space-x-8">
            <router-link 
              to="/" 
              class="nav-link"
              :class="{ 'text-gold-400 after:w-full': $route.name === 'Home' }"
            >
              Početna
            </router-link>
            <router-link 
              to="/proizvodi" 
              class="nav-link"
              :class="{ 'text-gold-400 after:w-full': $route.name === 'Products' }"
            >
              Proizvodi
            </router-link>
            <router-link 
              to="/brendovi" 
              class="nav-link"
              :class="{ 'text-gold-400 after:w-full': $route.name === 'Brands' }"
            >
              Brendovi
            </router-link>
            <router-link 
              to="/o-nama" 
              class="nav-link"
              :class="{ 'text-gold-400 after:w-full': $route.name === 'About' }"
            >
              O nama
            </router-link>
            <router-link 
              to="/kontakt" 
              class="nav-link"
              :class="{ 'text-gold-400 after:w-full': $route.name === 'Contact' }"
            >
              Kontakt
            </router-link>
            
            <!-- Admin Login -->
            <router-link 
              to="/admin" 
              class="admin-link"
              title="Admin pristup"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </router-link>
          </div>
          
          <!-- Mobile menu button -->
          <div class="md:hidden">
            <button 
              @click="mobileMenuOpen = !mobileMenuOpen"
              class="text-brown-100 hover:text-white transition-colors duration-300 p-2"
            >
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <!-- Mobile Navigation -->
        <div v-show="mobileMenuOpen" class="md:hidden pb-4 border-t border-brown-700 pt-4">
          <div class="flex flex-col space-y-1">
            <router-link 
              to="/" 
              class="nav-link-mobile"
              @click="mobileMenuOpen = false"
            >
              Početna
            </router-link>
            <router-link 
              to="/proizvodi" 
              class="nav-link-mobile"
              @click="mobileMenuOpen = false"
            >
              Proizvodi
            </router-link>
            <router-link 
              to="/brendovi" 
              class="nav-link-mobile"
              @click="mobileMenuOpen = false"
            >
              Brendovi
            </router-link>
            <router-link 
              to="/o-nama" 
              class="nav-link-mobile"
              @click="mobileMenuOpen = false"
            >
              O nama
            </router-link>
            <router-link 
              to="/kontakt" 
              class="nav-link-mobile"
              @click="mobileMenuOpen = false"
            >
              Kontakt
            </router-link>
            <router-link 
              to="/admin" 
              class="nav-link-mobile flex items-center space-x-2"
              @click="mobileMenuOpen = false"
            >
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>Admin</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    
    <!-- Main Content -->
    <main>
      <router-view />
    </main>
    
    <!-- Footer -->
    <footer class="bg-brown-900 text-brown-100">
      <div class="container-max py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <!-- Company Info -->
          <div class="md:col-span-2">
            <div class="mb-8">
              <h3 class="font-display text-3xl font-light mb-6 text-white">
                Mobili <span class="text-gold-400">più</span>
              </h3>
              <p class="text-brown-200 mb-6 leading-relaxed">
                Ekskluzivna destinacija za premium kućanske aparate u Umagu. 
                Nudimo personalizirani pristup i stručno savjetovanje za vaš dom.
              </p>
            </div>
            
            <!-- Contact Info -->
            <div class="space-y-4">
              <div class="flex items-center space-x-3">
                <span class="text-gold-400">📍</span>
                <span class="text-brown-200">Mobili più, trg.obrt, 52470 Umag</span>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-gold-400">📞</span>
                <a href="tel:+385915687580" class="text-brown-200 hover:text-white transition-colors duration-300">
                  +385 91 568 7580
                </a>
              </div>
              <div class="flex items-center space-x-3">
                <span class="text-gold-400">✉️</span>
                <a href="mailto:info.mobilipiu@gmail.com" class="text-brown-200 hover:text-white transition-colors duration-300">
                  info.mobilipiu@gmail.com
                </a>
              </div>
            </div>
          </div>
          
          <!-- Quick Links -->
          <div>
            <h4 class="font-display text-lg font-medium mb-6 text-white">Stranice</h4>
            <ul class="space-y-3">
              <li>
                <router-link to="/" class="text-brown-200 hover:text-gold-400 transition-colors duration-300">
                  Početna
                </router-link>
              </li>
              <li>
                <router-link to="/proizvodi" class="text-brown-200 hover:text-gold-400 transition-colors duration-300">
                  Proizvodi
                </router-link>
              </li>
              <li>
                <router-link to="/brendovi" class="text-brown-200 hover:text-gold-400 transition-colors duration-300">
                  Brendovi
                </router-link>
              </li>
              <li>
                <router-link to="/o-nama" class="text-brown-200 hover:text-gold-400 transition-colors duration-300">
                  O nama
                </router-link>
              </li>
              <li>
                <router-link to="/kontakt" class="text-brown-200 hover:text-gold-400 transition-colors duration-300">
                  Kontakt
                </router-link>
              </li>
            </ul>
          </div>
          
          <!-- Services -->
          <div>
            <h4 class="font-display text-lg font-medium mb-6 text-white">Usluge</h4>
            <ul class="space-y-3 text-brown-200">
              <li>Bijela tehnika</li>
              <li>Mali aparati</li>
              <li>Namještaj</li>
              <li>3D dizajn prostora</li>
            </ul>
          </div>
        </div>
        
        <!-- Bottom Section -->
        <div class="border-t border-brown-700 mt-12 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-brown-300 mb-4 md:mb-0">
              &copy; 2024 <span class="text-gold-400 font-medium">Mobili più</span>. Sva prava zadržana.
            </p>
            <div class="text-brown-400">
              <p class="text-sm">Vlasnica: <span class="text-brown-200">Sandra Fabijanić</span></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      mobileMenuOpen: false
    }
  }
}
</script>

<style scoped>
.nav-link {
  @apply text-brown-200 hover:text-white font-medium transition-all duration-300 relative py-2;
  @apply after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5;
  @apply after:bg-gradient-to-r after:from-gold-400 after:to-gold-500 after:transition-all after:duration-300;
  @apply hover:after:w-full;
}

.nav-link-mobile {
  @apply text-brown-200 hover:text-white font-medium py-3 px-4 rounded-lg transition-all duration-300;
  @apply hover:bg-brown-800;
}

.admin-link {
  @apply text-brown-300 hover:text-gold-400 transition-all duration-300 p-2 rounded-lg;
  @apply hover:bg-brown-800 hover:scale-110;
}
</style> 