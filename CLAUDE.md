# CLAUDE.md

## Projeto

Site institucional Snuggles Pet Boarding - https://snugglespetboarding.com

## Comandos

```bash
npm run dev       # Desenvolvimento (localhost:4321)
npm run build     # Build para ./dist
```

## Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name snuggles-website
```

## Cloudflare API

Usar API Token para operações Cloudflare. **Não usar wrangler OAuth.**

```bash
API_TOKEN="CgzdwwsRXfPOynQIT3cdE1mEZZnSqkz0EaJEcoUI"
ACCOUNT_ID="226d599207c038cce4ad444d568a24db"
ZONE_ID="18882100bc47b486ff89d2b58a763f47"  # snugglespetboarding.com
```

**Se der erro de permissão**: O token pode adicionar permissões a si mesmo. Não peça novo token - adicione a permissão via API.

```bash
# Listar permission groups
curl -s "https://api.cloudflare.com/client/v4/user/tokens/permission_groups" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq '.result[] | {id, name}'

# Ver token atual
curl -s "https://api.cloudflare.com/client/v4/user/tokens/0bc5f56d4fec6204743d9617c066d0b0" \
  -H "Authorization: Bearer ${API_TOKEN}"
```

## Estrutura

```
src/
├── assets/images/   # Fotos
├── layouts/         # Layout.astro
├── pages/           # index.astro
└── styles/          # global.css
```

## Contexto

Documentação do negócio em:
`/Users/antoniomello/Library/CloudStorage/GoogleDrive-antonio.mello@felhen.com.br/My Drive/projetos/farm-florida/docs/`
