// Varsayılan basit beslenme planı oluşturma fonksiyonu
const createDefaultNutritionPlan = (user, targetCalories) => {
  // Protein, karbonhidrat ve yağ dağılımı
  const targetProtein = Math.round(targetCalories * 0.3 / 4); // Protein kalori yüzdesi / 4
  const targetCarbs = Math.round(targetCalories * 0.4 / 4);   // Karbonhidrat kalori yüzdesi / 4
  const targetFat = Math.round(targetCalories * 0.3 / 9);    // Yağ kalori yüzdesi / 9

  // 3 günlük basit bir plan oluştur
  return {
    "dayPlans": [
      {
        "day": "Pazartesi",
        "meals": [
          {
            "name": "Kahvaltı",
            "foods": [
              {
                "name": "Yumurta",
                "portion": "2 adet",
                "calories": 140,
                "protein": 12,
                "carbs": 0,
                "fat": 10
              },
              {
                "name": "Tam buğday ekmeği",
                "portion": "2 dilim",
                "calories": 170,
                "protein": 8,
                "carbs": 30,
                "fat": 2
              }
            ],
            "totalCalories": 310,
            "totalProtein": 20,
            "totalCarbs": 30,
            "totalFat": 12
          },
          {
            "name": "Ara Öğün",
            "foods": [
              {
                "name": "Yoğurt",
                "portion": "1 kase",
                "calories": 70,
                "protein": 6,
                "carbs": 6,
                "fat": 2
              },
              {
                "name": "Meyve",
                "portion": "1 adet",
                "calories": 50,
                "protein": 1,
                "carbs": 12,
                "fat": 0
              }
            ],
            "totalCalories": 120,
            "totalProtein": 7,
            "totalCarbs": 18,
            "totalFat": 2
          },
          {
            "name": "Öğle Yemeği",
            "foods": [
              {
                "name": "Tavuk göğsü",
                "portion": "150 gram",
                "calories": 165,
                "protein": 31,
                "carbs": 0,
                "fat": 3
              },
              {
                "name": "Bulgur pilavı",
                "portion": "1 kase",
                "calories": 220,
                "protein": 5,
                "carbs": 45,
                "fat": 1
              }
            ],
            "totalCalories": 385,
            "totalProtein": 36,
            "totalCarbs": 45,
            "totalFat": 4
          },
          {
            "name": "Akşam Yemeği",
            "foods": [
              {
                "name": "Kırmızı et",
                "portion": "100 gram",
                "calories": 250,
                "protein": 25,
                "carbs": 0,
                "fat": 15
              },
              {
                "name": "Sebze",
                "portion": "1 porsiyon",
                "calories": 30,
                "protein": 1,
                "carbs": 6,
                "fat": 0
              }
            ],
            "totalCalories": 280,
            "totalProtein": 26,
            "totalCarbs": 6,
            "totalFat": 15
          }
        ],
        "totalDailyCalories": 1095,
        "totalDailyProtein": 89,
        "totalDailyCarbs": 99,
        "totalDailyFat": 33,
        "notes": "Yeterli su tüketmeyi unutmayın. Günde en az 2 litre su içmeye çalışın."
      },
      {
        "day": "Salı",
        "meals": [
          {
            "name": "Kahvaltı",
            "foods": [
              {
                "name": "Yulaf ezmesi",
                "portion": "1 kase",
                "calories": 160,
                "protein": 6,
                "carbs": 28,
                "fat": 3
              },
              {
                "name": "Süt",
                "portion": "1 bardak",
                "calories": 120,
                "protein": 8,
                "carbs": 12,
                "fat": 5
              }
            ],
            "totalCalories": 280,
            "totalProtein": 14,
            "totalCarbs": 40,
            "totalFat": 8
          },
          {
            "name": "Ara Öğün",
            "foods": [
              {
                "name": "Muz",
                "portion": "1 adet",
                "calories": 100,
                "protein": 1,
                "carbs": 23,
                "fat": 0
              }
            ],
            "totalCalories": 100,
            "totalProtein": 1,
            "totalCarbs": 23,
            "totalFat": 0
          },
          {
            "name": "Öğle Yemeği",
            "foods": [
              {
                "name": "Ton balığı",
                "portion": "1 kutu",
                "calories": 190,
                "protein": 40,
                "carbs": 0,
                "fat": 1
              },
              {
                "name": "Salata",
                "portion": "1 porsiyon",
                "calories": 30,
                "protein": 1,
                "carbs": 6,
                "fat": 0
              }
            ],
            "totalCalories": 220,
            "totalProtein": 41,
            "totalCarbs": 6,
            "totalFat": 1
          },
          {
            "name": "Akşam Yemeği",
            "foods": [
              {
                "name": "Tavuk göğsü",
                "portion": "150 gram",
                "calories": 165,
                "protein": 31,
                "carbs": 0,
                "fat": 3
              },
              {
                "name": "Sebzeli makarna",
                "portion": "1 porsiyon",
                "calories": 300,
                "protein": 10,
                "carbs": 58,
                "fat": 4
              }
            ],
            "totalCalories": 465,
            "totalProtein": 41,
            "totalCarbs": 58,
            "totalFat": 7
          }
        ],
        "totalDailyCalories": 1065,
        "totalDailyProtein": 97,
        "totalDailyCarbs": 127,
        "totalDailyFat": 16,
        "notes": "Protein alımınıza dikkat edin. Günlük ihtiyacınızı karşılamak için her öğünde protein içeren besinler tüketin."
      },
      {
        "day": "Çarşamba",
        "meals": [
          {
            "name": "Kahvaltı",
            "foods": [
              {
                "name": "Omlet",
                "portion": "2 yumurta",
                "calories": 170,
                "protein": 14,
                "carbs": 2,
                "fat": 12
              },
              {
                "name": "Tam buğday ekmeği",
                "portion": "1 dilim",
                "calories": 85,
                "protein": 4,
                "carbs": 15,
                "fat": 1
              }
            ],
            "totalCalories": 255,
            "totalProtein": 18,
            "totalCarbs": 17,
            "totalFat": 13
          },
          {
            "name": "Ara Öğün",
            "foods": [
              {
                "name": "Elma",
                "portion": "1 adet",
                "calories": 80,
                "protein": 0,
                "carbs": 20,
                "fat": 0
              },
              {
                "name": "Badem",
                "portion": "10 adet",
                "calories": 70,
                "protein": 3,
                "carbs": 2,
                "fat": 6
              }
            ],
            "totalCalories": 150,
            "totalProtein": 3,
            "totalCarbs": 22,
            "totalFat": 6
          },
          {
            "name": "Öğle Yemeği",
            "foods": [
              {
                "name": "Mercimek çorbası",
                "portion": "1 kase",
                "calories": 150,
                "protein": 10,
                "carbs": 25,
                "fat": 1
              },
              {
                "name": "Tam buğday ekmeği",
                "portion": "1 dilim",
                "calories": 85,
                "protein": 4,
                "carbs": 15,
                "fat": 1
              }
            ],
            "totalCalories": 235,
            "totalProtein": 14,
            "totalCarbs": 40,
            "totalFat": 2
          },
          {
            "name": "Akşam Yemeği",
            "foods": [
              {
                "name": "Izgara balık",
                "portion": "150 gram",
                "calories": 180,
                "protein": 36,
                "carbs": 0,
                "fat": 4
              },
              {
                "name": "Sebze",
                "portion": "1 porsiyon",
                "calories": 30,
                "protein": 1,
                "carbs": 6,
                "fat": 0
              },
              {
                "name": "Pirinç",
                "portion": "1/2 kase",
                "calories": 130,
                "protein": 3,
                "carbs": 28,
                "fat": 0
              }
            ],
            "totalCalories": 340,
            "totalProtein": 40,
            "totalCarbs": 34,
            "totalFat": 4
          }
        ],
        "totalDailyCalories": 980,
        "totalDailyProtein": 75,
        "totalDailyCarbs": 113,
        "totalDailyFat": 25,
        "notes": "Öğünler arasında bol su için ve günlük aktivite seviyenizi artırmaya çalışın."
      }
    ],
    "shoppingList": [
      {
        "category": "Protein",
        "items": ["Yumurta", "Tavuk göğsü", "Ton balığı", "Kırmızı et", "Balık"]
      },
      {
        "category": "Karbonhidrat",
        "items": ["Tam buğday ekmeği", "Bulgur", "Makarna", "Pirinç", "Yulaf ezmesi"]
      },
      {
        "category": "Sebze ve Meyve",
        "items": ["Domates", "Salatalık", "Muz", "Elma", "Mandalina"]
      },
      {
        "category": "Süt Ürünleri",
        "items": ["Süt", "Yoğurt"]
      },
      {
        "category": "Kuruyemiş",
        "items": ["Badem"]
      }
    ],
    "tips": [
      "Günde en az 2 litre su içmeyi hedefleyin",
      "Öğünlerinizde protein, karbonhidrat ve yağ dengesine dikkat edin",
      "Atıştırmalıklar için sağlıklı alternatifler tercih edin",
      "Yemekleri yavaş yiyin ve porsiyonları kontrol edin",
      "Haftada en az 150 dakika orta şiddetli egzersiz yapmaya çalışın"
    ]
  };
};

const NutritionPlan = require('../models/nutritionPlanModel');
const User = require('../models/userModel');
const openai = require('../config/openai');

// @desc    AI ile beslenme planı oluştur
// @route   POST /api/nutrition/generate
// @access  Private
const generateNutritionPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { preferences, restrictions, goal } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // Kullanıcı bilgilerinden TDEE hesapla
    const tdee = user.calculateTDEE();
    
    // Hedef kilo kaybı için kalori hesapla (günlük 500-1000 kalori açık)
    let targetCalories;
    if (goal === 'weight_loss') {
      targetCalories = Math.max(1200, tdee - 500); // Minimum 1200 kalori
    } else if (goal === 'weight_gain') {
      targetCalories = tdee + 500;
    } else { // Maintenance
      targetCalories = tdee;
    }

    // AI ile beslenme planı oluştur
    const prompt = `Aşağıdaki bilgilere göre 3 günlük detaylı bir beslenme planı oluştur:
    - Cinsiyet: ${user.gender === 'male' ? 'Erkek' : 'Kadın'}
    - Yaş: ${user.age}
    - Boy: ${user.height} cm
    - Kilo: ${user.weight} kg
    - Hedef kilo: ${user.goalWeight} kg
    - Aktivite seviyesi: ${user.activityLevel}
    - Günlük hedef kalori: ${targetCalories} kcal
    - Diyet kısıtlamaları: ${user.dietaryRestrictions.join(', ')}
    - Sağlık durumları: ${user.healthConditions.join(', ')}
    - Tercihler: ${preferences || 'Belirtilmemiş'}
    - Ek kısıtlamalar: ${restrictions || 'Belirtilmemiş'}
    - Hedef: ${goal === 'weight_loss' ? 'Kilo vermek' : goal === 'weight_gain' ? 'Kilo almak' : 'Kiloyu korumak'}
    
    Lütfen aşağıdaki formatta bir beslenme planı oluştur:
    1. Her gün için kahvaltı, öğle yemeği, akşam yemeği ve 2 ara öğün içermeli
    2. Her öğün için yiyeceklerin adı, porsiyonu, kalorisi, protein, karbonhidrat ve yağ miktarını belirt
    3. Her günün sonunda toplam kalori ve makro değerlerini belirt
    4. Alışveriş listesi olarak gerekli malzemeleri kategorilerine göre listele (sadece 5 kategori yeterli)
    5. Beslenme planına uyum için pratik ipuçları ve öneriler ekle (sadece 5 öneri yeterli)
    
    Çok önemli: Sadece JSON formatında yanıt ver, hiçbir açıklama veya yorum içermesin. Yani dönüşün tam olarak aşağıdaki yapıda olmalı (// ile başlayan açıklamalar olmadan):
    {
      "dayPlans": [
        {
          "day": "Pazartesi",
          "meals": [
            {
              "name": "Kahvaltı",
              "foods": [
                {
                  "name": "Yumurta",
                  "portion": "2 adet",
                  "calories": 140,
                  "protein": 12,
                  "carbs": 0,
                  "fat": 10
                }
              ],
              "totalCalories": 350,
              "totalProtein": 20,
              "totalCarbs": 30,
              "totalFat": 15
            }
          ],
          "totalDailyCalories": 1800,
          "totalDailyProtein": 120,
          "totalDailyCarbs": 180,
          "totalDailyFat": 60,
          "notes": "Günlük notlar ve öneriler"
        }
      ],
      "shoppingList": [
        {
          "category": "Protein",
          "items": ["Yumurta", "Tavuk göğsü", "Yoğurt"]
        }
      ],
      "tips": [
        "Su tüketimini artır",
        "Öğünleri düzenli ye"
      ]
    }
    
    Not: Lütfen sadece 3 gün için plan oluştur, daha fazla gün ekleme. Temiz ve geçerli bir JSON döndürdüğünden emin ol, yorum satırları (// ile başlayan) veya açıklamalar ekleme.`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 3000  // Daha küçük token sayısı
    });

    let planData;
    try {
      // AI yanıtındaki yorum satırlarını ve diğer geçersiz JSON karakterlerini temizle
      let cleanResponse = response.choices[0].message.content
        .replace(/\s*\/\/.*$/gm, '')  // Tüm yorum satırlarını kaldır
        .replace(/[\n\r\t]/g, '')     // Satır sonları ve tab'ları kaldır
        .replace(/,\s*}/g, '}')      // Son nesnelerdeki fazla virgülleri temizle
        .replace(/,\s*]/g, ']');     // Son dizilerdeki fazla virgülleri temizle
      
      // JSON'un tam olduğundan emin ol
      if (!cleanResponse.endsWith('}')) {
        // Son küme parantezini ekleyelim
        cleanResponse = cleanResponse + "}"; 
      }
      
      console.log("Temizlenmiş JSON yanıt:", cleanResponse);
      planData = JSON.parse(cleanResponse);

      // Veri kontrolü yap
      if (!planData.dayPlans || !Array.isArray(planData.dayPlans) || planData.dayPlans.length === 0) {
        throw new Error('Geçersiz beslenme planı yapısı: Gün planları eksik veya boş');
      }
    } catch (error) {
      console.error("AI yanıtı JSON olarak ayrıştırılamadı:", error);
      console.error("Ham yanıt:", response.choices[0].message.content);
      
      // Basit bir varsayılan beslenme planı oluştur
      planData = createDefaultNutritionPlan(user, targetCalories);
    }

    // Veritabanına kaydet
    const shoppingListItems = [];
    if (planData.shoppingList) {
      planData.shoppingList.forEach(category => {
        category.items.forEach(item => {
          shoppingListItems.push({
            item,
            category: category.category,
            quantity: "Gerektiği kadar",
            checked: false
          });
        });
      });
    }

    const nutritionPlan = new NutritionPlan({
      user: req.user._id,
      name: `${goal === 'weight_loss' ? 'Kilo Verme' : goal === 'weight_gain' ? 'Kilo Alma' : 'Kiloyu Koruma'} Planı`,
      targetCalories,
      targetProtein: Math.round(targetCalories * 0.3 / 4), // Protein kalori yüzdesi / 4 (protein kalori değeri)
      targetCarbs: Math.round(targetCalories * 0.4 / 4), // Karbonhidrat kalori yüzdesi / 4 (karbonhidrat kalori değeri)
      targetFat: Math.round(targetCalories * 0.3 / 9), // Yağ kalori yüzdesi / 9 (yağ kalori değeri)
      dayPlans: planData.dayPlans,
      generationPrompt: prompt,
      generationNotes: planData.tips ? planData.tips.join('\n') : '',
      shoppingList: shoppingListItems
    });

    const savedPlan = await nutritionPlan.save();
    res.status(201).json(savedPlan);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Beslenme planı oluşturulurken bir hata oluştu', error: error.message });
  }
};

// @desc    Kullanıcının aktif beslenme planını getir
// @route   GET /api/nutrition/active
// @access  Private
const getActiveNutritionPlan = async (req, res) => {
  try {
    const plan = await NutritionPlan.findOne({ 
      user: req.user._id,
      isActive: true 
    }).sort('-createdAt');

    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ message: 'Aktif beslenme planı bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Beslenme planı getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    Kullanıcının tüm beslenme planlarını getir
// @route   GET /api/nutrition
// @access  Private
const getNutritionPlans = async (req, res) => {
  try {
    const plans = await NutritionPlan.find({ user: req.user._id }).sort('-createdAt');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Beslenme planları getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    Beslenme planını güncelle
// @route   PUT /api/nutrition/:id
// @access  Private
const updateNutritionPlan = async (req, res) => {
  try {
    const plan = await NutritionPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Beslenme planı bulunamadı' });
    }

    // Planın kullanıcıya ait olup olmadığını kontrol et
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    // Planı güncelle
    Object.keys(req.body).forEach(key => {
      plan[key] = req.body[key];
    });

    const updatedPlan = await plan.save();
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ message: 'Beslenme planı güncellenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Beslenme planını sil
// @route   DELETE /api/nutrition/:id
// @access  Private
const deleteNutritionPlan = async (req, res) => {
  try {
    const plan = await NutritionPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Beslenme planı bulunamadı' });
    }

    // Planın kullanıcıya ait olup olmadığını kontrol et
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    await plan.remove();
    res.json({ message: 'Beslenme planı silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Beslenme planı silinirken bir hata oluştu', error: error.message });
  }
};

module.exports = {
  generateNutritionPlan,
  getActiveNutritionPlan,
  getNutritionPlans,
  updateNutritionPlan,
  deleteNutritionPlan
};