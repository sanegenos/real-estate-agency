'use client';

import Link from 'next/link';
import Image from 'next/image';

const cities = [
  {
    name: 'Antalya',
    image: '/images/cities/antalya.jpg',
    properties: 45,
    description: 'Akdeniz\'in incisi',
  },
  {
    name: 'İstanbul',
    image: '/images/cities/istanbul.jpg',
    properties: 120,
    description: 'İki kıta bir şehir',
  },
  {
    name: 'İzmir',
    image: '/images/cities/izmir.jpg',
    properties: 35,
    description: 'Ege\'nin kalbi',
  },
  {
    name: 'Dubai',
    image: '/images/cities/dubai.jpg',
    properties: 52,
    description: 'Güneşin başkenti',
  },
];

export default function CitiesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Şehirler</h2>
          <p className="text-xl text-gray-600">
            Türkiye\'nin en güzel şehirlerinde hayalinizdeki evi bulun
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cities.map((city) => (
            <Link
              key={city.name}
              href={`/properties?city=${city.name}`}
              className="group relative h-[40rem] rounded-lg overflow-hidden"
            >
              {/* Background Image */}
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-2xl font-bold mb-1">{city.name}</h3>
                <p className="text-sm mb-2 opacity-90">{city.description}</p>
                <p className="text-sm opacity-75">{city.properties} Proje</p>
              </div>
              
              {/* Hover Arrow */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
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