//frontend/app/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getFeaturedProperties, getCities } from '@/lib/api/properties';
import { getStrapiMedia } from '@/lib/api/client';
import Link from 'next/link';
import Image from 'next/image';
import WhyUsSection from '@/components/home/WhyUsSection';
import PropertyTypesSection from '@/components/home/PropertyTypesSection';
import CitiesSection from '@/components/home/CitiesSection';
import { Property } from '@/lib/types';

export default function Home() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Form state
  const [activeTab, setActiveTab] = useState<'all' | 'sale' | 'rent'>('all');
  const [searchForm, setSearchForm] = useState({
    type: '',
    country: 'Türkiye',
    city: '',
    district: '',
    rooms: '',
    priceRange: ''
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [propertiesResponse, citiesData] = await Promise.all([
          getFeaturedProperties(3),
          getCities()
        ]);

        // Проверяем структуру данных и устанавливаем безопасные значения
        if (propertiesResponse?.data && Array.isArray(propertiesResponse.data)) {
          setProperties(propertiesResponse.data);
        } else {
          console.warn('Invalid properties response:', propertiesResponse);
          setProperties([]);
        }

        if (Array.isArray(citiesData)) {
          setCities(citiesData);
        } else {
          console.warn('Invalid cities response:', citiesData);
          setCities([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setProperties([]);
        setCities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Parallax effect for hero section
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      const heroImage = document.querySelector('.hero-parallax');
      if (heroImage && scrolled < 800) {
        (heroImage as HTMLElement).style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to properties page with search params
    const params = new URLSearchParams();
    if (searchForm.type) params.set('type', searchForm.type);
    if (searchForm.city) params.set('city', searchForm.city);

    // Если выбран не "all", добавляем фильтр по типу листинга
    if (activeTab !== 'all') {
      params.set('listingType', activeTab);
    }

    console.log('Redirect URL:', `/properties?${params.toString()}`);
    window.location.href = `/properties?${params.toString()}`;
  };

  // Безопасный рендер карточки недвижимости
  const renderPropertyCard = (property: Property) => {
    const imageUrl = getStrapiMedia(property.coverImage?.url);
    const title = property.title || 'Без названия';
    const city = property.city || 'Город не указан';
    const country = property.country || 'Страна не указана';
    const bedrooms = Number(property.bedrooms) || 0;
    const bathrooms = Number(property.bathrooms) || 0;
    const area = Number(property.area) || 0;
    const price = Number(property.price) || 0;
    const currency = property.currency || 'USD';
    const listingType = property.listingType === 'sale' ? 'Satılık' : 'Kiralık';

    return (
      <Link
        key={property.id}
        href={`/properties/${property.slug || property.id}`}
        className="block group"
      >
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="h-48 bg-gray-300 relative overflow-hidden">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
                unoptimized={imageUrl.includes('onrender.com')}
              />
            )}
            <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded">
              {listingType}
            </div>
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">
              {title}
            </h3>
            <p className="text-gray-600 mb-4">
              {city}, {country}
            </p>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span className="mr-4">🛏 {bedrooms} yatak</span>
              <span className="mr-4">🚿 {bathrooms} banyo</span>
              <span>📐 {area} m²</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold text-blue-600">
                {currency} {price.toLocaleString()}
              </span>
              <span className="text-blue-600 hover:text-blue-700 group-hover:translate-x-1 transition-transform">
                Detayları Gör →
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <>
      {/* Hero Section with Search */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        {/* Background Image with Parallax */}
        <div className="absolute inset-0 z-0 hero-parallax">
          <Image
            src="/images/banner.webp"
            alt="Antalya skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#002E51]/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-100 flex justify-center">
          <div className="container px-4 py-4 text-center transform md:translate-y-[70%]">
            <h1 className="text-5xl md:text-3xl font-bold text-white mb-4 animate-fade-in">
              Silpagar Grup'a Hoşgeldiniz!
            </h1>
            <p className="text-xl text-white mb-12 animate-fade-in animation-delay-200">
              Hayallerinizdeki Evi Gerçeğe Dönüştürüyoruz!
            </p>

            {/* Search Form */}
            <div className="bg-white rounded-2xl p-6 max-w-6xl mx-auto shadow-2xl animate-slide-up animation-delay-400">
              {/* Tabs */}
              <div className="flex gap-4 mb-6 justify-center">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'all'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Bütün Projeler
                </button>
                <button
                  onClick={() => setActiveTab('rent')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'rent'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Kiralık
                </button>
                <button
                  onClick={() => setActiveTab('sale')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'sale'
                    ? 'bg-yellow-400 text-gray-900'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                  Satılık
                </button>
              </div>

              {/* Search Fields */}
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {/* Proje Tipi */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    PROJE TİPİ
                  </label>
                  <select
                    value={searchForm.type}
                    onChange={(e) => setSearchForm({ ...searchForm, type: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Tümü</option>
                    <option value="villa">Villa</option>
                    <option value="apartment">Daire</option>
                    <option value="house">Ev</option>
                    <option value="penthouse">Penthouse</option>
                    <option value="land">Arsa</option>
                  </select>
                </div>

                {/* Ülke */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ÜLKE
                  </label>
                  <select
                    value={searchForm.country}
                    onChange={(e) => setSearchForm({ ...searchForm, country: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="Türkiye">Türkiye</option>
                  </select>
                </div>

                {/* Şehir */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ŞEHİR
                  </label>
                  <select
                    value={searchForm.city}
                    onChange={(e) => setSearchForm({ ...searchForm, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Sehir seçin</option>
                    {cities.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                {/* Oda Sayısı */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ODA SAYISI
                  </label>
                  <select
                    value={searchForm.rooms}
                    onChange={(e) => setSearchForm({ ...searchForm, rooms: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Tümü</option>
                    <option value="1">1+1</option>
                    <option value="2">2+1</option>
                    <option value="3">3+1</option>
                    <option value="4">4+1</option>
                    <option value="5">5+1</option>
                  </select>
                </div>

                {/* Search Button */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 invisible">
                    Ara
                  </label>
                  <button
                    type="submit"
                    className="w-full bg-yellow-400 text-gray-900 font-medium py-3 rounded-lg hover:bg-yellow-500 transition"
                  >
                    Arayın
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-40">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Öne Çıkan Projeler
          </h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl">Projeler yükleniyor...</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {properties.map(renderPropertyCard)}
              </div>

              {properties.length === 0 && (
                <p className="text-center text-gray-500">
                  Henüz proje eklenmemiş. Lütfen Strapi admin panelinden proje ekleyin.
                </p>
              )}
            </>
          )}
        </div>
      </section>

      {/* Property Types Section */}
      <PropertyTypesSection />

      {/* Cities Section */}
      <CitiesSection />

      {/* Why Us Section with Form */}
      <WhyUsSection />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </>
  );
});
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </>
  );
}