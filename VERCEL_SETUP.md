# 🚀 Vercel Deployment - Mobili Più

## Environment Varijable za Vercel

U Vercel Dashboard -> Settings -> Environment Variables dodajte sljedeće:

### Backend Environment Varijable:

```bash
# Supabase konfiguracija
SUPABASE_URL=https://gsurwyuqztsxpxfevqti.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdzdXJ3eXVxenRzeHB4ZmV2cXRpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTExMTU3MjAsImV4cCI6MjA2NjY5MTcyMH0.8FCKuhvUJ5tckgYnMqt6foj8lQwb1ScV2GpswbftF0w
DATABASE_URL=postgresql://postgres:Fabijanic099@db.gsurwyuqztsxpxfevqti.supabase.co:5432/postgres

# Gmail SMTP konfiguracija
GMAIL_USER=info.mobilipiu@gmail.com
GMAIL_APP_PASSWORD=wjzz nahw heap keap
GMAIL_FROM_NAME=Mail

# Production konfiguracija
NODE_ENV=production
```

### Frontend Environment Varijable:

```bash
# API URL (zameniti sa stvarnim Vercel domenom)
VITE_API_URL=https://your-app-name.vercel.app/api
```

## 📋 Koraci za Deployment:

### 1. Push kod na GitHub:
```bash
git init
git add .
git commit -m "Initial commit - Mobili Più website"
git remote add origin https://github.com/your-username/mobili-piu.git
git push -u origin main
```

### 2. Vercel Deployment:
1. Idite na [vercel.com](https://vercel.com)
2. Registrirajte se sa GitHub računom
3. Kliknite "New Project"
4. Odaberite svoj GitHub repository
5. **Framework Preset**: Other
6. **Root Directory**: . (ostaviti prazno)
7. **Build Command**: Ostaviti prazno (Vercel će koristiti vercel.json)
8. **Output Directory**: Ostaviti prazno

### 3. Environment Varijable:
1. U Project Settings -> Environment Variables
2. Dodajte sve varijable navedene gore
3. Postavite ih za sve environments (Production, Preview, Development)

### 4. Custom Domain (opcionalno):
1. Idite na Project Settings -> Domains
2. Dodajte svoj domain (npr. mobilipiu.hr)
3. Konfigurirajte DNS prema Vercel instrukcijama

## 🔧 Troubleshooting:

### Uobičajeni problemi:

1. **API pozivi ne rade**:
   - Provjerite da je `VITE_API_URL` postavljena
   - Zamenite sa stvarnim Vercel domenom

2. **Email ne radi**:
   - Provjerite Gmail App Password
   - Provjerite da su environment varijable postavljene

3. **Build fails**:
   - Provjerite da li vercel.json ima ispravnu konfiguraciju
   - Provjerite da li frontend ima build script

### Build Command za Vercel:
Vercel automatski detektira build konfiguraciju iz `vercel.json`.

### Lokalni Testing:
```bash
# Install Vercel CLI
npm i -g vercel

# Test locally
vercel dev
```

## 📱 Finalna Provera:

Kad je deployment gotov:
- ✅ Početna stranica se učitava
- ✅ Proizvodi se učitavaju iz Supabase
- ✅ Contact forma šalje email
- ✅ Admin panel radi
- ✅ Favicon se prikazuje

## 🌐 Live URL:
Nakon deployment-a, aplikacija će biti dostupna na:
`https://your-app-name.vercel.app` 