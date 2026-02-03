# Snuggles Pet Boarding - Frontend

Website e área do cliente para Snuggles Pet Boarding (Melbourne, FL).

## Stack

- **Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript
- **Styling**: Tailwind CSS 4.x
- **State**: Zustand (booking wizard)
- **Data Fetching**: TanStack Query
- **Auth**: Google OAuth (via backend API)
- **Analytics**: Vercel Analytics
- **Deploy**: Vercel

## Estrutura

```
src/
├── app/
│   ├── layout.tsx           # Root layout + Analytics
│   ├── page.tsx             # Home (/)
│   ├── book/page.tsx        # Booking wizard
│   ├── login/page.tsx       # Login com Google
│   ├── auth/callback/       # OAuth callback
│   ├── my-account/page.tsx  # Área do cliente
│   ├── admin/page.tsx       # Admin dashboard
│   ├── gallery/page.tsx     # Galeria de fotos
│   └── prepare/page.tsx     # Guia de preparação
├── components/
│   ├── ui/                  # Button, Input, Modal, Badge
│   ├── layout/              # Header, Footer
│   └── booking/             # Wizard steps
├── lib/
│   ├── api.ts               # Cliente API + auth helpers
│   └── constants.ts         # Blocked breeds, config
├── stores/
│   └── bookingStore.ts      # Zustand store
└── types/
    └── index.ts             # TypeScript types
```

## Desenvolvimento

```bash
# Instalar dependências
npm install

# Rodar dev server
npm run dev

# Build
npm run build

# Lint
npm run lint
```

## Environment Variables

Criar `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://denboard-booking-api.felhen.workers.dev
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-google-client-id
```

## Autenticação

O sistema usa Google OAuth unificado para todos os usuários:

1. **Login**: Usuário clica "Sign in with Google"
2. **OAuth**: Redirect para Google, depois para `/auth/callback`
3. **Backend**: Troca código por token JWT com role
4. **Frontend**: Armazena JWT no localStorage

### Roles

| Role | Acesso |
|------|--------|
| `owner` | Admin dashboard + área do cliente |
| `employee` | Admin dashboard + área do cliente |
| `client` | Área do cliente apenas |

O Header mostra automaticamente "Admin Dashboard" para owners/employees.

## Páginas

| Rota | Descrição | Auth |
|------|-----------|------|
| `/` | Landing page | Público |
| `/book` | Booking wizard | Público |
| `/login` | Login com Google | Público |
| `/my-account` | Pets e bookings do usuário | Requer login |
| `/admin` | Dashboard administrativo | Requer owner/employee |
| `/gallery` | Galeria de fotos | Público |
| `/prepare` | Guia de preparação | Público |

## Deploy

O deploy é automático via Vercel:

1. Push para `main` → Vercel detecta e faz deploy
2. PRs geram preview deployments

### Domínio

- **Produção**: https://snugglespetboarding.com
- **Preview**: https://snuggles-website-*.vercel.app

## Backend

O backend é um Cloudflare Worker separado:
- **Repo**: [denboard](https://github.com/ajgcvm/denboard)
- **API**: https://denboard-booking-api.felhen.workers.dev

## Links

- [Backend API (DenBoard)](https://github.com/ajgcvm/denboard)
- [Vercel Dashboard](https://vercel.com)
- [ADR: RBAC](https://github.com/ajgcvm/denboard/blob/main/docs/adr/001-unified-authentication-rbac.md)
