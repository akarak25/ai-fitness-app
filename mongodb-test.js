// MongoDB bağlantı testi
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config({ path: './backend/.env' });

console.log('MongoDB bağlantı testi başlatılıyor...');
console.log('Bağlantı URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB bağlantısı başarılı!');
    console.log('MongoDB versiyonu:', mongoose.version);
    
    // Bağlantı başarılı
    process.exit(0);
  })
  .catch(err => {
    console.error('MongoDB bağlantı hatası:');
    console.error(err);
    
    // Bağlantı başarısız
    process.exit(1);
  });
