# AI Fitness - Yapay Zeka Destekli Sağlık ve Fitness Platformu

AI Fitness, kullanıcıların beslenme alışkanlıklarını, fitness hedeflerini ve genel sağlıklarını takip etmelerine yardımcı olan yapay zeka destekli bir web uygulamasıdır. OpenAI API'lerini kullanarak kişiselleştirilmiş beslenme planları, egzersiz rutinleri ve sağlık önerileri sunmaktadır.

## Özellikler

- Kullanıcı kaydı ve kimlik doğrulama sistemi
- Kişiselleştirilmiş beslenme planı oluşturma
- Akıllı kalori takibi (yemek fotoğrafı analizi)
- Sanal fitness koçu (kişiselleştirilmiş egzersiz planları)
- İlerleme takibi ve analizi
- Akıllı alışveriş listesi oluşturucu
- AI destekli soru-cevap botu
- Duygu ve stres analizi
- Topluluk desteği

## Teknoloji Yığını

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js (Express.js)
- **Veritabanı**: MongoDB
- **API**: OpenAI GPT-3.5

## Kurulum

### Gereksinimler

- Node.js (v14+)
- MongoDB
- OpenAI API anahtarı

### Backend Kurulumu

1. Proje dizinine gidin ve backend klasörüne girin:
   ```bash
   cd ai-fitness-app/backend
   ```

2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```

3. `.env` dosyasını düzenleyin ve gerekli bilgileri ekleyin:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/ai-fitness-app
   JWT_SECRET=your_jwt_secret_key_change_this_in_production
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=development
   ```

4. Backend'i başlatın:
   ```bash
   npm run dev
   ```

### Frontend Kurulumu

1. Yeni bir terminal açın ve frontend klasörüne gidin:
   ```bash
   cd ai-fitness-app/frontend
   ```

2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```

3. Frontend'i başlatın:
   ```bash
   npm start
   ```

4. Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

## Kullanım

1. Uygulamaya kayıt olun veya giriş yapın
2. Profilinizi tamamlayın (boy, kilo, hedefler vb.)
3. Beslenme planı veya egzersiz rutini oluşturun
4. İlerlemenizi takip edin ve AI asistanınıza sorular sorun
5. Topluluk özelliklerini kullanarak diğer kullanıcılarla etkileşimde bulunun

## Katkıda Bulunma

1. Bu repoyu fork edin
2. Yeni bir feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakın.

## İletişim

Proje sahibi: [Adınız](mailto:your-email@example.com)

Proje linki: [https://github.com/yourusername/ai-fitness-app](https://github.com/yourusername/ai-fitness-app)