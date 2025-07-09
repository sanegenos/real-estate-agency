// src/backend/config/plugins.ts
export default ({ env }) => ({
  // Конфиг плагина users-permissions оставляем
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET') || env('ADMIN_JWT_SECRET'),
    },
  },

  // Вынесенный на верхний уровень конфиг upload
  upload: {
    config: {
      provider: 'cloudinary',
      providerOptions: {
        cloud_name: env('CLOUDINARY_NAME'),
        api_key:    env('CLOUDINARY_KEY'),
        api_secret: env('CLOUDINARY_SECRET'),
      },
      actionOptions: {
        upload: { folder: 'real-estate' },
        delete: {},
      },
    },
  },
});
