'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProperties, getCities } from '@/lib/api/properties';
import { getStrapiMedia } from '@/lib/api/client';
import Link from 'next/link';
import Image from 'next/image';
import { Property } from '@/lib/types';

function PropertiesContent() {
  const searchParams = useSearchParams();
  const [properties, setProperties] = useState<Property[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  // Фильтры из URL
  const city = searchParams.get('city') || '';
  const type = searchParams.get('type') || '';
  const listingType = searchParams.get('listingType') || '';
  const sort = searchParams.get('sort') || 'createdAt:desc';

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        
        const [propertiesResponse, citiesData] = await Promise.all([
          getProperties({
            city: city || undefined,
            type: type as any || undefined,
            listingType: listingType as any || undefined,
            sort,
            page: currentPage,
            pageSize: 12,
          }),
          getCities()
        ]);
        
        setProperties(propertiesResponse.data);
        setCities(citiesData);
        
        if (propertiesResponse.meta?.pagination) {
          setTotalPages(propertiesResponse.meta.pagination.pageCount);
        }
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [city, type, listingType, sort, currentPage]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete('page'); // Reset to first page when filtering
    window.location.href = `/properties?${params.toString()}`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Tüm Projeler</h1>
      
      {/* Фильтры */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            value={city} 
            onChange={(e) => updateFilter('city', e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Tüm Şehirler</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          
          <select 
            value={type} 
            onChange={(e) => updateFilter('type', e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Tüm Tipler</option>
            <option value="villa">Villa</option>
            <option value="apartment">Daire</option>
            <option value="house">Ev</option>
            <option value="penthouse">Penthouse</option>
            <option value="townhouse">Townhouse</option>
            <option value="land">Arsa</option>
          </select>
          
          <select 
            value={listingType} 
            onChange={(e) => updateFilter('listingType', e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="">Satılık & Kiralık</option>
            <option value="sale">Satılık</option>
            <option value="rent">Kiralık</option>
          </select>
          
          <select 
            value={sort} 
            onChange={(e) => updateFilter('sort', e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="createdAt:desc">En Yeni</option>
            <option value="price:asc">Fiyat: Düşükten Yükseğe</option>
            <option value="price:desc">Fiyat: Yüksekten Düşüğe</option>
            <option value="area:asc">Alan: Küçükten Büyüğe</option>
            <option value="area:desc">Alan: Büyükten Küçüğe</option>
          </select>
        </div>
      </div>

      {/* Список недвижимости */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Projeler yükleniyor...</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {properties.map((property) => {
              const imageUrl = getStrapiMedia(property.coverImage?.url);
              
              return (
                <Link 
                  key={property.id} 
                  href={`/properties/${property.slug}`}
                  className="block"
                >
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 bg-gray-300 relative">
                      {imageUrl && (
                        <Image
                          src={imageUrl}
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      )}
                      <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded">
                        {property.listingType === 'sale' ? 'Satılık' : 'Kiralık'}
                      </div>
                      <div className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-1 rounded capitalize">
                        {property.type}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">
                        {property.title}
                      </h3>
                      <p className="text-gray-600 mb-4">
                        {property.city}, {property.country}
                      </p>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <span className="mr-4">🛏 {property.bedrooms} yatak</span>
                        <span className="mr-4">🚿 {property.bathrooms} banyo</span>
                        <span>📐 {property.area} m²</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-2xl font-bold text-blue-600">
                          {property.currency} {property.price.toLocaleString()}
                        </span>
                        <span className="text-blue-600 hover:text-blue-700">
                          Detayları Gör →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {properties.length === 0 && (
            <p className="text-center text-gray-500 py-16">
              Aradığınız kriterlere uygun proje bulunamadı.
            </p>
          )}
          
          {/* Пагинация */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <Suspense fallback={
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="text-xl">Yükleniyor...</div>
        </div>
      </div>
    }>
      <PropertiesContent />
    </Suspense>
  );
}