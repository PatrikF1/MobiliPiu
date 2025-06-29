import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import './style.css'

// Importovanje komponenti
import Home from './components/Home.vue'
import Products from './components/Products.vue'
import ProductDetail from './components/ProductDetail.vue'
import About from './components/About.vue'
import Contact from './components/Contact.vue'
import Brands from './components/Brands.vue'

// Admin komponente
import AdminLogin from './components/AdminLogin.vue'
import AdminDashboard from './components/AdminDashboard.vue'
import AdminProducts from './components/AdminProducts.vue'
import AdminAddProduct from './components/AdminAddProduct.vue'

// Router guard za admin stranice
const requireAuth = (to, from, next) => {
  const token = localStorage.getItem('admin_token');
  if (token) {
    next();
  } else {
    next('/admin');
  }
}

// Router konfiguracija
const routes = [
  // Javne stranice
  { path: '/', name: 'Home', component: Home },
  { path: '/proizvodi', name: 'Products', component: Products },
  { path: '/proizvod/:id', name: 'ProductDetail', component: ProductDetail, props: true },
  { path: '/o-nama', name: 'About', component: About },
  { path: '/kontakt', name: 'Contact', component: Contact },
  { path: '/brendovi', name: 'Brands', component: Brands },
  
  // Admin stranice
  { 
    path: '/admin', 
    name: 'AdminLogin', 
    component: AdminLogin 
  },
  { 
    path: '/admin/dashboard', 
    name: 'AdminDashboard', 
    component: AdminDashboard,
    beforeEnter: requireAuth
  },
  { 
    path: '/admin/products', 
    name: 'AdminProducts', 
    component: AdminProducts,
    beforeEnter: requireAuth
  },
  { 
    path: '/admin/add-product', 
    name: 'AdminAddProduct', 
    component: AdminAddProduct,
    beforeEnter: requireAuth
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

const app = createApp(App)
app.use(router)
app.mount('#app') 