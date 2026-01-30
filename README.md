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

- Hero (foto + CTA + rating badge)
- Services (Boarding, Daycare)
- Why Us (diferenciais)
- Testimonials (6 reviews do Rover)
- Gallery (6 fotos + link para /gallery)
- About
- Contact

## Páginas

- `/` - Home (single page com todas as seções)
- `/prepare` - Checklists, vacinas, políticas
- `/gallery` - 40 fotos com lazy loading

## Concluído

- [x] Preços (range por categoria)
- [x] Telefone: (954) 907-7750
- [x] Endereço: 4253 Pinewood Rd, Melbourne, FL
- [x] Galeria com fotos reais
- [x] Horários: 9am-5pm
- [x] Página /prepare (checklists, vacinas, políticas)
- [x] Mapa satélite
- [x] Integração Rover (Book Now)
- [x] Payment Policy (Zelle, Apple Pay, PayPal)
- [x] Cancellation Policy
- [x] Logo no header
- [x] Favicon com logo
- [x] Calendly para Meet & Greet
- [x] Testimonials (6 reviews selecionados do Rover)
- [x] Rating badge (5.0 ★ · 210+ reviews)
- [x] Página /gallery com 40 fotos + lazy loading

## Roadmap

- [ ] Botão WhatsApp no hero ("Book directly with us")
- [ ] FAQ section (coletar perguntas frequentes)

## Assets Disponíveis

Logos salvos em `src/assets/images/`:
- `logo-expanded.svg` - Logo expandido (usado no header)
- `logo-snuggles-farm.jpg` - Logo ilustrado (celeiro + cachorros)
- `logo-snuggles-boarding.jpg` - Logo colorido (animais diversos)
- `logo-caipirinha-farm.jpg` - Logo Caipirinha Farm
