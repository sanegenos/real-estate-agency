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
  const [error, setError] = useState<string | null>(null);

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
        setLoading(true);
        setError(null);
        
        console.log('Fetching data...');
        
        const [propertiesResponse, citiesData] = await Promise.all([
          getFeaturedProperties(3),
          getCities()
        ]);

        console.log('Properties response:', propertiesResponse);
        console.log('Cities data:', citiesData);

        // Очень строгая проверка данных
        if (propertiesResponse && 
            typeof propertiesResponse === 'object' && 
            propertiesResponse.data && 
            Array.isArray(propertiesResponse.data)) {
          
          // Фильтруем только валидные объекты
          const validProperties = propertiesResponse.data.filter(property => {
            return property && 
                   typeof property === 'object' && 
                   typeof property.id === 'number' &&
                   typeof property.title === 'string';
          });
          
          console.log('Valid properties:', validProperties);
          setProperties(validProperties);
        } else {
          console.warn('Invalid properties response structure:', propertiesResponse);
          setProperties([]);
        }

        if (Array.isArray(citiesData)) {
          // Фильтруем только строки
          const validCities = citiesData.filter(city => typeof city === 'string');
          console.log('Valid cities:', validCities);
          setCities(validCities);
        } else {
          console.warn('Invalid cities response:', citiesData);
          setCities([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Unknown error');
        setProperties([]);
        setCities([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchForm.type) params.set('type', searchForm.type);
    if (searchForm.city) params.set('city', searchForm.city);

    if (activeTab !== 'all') {
      params.set('listingType', activeTab);
    }

    window.location.href = `/properties?${params.toString()}`;
  };

  // Максимально безопасный рендер карточки
  const SafePropertyCard = ({ property }: { property: Property }) => {
    // Проверяем каждое поле отдельно
    if (!property || typeof property !== 'object') {
      console.warn('Invalid property object:', property);
      return null;
    }

    const safeId = property.id ? String(property.id) : 'unknown';
    const safeTitle = property.title ? String(property.title) : 'Название не указано';
    const safeCity = property.city ? String(property.city) : 'Город не указан';
    const safeCountry = property.country ? String(property.country) : 'Страна не указана';
    const safeBedrooms = property.bedrooms && typeof property.bedrooms === 'number' ? property.bedrooms : 0;
    const safeBathrooms = property.bathrooms && typeof property.bathrooms === 'number' ? property.bathrooms : 0;
    const safeArea = property.area && typeof property.area === 'number' ? property.area : 0;
    const safePrice = property.price && typeof property.price === 'number' ? property.price : 0;
    const safeCurrency = property.currency ? String(property.currency) : 'USD';
    const safeListingType = property.listingType === 'sale' ? 'Satılık' : 'Kiralık';
    const safeSlug = property.slug ? String(property.slug) : safeId;

    const imageUrl = getStrapiMedia(property.coverImage?.url);

    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="h-48 bg-gray-300 relative overflow-hidden">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={safeTitle}
              fill
              className="object-cover"
              unoptimized={imageUrl.includes('onrender.com')}
            />
          )}
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded">
            {safeListingType}
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">
            {safeTitle}
          </h3>
          <p className="text-gray-600 mb-4">
            {safeCity}, {safeCountry}
          </p>
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span className="mr-4">🛏 {safeBedrooms} yatak</span>
            <span className="mr-4">🚿 {safeBathrooms} banyo</span>
            <span className="mr-4">📐 {safeArea} m²</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-blue-600">
              {safeCurrency} {safePrice.toLocaleString()}
            </span>
            <Link 
              href={`/properties/${safeSlug}`}
              className="text-blue-600 hover:text-blue-700"
            >
              Detayları Gör →
            </Link>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Hero Section with Search */}
      <section className="relative min-h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/banner.webp"
            alt="Antalya skyline"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#002E51]/70"></div>
        </div>

        <div className="relative z-10 flex justify-center">
          <div className="container px-4 py-4 text-center">
            <h1 className="text-5xl md:text-3xl font-bold text-white mb-4">
              Silpagar Grup&apos;a Hoşgeldiniz!
            </h1>
            <p className="text-xl text-white mb-12">
              Hayallerinizdeki Evi Gerçeğe Dönüştürüyoruz!
            </p>

            <div className="bg-white rounded-2xl p-6 max-w-6xl mx-auto shadow-2xl">
              <div className="flex gap-4 mb-6 justify-center">
                <button
                  onClick={() => setActiveTab('all')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    activeTab === 'all'
                      ? 'bg-gray-800 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Bütün Projeler
                </button>
                <button
                  onClick={() => setActiveTab('rent')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    activeTab === 'rent'
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Kiralık
                </button>
                <button
                  onClick={() => setActiveTab('sale')}
                  className={`px-6 py-2 rounded-lg font-medium transition ${
                    activeTab === 'sale'
                      ? 'bg-yellow-400 text-gray-900'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Satılık
                </button>
              </div>

              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-5 gap-4">
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ŞEHİR
                  </label>
                  <select
                    value={searchForm.city}
                    onChange={(e) => setSearchForm({ ...searchForm, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  >
                    <option value="">Şehir seçin</option>
                    {cities.map((city, index) => (
                      <option key={`city-${index}`} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

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
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Öne Çıkan Projeler
          </h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              Hata: {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="text-xl">Projeler yükleniyor...</div>
            </div>
          ) : (
            <div>
              {properties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {properties.map((property, index) => (
                    <SafePropertyCard key={`property-${property.id || index}`} property={property} />
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  Henüz proje eklenmemiş. Lütfen Strapi admin panelinden proje ekleyin.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      <PropertyTypesSection />
      <CitiesSection />
      <WhyUsSection />
    </div>
  );
}