# CLAUDE.md - Snuggles Pet Boarding Website

Este arquivo serve como ponto de entrada para Claude Code.

**Fonte canônica de documentação: `README.md`**

---

## Visão Geral

Site institucional para Snuggles Pet Boarding, negócio de pet boarding localizado em Melbourne, FL.

| Ambiente | URL |
|----------|-----|
| **Produção** | https://snugglespetboarding.com |
| **Pages Dev** | https://snuggles-website.pages.dev |
| **Repositório** | https://github.com/ajgcvm/snuggles-website |

---

## Stack Técnico

- **Framework**: Astro 5.x
- **Styling**: Tailwind CSS 4.x
- **Hospedagem**: Cloudflare Pages
- **Domínio**: Cloudflare Registrar

---

## Comandos

```bash
# Desenvolvimento
npm run dev      # http://localhost:4321

# Build
npm run build    # Gera ./dist

# Preview build local
npm run preview
```

---

## Deploy

### Produção (Cloudflare Pages)

```bash
npm run build
npx wrangler pages deploy dist --project-name snuggles-website
```

Ou via API (preferido):

```bash
# Build
npm run build

# Upload via API (substitui wrangler)
# Ver seção "Cloudflare API" abaixo
```

---

## Cloudflare API (para Claude Code)

**IMPORTANTE**: Para operações na Cloudflare (DNS, Pages, Workers), use o API Token dedicado. **NÃO use wrangler OAuth**.

### Credenciais

```bash
API_TOKEN="CgzdwwsRXfPOynQIT3cdE1mEZZnSqkz0EaJEcoUI"
ACCOUNT_ID="226d599207c038cce4ad444d568a24db"
TOKEN_ID="0bc5f56d4fec6204743d9617c066d0b0"
```

### Self-Update de Permissões

**Este token tem permissão para adicionar permissões ao próprio token.**

Se uma operação falhar com "Authentication error" ou "Unauthorized":
1. **NÃO peça novo token nem desista**
2. Buscar o permission group ID necessário via API
3. Adicionar ao token usando PUT /user/tokens/{token_id}

```bash
# 1. Listar permission groups disponíveis
curl -s "https://api.cloudflare.com/client/v4/user/tokens/permission_groups" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq '.result[] | select(.name | test("Pages|DNS"; "i")) | {id, name}'

# 2. Obter configuração atual do token
curl -s "https://api.cloudflare.com/client/v4/user/tokens/${TOKEN_ID}" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq '.result.policies'

# 3. Atualizar token com nova permissão (PUT com policies completas)
```

### Exemplos de Uso

```bash
# Listar projetos Pages
curl -s "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq '.result[] | {name, domains: .domains}'

# Listar domínios do projeto
curl -s "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/snuggles-website/domains" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq '.result[] | {name, status}'

# Adicionar custom domain
curl -s -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/pages/projects/snuggles-website/domains" \
  -H "Authorization: Bearer ${API_TOKEN}" \
  -H "Content-Type: application/json" \
  --data '{"name": "exemplo.com"}'

# Criar deployment (upload de arquivos)
# Ver: https://developers.cloudflare.com/pages/platform/direct-upload/
```

### Zone ID (DNS)

```bash
# snugglespetboarding.com
ZONE_ID="18882100bc47b486ff89d2b58a763f47"

# Listar registros DNS
curl -s "https://api.cloudflare.com/client/v4/zones/${ZONE_ID}/dns_records" \
  -H "Authorization: Bearer ${API_TOKEN}" | jq '.result[] | {name, type, content}'
```

---

## Estrutura do Projeto

```
snuggles-website/
├── src/
│   ├── assets/images/     # Fotos do negócio
│   ├── layouts/           # Layout base (Layout.astro)
│   ├── pages/             # Páginas (index.astro)
│   └── styles/            # Tailwind config (global.css)
├── public/                # Assets estáticos
├── dist/                  # Build output
├── astro.config.mjs
└── package.json
```

---

## Informações do Negócio

**Snuggles Pet Boarding**
- Localização: Melbourne, FL 32934 (Brevard County)
- Serviços: Boarding (overnight), Daycare (9am-5pm)
- Diferencial: Farm-style, aceita todos os pets (cães, gatos, aves)
- Instagram: @snugglespetboarding

**Dados Pendentes (solicitar à Anna)**:
- [ ] Preços reais (boarding/noite, daycare/dia)
- [ ] Telefone de contato
- [ ] Endereço completo
- [ ] Mais fotos
- [ ] Horários de drop-off/pick-up
- [ ] Anos de experiência

---

## Relacionados

- **Documentação do projeto**: `/Users/antoniomello/Library/CloudStorage/GoogleDrive-antonio.mello@felhen.com.br/My Drive/projetos/farm-florida/docs/`
- **Plano de implementação**: `plano-implementacao-snuggles.md`
- **Contexto do negócio**: `contexto-projeto.md`

---

*Última atualização: 2026-01-29*
