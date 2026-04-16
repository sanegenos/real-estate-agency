# Real Estate Agency

Monorepo with:
- **frontend**: Next.js 14 (App Router, TypeScript, Tailwind)
- **backend**: Strapi v5 CMS

## Project structure

- `./frontend` — frontend app
- `./backend` — Strapi backend

## Requirements

- Node.js 18+
- npm 9+

## Environment variables

### Frontend (`frontend/.env.local`)

```env
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
```

### Backend

Use `backend/.env.example` as a base and create `.env`.

## Run locally

### 1) Backend (Strapi)

```bash
cd backend
npm ci
npm run develop
```

Backend: `http://localhost:1337`

### 2) Frontend (Next.js)

```bash
cd frontend
npm ci
npm run dev
```

Frontend: `http://localhost:3000`

## Production build

```bash
cd frontend
npm run build
npm run start
```

## Notes

- Frontend navigation uses Next.js router (`useRouter().push`) for SPA behavior.
- Media URL generation and API access use unified variable: `NEXT_PUBLIC_STRAPI_URL`.
- Types are consolidated in `frontend/lib/types/index.ts` (Strapi v5).
