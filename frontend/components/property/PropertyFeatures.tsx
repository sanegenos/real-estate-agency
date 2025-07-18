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
  // Безопасное получение значений с проверками
  const getPropertyType = () => {
    switch(property.type) {
      case 'apartment': return 'Daire';
      case 'villa': return 'Villa';
      case 'house': return 'Ev';
      case 'penthouse': return 'Penthouse';
      case 'townhouse': return 'Townhouse';
      case 'land': return 'Arsa';
      default: return property.type || 'Belirtilmemiş';
    }
  };

  const getListingType = () => {
    return property.listingType === 'sale' ? 'Satılık' : 'Kiralık';
  };

  const getCompletionYear = () => {
    if (property.completionDate) {
      return new Date(property.completionDate).getFullYear().toString();
    }
    return '2024';
  };

  const features = [
    {
      label: 'Emlak Türü',
      value: getPropertyType(),
      icon: HomeModernIcon,
    },
    {
      label: 'Yatak Odaları',
      icon: Bed,
      value: `${property.bedrooms || 0} yatak`,
    },
    {
      label: 'Banyolar',
      icon: ShowerHead,
      value: `${property.bathrooms || 0} banyo`,
    },
    {
      label: 'Alan',
      icon: Ruler,
      value: `${property.area || 0} m²`,
    },
    {
      label: 'Teslim tarihi',
      icon: CalendarDaysIcon,
      value: getCompletionYear(),
    }
  ];

  return (
    <>
      <div className="bg-white rounded-[8px] p-[30px] shadow-[0_2px_15px_rgba(0,0,0,0.08)] border border-[#e8e8e8]">
        <h2 className="text-2xl font-bold mb-6">Genel bakış</h2>
        <div className="flex flex-col gap-2 justify-between md:flex-row mb-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div key={`${feature.label}-${index}`} className="min-w-[200px] bg-white rounded-lg p-4 border hover:-translate-y-1 hover:shadow-md hover:bg-yellow-400 transition-all duration-300 ease-in-out [transition:transform_0.4s,background_0.3s,border_0.3s,border-radius_0.3s,box-shadow_0.3s]">
                <p className="text-sm text-gray-600 mb-1">{feature.label}</p>
                <hr className="border-t border-black my-2" />
                <div className="flex items-center gap-2">
                  {IconComponent && <IconComponent className="w-5 h-5 text-gray-600" />}
                  <p className="text-lg font-semibold">{feature.value}</p>
                </div>
              </div>
            );
          })}
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
                    <span className="text-sm">{feature.name || 'Özellik'}</span>
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