<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-3xl font-light text-brown-900">
        Upravljanje <span class="text-gold-600">proizvodima</span>
      </h1>
      <router-link
        to="/admin/add-product"
        class="btn-primary"
      >
        ➕ Dodaj novi proizvod
      </router-link>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-2xl shadow-elegant border border-brown-100 p-6">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <input
            v-model="filters.search"
            type="text"
            placeholder="Pretraži proizvode..."
            class="form-input"
            @keyup.enter="loadProducts"
          />
        </div>
        
        <div>
          <select
            v-model="filters.category"
            class="form-select"
            @change="loadProducts"
          >
            <option value="">Sve kategorije</option>
            <option v-for="category in categories" :key="category.name" :value="category.name">
              {{ category.name }}
            </option>
          </select>
        </div>
        
        <div>
          <select
            v-model="filters.brand"
            class="form-select"
            @change="loadProducts"
          >
            <option value="">Svi brendovi</option>
            <option v-for="brand in brands" :key="brand.name" :value="brand.name">
              {{ brand.name }}
            </option>
          </select>
        </div>
        
        <div>
          <button
            @click="loadProducts"
            class="w-full btn-primary"
          >
            Pretraži
          </button>
        </div>
      </div>
    </div>

    <!-- Products Table -->
    <div class="bg-white rounded-2xl shadow-elegant border border-brown-100 overflow-hidden">
      <div v-if="loading" class="text-center py-16">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-brown-200 border-t-brown-800 mx-auto"></div>
        <p class="mt-6 font-display text-brown-600">Učitavanje proizvoda...</p>
      </div>

      <div v-else-if="products.length === 0" class="text-center py-16">
        <div class="text-6xl text-brown-300 mb-6">📦</div>
        <h3 class="font-display text-2xl font-medium text-brown-800 mb-3">Nema proizvoda</h3>
        <p class="text-brown-600 mb-6">Dodajte prvi proizvod u katalog</p>
        <router-link to="/admin/add-product" class="btn-primary">
          Dodaj proizvod
        </router-link>
      </div>

      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-brown-200">
          <thead class="bg-brown-50">
            <tr>
              <th class="px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider">
                Proizvod
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider">
                Brend
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider">
                Kategorija
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider">
                Cijena
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider">
                Status
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-brown-500 uppercase tracking-wider">
                Akcije
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-brown-200">
            <tr
              v-for="product in products"
              :key="product._id || product.id"
              class="hover:bg-brown-50 transition-colors duration-300"
            >
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-12 w-12">
                    <div class="h-12 w-12 bg-brown-200 rounded-lg flex items-center justify-center">
                      <span class="text-brown-600">📦</span>
                    </div>
                  </div>
                  <div class="ml-4">
                    <div class="font-display text-sm font-medium text-brown-900">
                      {{ product.name }}
                    </div>
                    <div class="text-sm text-brown-500">
                      {{ truncateDescription(product.description) }}
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100 text-gold-800">
                  {{ product.brand }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-brown-900">
                {{ product.category }}
                <div v-if="product.subcategory" class="text-xs text-brown-500">
                  {{ product.subcategory }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-brown-900">{{ formatPrice(product.price) }}</div>
                <div v-if="product.original_price" class="text-xs text-brown-500 line-through">
                  {{ formatPrice(product.original_price) }}
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col space-y-1">
                  <span 
                    :class="[
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      (product.in_stock || product.inStock) ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    ]"
                  >
                    {{ (product.in_stock || product.inStock) ? 'Na stanju' : 'Nema na stanju' }}
                  </span>
                  <span 
                    v-if="product.featured"
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gold-100 text-gold-800"
                  >
                    Izdvojen
                  </span>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div class="flex space-x-2">
                  <button
                    @click="editProduct(product)"
                    class="text-brown-600 hover:text-brown-900 transition-colors duration-300"
                    title="Uredi proizvod"
                  >
                    ✏️
                  </button>
                  <button
                    @click="confirmDelete(product)"
                    class="text-red-600 hover:text-red-900 transition-colors duration-300"
                    title="Obriši proizvod"
                  >
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="pagination && pagination.totalPages > 1" class="bg-brown-50 px-6 py-3 border-t border-brown-200">
        <div class="flex items-center justify-between">
          <div class="text-sm text-brown-700">
            Prikazano {{ products.length }} od {{ pagination.totalItems }} proizvoda
          </div>
          <div class="flex items-center space-x-2">
            <button
              @click="changePage(pagination.currentPage - 1)"
              :disabled="!pagination.hasPrev"
              class="px-3 py-1 text-sm border border-brown-300 rounded hover:bg-brown-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prethodna
            </button>
            
            <span class="px-3 py-1 text-sm bg-brown-800 text-white rounded">
              {{ pagination.currentPage }}
            </span>
            
            <button
              @click="changePage(pagination.currentPage + 1)"
              :disabled="!pagination.hasNext"
              class="px-3 py-1 text-sm border border-brown-300 rounded hover:bg-brown-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sljedeća
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="deleteModal.show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
        <h3 class="font-display text-xl font-medium text-brown-900 mb-4">
          Potvrdi brisanje
        </h3>
        <p class="text-brown-600 mb-6">
          Jeste li sigurni da želite obrisati proizvod "<strong>{{ deleteModal.product?.name }}</strong>"?
          Ova akcija se ne može poništiti.
        </p>
        <div class="flex justify-end space-x-4">
          <button
            @click="deleteModal.show = false"
            class="px-4 py-2 text-brown-700 border border-brown-300 rounded-lg hover:bg-brown-50 transition-colors duration-300"
          >
            Odustani
          </button>
          <button
            @click="deleteProduct"
            :disabled="deleteModal.loading"
            class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:opacity-50"
          >
            {{ deleteModal.loading ? 'Brišem...' : 'Obriši' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="message.show" class="fixed bottom-4 right-4 z-50">
      <div 
        :class="[
          'p-4 rounded-lg shadow-lg',
          message.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        ]"
      >
        {{ message.text }}
      </div>
    </div>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'AdminProducts',
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
      pagination: null,
      deleteModal: {
        show: false,
        product: null,
        loading: false
      },
      message: {
        show: false,
        type: 'success',
        text: ''
      }
    }
  },
  async mounted() {
    await this.loadInitialData();
    await this.loadProducts();
  },
  methods: {
    async loadInitialData() {
      try {
        const [categoriesRes, brandsRes] = await Promise.all([
          apiService.getCategories(),
          apiService.getBrands()
        ]);
        
        this.categories = categoriesRes;
        this.brands = brandsRes;
      } catch (error) {
        console.error('Greška pri učitavanju početnih podataka:', error);
      }
    },

    async loadProducts() {
      this.loading = true;
      try {
        const params = {
          page: this.filters.page,
          limit: 20
        };
        
        if (this.filters.search) params.search = this.filters.search;
        if (this.filters.category) params.category = this.filters.category;
        if (this.filters.brand) params.brand = this.filters.brand;
        
        const response = await apiService.getProducts(params);
        this.products = response.products || [];
        this.pagination = response.pagination;
      } catch (error) {
        console.error('Greška pri učitavanju proizvoda:', error);
        this.showMessage('Greška pri učitavanju proizvoda', 'error');
      } finally {
        this.loading = false;
      }
    },

    changePage(page) {
      if (page >= 1 && page <= this.pagination.totalPages) {
        this.filters.page = page;
        this.loadProducts();
      }
    },

    editProduct(product) {
      // For now, just log - we could implement inline editing or redirect to edit page
      console.log('Edit product:', product);
      this.showMessage('Uređivanje proizvoda će biti implementirano uskoro', 'info');
    },

    confirmDelete(product) {
      this.deleteModal.product = product;
      this.deleteModal.show = true;
    },

    async deleteProduct() {
      this.deleteModal.loading = true;
      
      try {
        await apiService.deleteProduct(this.deleteModal.product._id || this.deleteModal.product.id);
        this.showMessage('Proizvod je uspješno obrisan', 'success');
        await this.loadProducts();
        this.deleteModal.show = false;
      } catch (error) {
        console.error('Greška pri brisanju proizvoda:', error);
        this.showMessage('Greška pri brisanju proizvoda', 'error');
      } finally {
        this.deleteModal.loading = false;
      }
    },

    truncateDescription(description) {
      if (!description) return '';
      return description.length > 60 ? description.substring(0, 60) + '...' : description;
    },

    formatPrice(price) {
      return new Intl.NumberFormat('hr-HR', {
        style: 'currency',
        currency: 'EUR'
      }).format(price);
    },

    showMessage(text, type = 'success') {
      this.message = {
        show: true,
        type,
        text
      };
      
      setTimeout(() => {
        this.message.show = false;
      }, 3000);
    }
  }
}
</script> 