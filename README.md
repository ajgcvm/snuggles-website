# Snuggles Pet Boarding - Website

Site institucional para Snuggles Pet Boarding (Melbourne, FL).

## URLs

| Ambiente | URL |
|----------|-----|
| Produção | https://snugglespetboarding.com |
| Pages Dev | https://snuggles-website.pages.dev |

## Stack

- Astro 5.x + Tailwind CSS 4.x
- Cloudflare Pages (hospedagem)
- Cloudflare Registrar (domínio)

## Desenvolvimento

```bash
npm install
npm run dev     # http://localhost:4321
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name snuggles-website
```

## Estrutura

```
src/
├── assets/images/   # Fotos
├── layouts/         # Layout.astro
├── pages/           # index.astro (single page)
└── styles/          # global.css (Tailwind)
```

## Seções do Site

- Hero (foto + CTA)
- Services (Boarding, Daycare)
- Why Us (diferenciais)
- Gallery
- About
- Contact

## Pendente

- [ ] Preços reais
- [ ] Telefone
- [ ] Endereço completo
- [ ] Mais fotos
- [ ] Horários corretos
