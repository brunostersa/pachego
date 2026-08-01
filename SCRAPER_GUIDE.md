# 🔍 Guia do Scraper de Fretes

## Visão Geral

Sistema de scraping ético para coletar dados REAIS de empresas de frete/mudanças bem avaliadas em todo o Brasil.

**Fontes Permitidas:**
- ✅ Google Maps (dados públicos)
- ✅ Trustpilot (reviews públicas)
- ✅ Facebook (avaliações públicas)
- ✅ Google Reviews
- ✅ TripAdvisor (para serviços)

**Fontes NÃO Permitidas:**
- ❌ Dados com copyright
- ❌ Scraping de JavaScript renderizado
- ❌ APIs privadas sem permissão
- ❌ Dados pessoais (CPF, endereço particular, etc)

---

## Arquitetura

```
Agent (Web Search) → Encontra empresas
         ↓
Scraper Python → Extrai dados públicos
         ↓
Integrator JS → Formata para projeto
         ↓
Database → realWorldData.js
         ↓
Next.js Pages → Renderiza com dados reais
```

---

## Como Usar

### 1️⃣ **Agent (Busca Web)**

O agent já está funcionando em background buscando dados de:
- 15 principais cidades brasileiras
- Empresas com 4.5+ rating
- 100+ reviews (confiabilidade)

**Status:** Agent rodando → resultados chegam em ~30min

### 2️⃣ **Processar Dados do Agent**

Quando o agent terminar, ele retorna JSON:

```bash
# O arquivo JSON será gerado automaticamente
# Então integrar com:

node scripts/scraper-integrator.js scraped_data.json data/realWorldData.js
```

### 3️⃣ **Usar Scraper Python (Futuro)**

Para rodar scraping manual:

```bash
# Instalar dependências
pip install requests beautifulsoup4 selenium google-search-results

# Scraper um estado
python3 scripts/scraper-fretes.py --state SP

# Scraper uma cidade
python3 scripts/scraper-fretes.py --city "São Paulo" SP

# Scraper tudo
python3 scripts/scraper-fretes.py --all
```

---

## Estrutura de Dados Retornado

### Agent/Scraper Output

```json
{
  "data_coleta": "2026-07-31T15:30:00Z",
  "fonte": "Google Maps, Trustpilot",
  "cidades": [
    {
      "cidade": "São Paulo",
      "estado": "SP",
      "profissionais": [
        {
          "nome": "Mudanças Express SP",
          "rating": 4.9,
          "reviews": 342,
          "fonte": "Google Maps",
          "url": "https://maps.google.com/...",
          "tipos": ["mudanças", "frete-rapido"],
          "descricao": "Mudanças residenciais com 15+ anos",
          "telefone": "(11) 3456-7890",
          "whatsapp": "11987654321"
        }
      ]
    }
  ]
}
```

### Formato do Projeto (realWorldData.js)

```javascript
export const realWorldData = {
  'sao-paulo': [
    {
      id: 'sp-001',
      nome: 'Mudanças Express SP',
      rating: 4.9,
      reviews: 342,
      tipos: ['mudanças', 'frete-rapido'],
      descricao: 'Mudanças residenciais com 15+ anos',
      whatsapp: '11987654321',
      telefone: '(11) 3456-7890',
      disponivel: true,
      destaque: false,
      fonte: 'Google Maps',
      url: 'https://maps.google.com/...'
    }
  ]
}
```

---

## Integração com Next.js

Depois que os dados estão em `realWorldData.js`, usar:

```javascript
// pages/fretes/cidade/[estado]/[cidade].js

import { getTop5RealCity } from '../../../data/realWorldData'

export async function getStaticProps({ params }) {
  const { estado, cidade } = params
  
  // Tenta dados reais primeiro
  const realProfissionais = getTop5RealCity(cidade)
  
  // Fallback para dados de demo se não encontrar
  const profissionais = realProfissionais.length > 0 
    ? realProfissionais 
    : getFallbackProfissionais(cidade)
  
  return { props: { profissionais }, revalidate: 3600 }
}
```

---

## Validação de Qualidade

Cada empresa precisa passar por:

```javascript
function validateCompany(company) {
  // Rating >= 4.5
  if (company.rating < 4.5) return false;
  
  // Reviews >= 50 (mínimo)
  if (company.reviews < 50) return false;
  
  // Telefone ou WhatsApp válidos
  if (!company.telefone && !company.whatsapp) return false;
  
  // Descrição presente
  if (!company.descricao) return false;
  
  return true;
}
```

---

## APIs Recomendadas (Futuro)

Se quiser automação total, usar:

### 1. Google Places API
```javascript
// Busca empresas por categoria
const places = await google.places.textSearch({
  query: 'frete mudanças em São Paulo',
  rating: 4.5
})
```

### 2. Trustpilot API
```javascript
// Reviews verificadas
const reviews = await trustpilot.search({
  query: 'empresa nome',
  country: 'BR'
})
```

### 3. Serper.dev (Google Search)
```javascript
// Resultados de busca com ratings
const results = await serper.search({
  q: 'melhor frete em São Paulo avaliações',
  type: 'search'
})
```

---

## Workflow Completo

```
Dia 1: Agent busca dados
  ↓
Dia 2: Integrar dados com script
  ↓
Dia 3: Testar páginas com dados reais
  ↓
Dia 4: Deploy com dados reais
  ↓
Dia 5+: Dados se atualizam via ISR (3600s)
```

---

## Status Atual

```
✅ Agent em background: Buscando empresas reais
✅ Integrator pronto: scripts/scraper-integrator.js
✅ Scraper Python pronto: scripts/scraper-fretes.py
⏳ Dados do agent: Chegam em ~30min
```

---

## Próximos Passos

1. **Quando agent terminar**: Processar com integrator
2. **Testar com dados reais**: Verificar páginas
3. **Deploy**: Fazer push com dados reais
4. **Monitor**: Acompanhar performance

---

**Perguntas?** Consulte o arquivo `DATA_SUMMARY.md`
