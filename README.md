# Silpagar Grup — Real Estate Agency

Full-stack real estate platform built with **Next.js 14** (frontend) and **Strapi v5** (backend/CMS).

---

## Stack

| Layer    | Technology                          |
|----------|-------------------------------------|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend  | Strapi v5 (Node.js CMS)             |
| Database | SQLite (dev) / PostgreSQL (prod)    |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

---

### Backend (Strapi)

```bash
cd backend
cp .env.example .env   # fill in values
npm install
npm run develop        # starts on http://localhost:1337
```

Key `.env` variables (see `backend/.env.example`):

| Variable | Description |
|---|---|
| `HOST` | Strapi host (default `0.0.0.0`) |
| `PORT` | Strapi port (default `1337`) |
| `APP_KEYS` | Comma-separated app key list |
| `API_TOKEN_SALT` | Salt for API tokens |
| `ADMIN_JWT_SECRET` | Secret for admin JWT |
| `JWT_SECRET` | Secret for user JWT |

---

### Frontend (Next.js)

```bash
cd frontend
cp .env.example .env.local   # fill in values
npm install
npm run dev                   # starts on http://localhost:3000
```

Key `.env.local` variables (see `frontend/.env.example`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | Full URL of the Strapi backend (e.g. `http://localhost:1337`) |

---

## Project Structure

```
real-estate-agency/
├── backend/          # Strapi v5 CMS
│   ├── config/       # Server, DB, plugins config
│   └── src/
│       └── api/      # Content types: property, agent, post, feature, page
└── frontend/         # Next.js 14 app
    ├── app/          # App Router pages
    ├── components/   # UI components
    └── lib/
        ├── api/      # API client & data-fetching helpers
        └── types/    # Shared TypeScript types (Strapi v5)
```

---

## Content Types (Strapi)

- **Property** — real estate listings (sale / rent)
- **Agent** — agency staff profiles
- **Feature** — property amenities / features
- **Post** — blog posts
- **Page** — static pages

---

## Available Scripts

### Backend

| Command | Description |
|---|---|
| `npm run develop` | Start in development mode with auto-reload |
| `npm run start` | Start in production mode |
| `npm run build` | Build the admin panel |

### Frontend

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Deployment

The project includes a `render.yaml` file for one-click deployment to [Render](https://render.com).

1. Fork/clone the repository
2. Connect it to Render
3. Set the required environment variables in the Render dashboard
4. Deploy both services (backend + frontend)
