import { Property } from '@/lib/types';
import {
  HomeModernIcon,       // Тип жилья
  CalendarDaysIcon      // Дата
} from '@heroicons/react/24/outline';

import { Bed, ShowerHead, Ruler } from 'lucide-react';


interface PropertyFeaturesProps {
  property: Property;
  installmentPlan?: string;
}

export default function PropertyFeatures({ property, installmentPlan }: PropertyFeaturesProps) {
  const features = [
    {
      label: 'Emlak Türü',
      value: property.type === 'apartment' ? 'Daire' :
        property.type === 'villa' ? 'Villa' :
          property.type === 'house' ? 'Ev' : property.type,
      values: [
        property.listingType === 'sale' ? 'Satılık' : 'Kiralık',
        property.type.charAt(0).toUpperCase() + property.type.slice(1),
        'Ticari Gayrimenkul'
      ],
      icon: HomeModernIcon,
    },
    {
      label: 'Yatak Odaları',
      icon: Bed,
      value: `${property.bedrooms}, ${property.bathrooms}, ${property.bedrooms + property.bathrooms}`,
    },
    {
      label: 'Banyolar',
      icon: ShowerHead,
      value: `${property.bathrooms}, ${Math.min(property.bathrooms, 2)}`,
    },
    {
      label: 'Lot m²',
      icon: Ruler,
      value: property.area.toLocaleString(),
    },
    {
      label: 'Teslim tarihi',
      icon: CalendarDaysIcon,
      value: property.completionDate
        ? new Date(property.completionDate).getFullYear()
        : '2024',
    }
  ];

  return (
    <>
      <div className="bg-white rounded-[8px] p-[30px] shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-[#e8e8e8]">
        <h2 className="text-2xl font-bold mb-6">Genel bakış</h2>
        <div className="flex flex-col gap-2 justify-between md:flex-row mb-8">
          {features.map((feature, index) => (
            <div key={`${feature.label}-${index}`} className="min-w-[200px] bg-white rounded-lg p-4 border hover:-translate-y-1 hover:shadow-md hover:bg-yellow-400 transition-all duration-300 ease-in-out [transition:transform_0.4s,background_0.3s,border_0.3s,border-radius_0.3s,box-shadow_0.3s]">
              <p className="text-sm text-gray-600 mb-1">{feature.label}</p>
              <hr className="border-t border-black my-2" />
              <p className="text-lg font-semibold ">
                {feature.icon && <feature.icon className="w-5 h-5 text-gray-600" />}
                {feature.value}
              </p>
              {feature.values && (
                <p className="text-xs text-gray-500 mt-1">
                  {feature.values.join(', ')}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-5">
        {/* Site Özellikleri */}
        <div>
          <div className='bg-white rounded-lg p-6 border'>
            <h3 className="text-xl font-semibold mb-4">Site Özellikleri</h3>
            <div className="grid grid-cols-1 gap-3">
              {property.features && Array.isArray(property.features) && property.features.length > 0 ? (
                property.features.map((feature) => (
                  <div key={feature.id} className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">{feature.name}</span>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">7/24 Kapalı devre kamera sistemi</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Açık Otopark</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Gym</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">SPA, Hamam</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Jeneratör sistemi</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span>
                    <span className="text-sm">Klima / Havalandırma Sistemi</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Ödeme Planı */}
        <div className='bg-white rounded-lg p-6 border'>
          <h2 className="text-2xl font-bold mb-6">Ödeme Planı</h2>
          {installmentPlan ? (
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: installmentPlan }}
            />
          ) : (
            <div className="bg-white ">
              <p className="text-gray-600 mb-4">
                Bu proje için esnek ödeme planları sunuyoruz. Detaylı bilgi için bizimle iletişime geçin.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>%30 peşinat ile başlayan ödeme seçenekleri</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>24 aya kadar taksit imkanı</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span>Erken ödeme indirimleri</span>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}