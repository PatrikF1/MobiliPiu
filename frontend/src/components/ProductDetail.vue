<template>
  <div class="product-detail">
    <div v-if="loading" class="py-20 text-center">
      <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-600 mx-auto"></div>
      <p class="mt-4 text-brown-600">Učitavanje proizvoda...</p>
    </div>

    <div v-else-if="error" class="py-20 text-center">
      <div class="text-6xl text-brown-400 mb-4">❌</div>
      <h2 class="font-display text-2xl font-semibold text-brown-700 mb-2">Proizvod nije pronađen</h2>
      <p class="text-brown-600 mb-8">{{ error }}</p>
      <router-link to="/proizvodi" class="btn-primary">
        Nazad na proizvode
      </router-link>
    </div>

    <div v-else-if="product" class="py-20">
      <div class="container-max">
        <!-- Breadcrumb -->
        <nav class="flex mb-8" aria-label="Breadcrumb">
          <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li class="inline-flex items-center">
              <router-link to="/" class="text-brown-700 hover:text-gold-600">
                Početna
              </router-link>
            </li>
            <li>
              <div class="flex items-center">
                <span class="mx-2 text-brown-400">/</span>
                <router-link to="/proizvodi" class="text-brown-700 hover:text-gold-600">
                  Proizvodi
                </router-link>
              </div>
            </li>
            <li aria-current="page">
              <div class="flex items-center">
                <span class="mx-2 text-brown-400">/</span>
                <span class="text-brown-500">{{ product.name }}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Product Images -->
          <div>
            <div class="bg-white rounded-xl overflow-hidden mb-4 cursor-pointer border border-brown-100" @click="openImageModal(0)">
              <img
                v-if="product.images && product.images[0]"
                :src="product.images[0].url"
                :alt="product.images[0].alt || product.name"
                class="w-full h-96 object-contain hover:scale-105 transition-transform duration-300 bg-white"
              />
              <div v-else class="w-full h-96 flex items-center justify-center bg-white">
                <span class="text-6xl text-brown-400">📦</span>
              </div>
            </div>
            
            <!-- Image thumbnails -->
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-2">
              <div
                v-for="(image, index) in product.images.slice(0, 4)"
                :key="index"
                class="aspect-square bg-white rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-gold-400 transition-all duration-200 border border-brown-100"
                @click="openImageModal(index)"
              >
                <img
                  :src="image.url"
                  :alt="image.alt || product.name"
                  class="w-full h-full object-contain hover:scale-105 transition-transform duration-300 bg-white"
                />
              </div>
            </div>
          </div>

          <!-- Product Information -->
          <div>
            <div class="flex items-center gap-4 mb-4">
              <span class="bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-medium">
                {{ product.brand }}
              </span>
              <span v-if="!product.inStock" class="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
                Nema na stanju
              </span>
            </div>

            <h1 class="font-display text-3xl font-bold text-brown-800 mb-4">{{ product.name }}</h1>
            
            <div v-if="product.sku" class="mb-4">
              <span class="text-brown-600">Šifra: </span>
              <span class="font-mono text-brown-800 font-medium">{{ product.sku }}</span>
            </div>
            
            <div class="flex items-center gap-4 mb-6">
              <span class="font-display text-3xl font-bold text-brown-800">
                {{ formatPrice(product.price) }}
              </span>
              <span v-if="product.originalPrice" class="text-xl text-brown-500 line-through">
                {{ formatPrice(product.originalPrice) }}
              </span>
            </div>

            <div class="mb-6">
              <span class="inline-block bg-brown-100 text-brown-700 px-3 py-1 rounded-full text-sm">
                {{ product.category }} - {{ product.subcategory }}
              </span>
            </div>

            <div class="prose prose-brown mb-8">
              <p class="text-lg text-brown-600 leading-relaxed">
                {{ product.description }}
              </p>
            </div>

            <!-- Specifications -->
            <div v-if="product.specifications && Object.keys(product.specifications).length > 0" class="mb-8">
              <h3 class="font-display text-xl font-semibold text-brown-800 mb-4">Specifikacije</h3>
              <div class="bg-brown-50 rounded-lg p-4">
                <dl class="space-y-2">
                  <div
                    v-for="(value, key) in product.specifications"
                    :key="key"
                    class="flex justify-between py-1"
                  >
                    <dt class="font-medium text-brown-700">{{ key }}:</dt>
                    <dd class="text-brown-600">{{ value }}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <!-- Warranty -->
            <div class="mb-8">
              <div class="flex items-center">
                <span class="text-gold-600 mr-2">🛡️</span>
                <span class="text-brown-700">
                  <strong>Garancija:</strong> {{ product.warranty || '2 godine' }}
                </span>
              </div>
            </div>

            <!-- Tags -->
            <div v-if="product.tags && product.tags.length > 0" class="mb-8">
              <h4 class="font-medium text-brown-700 mb-2">Oznake:</h4>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="tag in product.tags"
                  :key="tag"
                  class="bg-brown-100 text-brown-600 px-2 py-1 rounded text-sm"
                >
                  {{ tag }}
                </span>
              </div>
            </div>

            <!-- Contact CTA -->
            <div class="bg-gold-50 rounded-lg p-6">
              <h3 class="font-display text-xl font-semibold text-brown-800 mb-2">
                Zanima vas ovaj proizvod?
              </h3>
              <p class="text-brown-600 mb-4">
                Kontaktirajte nas za više informacija, cijenu ili za zakazivanje termina.
              </p>
              <button @click="contactAboutProduct" class="btn-primary">
                Kontaktiraj nas
              </button>
            </div>
          </div>
        </div>

        <!-- Related Products -->
        <div v-if="relatedProducts.length > 0" class="mt-16">
          <h2 class="font-display text-3xl font-bold text-brown-800 mb-8">Slični proizvodi</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <div
              v-for="relatedProduct in relatedProducts"
              :key="relatedProduct._id"
              class="card overflow-hidden cursor-pointer"
              @click="goToProduct(relatedProduct._id)"
            >
              <div class="aspect-w-1 aspect-h-1 bg-white">
                <img
                  v-if="relatedProduct.images && relatedProduct.images[0]"
                  :src="relatedProduct.images[0].url"
                  :alt="relatedProduct.images[0].alt || relatedProduct.name"
                  class="w-full h-48 object-contain bg-white"
                />
                <div v-else class="w-full h-48 bg-white flex items-center justify-center">
                  <span class="text-4xl text-brown-400">📦</span>
                </div>
              </div>
              
              <div class="p-4">
                <span class="text-sm font-medium text-gold-600 mb-2 block">
                  {{ relatedProduct.brand }}
                </span>
                <h3 class="font-display text-lg font-semibold text-brown-800 mb-2 line-clamp-2">
                  {{ relatedProduct.name }}
                </h3>
                <span class="font-display text-xl font-bold text-brown-800">
                  {{ formatPrice(relatedProduct.price) }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Modal -->
    <div 
      v-if="showImageModal" 
      class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80"
      @click="closeImageModal"
    >
      <div class="relative max-w-7xl max-h-screen p-4" @click.stop>
        <!-- Close button -->
        <button
          @click="closeImageModal"
          class="absolute top-2 right-2 z-10 bg-brown-800 text-white rounded-full p-2 hover:bg-brown-700 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
        
        <!-- Navigation arrows -->
        <button
          v-if="product.images && product.images.length > 1 && currentImageIndex > 0"
          @click="previousImage"
          class="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-brown-800 text-white rounded-full p-2 hover:bg-brown-700 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        
        <button
          v-if="product.images && product.images.length > 1 && currentImageIndex < product.images.length - 1"
          @click="nextImage"
          class="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-brown-800 text-white rounded-full p-2 hover:bg-brown-700 transition-colors duration-200"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <!-- Image container with white background -->
        <div class="bg-white rounded-lg p-6 shadow-2xl">
          <img
            v-if="product.images && product.images[currentImageIndex]"
            :src="product.images[currentImageIndex].url"
            :alt="product.images[currentImageIndex].alt || product.name"
            class="max-w-full max-h-[80vh] object-contain mx-auto block"
          />
        </div>
        
        <!-- Image counter -->
        <div 
          v-if="product.images && product.images.length > 1"
          class="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-brown-800 text-white px-3 py-1 rounded-full text-sm"
        >
          {{ currentImageIndex + 1 }} / {{ product.images.length }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'ProductDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      product: null,
      relatedProducts: [],
      loading: false,
      error: null,
      showImageModal: false,
      currentImageIndex: 0
    }
  },

  async beforeRouteUpdate(to, from, next) {
    if (to.params.id !== from.params.id) {
      await this.loadProduct(to.params.id)
    }
    next()
  },
  methods: {
    async loadProduct(productId = this.id) {
      this.loading = true
      this.error = null
      
      try {
        const response = await apiService.getProduct(productId)
        this.product = response
        
        // Load related products
        await this.loadRelatedProducts()
      } catch (error) {
        console.error('Error loading product:', error)
        this.error = 'Proizvod nije pronađen ili je došlo do greške.'
      } finally {
        this.loading = false
      }
    },
    
    async loadRelatedProducts() {
      if (!this.product) return
      
      try {
        const params = {
          category: this.product.category,
          limit: 4
        }
        
        const response = await apiService.getProducts(params)
        this.relatedProducts = response.products.filter(
          p => p._id !== this.product._id
        ).slice(0, 4)
      } catch (error) {
        console.error('Error loading related products:', error)
      }
    },
    
    goToProduct(productId) {
      this.$router.push(`/proizvod/${productId}`)
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('hr-HR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price)
    },
    
    openImageModal(imageIndex) {
      this.currentImageIndex = imageIndex
      this.showImageModal = true
      // Sprječava skrolanje pozadine kada je modal otvoren
      document.body.style.overflow = 'hidden'
    },
    
    closeImageModal() {
      this.showImageModal = false
      // Vraća skrolanje pozadine
      document.body.style.overflow = 'auto'
    },
    
    nextImage() {
      if (this.product.images && this.currentImageIndex < this.product.images.length - 1) {
        this.currentImageIndex++
      }
    },
    
    previousImage() {
      if (this.currentImageIndex > 0) {
        this.currentImageIndex--
      }
    },
    
    handleKeyDown(event) {
      if (this.showImageModal) {
        if (event.key === 'Escape') {
          this.closeImageModal()
        } else if (event.key === 'ArrowLeft') {
          this.previousImage()
        } else if (event.key === 'ArrowRight') {
          this.nextImage()
        }
      }
    },
    
    contactAboutProduct() {
      // Preusmjeri na kontakt stranicu s podacima o proizvodu
      const query = {
        product: this.product.name
      }
      
      if (this.product.sku) {
        query.sku = this.product.sku
      }
      
      this.$router.push({
        path: '/kontakt',
        query: query
      })
    }
  },
  
  async mounted() {
    await this.loadProduct()
    document.addEventListener('keydown', this.handleKeyDown)
  },
  
  beforeUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown)
    // Vraća skrolanje pozadine ako je komponenta uništena dok je modal otvoren
    document.body.style.overflow = 'auto'
  },
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