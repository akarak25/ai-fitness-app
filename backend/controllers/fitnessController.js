const WorkoutPlan = require('../models/workoutPlanModel');
const User = require('../models/userModel');
const openai = require('../config/openai');

// @desc    AI ile egzersiz planı oluştur
// @route   POST /api/fitness/generate
// @access  Private
const generateWorkoutPlan = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const { goal, daysPerWeek, preferences, equipment, injuries } = req.body;

    if (!user) {
      return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    }

    // AI ile egzersiz planı oluştur
    const prompt = `Aşağıdaki bilgilere göre detaylı bir egzersiz planı oluştur:
    - Cinsiyet: ${user.gender === 'male' ? 'Erkek' : 'Kadın'}
    - Yaş: ${user.age}
    - Boy: ${user.height} cm
    - Kilo: ${user.weight} kg
    - Hedef kilo: ${user.goalWeight} kg
    - Aktivite seviyesi: ${user.activityLevel}
    - Sağlık durumları: ${user.healthConditions.join(', ')}
    - Egzersiz hedefi: ${goal}
    - Haftada egzersiz günü: ${daysPerWeek}
    - Tercihler: ${preferences || 'Belirtilmemiş'}
    - Mevcut ekipman: ${equipment ? equipment.join(', ') : 'Belirtilmemiş'}
    - Sakatlıklar/Hassasiyetler: ${injuries || 'Belirtilmemiş'}
    
    Lütfen aşağıdaki formatta bir egzersiz planı oluştur:
    1. Haftada ${daysPerWeek} gün için günlük egzersiz rutinleri oluştur
    2. Her egzersiz günü farklı kas gruplarına odaklansın
    3. Her egzersiz için set, tekrar, dinlenme süresi ve açıklama ekle
    4. Egzersizlerin doğru formu hakkında notlar ekle
    5. İlerlemeyi takip etmek için öneriler sun
    
    JSON formatında döndür:
    {
      "workoutDays": [
        {
          "day": "Pazartesi",
          "isRestDay": false,
          "workoutSessions": [
            {
              "name": "Göğüs ve Triceps",
              "exercises": [
                {
                  "name": "Bench Press",
                  "description": "Düz bench üzerinde göğüs egzersizi",
                  "sets": 3,
                  "reps": "8-12",
                  "restTime": 90,
                  "notes": "Dirsekleri 90 dereceden aşağı indirme"
                },
                // Diğer egzersizler
              ],
              "duration": 45,
              "caloriesBurned": 300,
              "difficulty": "intermediate"
            }
          ],
          "notes": "Egzersiz öncesi ısınma yapmayı unutma"
        },
        // Diğer günler
      ],
      "tips": [
        "Her egzersiz öncesi 5-10 dakika kardiyovasküler ısınma yap",
        "Egzersizlerde doğru formu korumak için ağırlıkları kademeli artır"
        // Diğer ipuçları
      ]
    }`;

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-16k",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 4000
    });

    let planData;
    try {
      planData = JSON.parse(response.choices[0].message.content);
    } catch (error) {
      console.error("AI yanıtı JSON olarak ayrıştırılamadı:", error);
      return res.status(500).json({ message: "Egzersiz planı oluşturulurken bir hata oluştu" });
    }

    // Veritabanına kaydet
    const workoutPlan = new WorkoutPlan({
      user: req.user._id,
      name: `${goal.charAt(0).toUpperCase() + goal.slice(1)} Antrenman Planı`,
      goal,
      daysPerWeek,
      workoutDays: planData.workoutDays,
      generationPrompt: prompt,
      generationNotes: planData.tips ? planData.tips.join('\n') : '',
      equipmentAvailable: equipment || []
    });

    const savedPlan = await workoutPlan.save();
    res.status(201).json(savedPlan);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Egzersiz planı oluşturulurken bir hata oluştu', error: error.message });
  }
};

// @desc    Kullanıcının aktif egzersiz planını getir
// @route   GET /api/fitness/active
// @access  Private
const getActiveWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findOne({ 
      user: req.user._id,
      isActive: true 
    }).sort('-createdAt');

    if (plan) {
      res.json(plan);
    } else {
      res.status(404).json({ message: 'Aktif egzersiz planı bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Egzersiz planı getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    Kullanıcının tüm egzersiz planlarını getir
// @route   GET /api/fitness
// @access  Private
const getWorkoutPlans = async (req, res) => {
  try {
    const plans = await WorkoutPlan.find({ user: req.user._id }).sort('-createdAt');
    res.json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Egzersiz planları getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    Egzersiz planını güncelle
// @route   PUT /api/fitness/:id
// @access  Private
const updateWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Egzersiz planı bulunamadı' });
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
    res.status(500).json({ message: 'Egzersiz planı güncellenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Egzersiz planını sil
// @route   DELETE /api/fitness/:id
// @access  Private
const deleteWorkoutPlan = async (req, res) => {
  try {
    const plan = await WorkoutPlan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ message: 'Egzersiz planı bulunamadı' });
    }

    // Planın kullanıcıya ait olup olmadığını kontrol et
    if (plan.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Bu işlem için yetkiniz yok' });
    }

    await plan.remove();
    res.json({ message: 'Egzersiz planı silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Egzersiz planı silinirken bir hata oluştu', error: error.message });
  }
};

module.exports = {
  generateWorkoutPlan,
  getActiveWorkoutPlan,
  getWorkoutPlans,
  updateWorkoutPlan,
  deleteWorkoutPlan
};