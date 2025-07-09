module.exports = [
  'strapi::logger',
  'strapi::errors',
  {
    // заменяем простую строку на объект с конфигом CSP
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src':     ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          'media-src':   ["'self'", 'data:', 'blob:', 'res.cloudinary.com'],
          // остальное оставляем по умолчанию/или расширяем по необходимости
          upgradeInsecureRequests: null,
        },
      },
    },
  },
  {
    name: 'strapi::cors',
    config: {
      origin: [
        'http://localhost:3000', // локальная разработка
        'https://real-estate-agency-six.vercel.app', // Vercel домен
        'https://*.vercel.app', // все поддомены Vercel (для preview deployments)
      ],
      credentials: true,
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'HEAD', 'OPTIONS'],
    },
  },
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];