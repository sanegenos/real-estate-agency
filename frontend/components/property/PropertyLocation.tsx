interface PropertyLocationProps {
  address: string;
  city: string;
  country: string;
  latitude?: number;
  longitude?: number;
}

export default function PropertyLocation({ 
  address, 
  city, 
  country, 
  latitude, 
  longitude 
}: PropertyLocationProps) {
  // Default coordinates if not provided (Antalya center)
  const lat = latitude || 36.8969;
  const lng = longitude || 30.7133;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Map - Left Side */}
      <div className="order-2 lg:order-1">
        <div className="h-[400px] bg-gray-200 rounded-lg overflow-hidden">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM40zMCcwMC4wIk4gMjjCsDI0JzAwLjAiRQ!5e0!3m2!1sen!2s!4v1234567890`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>

      {/* Address Info - Right Side */}
      <div className="order-1 lg:order-2">
        <div className="bg-white rounded-lg p-6 h-full">
          <h3 className="text-2xl font-bold mb-6">Adres Bilgileri</h3>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Tam Adres</h4>
              <p className="text-lg">{address}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Şehir</h4>
              <p className="text-lg">{city}</p>
            </div>
            
            <div>
              <h4 className="text-sm text-gray-600 mb-1">Ülke</h4>
              <p className="text-lg">{country}</p>
            </div>

            {latitude && longitude && (
              <div>
                <h4 className="text-sm text-gray-600 mb-1">Koordinatlar</h4>
                <p className="text-lg">{lat.toFixed(6)}, {lng.toFixed(6)}</p>
              </div>
            )}
          </div>

          <div className="mt-6 pt-6 border-t">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-600 hover:text-blue-700"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Google Maps'te Görüntüle
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}