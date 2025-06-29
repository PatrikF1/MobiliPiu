<template>
  <div class="contact">
    <!-- Hero Section -->
    <section class="bg-brown-50 py-20">
      <div class="container-max text-center">
        <h1 class="font-display text-5xl font-light text-brown-900 mb-6">
          Kontaktirajte <span class="text-gold-600">nas</span>
        </h1>
        <p class="text-lg text-brown-600 max-w-2xl mx-auto">
          Rado ćemo odgovoriti na sva vaša pitanja i pomoći vam pronaći savršeno rješenje
        </p>
      </div>
    </section>

    <!-- Contact Form and Info -->
    <section class="py-20 bg-white">
      <div class="container-max">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <!-- Contact Form -->
          <div>
            <h2 class="font-display text-3xl font-light text-brown-900 mb-8">
              Pošaljite nam <span class="text-gold-600">poruku</span>
            </h2>
            
            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label for="name" class="block font-display font-medium text-brown-800 mb-3">
                  Ime i prezime *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="form-input"
                  placeholder="Vaše ime i prezime"
                />
              </div>

              <div>
                <label for="email" class="block font-display font-medium text-brown-800 mb-3">
                  Email adresa *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="form-input"
                  placeholder="vasa.adresa@email.com"
                />
              </div>

              <div>
                <label for="phone" class="block font-display font-medium text-brown-800 mb-3">
                  Telefon
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="form-input"
                  placeholder="+385 91 568 7580"
                />
              </div>

              <div>
                <label for="message" class="block font-display font-medium text-brown-800 mb-3">
                  Poruka *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="6"
                  required
                  class="form-input resize-none"
                  placeholder="Opišite vaš upit ili potrebe..."
                ></textarea>
              </div>

              <div class="flex items-center">
                <input
                  id="newsletter"
                  v-model="form.newsletter"
                  type="checkbox"
                  class="w-4 h-4 text-brown-800 bg-brown-50 border-brown-300 rounded focus:ring-gold-500 focus:ring-2"
                />
                <label for="newsletter" class="ml-3 text-brown-600">
                  Želim primati novosti o proizvodima i ponudama
                </label>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full px-8 py-4 font-display font-medium text-white bg-brown-800 rounded-xl hover:bg-brown-900 transition-all duration-300 transform hover:-translate-y-1 shadow-warm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isSubmitting ? 'Šalje se...' : 'Pošaljite poruku' }}
              </button>
            </form>

            <!-- Success Message -->
            <div v-if="showSuccess" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-xl">
              <div class="flex items-start">
                <span class="text-green-600 mr-3 mt-0.5">✓</span>
                <div>
                  <p class="text-green-800 font-medium mb-1">Poruka je uspješno poslana!</p>
                  <p class="text-green-700 text-sm">{{ successMessage }}</p>
                </div>
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="showError" class="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <div class="flex items-start">
                <span class="text-red-600 mr-3 mt-0.5">✗</span>
                <div>
                  <p class="text-red-800 font-medium mb-1">Dogodila se greška</p>
                  <p class="text-red-700 text-sm">{{ errorMessage }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact Information -->
          <div>
            <h2 class="font-display text-3xl font-light text-brown-900 mb-8">
              Informacije o <span class="text-gold-600">kontaktu</span>
            </h2>

            <div class="space-y-8">
              <!-- Location -->
              <div class="bg-brown-50 rounded-2xl p-8 border border-brown-100">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-gold-700">📍</span>
                  </div>
                  <div>
                    <h3 class="font-display text-xl font-medium text-brown-900 mb-2">Naša lokacija</h3>
                    <p class="text-brown-600 mb-2">Mobili più</p>
                    <p class="text-brown-600 mb-2">trg.obrt, 52470 Umag, Hrvatska</p>
                    <a 
                      href="https://maps.google.com/?q=Mobili+più+trg.obrt+Umag" 
                      target="_blank"
                      class="text-gold-700 hover:text-gold-800 font-medium transition-colors duration-300"
                    >
                      Otvori u Google Maps →
                    </a>
                  </div>
                </div>
              </div>

              <!-- Working Hours -->
              <div class="bg-brown-50 rounded-2xl p-8 border border-brown-100">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-gold-700">⏰</span>
                  </div>
                  <div class="flex-1">
                    <h3 class="font-display text-xl font-medium text-brown-900 mb-4">Radno vrijeme</h3>
                    <div class="space-y-2">
                      <div class="flex justify-between">
                        <span class="text-brown-600">Ponedjeljak - Četvrtak:</span>
                        <span class="text-brown-800 font-medium">09:00 - 17:00</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-brown-600">Petak:</span>
                        <span class="text-brown-800 font-medium">09:00 - 15:00</span>
                      </div>
                      <div class="flex justify-between">
                        <span class="text-brown-600">Subota i Nedjelja:</span>
                        <span class="text-brown-800 font-medium">Zatvoreno</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Contact Details -->
              <div class="bg-brown-50 rounded-2xl p-8 border border-brown-100">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-gold-700">📞</span>
                  </div>
                  <div>
                    <h3 class="font-display text-xl font-medium text-brown-900 mb-4">Kontakt</h3>
                    <div class="space-y-3">
                      <div>
                        <p class="text-brown-600 mb-1">Telefon:</p>
                        <a href="tel:+385915687580" class="text-brown-800 font-medium hover:text-gold-700 transition-colors duration-300">
                          +385 91 568 7580
                        </a>
                      </div>
                      <div>
                        <p class="text-brown-600 mb-1">Email:</p>
                        <a href="mailto:info.mobilipiu@gmail.com" class="text-brown-800 font-medium hover:text-gold-700 transition-colors duration-300">
                          info.mobilipiu@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Owner Info -->
              <div class="bg-brown-50 rounded-2xl p-8 border border-brown-100">
                <div class="flex items-start space-x-4">
                  <div class="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span class="text-gold-700">👤</span>
                  </div>
                  <div>
                    <h3 class="font-display text-xl font-medium text-brown-900 mb-2">Vlasnica</h3>
                    <p class="text-brown-800 font-medium mb-2">Sandra Fabijanić</p>
                    <p class="text-brown-600">
                      Stručnjak za dizajn prostora i kućanske aparate s dugogodišnjim iskustvom
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-brown-50">
      <div class="container-max">
        <div class="text-center mb-16">
          <h2 class="font-display text-4xl font-light text-brown-900 mb-6">
            Često postavljena <span class="text-gold-600">pitanja</span>
          </h2>
          <p class="text-lg text-brown-600 max-w-2xl mx-auto">
            Odgovori na najčešća pitanja naših klijenata
          </p>
        </div>

        <div class="max-w-3xl mx-auto space-y-6">
          <div class="bg-white rounded-2xl border border-brown-100 overflow-hidden">
            <div class="p-6">
              <h3 class="font-display text-lg font-medium text-brown-900 mb-3">
                Nudite li uslugu isporuke i montaže?
              </h3>
              <p class="text-brown-600">
                Da, nudimo kompletnu uslugu isporuke i profesionalne montaže za sve naše proizvode. 
                Naš tim stručnjaka će osigurati da vaši aparati budu pravilno instalirani i funkcionalni.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-brown-100 overflow-hidden">
            <div class="p-6">
              <h3 class="font-display text-lg font-medium text-brown-900 mb-3">
                Koliko dugo traje garancija na proizvode?
              </h3>
              <p class="text-brown-600">
                Garancija varira ovisno o proizvodu i brendu, obično od 2 do 5 godina. 
                Svi proizvodi dolaze s punom međunarodnom garancijom i servisnom podrškom.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-brown-100 overflow-hidden">
            <div class="p-6">
              <h3 class="font-display text-lg font-medium text-brown-900 mb-3">
                Mogu li vidjeti proizvode prije kupovine?
              </h3>
              <p class="text-brown-600">
                Apsolutno! Pozivamo vas da posjetite našu trgovinu u Umagu gdje možete vidjeti 
                i testirati proizvode. Preporučujemo da se najavite kako bismo vam osigurali 
                personalizirano savjetovanje.
              </p>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-brown-100 overflow-hidden">
            <div class="p-6">
              <h3 class="font-display text-lg font-medium text-brown-900 mb-3">
                Nudite li financiranje kupovine?
              </h3>
              <p class="text-brown-600">
                Trenutno ne nudimo vlastite opcije financiranja, ali možete koristiti
                vlastite bankarske ili kreditne opcije za kupovinu. Rado ćemo vam pomoći
                s potrebnom dokumentacijom za vaše financiranje.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { apiService } from '../services/api.js'

export default {
  name: 'Contact',
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        message: '',
        newsletter: false
      },
      isSubmitting: false,
      showSuccess: false,
      showError: false,
      successMessage: '',
      errorMessage: ''
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      this.showSuccess = false
      this.showError = false
      this.successMessage = ''
      this.errorMessage = ''

      try {
        const response = await apiService.submitContactForm({
          name: this.form.name,
          email: this.form.email,
          phone: this.form.phone,
          message: this.form.message
        })
        
        if (response.success) {
          this.showSuccess = true
          this.successMessage = response.message || 'Odgovorit ćemo vam u najkraćem mogućem roku.'
          this.resetForm()
        } else {
          this.showError = true
          this.errorMessage = response.message || 'Molimo pokušajte ponovno.'
        }
      } catch (error) {
        console.error('Error submitting form:', error)
        this.showError = true
        
        if (error.response && error.response.data && error.response.data.message) {
          this.errorMessage = error.response.data.message
        } else {
          this.errorMessage = 'Molimo pokušajte ponovno ili nas kontaktirajte direktno na +385 91 568 7580.'
        }
      } finally {
        this.isSubmitting = false
        
        // Sakrij poruke nakon 8 sekundi
        setTimeout(() => {
          this.showSuccess = false
          this.showError = false
        }, 8000)
      }
    },

    resetForm() {
      // Ne resetiraj automatski popunjene podatke
      if (!this.$route.query.product) {
        this.form = {
          name: '',
          email: '',
          phone: '',
          message: '',
          newsletter: false
        }
      } else {
        this.form.name = ''
        this.form.email = ''
        this.form.phone = ''
        this.form.newsletter = false
      }
    }
  },
  
  mounted() {
    // Automatski popuni formu ako su prosliješeni podaci o proizvodu
    const { product, sku } = this.$route.query
    
    if (product) {
      this.form.message = `Zanima me proizvod: ${product}`
      
      if (sku) {
        this.form.message += `\nŠifra proizvoda: ${sku}`
      }
      
      this.form.message += '\n\nMolimo vas da mi pošaljete više informacija o:\n- Cijeni\n- Dostupnosti\n- Načinu plaćanja\n- Isporuci\n\nHvala!'
    }
  }
}
</script> 