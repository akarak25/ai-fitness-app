const Progress = require('../models/progressModel');
const openai = require('../config/openai');
const fs = require('fs');
const path = require('path');

// @desc    Yeni ölçüm ekle
// @route   POST /api/progress/measurements
// @access  Private
const addMeasurement = async (req, res) => {
  try {
    const { weight, bodyFatPercentage, chest, waist, hips, arms, thighs, notes } = req.body;

    let progress = await Progress.findOne({ user: req.user._id });

    // Kullanıcının ilerleme kaydı yoksa yeni oluştur
    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        measurements: [],
        photos: [],
        moodLogs: []
      });
    }

    // Yeni ölçüm ekle
    progress.measurements.push({
      weight,
      bodyFatPercentage,
      chest,
      waist,
      hips,
      arms,
      thighs,
      notes,
      date: new Date()
    });

    await progress.save();
    res.status(201).json(progress.measurements[progress.measurements.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Ölçüm eklenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Fotoğraf ekle ve AI analizi yap
// @route   POST /api/progress/photos
// @access  Private
const addPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Lütfen bir fotoğraf yükleyin' });
    }

    const { category, notes } = req.body;
    const photoUrl = `/uploads/progress/${req.file.filename}`;

    let progress = await Progress.findOne({ user: req.user._id });

    // Kullanıcının ilerleme kaydı yoksa yeni oluştur
    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        measurements: [],
        photos: [],
        moodLogs: []
      });
    }

    // AI analizi yap
    let aiAnalysis = {};
    try {
      // Görsel veriyi base64 formatına dönüştür
      const imagePath = path.join(__dirname, '..', 'public', photoUrl);
      const imageBuffer = fs.readFileSync(imagePath);
      const base64Image = imageBuffer.toString('base64');

      const response = await openai.chat.completions.create({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "Bu vücut fotoğrafı hakkında detaylı bir analiz yap. Şu bilgileri ver: 1) Tahmini vücut yağ oranı, 2) Genel fiziksel durum değerlendirmesi, 3) İyileştirme önerileri. Sadece fotoğraftaki fiziksel özelliklere odaklan, yüz tanıma veya kişisel tanımlama yapma." },
              { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ],
        max_tokens: 600
      });

      aiAnalysis = {
        analysis: response.choices[0].message.content,
        timestamp: new Date()
      };
    } catch (aiError) {
      console.error("AI analizi yapılırken hata:", aiError);
      aiAnalysis = {
        analysis: "AI analizi yapılamadı.",
        error: aiError.message,
        timestamp: new Date()
      };
    }

    // Yeni fotoğraf ekle
    progress.photos.push({
      photoUrl,
      category,
      notes,
      aiAnalysis,
      date: new Date()
    });

    await progress.save();
    res.status(201).json(progress.photos[progress.photos.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Fotoğraf eklenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Ruh hali/stres kaydı ekle
// @route   POST /api/progress/mood
// @access  Private
const addMoodLog = async (req, res) => {
  try {
    const { mood, stressLevel, sleepHours, notes } = req.body;

    let progress = await Progress.findOne({ user: req.user._id });

    // Kullanıcının ilerleme kaydı yoksa yeni oluştur
    if (!progress) {
      progress = new Progress({
        user: req.user._id,
        measurements: [],
        photos: [],
        moodLogs: []
      });
    }

    // Yeni ruh hali kaydı ekle
    progress.moodLogs.push({
      mood,
      stressLevel,
      sleepHours,
      notes,
      date: new Date()
    });

    await progress.save();
    res.status(201).json(progress.moodLogs[progress.moodLogs.length - 1]);
  } catch (error) {
    res.status(500).json({ message: 'Ruh hali kaydı eklenirken bir hata oluştu', error: error.message });
  }
};

// @desc    Kullanıcının tüm ilerleme verilerini getir
// @route   GET /api/progress
// @access  Private
const getProgress = async (req, res) => {
  try {
    let progress = await Progress.findOne({ user: req.user._id });

    if (progress) {
      res.json(progress);
    } else {
      res.status(404).json({ message: 'İlerleme kaydı bulunamadı' });
    }
  } catch (error) {
    res.status(500).json({ message: 'İlerleme verileri getirilirken bir hata oluştu', error: error.message });
  }
};

// @desc    İlerleme analizi yap
// @route   GET /api/progress/analysis
// @access  Private
const analyzeProgress = async (req, res) => {
  try {
    const progress = await Progress.findOne({ user: req.user._id });

    if (!progress || progress.measurements.length < 2) {
      return res.status(404).json({ 
        message: 'Analiz için yeterli ilerleme verisi bulunamadı. En az 2 ölçüm kaydı gereklidir.' 
      });
    }

    // En son ve ilk ölçümleri al
    const latestMeasurement = progress.measurements[progress.measurements.length - 1];
    const firstMeasurement = progress.measurements[0];

    // Değişimleri hesapla
    const weightChange = latestMeasurement.weight - firstMeasurement.weight;
    const bodyFatChange = latestMeasurement.bodyFatPercentage 
      ? (latestMeasurement.bodyFatPercentage - firstMeasurement.bodyFatPercentage)
      : null;
      
    // Diğer ölçüm değişimleri
    const measurements = ['chest', 'waist', 'hips', 'arms', 'thighs'];
    const measurementChanges = {};
    
    measurements.forEach(measurement => {
      if (latestMeasurement[measurement] && firstMeasurement[measurement]) {
        measurementChanges[measurement] = latestMeasurement[measurement] - firstMeasurement[measurement];
      }
    });

    // Ruh hali ve stres analizleri
    let moodAnalysis = null;
    let stressAnalysis = null;
    
    if (progress.moodLogs.length > 5) {
      // Son 10 kaydın ortalaması
      const recentMoods = progress.moodLogs.slice(-10);
      
      const moodCounts = recentMoods.reduce((acc, log) => {
        acc[log.mood] = (acc[log.mood] || 0) + 1;
        return acc;
      }, {});
      
      const dominantMood = Object.keys(moodCounts).reduce((a, b) => 
        moodCounts[a] > moodCounts[b] ? a : b
      );
      
      const avgStress = recentMoods.reduce((sum, log) => sum + (log.stressLevel || 0), 0) / recentMoods.length;
      
      moodAnalysis = {
        dominantMood,
        moodDistribution: moodCounts
      };
      
      stressAnalysis = {
        averageStressLevel: avgStress.toFixed(1),
        stressLevel: avgStress <= 3 ? 'düşük' : avgStress <= 7 ? 'orta' : 'yüksek'
      };
    }

    // Geçen süre (gün)
    const daysPassed = Math.round((latestMeasurement.date - firstMeasurement.date) / (1000 * 60 * 60 * 24));

    // Haftalık ortalama değişim
    const weeklyWeightChange = (weightChange / daysPassed) * 7;

    // Analiz sonuçları
    const analysis = {
      measurementPeriod: {
        startDate: firstMeasurement.date,
        endDate: latestMeasurement.date,
        daysPassed
      },
      weightProgress: {
        initial: firstMeasurement.weight,
        current: latestMeasurement.weight,
        change: weightChange,
        weeklyAverage: weeklyWeightChange,
        percentageChange: (weightChange / firstMeasurement.weight) * 100
      },
      bodyComposition: bodyFatChange !== null ? {
        initialBodyFat: firstMeasurement.bodyFatPercentage,
        currentBodyFat: latestMeasurement.bodyFatPercentage,
        change: bodyFatChange
      } : null,
      measurementChanges,
      moodAnalysis,
      stressAnalysis
    };

    res.json(analysis);
  } catch (error) {
    res.status(500).json({ message: 'İlerleme analizi yapılırken bir hata oluştu', error: error.message });
  }
};

module.exports = {
  addMeasurement,
  addPhoto,
  addMoodLog,
  getProgress,
  analyzeProgress
};