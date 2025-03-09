import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { progressApi, aiApi } from '../utils/api';
import { 
  ChartBarIcon, 
  ArrowUpIcon, 
  ArrowDownIcon, 
  CameraIcon, 
  FaceSmileIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

const Progress = () => {
  const [activeTab, setActiveTab] = useState('measurements');
  const [progress, setProgress] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState({
    data: true,
    analysis: false,
    submission: false
  });

  // Yeni ölçüm formu
  const [measurementForm, setMeasurementForm] = useState({
    weight: '',
    bodyFatPercentage: '',
    chest: '',
    waist: '',
    hips: '',
    arms: '',
    thighs: '',
    notes: ''
  });

  // Fotoğraf yükleme
  const [photoUpload, setPhotoUpload] = useState(null);
  const [photoCategory, setPhotoCategory] = useState('front');
  const [photoNotes, setPhotoNotes] = useState('');

  // Duygu durum kaydı
  const [moodForm, setMoodForm] = useState({
    mood: 'good',
    stressLevel: 5,
    sleepHours: 7,
    notes: ''
  });

  // Duygu durum analizi
  const [moodText, setMoodText] = useState('');
  const [moodAnalysis, setMoodAnalysis] = useState(null);
  const [moodAnalysisLoading, setMoodAnalysisLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // İlerleme verileri
        const progressData = await progressApi.getProgress();
        setProgress(progressData);
      } catch (error) {
        console.error('İlerleme verileri yüklenemedi:', error);
        toast.error('İlerleme verileri yüklenemedi');
      } finally {
        setLoading(prev => ({ ...prev, data: false }));
      }
    };

    fetchData();
  }, []);

  const handleMeasurementChange = (e) => {
    const { name, value } = e.target;
    setMeasurementForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleMoodFormChange = (e) => {
    const { name, value } = e.target;
    setMoodForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    if (e.target.files[0]) {
      setPhotoUpload(e.target.files[0]);
    }
  };

  const analyzeProgress = async () => {
    try {
      setLoading(prev => ({ ...prev, analysis: true }));
      const analysisData = await progressApi.analyzeProgress();
      setAnalysis(analysisData);
    } catch (error) {
      console.error('İlerleme analizi hatası:', error);
      toast.error('İlerleme analizi yapılırken bir hata oluştu');
    } finally {
      setLoading(prev => ({ ...prev, analysis: false }));
    }
  };

  const analyzeMood = async () => {
    if (!moodText || moodText.trim().length < 10) {
      toast.error('Lütfen duygu durumunuzu daha detaylı açıklayın (en az 10 karakter)');
      return;
    }

    try {
      setMoodAnalysisLoading(true);
      const result = await aiApi.analyzeMood(moodText);
      setMoodAnalysis(result);
    } catch (error) {
      console.error('Duygu analizi hatası:', error);
      toast.error('Duygu analizi yapılırken bir hata oluştu');
    } finally {
      setMoodAnalysisLoading(false);
    }
  };

  const submitMeasurement = async (e) => {
    e.preventDefault();
    
    if (!measurementForm.weight) {
      toast.error('Kilo değeri zorunludur');
      return;
    }
    
    try {
      setLoading(prev => ({ ...prev, submission: true }));
      await progressApi.addMeasurement(measurementForm);
      
      // Formu sıfırla
      setMeasurementForm({
        weight: '',
        bodyFatPercentage: '',
        chest: '',
        waist: '',
        hips: '',
        arms: '',
        thighs: '',
        notes: ''
      });
      
      // İlerleme verilerini yeniden yükle
      const updatedProgress = await progressApi.getProgress();
      setProgress(updatedProgress);
      
      toast.success('Ölçüm başarıyla kaydedildi');
    } catch (error) {
      console.error('Ölçüm kaydetme hatası:', error);
      toast.error('Ölçüm kaydedilirken bir hata oluştu');
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  const submitPhoto = async (e) => {
    e.preventDefault();
    
    if (!photoUpload) {
      toast.error('Lütfen bir fotoğraf yükleyin');
      return;
    }
    
    try {
      setLoading(prev => ({ ...prev, submission: true }));
      
      const formData = new FormData();
      formData.append('photo', photoUpload);
      formData.append('category', photoCategory);
      formData.append('notes', photoNotes);
      
      await progressApi.addPhoto(formData);
      
      // Formu sıfırla
      setPhotoUpload(null);
      setPhotoCategory('front');
      setPhotoNotes('');
      document.getElementById('progress-photo').value = '';
      
      // İlerleme verilerini yeniden yükle
      const updatedProgress = await progressApi.getProgress();
      setProgress(updatedProgress);
      
      toast.success('Fotoğraf başarıyla yüklendi');
    } catch (error) {
      console.error('Fotoğraf yükleme hatası:', error);
      toast.error('Fotoğraf yüklenirken bir hata oluştu');
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  const submitMood = async (e) => {
    e.preventDefault();
    
    try {
      setLoading(prev => ({ ...prev, submission: true }));
      await progressApi.addMoodLog(moodForm);
      
      // Formu sıfırla
      setMoodForm({
        mood: 'good',
        stressLevel: 5,
        sleepHours: 7,
        notes: ''
      });
      
      // İlerleme verilerini yeniden yükle
      const updatedProgress = await progressApi.getProgress();
      setProgress(updatedProgress);
      
      toast.success('Ruh hali başarıyla kaydedildi');
    } catch (error) {
      console.error('Ruh hali kaydetme hatası:', error);
      toast.error('Ruh hali kaydedilirken bir hata oluştu');
    } finally {
      setLoading(prev => ({ ...prev, submission: false }));
    }
  };

  const renderMeasurementTab = () => (
    <div className="space-y-6">
      {/* Ölçüm Formu */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Yeni Ölçüm Ekle</h3>
          <form className="mt-5 space-y-6" onSubmit={submitMeasurement}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                  Kilo (kg) *
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="weight"
                    id="weight"
                    step="0.1"
                    min="30"
                    max="300"
                    required
                    value={measurementForm.weight}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="bodyFatPercentage" className="block text-sm font-medium text-gray-700">
                  Vücut Yağ Oranı (%)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="bodyFatPercentage"
                    id="bodyFatPercentage"
                    step="0.1"
                    min="3"
                    max="50"
                    value={measurementForm.bodyFatPercentage}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="chest" className="block text-sm font-medium text-gray-700">
                  Göğüs (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="chest"
                    id="chest"
                    step="0.1"
                    min="50"
                    max="200"
                    value={measurementForm.chest}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="waist" className="block text-sm font-medium text-gray-700">
                  Bel (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="waist"
                    id="waist"
                    step="0.1"
                    min="50"
                    max="200"
                    value={measurementForm.waist}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="hips" className="block text-sm font-medium text-gray-700">
                  Kalça (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="hips"
                    id="hips"
                    step="0.1"
                    min="50"
                    max="200"
                    value={measurementForm.hips}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label htmlFor="arms" className="block text-sm font-medium text-gray-700">
                  Kollar (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="arms"
                    id="arms"
                    step="0.1"
                    min="20"
                    max="80"
                    value={measurementForm.arms}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="thighs" className="block text-sm font-medium text-gray-700">
                  Bacaklar (cm)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="thighs"
                    id="thighs"
                    step="0.1"
                    min="30"
                    max="100"
                    value={measurementForm.thighs}
                    onChange={handleMeasurementChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                Notlar
              </label>
              <div className="mt-1">
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={measurementForm.notes}
                  onChange={handleMeasurementChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Bu ölçümle ilgili notlar ekleyin"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading.submission}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading.submission ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Ölçüm Ekle'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Ölçüm Geçmişi */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Ölçüm Geçmişi</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Geçmiş ölçüm kayıtlarınız
            </p>
          </div>
          <button
            type="button"
            onClick={analyzeProgress}
            disabled={!progress?.measurements?.length || loading.analysis}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading.analysis ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <>
                <ChartBarIcon className="mr-2 h-5 w-5" />
                İlerleme Analizi
              </>
            )}
          </button>
        </div>
        <div className="border-t border-gray-200">
          {loading.data ? (
            <div className="px-4 py-5 sm:p-6 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : progress?.measurements?.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Tarih
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kilo (kg)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vücut Yağ %
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Göğüs (cm)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Bel (cm)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Kalça (cm)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {progress.measurements.slice().reverse().map((measurement, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(measurement.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {measurement.weight}
                        {index < progress.measurements.length - 1 && (
                          <span className={`ml-2 inline-flex items-center text-xs ${
                            measurement.weight < progress.measurements[progress.measurements.length - 2 - index].weight
                              ? 'text-green-600'
                              : measurement.weight > progress.measurements[progress.measurements.length - 2 - index].weight
                              ? 'text-red-600'
                              : 'text-gray-500'
                          }`}>
                            {measurement.weight < progress.measurements[progress.measurements.length - 2 - index].weight && (
                              <ArrowDownIcon className="h-3 w-3 mr-1" />
                            )}
                            {measurement.weight > progress.measurements[progress.measurements.length - 2 - index].weight && (
                              <ArrowUpIcon className="h-3 w-3 mr-1" />
                            )}
                            {Math.abs(measurement.weight - progress.measurements[progress.measurements.length - 2 - index].weight).toFixed(1)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {measurement.bodyFatPercentage || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {measurement.chest || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {measurement.waist || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {measurement.hips || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">Henüz ölçüm kaydınız bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>

      {/* İlerleme Analizi (Eğer varsa) */}
      {analysis && (
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">İlerleme Analizi</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {analysis.measurementPeriod.startDate && (
                <>
                  {new Date(analysis.measurementPeriod.startDate).toLocaleDateString()} - {new Date(analysis.measurementPeriod.endDate).toLocaleDateString()} ({analysis.measurementPeriod.daysPassed} gün)
                </>
              )}
            </p>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="sm:col-span-2 lg:col-span-1">
                <dt className="text-sm font-medium text-gray-500">Kilo Değişimi</dt>
                <dd className="mt-1 flex items-baseline">
                  <p className={`text-2xl font-semibold ${
                    analysis.weightProgress.change < 0 ? 'text-green-600' : analysis.weightProgress.change > 0 ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {analysis.weightProgress.change > 0 ? '+' : ''}{analysis.weightProgress.change.toFixed(1)} kg
                  </p>
                  <p className="ml-2 flex items-baseline text-sm text-gray-500">
                    <span className="sr-only">
                      {analysis.weightProgress.change < 0 ? 'Azalma' : analysis.weightProgress.change > 0 ? 'Artış' : 'Değişiklik yok'}
                    </span>
                    {analysis.weightProgress.percentageChange ? (
                      <span className={analysis.weightProgress.percentageChange < 0 ? 'text-green-600' : analysis.weightProgress.percentageChange > 0 ? 'text-red-600' : 'text-gray-500'}>
                        {analysis.weightProgress.percentageChange > 0 ? '+' : ''}{analysis.weightProgress.percentageChange.toFixed(1)}%
                      </span>
                    ) : null}
                  </p>
                </dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Başlangıç Kilosu</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{analysis.weightProgress.initial} kg</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Güncel Kilo</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">{analysis.weightProgress.current} kg</dd>
              </div>

              <div>
                <dt className="text-sm font-medium text-gray-500">Haftalık Ortalama</dt>
                <dd className="mt-1 text-2xl font-semibold text-gray-900">
                  {analysis.weightProgress.weeklyAverage > 0 ? '+' : ''}{analysis.weightProgress.weeklyAverage.toFixed(1)} kg/hafta
                </dd>
              </div>
            </dl>

            {analysis.bodyComposition && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900">Vücut Kompozisyonu</h4>
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Vücut Yağ % Değişimi</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">
                      {analysis.bodyComposition.change > 0 ? '+' : ''}{analysis.bodyComposition.change.toFixed(1)}%
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Başlangıç Vücut Yağ %</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{analysis.bodyComposition.initialBodyFat}%</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Güncel Vücut Yağ %</dt>
                    <dd className="mt-1 text-2xl font-semibold text-gray-900">{analysis.bodyComposition.currentBodyFat}%</dd>
                  </div>
                </dl>
              </div>
            )}

            {analysis.measurementChanges && Object.keys(analysis.measurementChanges).length > 0 && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h4 className="text-lg font-medium text-gray-900">Vücut Ölçümleri Değişimi</h4>
                <dl className="mt-4 grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                  {Object.entries(analysis.measurementChanges).map(([measurement, change]) => (
                    <div key={measurement}>
                      <dt className="text-sm font-medium text-gray-500">
                        {measurement === 'chest' ? 'Göğüs' :
                         measurement === 'waist' ? 'Bel' :
                         measurement === 'hips' ? 'Kalça' :
                         measurement === 'arms' ? 'Kollar' :
                         measurement === 'thighs' ? 'Bacaklar' : measurement}
                      </dt>
                      <dd className="mt-1 text-2xl font-semibold text-gray-900">
                        {change > 0 ? '+' : ''}{change.toFixed(1)} cm
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  const renderPhotosTab = () => (
    <div className="space-y-6">
      {/* Fotoğraf Yükleme Formu */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Yeni Fotoğraf Ekle</h3>
          <form className="mt-5 space-y-6" onSubmit={submitPhoto}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                İlerleme Fotoğrafı
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="progress-photo"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500"
                    >
                      <span>Dosya yükle</span>
                      <input
                        id="progress-photo"
                        name="progress-photo"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handlePhotoChange}
                      />
                    </label>
                    <p className="pl-1">veya sürükle bırak</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF (max. 10MB)</p>
                  {photoUpload && (
                    <p className="text-sm text-primary-600">{photoUpload.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="photoCategory" className="block text-sm font-medium text-gray-700">
                  Fotoğraf Kategorisi
                </label>
                <div className="mt-1">
                  <select
                    id="photoCategory"
                    name="photoCategory"
                    value={photoCategory}
                    onChange={(e) => setPhotoCategory(e.target.value)}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="front">Önden</option>
                    <option value="side">Yandan</option>
                    <option value="back">Arkadan</option>
                    <option value="other">Diğer</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="photoNotes" className="block text-sm font-medium text-gray-700">
                Notlar
              </label>
              <div className="mt-1">
                <textarea
                  id="photoNotes"
                  name="photoNotes"
                  rows={3}
                  value={photoNotes}
                  onChange={(e) => setPhotoNotes(e.target.value)}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Bu fotoğrafla ilgili notlar ekleyin"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading.submission}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading.submission ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Fotoğraf Yükle'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Fotoğraf Galerisi */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Fotoğraf Galerisi</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            İlerleme fotoğraflarınız
          </p>
        </div>
        <div className="border-t border-gray-200">
          {loading.data ? (
            <div className="px-4 py-5 sm:p-6 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : progress?.photos?.length > 0 ? (
            <div className="px-4 py-5 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {progress.photos.slice().reverse().map((photo, index) => (
                <div key={index} className="overflow-hidden rounded-lg shadow-md">
                  <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                    <img
                      src={photo.photoUrl}
                      alt={`İlerleme fotoğrafı ${index + 1}`}
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {photo.category === 'front' ? 'Önden' :
                         photo.category === 'side' ? 'Yandan' :
                         photo.category === 'back' ? 'Arkadan' : 'Diğer'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(photo.date).toLocaleDateString()}
                      </span>
                    </div>
                    {photo.aiAnalysis && photo.aiAnalysis.analysis && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p className="font-medium">AI Analizi:</p>
                        <p className="mt-1">{photo.aiAnalysis.analysis}</p>
                      </div>
                    )}
                    {photo.notes && (
                      <div className="mt-2 text-sm text-gray-600">
                        <p>{photo.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">Henüz fotoğraf yüklemediniz.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderMoodTab = () => (
    <div className="space-y-6">
      {/* Duygu Durum Analizi */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Duygu Durumu Analizi</h3>
          <div className="mt-5 space-y-6">
            <div>
              <label htmlFor="moodText" className="block text-sm font-medium text-gray-700">
                Bugün nasıl hissediyorsunuz?
              </label>
              <div className="mt-1">
                <textarea
                  id="moodText"
                  name="moodText"
                  rows={4}
                  value={moodText}
                  onChange={(e) => setMoodText(e.target.value)}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Bugün nasıl hissettiğinizi, ruh halinizi, stres seviyenizi ve motivasyonunuzu açıklayın..."
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                onClick={analyzeMood}
                disabled={!moodText || moodText.trim().length < 10 || moodAnalysisLoading}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {moodAnalysisLoading ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Analiz Et'
                )}
              </button>
            </div>
          </div>

          {moodAnalysis && (
            <div className="mt-6 bg-primary-50 p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-gray-900">Duygu Analizi Sonuçları</h4>
                  <p className="text-sm text-gray-500">{new Date(moodAnalysis.timestamp).toLocaleString()}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  {moodAnalysis.dominantMood === 'mutlu' ? 'Mutlu' :
                   moodAnalysis.dominantMood === 'üzgün' ? 'Üzgün' :
                   moodAnalysis.dominantMood === 'kızgın' ? 'Kızgın' :
                   moodAnalysis.dominantMood === 'endişeli' ? 'Endişeli' :
                   moodAnalysis.dominantMood === 'stresli' ? 'Stresli' :
                   moodAnalysis.dominantMood === 'rahat' ? 'Rahat' :
                   moodAnalysis.dominantMood === 'motive' ? 'Motive' :
                   moodAnalysis.dominantMood === 'yorgun' ? 'Yorgun' : moodAnalysis.dominantMood}
                </span>
              </div>
              <div className="mt-2">
                <div className="flex items-center">
                  <p className="text-sm font-medium text-gray-700">Stres Seviyesi:</p>
                  <div className="ml-2 flex-1 h-2 bg-gray-200 rounded-full max-w-xs">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${(moodAnalysis.stressLevel / 10) * 100}%`,
                        backgroundColor: `rgb(${255 * moodAnalysis.stressLevel / 10}, ${255 * (10 - moodAnalysis.stressLevel) / 10}, 0)`
                      }}
                    ></div>
                  </div>
                  <span className="ml-2 text-sm text-gray-700">{moodAnalysis.stressLevel}/10</span>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700">Analiz:</p>
                <p className="mt-1 text-sm text-gray-600">{moodAnalysis.analysis}</p>
              </div>
              {moodAnalysis.recommendations && moodAnalysis.recommendations.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700">Öneriler:</p>
                  <ul className="mt-1 text-sm text-gray-600 list-disc pl-5 space-y-1">
                    {moodAnalysis.recommendations.map((rec, idx) => (
                      <li key={idx}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Ruh Hali Kayıt Formu */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Ruh Hali Kaydı</h3>
          <form className="mt-5 space-y-6" onSubmit={submitMood}>
            <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="mood" className="block text-sm font-medium text-gray-700">
                  Ruh Hali
                </label>
                <div className="mt-1">
                  <select
                    id="mood"
                    name="mood"
                    value={moodForm.mood}
                    onChange={handleMoodFormChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option value="excellent">Çok İyi</option>
                    <option value="good">İyi</option>
                    <option value="neutral">Nötr</option>
                    <option value="bad">Kötü</option>
                    <option value="terrible">Çok Kötü</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="stressLevel" className="block text-sm font-medium text-gray-700">
                  Stres Seviyesi (1-10)
                </label>
                <div className="mt-1">
                  <input
                    type="range"
                    id="stressLevel"
                    name="stressLevel"
                    min="1"
                    max="10"
                    value={moodForm.stressLevel}
                    onChange={handleMoodFormChange}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Düşük</span>
                    <span>{moodForm.stressLevel}</span>
                    <span>Yüksek</span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="sleepHours" className="block text-sm font-medium text-gray-700">
                  Uyku Süresi (saat)
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="sleepHours"
                    id="sleepHours"
                    min="0"
                    max="24"
                    step="0.5"
                    value={moodForm.sleepHours}
                    onChange={handleMoodFormChange}
                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="moodNotes" className="block text-sm font-medium text-gray-700">
                Notlar
              </label>
              <div className="mt-1">
                <textarea
                  id="moodNotes"
                  name="notes"
                  rows={3}
                  value={moodForm.notes}
                  onChange={handleMoodFormChange}
                  className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                  placeholder="Bugünkü ruh halinizle ilgili notlar ekleyin"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading.submission}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {loading.submission ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  'Kaydet'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Ruh Hali Geçmişi */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Ruh Hali Geçmişi</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Geçmiş ruh hali kayıtlarınız
          </p>
        </div>
        <div className="border-t border-gray-200">
          {loading.data ? (
            <div className="px-4 py-5 sm:p-6 flex justify-center">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
            </div>
          ) : progress?.moodLogs?.length > 0 ? (
            <div className="flow-root">
              <ul className="divide-y divide-gray-200">
                {progress.moodLogs.slice().reverse().map((log, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className={`h-8 w-8 rounded-full flex items-center justify-center ${
                          log.mood === 'excellent' ? 'bg-green-100 text-green-800' :
                          log.mood === 'good' ? 'bg-blue-100 text-blue-800' :
                          log.mood === 'neutral' ? 'bg-gray-100 text-gray-800' :
                          log.mood === 'bad' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          <FaceSmileIcon className="h-5 w-5" />
                        </span>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {log.mood === 'excellent' ? 'Çok İyi' :
                             log.mood === 'good' ? 'İyi' :
                             log.mood === 'neutral' ? 'Nötr' :
                             log.mood === 'bad' ? 'Kötü' :
                             'Çok Kötü'}
                          </p>
                          <p className="text-sm text-gray-500">
                            {new Date(log.date).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm text-gray-500 mr-4">
                          Stres: {log.stressLevel}/10
                        </span>
                        <span className="text-sm text-gray-500">
                          Uyku: {log.sleepHours} saat
                        </span>
                      </div>
                    </div>
                    {log.notes && (
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{log.notes}</p>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="px-4 py-5 sm:p-6 text-center">
              <p className="text-gray-500">Henüz ruh hali kaydınız bulunmuyor.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div>
      {/* Tab Navigasyon */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('measurements')}
              className={`${
                activeTab === 'measurements'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Ölçümler
            </button>
            <button
              onClick={() => setActiveTab('photos')}
              className={`${
                activeTab === 'photos'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Fotoğraflar
            </button>
            <button
              onClick={() => setActiveTab('mood')}
              className={`${
                activeTab === 'mood'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Ruh Hali ve Stres
            </button>
          </nav>
        </div>
      </div>

      {/* Tab İçeriği */}
      {activeTab === 'measurements' && renderMeasurementTab()}
      {activeTab === 'photos' && renderPhotosTab()}
      {activeTab === 'mood' && renderMoodTab()}
    </div>
  );
};

export default Progress;