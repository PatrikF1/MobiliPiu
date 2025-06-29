<template>
  <div class="products">
    <!-- Header -->
    <section class="bg-brown-50 py-16">
      <div class="container-max text-center">
        <h1 class="font-display text-5xl font-light text-brown-900 mb-6">
          Naši <span class="text-gold-600">proizvodi</span>
        </h1>
        <p class="text-lg text-brown-600">Pronađite savršene proizvode za vaš dom</p>
      </div>
    </section>

    <!-- Filters and Search -->
    <section class="py-12">
      <div class="container-max">
        <div class="bg-white rounded-2xl shadow-elegant p-8 mb-12 border border-brown-100">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <!-- Search -->
            <div>
              <label class="block font-display font-medium text-brown-800 mb-3">Pretraga</label>
              <input
                v-model="filters.search"
                type="text"
                placeholder="Pretražite proizvode..."
                class="form-input"
                @keyup.enter="searchProducts"
              />
            </div>

            <!-- Category Filter -->
            <div>
              <label class="block font-display font-medium text-brown-800 mb-3">Kategorija</label>
              <select
                v-model="filters.category"
                class="form-select"
                @change="searchProducts"
              >
                <option value="">Sve kategorije</option>
                <option v-for="category in categories" :key="category.name" :value="category.name">
                  {{ category.name }}
                </option>
              </select>
            </div>

            <!-- Brand Filter -->
            <div>
              <label class="block font-display font-medium text-brown-800 mb-3">Brend</label>
              <select
                v-model="filters.brand"
                class="form-select"
                @change="searchProducts"
              >
                <option value="">Svi brendovi</option>
                <option v-for="brand in brands" :key="brand.name" :value="brand.name">
                  {{ brand.name }}
                </option>
              </select>
            </div>

            <!-- Search Button -->
            <div class="flex items-end">
              <button
                @click="searchProducts"
                class="w-full inline-flex items-center justify-center px-6 py-3 font-display font-medium text-white bg-brown-800 rounded-xl hover:bg-brown-900 transition-all duration-300 transform hover:-translate-y-1 shadow-warm"
              >
                Pretražite
              </button>
            </div>
          </div>
        </div>

        <!-- Products Grid -->
        <div v-if="loading" class="text-center py-16">
          <div class="animate-spin rounded-full h-16 w-16 border-4 border-brown-200 border-t-brown-800 mx-auto"></div>
          <p class="mt-6 font-display text-brown-600">Učitavanje proizvoda...</p>
        </div>

        <div v-else-if="products.length === 0" class="text-center py-16">
          <div class="text-6xl text-brown-300 mb-6">🔍</div>
          <h3 class="font-display text-2xl font-medium text-brown-800 mb-3">Nema pronađenih proizvoda</h3>
          <p class="text-brown-600">Pokušajte s drugačijim filterima</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div
            v-for="product in products"
            :key="product._id"
            class="bg-white rounded-2xl shadow-sm hover:shadow-elegant transition-all duration-300 border border-brown-100 hover:border-brown-200 cursor-pointer transform hover:-translate-y-2"
            @click="goToProduct(product._id)"
          >
            <div class="aspect-w-1 aspect-h-1 bg-brown-50 rounded-t-2xl overflow-hidden">
              <img
                v-if="product.images && product.images[0]"
                :src="product.images[0].url"
                :alt="product.images[0].alt || product.name"
                class="w-full h-56 object-contain bg-white"
              />
              <div v-else class="w-full h-56 bg-brown-100 flex items-center justify-center">
                <span class="text-4xl text-brown-400">📦</span>
              </div>
            </div>
            
            <div class="p-6">
              <div class="flex justify-between items-start mb-3">
                <span class="text-sm font-display font-medium text-gold-700 bg-gold-50 px-3 py-1 rounded-full">{{ product.brand }}</span>
                <span v-if="!product.inStock" class="text-xs bg-red-50 text-red-700 px-2 py-1 rounded-full font-medium">
                  Nema na zalihi
                </span>
              </div>
              
              <h3 class="font-display text-lg font-medium text-brown-900 mb-3 line-clamp-2">
                {{ product.name }}
              </h3>
              
              <p class="text-brown-600 text-sm mb-4 line-clamp-2">
                {{ product.description }}
              </p>
              
              <div class="flex items-center justify-between">
                <div>
                  <span class="font-display text-xl font-semibold text-brown-900">
                    {{ formatPrice(product.price) }}
                  </span>
                  <span v-if="product.originalPrice" class="text-sm text-brown-500 line-through ml-2">
                    {{ formatPrice(product.originalPrice) }}
                  </span>
                </div>
                <span class="text-xs text-brown-500 bg-brown-50 px-2 py-1 rounded-full">{{ product.category }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.totalPages > 1" class="mt-16 flex justify-center">
          <nav class="flex items-center space-x-3">
            <button
              @click="changePage(pagination.currentPage - 1)"
              :disabled="!pagination.hasPrev"
              class="px-4 py-2 font-display font-medium text-brown-600 bg-white border border-brown-200 rounded-lg hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Prethodna
            </button>
            
            <span
              v-for="page in visiblePages"
              :key="page"
              class="px-4 py-2 font-display font-medium rounded-lg cursor-pointer transition-all duration-300"
              :class="page === pagination.currentPage 
                ? 'bg-brown-800 text-white shadow-warm' 
                : 'text-brown-700 bg-white border border-brown-200 hover:bg-brown-50'"
              @click="changePage(page)"
            >
              {{ page }}
            </span>
            
            <button
              @click="changePage(pagination.currentPage + 1)"
              :disabled="!pagination.hasNext"
              class="px-4 py-2 font-display font-medium text-brown-600 bg-white border border-brown-200 rounded-lg hover:bg-brown-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-300"
            >
              Sljedeća
            </button>
          </nav>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'Products',
  data() {
    return {
      products: [],
      categories: [],
      brands: [],
      loading: false,
      filters: {
        search: '',
        category: '',
        brand: '',
        page: 1
      },
      pagination: null
    }
  },
  computed: {
    visiblePages() {
      if (!this.pagination) return []
      
      const current = this.pagination.currentPage
      const total = this.pagination.totalPages
      const delta = 2
      
      const range = []
      const rangeStart = Math.max(2, current - delta)
      const rangeEnd = Math.min(total - 1, current + delta)
      
      if (current - delta > 2) {
        range.push(1, '...')
      } else {
        range.push(1)
      }
      
      for (let i = rangeStart; i <= rangeEnd; i++) {
        range.push(i)
      }
      
      if (current + delta < total - 1) {
        range.push('...', total)
      } else if (total > 1) {
        range.push(total)
      }
      
      return range.filter((item, index, array) => array.indexOf(item) === index)
    }
  },
  async mounted() {
    await this.loadInitialData()
    this.loadProductsFromURL()
    await this.searchProducts()
  },
  methods: {
    async loadInitialData() {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          apiService.getCategories(),
          apiService.getBrands()
        ])
        
        this.categories = categoriesRes || []
        this.brands = brandsRes || []
      } catch (error) {
        console.error('Greška pri učitavanju početnih podataka:', error)
      }
    },
    
    loadProductsFromURL() {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('category')) {
        this.filters.category = urlParams.get('category')
      }
    },
    
    async searchProducts() {
      this.loading = true
      try {
        const params = {
          page: this.filters.page,
          limit: 12
        }
        
        if (this.filters.search) params.search = this.filters.search
        if (this.filters.category) params.category = this.filters.category
        if (this.filters.brand) params.brand = this.filters.brand
        
        const response = await apiService.getProducts(params)
        
        this.products = response.products || []
        this.pagination = response.pagination || null
      } catch (error) {
        console.error('Greška pri učitavanju proizvoda:', error)
        this.products = []
      } finally {
        this.loading = false
      }
    },
    
    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.filters.page = page
        this.searchProducts()
      }
    },
    
    async goToProduct(productId) {
      // Track product view
      try {
        await apiService.trackProductView(productId, {
          referrer: window.location.href
        });
      } catch (error) {
        console.warn('Greška pri praćenju pregleda:', error);
      }
      
      // Navigate to product detail
      this.$router.push(`/proizvod/${productId}`)
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('hr-HR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price)
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style> 