// frontend/components/property/PropertyCard.tsx
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api/client';
import { Property } from '@/lib/types';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  // Безопасное получение значений
  const imageUrl = getStrapiMedia(property.coverImage?.url);
  const title = property.title || 'Без названия';
  const city = property.city || 'Город не указан';
  const country = property.country || 'Страна не указана';
  const bedrooms = property.bedrooms || 0;
  const bathrooms = property.bathrooms || 0;
  const area = property.area || 0;
  const price = property.price || 0;
  const currency = property.currency || 'USD';
  const listingType = property.listingType === 'sale' ? 'Satılık' : 'Kiralık';

  return (
    <Link
      href={`/properties/${property.slug}`}
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
}