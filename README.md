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

## Concluído

- [x] Preços (range por categoria)
- [x] Telefone: (954) 907-7750
- [x] Endereço: 4253 Pinewood Rd, Melbourne, FL
- [x] Galeria com fotos reais
- [x] Horários: 9am-5pm
- [x] Página /prepare (checklists, vacinas, políticas)
- [x] Mapa satélite
- [x] Integração Rover (Book Now)
- [x] Payment Policy (Zelle, Venmo, Apple Pay, PayPal)
- [x] Cancellation Policy

## Roadmap

- [ ] Botão WhatsApp no hero ("Book directly with us")
- [ ] Adicionar logo no header
- [ ] Calendly para Meet & Greet (aguardando Anna criar conta)
- [ ] Favicon com logo
- [ ] Commit no GitHub

## Assets Disponíveis

Logos salvos em `src/assets/images/`:
- `logo-snuggles-farm.jpg` - Logo ilustrado (celeiro + cachorros)
- `logo-snuggles-boarding.jpg` - Logo colorido (animais diversos)
- `logo-caipirinha-farm.jpg` - Logo Caipirinha Farm
