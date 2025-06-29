<template>
  <div class="min-h-screen bg-brown-50">
    <!-- Admin Header -->
    <header class="bg-brown-900 shadow-elegant">
      <div class="container-max py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <h1 class="font-display text-2xl font-light text-white">
              Admin <span class="text-gold-400">Panel</span>
            </h1>
            <span class="text-brown-300">|</span>
            <span class="text-brown-200">Mobili più</span>
          </div>
          
          <div class="flex items-center space-x-4">
            <span class="text-brown-200">
              Pozdrav, <strong class="text-gold-400">{{ user.username }}</strong>
            </span>
            <button
              @click="logout"
              class="px-4 py-2 text-brown-200 hover:text-white border border-brown-600 rounded-lg hover:border-brown-500 transition-colors duration-300"
            >
              Odjavi se
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Admin Navigation -->
    <nav class="bg-white border-b border-brown-200">
      <div class="container-max">
        <div class="flex space-x-8">
          <router-link
            to="/admin/dashboard"
            class="admin-nav-link"
            :class="{ 'border-gold-500 text-gold-600': $route.path === '/admin/dashboard' }"
          >
            📊 Pregled
          </router-link>
          <router-link
            to="/admin/products"
            class="admin-nav-link"
            :class="{ 'border-gold-500 text-gold-600': $route.path === '/admin/products' }"
          >
            📦 Proizvodi
          </router-link>
          <router-link
            to="/admin/add-product"
            class="admin-nav-link"
            :class="{ 'border-gold-500 text-gold-600': $route.path === '/admin/add-product' }"
          >
            ➕ Dodaj proizvod
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="container-max py-8">
      <!-- Dashboard Overview -->
      <div v-if="$route.path === '/admin/dashboard'" class="space-y-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Stats Cards -->
          <div class="bg-white rounded-2xl p-6 shadow-elegant border border-brown-100">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center">
                <span class="text-2xl">📦</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-brown-600">Ukupno proizvoda</p>
                <p class="font-display text-2xl font-semibold text-brown-900">{{ stats.totalProducts }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-elegant border border-brown-100">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span class="text-2xl">✅</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-brown-600">Na stanju</p>
                <p class="font-display text-2xl font-semibold text-brown-900">{{ stats.inStock }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-elegant border border-brown-100">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-brown-100 rounded-xl flex items-center justify-center">
                <span class="text-2xl">🏷️</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-brown-600">Brendova</p>
                <p class="font-display text-2xl font-semibold text-brown-900">{{ stats.totalBrands }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Stats Row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white rounded-2xl p-6 shadow-elegant border border-brown-100">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span class="text-2xl">👁️</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-brown-600">Ukupno pregleda</p>
                <p class="font-display text-2xl font-semibold text-brown-900">{{ stats.totalViews }}</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-2xl p-6 shadow-elegant border border-brown-100">
            <div class="flex items-center">
              <div class="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span class="text-2xl">📈</span>
              </div>
              <div class="ml-4">
                <p class="text-sm text-brown-600">Prosječno pregleda po proizvodu</p>
                <p class="font-display text-2xl font-semibold text-brown-900">{{ averageViews }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-white rounded-2xl p-8 shadow-elegant border border-brown-100">
          <h2 class="font-display text-2xl font-medium text-brown-900 mb-6">Brze akcije</h2>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <router-link
              to="/admin/add-product"
              class="flex items-center p-6 bg-gold-50 rounded-xl border-2 border-gold-200 hover:border-gold-400 transition-colors duration-300"
            >
              <div class="w-12 h-12 bg-gold-400 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl">➕</span>
              </div>
              <div class="ml-4">
                <h3 class="font-display text-lg font-medium text-brown-900">Dodaj novi proizvod</h3>
                <p class="text-brown-600">Dodaj novi proizvod u katalog</p>
              </div>
            </router-link>

            <router-link
              to="/admin/products"
              class="flex items-center p-6 bg-brown-50 rounded-xl border-2 border-brown-200 hover:border-brown-400 transition-colors duration-300"
            >
              <div class="w-12 h-12 bg-brown-400 rounded-xl flex items-center justify-center">
                <span class="text-white text-xl">📋</span>
              </div>
              <div class="ml-4">
                <h3 class="font-display text-lg font-medium text-brown-900">Upravljaj proizvodima</h3>
                <p class="text-brown-600">Pregled i uređivanje postojećih proizvoda</p>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Recent Activity & Popular Products -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <!-- Recent Products -->
          <div class="bg-white rounded-2xl p-8 shadow-elegant border border-brown-100">
            <h2 class="font-display text-2xl font-medium text-brown-900 mb-6">Najnoviji proizvodi</h2>
            
            <div v-if="recentProducts.length === 0" class="text-center py-8">
              <p class="text-brown-600">Nema dodanih proizvoda</p>
            </div>
            
            <div v-else class="space-y-4">
              <div
                v-for="product in recentProducts"
                :key="product._id"
                class="flex items-center p-4 bg-brown-50 rounded-xl"
              >
                <div class="w-16 h-16 bg-brown-200 rounded-lg flex items-center justify-center">
                  <span class="text-2xl">📦</span>
                </div>
                <div class="ml-4 flex-1">
                  <h4 class="font-display font-medium text-brown-900">{{ product.name }}</h4>
                  <p class="text-sm text-brown-600">{{ product.brand }} • {{ product.category }}</p>
                </div>
                <div class="text-right">
                  <p class="font-display font-semibold text-brown-900">{{ formatPrice(product.price) }}</p>
                  <p class="text-sm text-brown-600">{{ formatDate(product.created_at) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Most Viewed Products -->
          <div class="bg-white rounded-2xl p-8 shadow-elegant border border-brown-100">
            <h2 class="font-display text-2xl font-medium text-brown-900 mb-6">Najgledaniji proizvodi</h2>
            
            <div v-if="topViewedProducts.length === 0" class="text-center py-8">
              <p class="text-brown-600">Nema podataka o pregledima</p>
            </div>
            
            <div v-else class="space-y-4">
              <div
                v-for="(product, index) in topViewedProducts"
                :key="product.product_id"
                class="flex items-center p-4 bg-brown-50 rounded-xl"
              >
                <div class="w-16 h-16 bg-gold-100 rounded-lg flex items-center justify-center">
                  <span class="font-display text-xl font-bold text-gold-600">#{{ index + 1 }}</span>
                </div>
                <div class="ml-4 flex-1">
                  <h4 class="font-display font-medium text-brown-900">{{ product.products.name }}</h4>
                  <p class="text-sm text-brown-600">{{ product.products.brand }}</p>
                </div>
                <div class="text-right">
                  <p class="font-display font-semibold text-brown-900">{{ product.count }} pregleda</p>
                  <div class="flex items-center text-sm text-brown-600">
                    <span class="text-lg mr-1">👁️</span>
                    {{ getViewPercentage(product.count) }}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Route outlet for other admin pages -->
      <router-view v-else />
    </main>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'AdminDashboard',
  data() {
    return {
      user: {},
      stats: {
        totalProducts: 0,
        inStock: 0,
        totalBrands: 0,
        totalViews: 0
      },
      recentProducts: [],
      topViewedProducts: []
    }
  },
  computed: {
    averageViews() {
      if (this.stats.totalProducts === 0) return 0;
      return Math.round(this.stats.totalViews / this.stats.totalProducts);
    }
  },
  async mounted() {
    this.checkAuth();
    await this.loadStats();
  },
  methods: {
    checkAuth() {
      const token = localStorage.getItem('admin_token');
      const user = localStorage.getItem('admin_user');
      
      if (!token || !user) {
        this.$router.push('/admin');
        return;
      }
      
      this.user = JSON.parse(user);
    },
    
    async loadStats() {
      try {
        console.log('🔄 Učitavam statistike...');
        
        // Dohvaćanje proizvoda i brendova
        const [productsRes, brandsRes] = await Promise.all([
          apiService.getProducts({ limit: 1000 }),
          apiService.getBrands()
        ]);
        
        console.log('📦 Proizvodi odgovor:', productsRes);
        console.log('🏷️ Brendovi odgovor:', brandsRes);
        
        // Popravka za novi format API-ja
        const products = productsRes.products || [];
        const brands = brandsRes || [];
        
        console.log('📊 Ukupno proizvoda:', products.length);
        console.log('📊 Ukupno brendova:', brands.length);
        
        this.stats = {
          totalProducts: products.length,
          inStock: products.filter(p => p.inStock || p.in_stock).length,
          totalBrands: brands.length,
          totalViews: 0 // Privremeno stavit ću 0 dok ne riješim views tracking
        };
        
        // Get recent products (last 5)
        this.recentProducts = products.slice(0, 5);
        
        // Pokušaj dohvatiti statistike pregleda (može fail)
        try {
          const viewsRes = await apiService.getViewsStats();
          this.stats.totalViews = viewsRes.totalViews || 0;
          this.topViewedProducts = viewsRes.topProducts || [];
          console.log('👁️ Statistike pregleda uspješno učitane:', viewsRes);
        } catch (viewsError) {
          console.warn('⚠️  Greška pri učitavanju statistika pregleda:', viewsError);
          this.topViewedProducts = [];
        }
        
        console.log('✅ Statistike uspješno učitane:', this.stats);
        
      } catch (error) {
        console.error('❌ Greška pri učitavanju statistika:', error);
        
        // Fallback vrijednosti ako se dogodi greška
        this.stats = {
          totalProducts: 0,
          inStock: 0,
          totalBrands: 0,
          totalViews: 0
        };
        this.recentProducts = [];
        this.topViewedProducts = [];
      }
    },
    
    logout() {
      localStorage.removeItem('admin_token');
      localStorage.removeItem('admin_user');
      this.$router.push('/admin');
    },
    
    formatPrice(price) {
      return new Intl.NumberFormat('hr-HR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    },
    
    formatDate(dateString) {
      if (!dateString) return 'N/A';
      return new Date(dateString).toLocaleDateString('hr-HR');
    },
    
    getViewPercentage(count) {
      if (this.stats.totalViews === 0) return 0;
      return Math.round((count / this.stats.totalViews) * 100);
    }
  }
}
</script>

<style scoped>
.admin-nav-link {
  @apply inline-flex items-center px-4 py-4 text-brown-700 border-b-2 border-transparent hover:text-brown-900 hover:border-brown-300 font-medium transition-all duration-300;
}
</style> 