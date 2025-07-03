'use client';

import Link from 'next/link';
import Image from 'next/image';

const propertyTypes = [
  {
    id: 'konut',
    title: 'Konut',
    description: 'Modern yaşam alanları',
    image: '/images/types/konut.jpg',
    searchType: 'apartment',
    count: 45,
  },
  {
    id: 'villa',
    title: 'Villa',
    description: 'Lüks ve konforlu',
    image: '/images/types/villa.jpg',
    searchType: 'villa',
    count: 28,
  },
  {
    id: 'ticari',
    title: 'Ticari Gayrimenkul',
    description: 'İş dünyası için',
    image: '/images/types/ticari.jpg',
    searchType: 'commercial',
    count: 15,
  },
  {
    id: 'arsa',
    title: 'Arsa',
    description: 'Yatırım fırsatları',
    image: '/images/types/arsa.jpg',
    searchType: 'land',
    count: 22,
  },
  {
    id: 'rezidans',
    title: 'Rezidans',
    description: 'Şehir yaşamı',
    image: '/images/types/rezidans.jpg',
    searchType: 'penthouse',
    count: 18,
  },
  {
    id: 'isyeri',
    title: 'İş Yeri',
    description: 'Ofis ve dükkanlar',
    image: '/images/types/isyeri.jpg',
    searchType: 'office',
    count: 12,
  },
];

export default function PropertyTypesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Emlak Türleri</h2>
          <p className="text-xl text-gray-600">
            İhtiyacınıza uygun emlak türünü seçin
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyTypes.map((type) => (
            <Link
              key={`property-type-${type.id}`}
              href={`/properties?type=${type.searchType}`}
              className="group relative h-80 rounded-lg overflow-hidden"
            >
              <Image
                src={type.image}
                alt={type.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{String(type.title)}</h3>
                <p className="text-sm mb-2 opacity-90">{String(type.description)}</p>
                <p className="text-sm opacity-75">{type.count} Proje</p>
              </div>
              
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/properties"
            className="inline-block bg-yellow-400 text-gray-900 font-medium px-8 py-3 rounded-lg hover:bg-yellow-500 transition"
          >
            Tüm Projeleri Görüntüle
          </Link>
        </div>
      </div>
    </section>
  );
}