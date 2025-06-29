<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="font-display text-3xl font-light text-brown-900">
        Dodaj novi <span class="text-gold-600">proizvod</span>
      </h1>
      <router-link
        to="/admin/products"
        class="px-4 py-2 text-brown-700 border border-brown-300 rounded-lg hover:border-brown-400 hover:bg-brown-50 transition-all duration-300"
      >
        ← Nazad na proizvode
      </router-link>
    </div>

    <div class="bg-white rounded-2xl shadow-elegant border border-brown-100 p-8">
      <form @submit.prevent="addProduct" class="space-y-6">
        <!-- Basic Information -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="name" class="block font-display font-medium text-brown-800 mb-3">
              Naziv proizvoda *
            </label>
            <input
              id="name"
              v-model="product.name"
              type="text"
              required
              class="form-input"
              placeholder="npr. Bosch WAU24T40BY Perilica rublja"
            />
          </div>

          <div>
            <label for="sku" class="block font-display font-medium text-brown-800 mb-3">
              Šifra proizvoda (SKU)
            </label>
            <input
              id="sku"
              v-model="product.sku"
              type="text"
              class="form-input"
              placeholder="npr. BOSCH-WAU24T40BY"
            />
            <p class="text-sm text-brown-500 mt-1">Jedinstvena šifra proizvoda za lakše prepoznavanje (opcionalno).</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="brand" class="block font-display font-medium text-brown-800 mb-3">
              Brend *
            </label>
            <select
              id="brand"
              v-model="product.brand"
              required
              class="form-select"
            >
              <option value="">Odaberite brend</option>
              <option v-for="brand in brands" :key="brand.name" :value="brand.name">
                {{ brand.name }}
              </option>
            </select>
          </div>

          <div>
            <label for="category" class="block font-display font-medium text-brown-800 mb-3">
              Kategorija *
            </label>
            <select
              id="category"
              v-model="product.category"
              required
              class="form-select"
              @change="updateSubcategories"
            >
              <option value="">Odaberite kategoriju</option>
              <option v-for="category in categories" :key="category.name" :value="category.name">
                {{ category.name }}
              </option>
            </select>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="subcategory" class="block font-display font-medium text-brown-800 mb-3">
              Podkategorija
            </label>
            <select
              id="subcategory"
              v-model="product.subcategory"
              class="form-select"
              :disabled="!product.category"
            >
              <option value="">Odaberite podkategoriju</option>
              <option v-for="subcategory in availableSubcategories" :key="subcategory" :value="subcategory">
                {{ subcategory }}
              </option>
            </select>
          </div>
        </div>

        <!-- Description -->
        <div>
          <label for="description" class="block font-display font-medium text-brown-800 mb-3">
            Opis proizvoda *
          </label>
          <textarea
            id="description"
            v-model="product.description"
            rows="4"
            required
            class="form-input resize-none"
            placeholder="Detaljan opis proizvoda, karakteristike, prednosti..."
          ></textarea>
        </div>

        <!-- Pricing -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="price" class="block font-display font-medium text-brown-800 mb-3">
              Cijena (EUR) *
            </label>
            <input
              id="price"
              v-model.number="product.price"
              type="number"
              step="0.01"
              min="0"
              required
              class="form-input"
              placeholder="599.99"
            />
          </div>

          <div>
            <label for="original_price" class="block font-display font-medium text-brown-800 mb-3">
              Originalna cijena (EUR)
            </label>
            <input
              id="original_price"
              v-model.number="product.original_price"
              type="number"
              step="0.01"
              min="0"
              class="form-input"
              placeholder="799.99"
            />
            <p class="text-sm text-brown-500 mt-1">Ostaviti prazno ako nema popusta</p>
          </div>
        </div>

        <!-- Stock and Status -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="flex items-center">
            <input
              id="in_stock"
              v-model="product.in_stock"
              type="checkbox"
              class="w-4 h-4 text-brown-800 bg-brown-50 border-brown-300 rounded focus:ring-gold-500"
            />
            <label for="in_stock" class="ml-3 text-brown-700">
              Na stanju
            </label>
          </div>

          <div class="flex items-center">
            <input
              id="featured"
              v-model="product.featured"
              type="checkbox"
              class="w-4 h-4 text-brown-800 bg-brown-50 border-brown-300 rounded focus:ring-gold-500"
            />
            <label for="featured" class="ml-3 text-brown-700">
              Izdvojen proizvod
            </label>
          </div>

          <div>
            <label for="warranty" class="block font-display font-medium text-brown-800 mb-3">
              Garancija
            </label>
            <input
              id="warranty"
              v-model="product.warranty"
              type="text"
              class="form-input"
              placeholder="2 godine"
            />
          </div>
        </div>

        <!-- Specifications -->
        <div>
          <label class="block font-display font-medium text-brown-800 mb-3">
            Specifikacije
          </label>
          <div class="space-y-3">
            <div
              v-for="(spec, index) in product.specifications"
              :key="index"
              class="flex gap-3"
            >
              <input
                v-model="spec.key"
                type="text"
                placeholder="Naziv specifikacije"
                class="form-input flex-1"
              />
              <input
                v-model="spec.value"
                type="text"
                placeholder="Vrijednost"
                class="form-input flex-1"
              />
              <button
                type="button"
                @click="removeSpecification(index)"
                class="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            <button
              type="button"
              @click="addSpecification"
              class="px-4 py-2 text-brown-700 border border-brown-300 rounded-lg hover:border-brown-400 hover:bg-brown-50 transition-all duration-300"
            >
              + Dodaj specifikaciju
            </button>
          </div>
        </div>

        <!-- Images -->
        <div>
          <label class="block font-display font-medium text-brown-800 mb-3">
            Slike proizvoda
          </label>
          <div class="space-y-3">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              class="flex gap-3 items-start"
            >
                             <div class="flex-1">
                 <!-- File Upload -->
                 <div class="mb-2">
                   <input
                     :id="`file-${index}`"
                     type="file"
                     accept="image/*"
                     @change="handleFileSelect($event, index)"
                     class="hidden"
                   />
                   <label
                     :for="`file-${index}`"
                     class="cursor-pointer inline-flex items-center px-4 py-2 bg-brown-50 border border-brown-300 rounded-lg text-brown-700 hover:bg-brown-100 transition-colors duration-300"
                   >
                     <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                     </svg>
                     {{ image.file ? 'Promijeni sliku' : 'Odaberi sliku' }}
                   </label>
                   <span v-if="image.file" class="ml-3 text-sm text-brown-600">
                     {{ image.file.name }}
                   </span>
                 </div>
                 
                 <!-- Alt Text -->
                 <input
                   v-model="image.alt"
                   type="text"
                   placeholder="Opis slike (alt tekst)"
                   class="form-input"
                 />
               </div>
               <div v-if="image.preview" class="w-20 h-20 bg-brown-50 border border-brown-200 rounded-lg overflow-hidden">
                 <img 
                   :src="image.preview" 
                   :alt="image.alt"
                   class="w-full h-full object-cover"
                 />
               </div>
              <button
                type="button"
                @click="removeImage(index)"
                class="px-3 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors duration-300"
              >
                ✕
              </button>
            </div>
            
            <button
              type="button"
              @click="addImage"
              class="px-4 py-2 text-brown-700 border border-brown-300 rounded-lg hover:border-brown-400 hover:bg-brown-50 transition-all duration-300"
            >
              + Dodaj sliku
            </button>
          </div>
          <p class="text-sm text-brown-500 mt-2">Odaberite slike proizvoda sa vašeg računala. Prva slika će biti glavna. Maksimalna veličina po slici: 5MB.</p>
        </div>

        <!-- Tags -->
        <div>
          <label for="tags" class="block font-display font-medium text-brown-800 mb-3">
            Tagovi (odvojeni zarezom)
          </label>
          <input
            id="tags"
            v-model="tagsInput"
            type="text"
            class="form-input"
            placeholder="eko-prijateljski, energetski-efikasan, tih"
          />
          <p class="text-sm text-brown-500 mt-1">Unesite tagove odvojene zarezom</p>
        </div>

        <!-- Success/Error Messages -->
        <div v-if="success" class="bg-green-50 border border-green-200 rounded-xl p-4">
          <div class="flex items-center">
            <span class="text-green-600 mr-3">✓</span>
            <p class="text-green-800 font-medium">Proizvod je uspješno dodan!</p>
          </div>
        </div>

        <div v-if="error" class="bg-red-50 border border-red-200 rounded-xl p-4">
          <div class="flex items-center">
            <span class="text-red-600 mr-3">✗</span>
            <p class="text-red-800 font-medium">{{ error }}</p>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="resetForm"
            class="px-6 py-3 text-brown-700 border border-brown-300 rounded-lg hover:border-brown-400 hover:bg-brown-50 transition-all duration-300"
          >
            Resetiraj
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ loading ? 'Dodajem...' : 'Dodaj proizvod' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'AdminAddProduct',
  data() {
    return {
      product: {
        name: '',
        sku: '',
        description: '',
        price: null,
        original_price: null,
        brand: '',
        category: '',
        subcategory: '',
        in_stock: true,
        featured: false,
        warranty: '2 godine',
        specifications: [
          { key: '', value: '' }
        ],
        images: [
          { file: null, preview: '', alt: '' }
        ]
      },
      tagsInput: '',
      categories: [],
      brands: [],
      availableSubcategories: [],
      loading: false,
      success: false,
      error: null
    }
  },
  async mounted() {
    await this.loadCategories();
    await this.loadBrands();
  },
  methods: {
    async loadCategories() {
      try {
        const response = await apiService.getCategories();
        this.categories = response;
      } catch (error) {
        console.error('Greška pri učitavanju kategorija:', error);
      }
    },

    async loadBrands() {
      try {
        const response = await apiService.getBrands();
        this.brands = response;
      } catch (error) {
        console.error('Greška pri učitavanju brendova:', error);
      }
    },

    updateSubcategories() {
      const selectedCategory = this.categories.find(cat => cat.name === this.product.category);
      if (selectedCategory && selectedCategory.subcategories) {
        this.availableSubcategories = Array.isArray(selectedCategory.subcategories) 
          ? selectedCategory.subcategories 
          : JSON.parse(selectedCategory.subcategories);
      } else {
        this.availableSubcategories = [];
      }
      this.product.subcategory = '';
    },

    addSpecification() {
      this.product.specifications.push({ key: '', value: '' });
    },

    removeSpecification(index) {
      if (this.product.specifications.length > 1) {
        this.product.specifications.splice(index, 1);
      }
    },

    addImage() {
      this.product.images.push({ file: null, preview: '', alt: '' });
    },

    removeImage(index) {
      if (this.product.images.length > 1) {
        this.product.images.splice(index, 1);
      }
    },

    handleFileSelect(event, index) {
      const file = event.target.files[0];
      if (file) {
        // Provjeri da li je slika
        if (!file.type.startsWith('image/')) {
          alert('Molimo odaberite samo slike (JPG, PNG, GIF, itd.)');
          return;
        }

        // Provjeri veličinu (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          alert('Slika je prevelika. Maksimalna veličina je 5MB.');
          return;
        }

        // Postavi file i stvori preview
        this.product.images[index].file = file;
        
        // Stvori preview URL
        const reader = new FileReader();
        reader.onload = (e) => {
          this.product.images[index].preview = e.target.result;
        };
        reader.readAsDataURL(file);

        // Automatski postavi alt tekst iz naziva fajla ako je prazan
        if (!this.product.images[index].alt) {
          this.product.images[index].alt = file.name.split('.')[0];
        }
      }
    },

    async addProduct() {
      this.loading = true;
      this.error = null;
      this.success = false;

      try {
        // Validacija - provjeri da li je minimalno jedna slika odabrana
        const hasImages = this.product.images.some(img => img.file);
        if (!hasImages) {
          this.error = 'Molimo dodajte najmanje jednu sliku proizvoda.';
          return;
        }

        // Prepare specifications object
        const specifications = {};
        this.product.specifications.forEach(spec => {
          if (spec.key && spec.value) {
            specifications[spec.key] = spec.value;
          }
        });

        // Prepare tags array
        const tags = this.tagsInput
          .split(',')
          .map(tag => tag.trim())
          .filter(tag => tag.length > 0);

        // Prepare images array - convert to base64 or URLs
        const images = [];
        for (const image of this.product.images) {
          if (image.file) {
            // Za sada koristimo preview (base64) kao URL
            // U produkciji biste uploadovali na server ili cloud storage
            images.push({
              url: image.preview,
              alt: image.alt || this.product.name
            });
          }
        }

        // Prepare product data
        const productData = {
          ...this.product,
          specifications,
          tags,
          images
        };

        await apiService.addProduct(productData);
        
        this.success = true;
        setTimeout(() => {
          this.resetForm();
          this.success = false;
        }, 3000);

      } catch (error) {
        console.error('Greška pri dodavanju proizvoda:', error);
        this.error = 'Greška pri dodavanju proizvoda. Molimo pokušajte ponovno.';
      } finally {
        this.loading = false;
      }
    },

    resetForm() {
      this.product = {
        name: '',
        sku: '',
        description: '',
        price: null,
        original_price: null,
        brand: '',
        category: '',
        subcategory: '',
        in_stock: true,
        featured: false,
        warranty: '2 godine',
        specifications: [
          { key: '', value: '' }
        ],
        images: [
          { file: null, preview: '', alt: '' }
        ]
      };
      this.tagsInput = '';
      this.availableSubcategories = [];
      this.error = null;
      this.success = false;
    }
  }
}
</script> 