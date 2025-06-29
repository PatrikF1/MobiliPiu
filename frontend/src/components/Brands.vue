<template>
  <div class="brands">
    <!-- Hero Section -->
    <section class="bg-brown-50 py-20">
      <div class="container-max text-center">
        <h1 class="font-display text-5xl font-light text-brown-900 mb-6">
          Naši <span class="text-gold-600">partneri</span>
        </h1>
        <p class="text-lg text-brown-600 max-w-2xl mx-auto">
          Surađujemo s najboljim svjetskim brendovima premium kućanskih aparata
        </p>
      </div>
    </section>

    <!-- Brands Grid -->
    <section class="py-20 bg-white">
      <div class="container-max">
        <div v-if="loading" class="text-center py-16">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-brown-200 border-t-brown-800 mx-auto"></div>
          <p class="mt-6 font-display text-brown-600">Učitavanje brendova...</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          <div
            v-for="brand in brands"
            :key="brand.name"
            class="text-center p-8 bg-brown-50 rounded-2xl border border-brown-100 hover:shadow-elegant transition-all duration-300"
          >
            <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center mx-auto mb-8 shadow-sm">
              <span class="font-display text-2xl font-bold text-brown-800">{{ brand.name.charAt(0) }}</span>
            </div>
            <h2 class="font-display text-2xl font-medium text-brown-900 mb-4">{{ brand.name }}</h2>
            <p class="text-brown-600 mb-6 leading-relaxed">
              {{ brand.description }}
            </p>
            
            <div class="mb-8">
              <div class="space-y-2">
                <div 
                  v-for="specialty in brand.specialties"
                  :key="specialty"
                  class="inline-block bg-gold-50 text-gold-700 px-3 py-1 rounded-full text-sm font-medium mr-2 mb-2"
                >
                  {{ specialty }}
                </div>
              </div>
            </div>
            
            <div class="space-y-3">
              <router-link
                :to="`/proizvodi?brand=${encodeURIComponent(brand.name)}`"
                class="block w-full text-center px-6 py-3 font-display font-medium text-white bg-brown-800 rounded-xl hover:bg-brown-900 transition-all duration-300 transform hover:-translate-y-1 shadow-warm"
              >
                Pogledaj proizvode
              </router-link>
              
              <a
                v-if="brand.website && brand.website !== '#'"
                :href="brand.website"
                target="_blank"
                rel="noopener noreferrer"
                class="block w-full text-center px-6 py-3 font-display font-medium text-brown-800 border-2 border-brown-300 rounded-xl hover:border-brown-400 hover:bg-brown-50 transition-all duration-300"
              >
                Službena stranica
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why These Brands -->
    <section class="py-20 bg-brown-50">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="font-display text-4xl font-light text-brown-900 mb-6">
            Zašto <span class="text-gold-600">ovi brendovi</span>?
          </h2>
          <p class="text-lg text-brown-600 max-w-2xl mx-auto">
            Naš izbor partnera temelji se na strogim kriterijima kvalitete i pouzdanosti
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center p-8 bg-white rounded-2xl border border-brown-100">
            <div class="w-16 h-16 bg-brown-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">⭐</span>
            </div>
            <h3 class="font-display text-xl font-medium text-brown-900 mb-4">Dokazana kvaliteta</h3>
            <p class="text-brown-600">
              Svi naši partneri imaju dugogodišnju tradiciju proizvodnje vrhunskih proizvoda 
              s globalnim priznanjem.
            </p>
          </div>

          <div class="text-center p-8 bg-white rounded-2xl border border-brown-100">
            <div class="w-16 h-16 bg-brown-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🔧</span>
            </div>
            <h3 class="font-display text-xl font-medium text-brown-900 mb-4">Servisna podrška</h3>
            <p class="text-brown-600">
              Osiguravamo kompletnu servisnu podršku i dostupnost rezervnih dijelova 
              za sve proizvode.
            </p>
          </div>

          <div class="text-center p-8 bg-white rounded-2xl border border-brown-100">
            <div class="w-16 h-16 bg-brown-100 rounded-xl flex items-center justify-center mx-auto mb-6">
              <span class="text-2xl">🌍</span>
            </div>
            <h3 class="font-display text-xl font-medium text-brown-900 mb-4">Održivost</h3>
            <p class="text-brown-600">
              Svi brendovi dijele našu posvećenost ekološkim standardima 
              i energetskoj efikasnosti.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 bg-white">
      <div class="container-max text-center">
        <h2 class="font-display text-4xl font-light text-brown-900 mb-6">
          Istražite našu <span class="text-gold-600">kolekciju</span>
        </h2>
        <p class="text-lg text-brown-600 mb-10 max-w-2xl mx-auto">
          Pronađite savršene proizvode renomiranih brendova za vaš dom
        </p>
        <router-link 
          to="/proizvodi"
          class="inline-flex items-center px-8 py-4 font-display font-medium text-white bg-brown-800 rounded-xl hover:bg-brown-900 transition-all duration-300 transform hover:-translate-y-1 shadow-warm"
        >
          Pogledajte proizvode
          <svg class="ml-3 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'Brands',
  data() {
    return {
      brands: [],
      loading: false
    }
  },
  async mounted() {
    await this.loadBrands()
  },
  methods: {
    async loadBrands() {
      this.loading = true
      try {
        const brands = await apiService.getBrands()
        this.brands = brands || []
        console.log('Dohvaćeni brendovi:', this.brands)
      } catch (error) {
        console.error('Greška pri učitavanju brendova:', error)
        this.brands = []
      } finally {
        this.loading = false
      }
    }
  }
}
</script> 