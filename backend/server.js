require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { initializeDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(helmet());

// CORS konfiguracija
const allowedOrigins = [
  'http://localhost:3001',
  'http://localhost:3002', 
  'http://localhost:3003',
  'http://localhost:3004',
  'https://your-app-name.vercel.app', // Zameniti sa stvarnim Vercel domenom
  'https://mobilipiu.hr', // Dodati custom domain ako imate
  'https://www.mobilipiu.hr'
];

app.use(cors({
  origin: function (origin, callback) {
    // Dozvoli requests bez origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1 || process.env.NODE_ENV === 'development') {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Supabase database initialization
initializeDatabase()
.then((success) => {
  if (success) {
    console.log('Supabase PostgreSQL baza podataka povezana uspješno');
  } else {
    console.log('Supabase nije dostupan, aplikacija radi sa mock podacima');
    console.log('Za produkciju, molim konfiguriraj Supabase u .env datoteci');
  }
})
.catch(err => {
  console.error('Greška pri povezivanju sa Supabase:', err);
  console.log('Aplikacija radi sa mock podacima');
});

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/categories', require('./routes/categories'));
app.use('/api/brands', require('./routes/brands'));
app.use('/api/contact', require('./routes/contact'));

// Basic route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Mobili più API - Dobrodošli!',
    owner: 'Sandra Fabijanić',
    location: 'Pozioi 2, Umag'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Nešto je pošlo po zlu!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Ruta nije pronađena' });
});

app.listen(PORT, () => {
  console.log(`Server pokrenut na portu ${PORT}`);
}); 