'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { getStrapiMedia } from '@/lib/api/client';
import { Agent } from '@/lib/types';

interface AgentSectionProps {
  agent: Agent;
  propertyTitle: string;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

// Функция для безопасного извлечения текста из Strapi blocks
function extractTextFromBlocks(blocks: any): string {
  if (!blocks || !Array.isArray(blocks)) {
    return '';
  }
  
  return blocks
    .map(block => {
      if (block && Array.isArray(block.children)) {
        return block.children
          .map((child: any) => child?.text || '')
          .join(' ');
      }
      return '';
    })
    .filter(Boolean)
    .join('\n');
}

export default function AgentSection({ agent, propertyTitle }: AgentSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      console.log('Form data:', {
        ...data,
        property: propertyTitle,
        agent: `${agent.firstName} ${agent.lastName}`,
        agentEmail: agent.email,
      });
      
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

  const agentPhotoUrl = getStrapiMedia(agent.photo?.url);
  
  // Безопасно извлекаем текст из bio
  const agentBio = typeof agent.bio === 'string' 
    ? agent.bio 
    : extractTextFromBlocks(agent.bio);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">İletişime Geçin</h2>      
      <div className="grid grid-cols-1 gap-12">
        <div>
          {/* Agent Info */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-start space-x-4 mb-6">
              {/* Agent Photo */}
              <div className="flex-shrink-0">
                {agentPhotoUrl ? (
                  <Image
                    src={agentPhotoUrl}
                    alt={`${agent.firstName} ${agent.lastName}`}
                    width={100}
                    height={100}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-3xl text-gray-500">
                      {String(agent.firstName || '')[0]}{String(agent.lastName || '')[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* Agent Details */}
              <div className="flex-grow">
                <h3 className="text-xl font-semibold mb-1">
                  {String(agent.firstName || '')} {String(agent.lastName || '')}
                </h3>
                <p className="text-gray-600 mb-3">Gayrimenkul Danışmanı</p>
                {agent.city && (
                  <p className="text-sm text-gray-500">{String(agent.city)}</p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <a 
                href={`tel:${agent.phone}`}
                className="flex items-center text-gray-700 hover:text-blue-600 transition"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {String(agent.phone || '')}
              </a>
              
              <a 
                href={`mailto:${agent.email}`}
                className="flex items-center text-gray-700 hover:text-blue-600 transition"
              >
                <svg className="w-5 h-5 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {String(agent.email || '')}
              </a>
            </div>

            {/* Social Links */}
            {(agent.facebook || agent.instagram || agent.linkedin || agent.twitter) && (
              <div className="flex space-x-3 pt-4 border-t">
                {agent.facebook && (
                  <a
                    href={String(agent.facebook)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                )}
                {agent.instagram && (
                  <a
                    href={String(agent.instagram)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-pink-100 transition"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z"/>
                    </svg>
                  </a>
                )}
                {agent.linkedin && (
                  <a
                    href={String(agent.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {agent.twitter && (
                  <a
                    href={String(agent.twitter)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-100 transition"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}

            {/* Bio */}
            {agentBio && (
              <div className="mt-6 pt-4 border-t">
                <div className="text-gray-600 text-sm whitespace-pre-line">
                  {agentBio}
                </div>
              </div>
            )}
          </div>
          
          {/* Contact Form */}
          <div className="bg-white rounded-lg p-6 shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">Bilgi Talep Formu</h3>
            <p className="text-gray-600 mb-6">
              Bu proje hakkında detaylı bilgi almak için formu doldurun.
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Adınız Soyadınız"
                  {...register('name', { required: 'Ad Soyad zorunludur' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <input
                  type="email"
                  placeholder="E-posta Adresiniz"
                  {...register('email', {
                    required: 'E-posta zorunludur',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Geçerli bir e-posta adresi giriniz',
                    },
                  })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Telefon Numaranız"
                  {...register('phone', { required: 'Telefon numarası zorunludur' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <textarea
                  rows={4}
                  placeholder={`${propertyTitle} hakkında bilgi almak istiyorum...`}
                  {...register('message', { required: 'Mesaj zorunludur' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {isSubmitting ? 'Gönderiliyor...' : 'Bilgi Talep Et'}
              </button>

              {submitStatus === 'success' && (
                <p className="text-green-600 text-center">
                  Talebiniz başarıyla gönderildi! En kısa sürede sizinle iletişime geçeceğiz.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="text-red-600 text-center">
                  Bir hata oluştu. Lütfen daha sonra tekrar deneyin.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}