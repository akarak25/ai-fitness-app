const openai = require('../config/openai');
const NutritionPlan = require('../models/nutritionPlanModel');
const WorkoutPlan = require('../models/workoutPlanModel');
const User = require('../models/userModel');

// @desc    AI yardımcı bot ile etkileşim
// @route   POST /api/ai/assistant
// @access  Private
const assistantChat = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id;

    // Kullanıcı bilgilerini al
    const user = await User.findById(userId);
    
    // Kullanıcının aktif planlarını al
    const nutritionPlan = await NutritionPlan.findOne({ 
      user: userId,
      isActive: true 
    }).sort('-createdAt');
    
    const workoutPlan = await WorkoutPlan.findOne({ 
      user: userId,
      isActive: true 
    }).sort('-createdAt');

    // AI yardımcı için bilgi hazırla
    let context = `Kullanıcı Bilgileri:
- İsim: ${user.name}
- Yaş: ${user.age}
- Cinsiyet: ${user.gender === 'male' ? 'Erkek' : 'Kadın'}
- Boy: ${user.height} cm
- Kilo: ${user.weight} kg
- Hedef Kilo: ${user.goalWeight} kg
- BMI: ${user.calculateBMI()}
- Diyet Kısıtlamaları: ${user.dietaryRestrictions.join(', ') || 'Yok'}
- Sağlık Durumları: ${user.healthConditions.join(', ') || 'Yok'}
`;

    if (nutritionPlan) {
      context += `\nAktif Beslenme Planı: ${nutritionPlan.name}
- Günlük Hedef Kalori: ${nutritionPlan.targetCalories} kcal
- Günlük Hedef Protein: ${nutritionPlan.targetProtein} g
- Günlük Hedef Karbonhidrat: ${nutritionPlan.targetCarbs} g
- Günlük Hedef Yağ: ${nutritionPlan.targetFat} g
`;
    }

    if (workoutPlan) {
      context += `\nAktif Egzersiz Planı: ${workoutPlan.name}
- Egzersiz Hedefi: ${workoutPlan.goal}
- Haftada Egzersiz Günü: ${workoutPlan.daysPerWeek}
`;
    }

    // AI'a gönderilecek prompt
    const prompt = `${context}

Sen kullanıcının kişisel sağlık ve fitness asistanısın. Yukarıdaki bilgileri kullanarak kullanıcının beslenme, egzersiz, motivasyon ve genel sağlık konusundaki sorularını yanıtla. Kısa, net ve bilgilendirici yanıtlar ver. Bilimsel temelli, güncel bilgiler sun.

Kullanıcı Sorusu: ${message}`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({
      message: response.choices[0].message.content,
      timestamp: new Date()
    });
  } catch (error) {
    console.error('AI Asistan hatası:', error);
    res.status(500).json({ message: 'AI asistanı ile iletişim kurulurken bir hata oluştu', error: error.message });
  }
};

// @desc    Yemek fotoğrafı analizi
// @route   POST /api/ai/analyze-food
// @access  Private
const analyzeFoodImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Lütfen bir yemek fotoğrafı yükleyin' });
    }

    // Görsel veriyi base64 formatına dönüştür
    const fs = require('fs');
    const path = require('path');
    const imagePath = path.join(__dirname, '..', 'public', `/uploads/food/${req.file.filename}`);
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');

    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Bu yemek fotoğrafını analiz et ve şu bilgileri ver: 1) Yemek adı/tanımı, 2) Tahmini kalori miktarı, 3) Tahmini besin değerleri (protein, karbonhidrat, yağ), 4) Porsiyonu. JSON formatında döndür: {\"name\": \"...\", \"calories\": 123, \"protein\": 10, \"carbs\": 20, \"fat\": 5, \"portion\": \"...\"}" },
            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
          ]
        }
      ],
      max_tokens: 500
    });

    // JSON formatına dönüştür
    let foodData;
    try {
      foodData = JSON.parse(response.choices[0].message.content);
    } catch (e) {
      // Eğer düzgün JSON döndürülmediyse manuel olarak çıkar
      const content = response.choices[0].message.content;
      foodData = {
        name: content.match(/["']name["']\s*:\s*["']([^"']*)["']/i)?.[1] || "Bilinmeyen Yemek",
        calories: parseInt(content.match(/["']calories["']\s*:\s*(\d+)/i)?.[1] || "0"),
        protein: parseFloat(content.match(/["']protein["']\s*:\s*(\d+\.?\d*)/i)?.[1] || "0"),
        carbs: parseFloat(content.match(/["']carbs["']\s*:\s*(\d+\.?\d*)/i)?.[1] || "0"),
        fat: parseFloat(content.match(/["']fat["']\s*:\s*(\d+\.?\d*)/i)?.[1] || "0"),
        portion: content.match(/["']portion["']\s*:\s*["']([^"']*)["']/i)?.[1] || "1 porsiyon"
      };
    }

    // Fotoğraf URL'ini ekle
    foodData.photoUrl = `/uploads/food/${req.file.filename}`;
    foodData.timestamp = new Date();

    res.json(foodData);
  } catch (error) {
    console.error('Yemek analizi hatası:', error);
    res.status(500).json({ message: 'Yemek analizi yapılırken bir hata oluştu', error: error.message });
  }
};

// @desc    Duygu ve stres analizi
// @route   POST /api/ai/analyze-mood
// @access  Private
const analyzeMood = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim().length < 10) {
      return res.status(400).json({ message: 'Lütfen analiz için yeterli metin girin (en az 10 karakter)' });
    }

    const prompt = `Aşağıdaki metni duygu ve stres açısından analiz et. Metin kişinin günlük notları veya duygularını ifade ettiği bir yazıdır. Analiz sonuçlarını şu formatta döndür:

1. Baskın duygu (tek kelime: mutlu, üzgün, kızgın, endişeli, stresli, rahat, motive, yorgun)
2. Stres seviyesi (1-10 arası, 1 en düşük, 10 en yüksek)
3. Duygu durumu açıklaması (1-2 cümle)
4. Psikolojik iyi oluş önerileri (2-3 madde)

JSON formatında döndür: 
{
  "dominantMood": "...",
  "stressLevel": 5,
  "analysis": "...",
  "recommendations": ["...", "..."]
}

Metin: "${text}"`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 500
    });

    // JSON formatına dönüştür
    let moodData;
    try {
      moodData = JSON.parse(response.choices[0].message.content);
    } catch (e) {
      return res.status(500).json({ message: 'Duygu analizi sonuçları işlenirken bir hata oluştu' });
    }

    // Zaman damgası ekle
    moodData.timestamp = new Date();

    res.json(moodData);
  } catch (error) {
    console.error('Duygu analizi hatası:', error);
    res.status(500).json({ message: 'Duygu analizi yapılırken bir hata oluştu', error: error.message });
  }
};

module.exports = {
  assistantChat,
  analyzeFoodImage,
  analyzeMood
};