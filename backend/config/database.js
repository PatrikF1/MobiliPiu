const { createClient } = require('@supabase/supabase-js');

// Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase = null;

// Inicijaliziraj Supabase klijent
if (supabaseUrl && supabaseKey) {
  supabase = createClient(supabaseUrl, supabaseKey);
}

// Inicijaliziraj bazu podataka
async function initializeDatabase() {
  if (!supabase) {
    console.log('Supabase nije konfiguriran, koristim mock podatke');
    return false;
  }

  try {
    // Test konekcije - pokušaj da dohvatiš bilo koje podatke
    console.log('Testiram Supabase konekciju...');
    
    // Pokušaj osnovnu operaciju da vidiš da li su tabele dostupne
    const { data, error } = await supabase
      .from('products')
      .select('count')
      .limit(1);

    if (error && error.message.includes('does not exist')) {
      console.log('⚠️  Tabele još nisu kreirane u Supabase.');
      console.log('📋 Molim idite na Supabase dashboard i kreirajte tabele ili koristite SQL Editor.');
      console.log('🔗 Dashboard: ' + process.env.SUPABASE_URL.replace('/rest/v1', ''));
      return false;
    } else if (error) {
      console.log('❌ Supabase greška:', error.message);
      return false;
    } else {
      console.log('✅ Supabase uspešno povezan!');
      
      // Dodaj početne podatke ako je potrebno
      await initializeBrands();
      await initializeCategories();  
      await initializeSampleProducts();
      
      return true;
    }
  } catch (error) {
    console.error('❌ Greška pri povezivanju sa Supabase:', error.message);
    return false;
  }
}

// Inicijaliziraj brendove
async function initializeBrands() {
  if (!supabase) return;

  try {
    // Provjeri da li već postoje brendovi
    const { data: existingBrands } = await supabase
      .from('brands')
      .select('name')
      .limit(1);

    if (existingBrands && existingBrands.length > 0) {
      console.log('Brendovi već postoje u bazi');
      return;
    }

    const brands = [
      {
        name: 'Bosch',
        description: 'Vodeći njemački proizvođač kućanskih aparata poznat po inovacijama i kvaliteti.',
        logo: '/images/brands/bosch-logo.png',
        website: 'https://www.bosch-home.com',
        specialties: ['Bijela tehnika', 'Mali kućanski aparati', 'Ugradbeni aparati']
      },
      {
        name: 'Miele', 
        description: 'Premium njemački brand za kućanske aparate visoke kvalitete s dugotrajnim performansama.',
        logo: '/images/brands/miele-logo.png',
        website: 'https://www.miele.com',
        specialties: ['Bijela tehnika', 'Mali kućanski aparati', 'Pranje i sušenje']
      },
      // Add more brands here as needed...
    ];

    const { error } = await supabase
      .from('brands')
      .insert(brands);

    if (error) {
      console.log('Tabela brands možda ne postoji:', error.message);
    } else {
      console.log('Brendovi uspješno dodani u bazu');
    }
  } catch (error) {
    console.log('Greška pri dodavanju brendova (tabela ne postoji):', error.message);
  }
}

// Inicijaliziraj kategorije
async function initializeCategories() {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('categories')
      .select('name')
      .limit(1);
      
    if (error) {
      console.log('Tabela categories možda ne postoji:', error.message);
    }
  } catch (error) {
    console.log('Greška pri provjeri kategorija (tabela ne postoji)');
  }
}

// Dodaj početne proizvode  
async function initializeSampleProducts() {
  if (!supabase) return;
  
  try {
    const { error } = await supabase
      .from('products')
      .select('name')
      .limit(1);
      
    if (error) {
      console.log('Tabela products možda ne postoji:', error.message);
    }
  } catch (error) {
    console.log('Greška pri provjeri proizvoda (tabela ne postoji)');
  }
}

module.exports = {
  supabase,
  initializeDatabase
}; 