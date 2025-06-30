'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface FormData {
  phoneCode: string;
  phone: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  zipCode: string;
  propertyType: string;
  maxPrice: string;
  minArea: string;
  bedrooms: string;
  bathrooms: string;
  gdprConsent: boolean;
}

export default function WhyUsSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  // Parallax effect for Why Us section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const section = document.querySelector('.why-us-parallax');
      if (section) {
        const rect = section.getBoundingClientRect();
        const speed = 0.5;
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          (section as HTMLElement).style.backgroundPositionY = `${scrolled * speed}px`;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Form submission logic here
      console.log('Form data:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Parallax Background */}
      <div 
        className="absolute inset-0 z-0 why-us-parallax"
        style={{
          backgroundImage: 'url("/images/why-us-bg.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/90 to-yellow-700/90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Why Us Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              Neden Silpagar Grup<br />
              Mükemmel Seçim?
            </h2>

            <div className="space-y-8">
              <div>
                <div className="flex items-start">
                  <div className="text-5xl font-bold mr-6 opacity-50">01.</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Uzman Rehberlik</h3>
                    <p className="text-white/80">
                      Deneyimli ekibimiz her adımda profesyonel destek sağlar.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="text-5xl font-bold mr-6 opacity-50">02.</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Seçkin Mülkler</h3>
                    <p className="text-white/80">
                      İhtiyaçlarınıza uygun, yüksek kaliteli konut ve ticari mülkler sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-start">
                  <div className="text-5xl font-bold mr-6 opacity-50">03.</div>
                  <div>
                    <h3 className="text-2xl font-semibold mb-2">Güven ve Şeffaflık</h3>
                    <p className="text-white/80">
                      Müşteri memnuniyetini ön planda tutarak dürüst ve güvenilir hizmet sunuyoruz.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="bg-white rounded-lg p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Gayrimenkul Bilgi Talep Formu</h3>
            <p className="text-gray-600 mb-6">
              İlgilendiğiniz gayrimenkul hakkında detaylı bilgi almak için formu doldurun, uzman ekibimiz en kısa sürede sizinle iletişime geçsin.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Talep Türü
                </label>
                <select
                  {...register('propertyType', { required: 'Bu alan zorunludur' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Seçiniz</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Daire</option>
                  <option value="land">Arsa</option>
                </select>
              </div>

              {/* Info Text */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bilgi
                </label>
                <textarea
                  placeholder="Ben bir..."
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              {/* Name Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Adınız"
                    {...register('firstName', { required: 'Ad zorunludur' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
                  )}
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Soyadınız"
                    {...register('lastName', { required: 'Soyad zorunludur' })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  {...register('email', {
                    required: 'Email zorunludur',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Geçerli bir email adresi giriniz',
                    },
                  })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Country and Zip */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bölge
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Seçiniz"
                    {...register('country')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <input
                    type="text"
                    placeholder="Zip Code"
                    {...register('zipCode')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Project Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Proje tipi
                </label>
                <select
                  {...register('propertyType')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                >
                  <option value="">Seçiniz</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Daire</option>
                  <option value="house">Ev</option>
                  <option value="land">Arsa</option>
                </select>
              </div>

              {/* Price and Area */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Maksimum fiyat"
                    {...register('maxPrice')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Minimum alan"
                    {...register('minArea')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* Rooms */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    placeholder="Oda sayısı"
                    {...register('bedrooms')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Yatak odası sayısı"
                    {...register('bathrooms')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                </div>
              </div>

              {/* GDPR Consent */}
              <div>
                <label className="flex items-start">
                  <input
                    type="checkbox"
                    {...register('gdprConsent', { required: 'Onay vermeniz gerekmektedir' })}
                    className="mt-1 mr-2"
                  />
                  <span className="text-sm text-gray-600">
                    GDPR Onayı<br />
                    Kişisel verilerinizin, Avrupa Birliği Genel Veri Koruma Yönetmeliği (GDPR) kapsamında toplanıdığını ve işlendiğini kabul ediyorum.
                  </span>
                </label>
                {errors.gdprConsent && (
                  <p className="text-red-500 text-xs mt-1">{errors.gdprConsent.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-yellow-400 text-gray-900 font-medium py-3 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">
                  Form başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">
                  Form gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}