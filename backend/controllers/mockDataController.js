const NutritionPlan = require('../models/nutritionPlanModel');
const WorkoutPlan = require('../models/workoutPlanModel');
const Progress = require('../models/progressModel');
const User = require('../models/userModel');

// @desc    Kullanıcı için demo veri oluştur
// @route   POST /api/mock-data
// @access  Private
const createMockData = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // 1. Mock Beslenme Planı
    const mockNutritionPlan = new NutritionPlan({
      user: userId,
      name: 'Kilo Verme Beslenme Planı',
      isActive: true,
      targetCalories: 2000,
      targetProtein: 150,
      targetCarbs: 200,
      targetFat: 67,
      dayPlans: [
        {
          day: 'Pazartesi',
          meals: [
            {
              name: 'Kahvaltı',
              foods: [
                {
                  name: 'Yumurta',
                  portion: '2 adet',
                  calories: 150,
                  protein: 12,
                  carbs: 1,
                  fat: 10
                },
                {
                  name: 'Tam Tahıllı Ekmek',
                  portion: '2 dilim',
                  calories: 140,
                  protein: 6,
                  carbs: 28,
                  fat: 2
                }
              ],
              totalCalories: 290,
              totalProtein: 18,
              totalCarbs: 29,
              totalFat: 12
            },
            {
              name: 'Öğle Yemeği',
              foods: [
                {
                  name: 'Izgara Tavuk',
                  portion: '150 gram',
                  calories: 250,
                  protein: 40,
                  carbs: 0,
                  fat: 10
                },
                {
                  name: 'Karışık Salata',
                  portion: '1 porsiyon',
                  calories: 100,
                  protein: 3,
                  carbs: 15,
                  fat: 4
                }
              ],
              totalCalories: 350,
              totalProtein: 43,
              totalCarbs: 15,
              totalFat: 14
            }
          ],
          totalDailyCalories: 640,
          totalDailyProtein: 61,
          totalDailyCarbs: 44,
          totalDailyFat: 26,
          notes: 'Bol su içmeyi unutmayın'
        }
      ],
      shoppingList: [
        {
          item: 'Yumurta',
          category: 'Protein',
          quantity: '1 düzine',
          checked: false
        },
        {
          item: 'Tavuk Göğsü',
          category: 'Protein',
          quantity: '500 gram',
          checked: false
        }
      ]
    });
    
    // 2. Mock Egzersiz Planı
    const mockWorkoutPlan = new WorkoutPlan({
      user: userId,
      name: 'Kilo Verme Egzersiz Planı',
      isActive: true,
      goal: 'weight_loss',
      daysPerWeek: 4,
      workoutDays: [
        {
          day: 'Pazartesi',
          isRestDay: false,
          workoutSessions: [
            {
              name: 'Kardiyovasküler Antrenman',
              exercises: [
                {
                  name: 'Koşu Bandı',
                  description: 'Orta tempoda koşu',
                  sets: 1,
                  reps: '20 dakika',
                  restTime: 0,
                  notes: 'Kalp atış hızını 140-160 BPM arasında tutun'
                },
                {
                  name: 'Bisiklet',
                  description: 'Orta direnç',
                  sets: 1,
                  reps: '15 dakika',
                  restTime: 0,
                  notes: 'Yüksek direnç aralıklarıyla'
                }
              ],
              duration: 45,
              caloriesBurned: 350,
              difficulty: 'intermediate',
              notes: 'Egzersiz öncesi ısınma yapınız'
            }
          ],
          notes: 'Yeterli su içmeyi unutmayın'
        },
        {
          day: 'Salı',
          isRestDay: false,
          workoutSessions: [
            {
              name: 'Üst Vücut Antrenmanı',
              exercises: [
                {
                  name: 'Şınav',
                  description: 'Standart şınav',
                  sets: 3,
                  reps: '12-15',
                  restTime: 60,
                  notes: 'Omuzlarınızı koruyun'
                },
                {
                  name: 'Dumbbell Row',
                  description: 'Tek kol row hareketi',
                  sets: 3,
                  reps: '10-12',
                  restTime: 60,
                  notes: 'Sırtınızı düz tutun'
                }
              ],
              duration: 40,
              caloriesBurned: 300,
              difficulty: 'intermediate',
              notes: 'Egzersizleri yavaş ve kontrollü yapın'
            }
          ],
          notes: 'Antrenman sonrası protein alımına dikkat edin'
        }
      ],
      equipmentAvailable: ['Dumbbell', 'Bench', 'Resistance Bands', 'Treadmill']
    });
    
    // 3. Mock İlerleme Verileri
    const today = new Date();
    const oneMonthAgo = new Date(today);
    oneMonthAgo.setMonth(today.getMonth() - 1);
    
    let mockProgress = await Progress.findOne({ user: userId });
    
    if (!mockProgress) {
      mockProgress = new Progress({
        user: userId,
        measurements: [
          {
            date: oneMonthAgo,
            weight: parseFloat((req.user.weight + 2).toFixed(1)),
            bodyFatPercentage: 22,
            waist: 85,
            chest: 95,
            hips: 100,
            arms: 32,
            thighs: 55,
            notes: 'Başlangıç ölçümleri'
          },
          {
            date: today,
            weight: req.user.weight,
            bodyFatPercentage: 20,
            waist: 82,
            chest: 96,
            hips: 98,
            arms: 33,
            thighs: 54,
            notes: 'Bir aylık ilerleme'
          }
        ],
        photos: [],
        moodLogs: [
          {
            date: oneMonthAgo,
            mood: 'neutral',
            stressLevel: 6,
            sleepHours: 6,
            notes: 'Program başlangıcı'
          },
          {
            date: today,
            mood: 'good',
            stressLevel: 4,
            sleepHours: 7.5,
            notes: 'Daha enerjik hissediyorum'
          }
        ]
      });
    }
    
    // Verileri kaydet
    await mockNutritionPlan.save();
    await mockWorkoutPlan.save();
    await mockProgress.save();
    
    res.status(201).json({
      message: 'Demo veriler başarıyla oluşturuldu',
      data: {
        nutritionPlan: mockNutritionPlan._id,
        workoutPlan: mockWorkoutPlan._id,
        progress: mockProgress._id
      }
    });
    
  } catch (error) {
    console.error('Demo veri oluşturma hatası:', error);
    res.status(500).json({ 
      message: 'Demo veriler oluşturulurken bir hata oluştu', 
      error: error.message 
    });
  }
};

module.exports = {
  createMockData
};