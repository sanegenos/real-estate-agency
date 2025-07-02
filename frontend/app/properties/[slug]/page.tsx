//frontend/app/proerties/[slug]/page.tsx

import { getPropertyBySlug, getRelatedProperties } from '@/lib/api/properties';
import { getStrapiMedia } from '@/lib/api/client';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PropertyGallery from '@/components/property/PropertyGallery';
import PropertyFeatures from '@/components/property/PropertyFeatures';
import PropertyPhotos from '@/components/property/PropertyPhotos';
import PropertyLocation from '@/components/property/PropertyLocation';
import PropertyVideo from '@/components/property/PropertyVideo';
import AgentSection from '@/components/property/AgentSection';
import { MapPinIcon } from '@heroicons/react/24/solid';

interface PageProps {
  params: {
    slug: string;
  };
}

// export async function generateMetadata({ params }: PageProps) {
//   const property = await getPropertyBySlug(params.slug);

//   if (!property) return {};

//   return {
//     title: `${property.title} - Silpagar Grup`,
//     description: property.description.substring(0, 160),
//     openGraph: {
//       title: property.title,
//       description: property.description,
//       images: [getStrapiMedia(property.coverImage?.url) || ''],
//     },
//   };
// }

export default async function PropertyDetailPage({ params }: PageProps) {
  const property = await getPropertyBySlug(params.slug);

  if (!property) {
    notFound();
  }

  // Получаем похожие объекты
  const relatedResponse = await getRelatedProperties(
    property.id,
    property.type,
    property.city,
    4
  );
  const relatedProperties = relatedResponse.data;

  return (
    <>
      {/* Gallery Banner - сразу под header */}
      <PropertyGallery
        images={property.gallery || []}
        coverImage={property.coverImage}
      />

      {/* Main Info Section */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Title and Price */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{property.title}</h1>
                <div className="flex flex-wrap gap-1 text-gray-600 mb-3">
                  <span className="uppercase text-white bg-[rgba(0,0,0,0.65)] rounded-[2px] font-medium transition duration-200 text-[12px] leading-[11px] p-[7px_10px_6px] mr-[5px] m-0">{property.type}</span>
                  <span className="uppercase text-white bg-[rgba(0,0,0,0.65)] rounded-[2px] font-medium transition duration-200 text-[12px] leading-[11px] p-[7px_10px_6px] mr-[5px] m-0">{property.bedrooms} + {property.bathrooms}</span>
                  <span className="uppercase text-white bg-[rgba(0,0,0,0.65)] rounded-[2px] font-medium transition duration-200 text-[12px] leading-[11px] p-[7px_10px_6px] mr-[5px] m-0">{property.area} m²</span>
                </div>
                <p className="text-[#636363] text-[15px] mt-[7px] mb-0 whitespace-nowrap overflow-hidden text-ellipsis flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4 flex-shrink-0 text-[#636363]" />
                  {property.address}, {property.city}, {property.country}
                </p>
              </div>
              <div className="mt-4 md:mt-0 lg:text-right">
                <div className="text-3xl md:text-4xl font-bold text-black">
                  {property.currency} {property.price.toLocaleString()}
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Mülk Kimliği: {property.propertyCode || `SG-${property.id}`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Property Features Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <PropertyFeatures
              property={property}
              installmentPlan={property.installmentPlan}
            />
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Fotoğraflar</h2>
            <PropertyPhotos images={property.gallery || []} />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Konum</h2>
            <PropertyLocation
              address={property.address}
              city={property.city}
              country={property.country}
              latitude={property.latitude}
              longitude={property.longitude}
            />
          </div>
        </div>
      </section>

      {/* Video Section */}
      {property.youtubeVideoUrl && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Video</h2>
              <PropertyVideo videoUrl={property.youtubeVideoUrl} />
            </div>
          </div>
        </section>
      )}

      {/* Agent Section */}
      {property.agent && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AgentSection
                agent={property.agent}
                propertyTitle={property.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* Related Properties */}
      {relatedProperties.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold mb-8">Benzer Projeler</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedProperties.map((relatedProperty) => {
                  const imageUrl = getStrapiMedia(relatedProperty.coverImage?.url);

                  return (
                    <Link
                      key={relatedProperty.id}
                      href={`/properties/${relatedProperty.slug}`}
                      className="block group"
                    >
                      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
                        <div className="grid grid-cols-3 h-full">
                          {/* Image - 1/3 width */}
                          <div className="relative h-48 md:h-full bg-gray-300">
                            {imageUrl && (
                              <Image
                                src={imageUrl}
                                alt={relatedProperty.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            )}
                            <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                              {relatedProperty.listingType === 'sale' ? 'Satılık' : 'Kiralık'}
                            </div>
                          </div>

                          {/* Content - 2/3 width */}
                          <div className="col-span-2 p-4 flex flex-col justify-between">
                            <div>
                              <h3 className="text-lg font-semibold mb-1 line-clamp-1">
                                {relatedProperty.title}
                              </h3>
                              <p className="text-gray-600 text-sm mb-2">
                                📍 {relatedProperty.city}, {relatedProperty.country}
                              </p>
                              <div className="flex items-center text-xs text-gray-500 space-x-3">
                                <span>🛏 {relatedProperty.bedrooms} yatak</span>
                                <span>🚿 {relatedProperty.bathrooms} banyo</span>
                                <span>📐 {relatedProperty.area} m²</span>
                              </div>
                            </div>
                            <div className="mt-3">
                              <div className="text-xl font-bold text-blue-600">
                                {relatedProperty.currency} {relatedProperty.price.toLocaleString()}
                              </div>
                              <span className="text-sm text-blue-600 group-hover:text-blue-700 inline-flex items-center mt-1">
                                Detayları Gör
                                <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
