# CIR Gráfica - Site SEO Local

Site otimizado para SEO local da CIR Gráfica, focado em gerar páginas para busca de termos como "gráfica + nome da cidade".

## 🚀 Funcionalidades

### ✅ Implementado
- **100 páginas de cidade** otimizadas para SEO
- **Páginas de estado** que listam todas as cidades
- **Sitemap.xml dinâmico** com todas as URLs
- **Robots.txt** configurado para indexação
- **Meta tags completas** (OpenGraph, Twitter Cards)
- **Schema.org JSON-LD** (LocalBusiness)
- **Design premium** com Tailwind CSS
- **CTAs otimizados** para conversão
- **Layout responsivo** para mobile

### 📊 SEO Implementado
- Meta tags otimizadas para cada cidade
- Schema.org LocalBusiness com serviceArea
- OpenGraph para redes sociais
- URLs canônicas
- Geo meta tags
- Sitemap automático
- Robots.txt configurado

## 🏗️ Estrutura do Projeto

```
CIR/
├── pages/
│   ├── grafica/
│   │   ├── [cidade].js          # Páginas de cidade
│   │   └── estado/
│   │       └── [estado].js      # Páginas de estado
│   ├── sitemap.xml.js           # Sitemap dinâmico
│   └── index.js                 # Página inicial
├── components/
│   ├── Header.js               # Header premium
│   └── Footer.js               # Footer com informações
├── public/
│   └── robots.txt              # Robots.txt
├── cidades.json                # Dados das 100 cidades
└── README.md                   # Este arquivo
```

## 🚀 Hospedagem Recomendada

### 1. Vercel (Recomendado)
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel

# Configurar domínio personalizado
vercel domains add cirgrafica.com.br
```

**Vantagens:**
- ✅ Deploy automático do GitHub
- ✅ SSL gratuito
- ✅ CDN global
- ✅ Performance otimizada
- ✅ Integração nativa com Next.js

### 2. Netlify
```bash
# Build
npm run build

# Deploy via Netlify CLI ou drag & drop da pasta .next
```

### 3. Servidor Próprio
```bash
# Build para produção
npm run build
npm start

# Usar PM2 para gerenciar processo
pm2 start npm --name "cir-grafica" -- start
```

## 📈 Escalabilidade

### Adicionar Novas Cidades
1. Editar `cidades.json`
2. Adicionar nova cidade:
```json
{
  "cidade": "Nova Cidade",
  "estado": "GO"
}
```
3. Deploy automático (Vercel) ou manual

### Performance
- **Static Generation**: Todas as páginas são geradas em build time
- **CDN**: Distribuição global de conteúdo
- **Lazy Loading**: Imagens e componentes otimizados
- **Caching**: Headers de cache configurados

### Monitoramento
- Google Search Console
- Google Analytics
- Core Web Vitals
- PageSpeed Insights

## 🎯 Estratégia SEO

### Palavras-chave Alvo
- "gráfica [cidade]"
- "impressão digital [cidade]"
- "banners [cidade]"
- "brindes personalizados [cidade]"
- "comunicação visual [cidade]"

### Estrutura de URLs
- `/grafica/goiania`
- `/grafica/sao-paulo`
- `/grafica/estado/goias`
- `/grafica/estado/sao-paulo`

### Schema.org
- LocalBusiness com serviceArea
- OfferCatalog com serviços
- GeoCoordinates
- OpeningHours

## 🔧 Configuração

### Variáveis de Ambiente
```env
NEXT_PUBLIC_SITE_URL=https://cirgrafica.com.br
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

### Scripts Disponíveis
```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Servidor de produção
npm run export       # Export estático (opcional)
```

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Tablet**: Layout adaptativo
- **Desktop**: Layout completo
- **Acessibilidade**: WCAG 2.1 AA

## 🎨 Design System

### Cores
- **Preto**: #000000 (Header, Footer)
- **Branco**: #FFFFFF (Background)
- **Verde**: #16A34A (CTAs)
- **Cinza**: #6B7280 (Texto secundário)

### Tipografia
- **Títulos**: Inter, sans-serif
- **Corpo**: Inter, sans-serif
- **Hierarquia**: H1 (4xl), H2 (2xl), H3 (xl)

## 📊 Métricas de Sucesso

### SEO
- Posicionamento para "gráfica [cidade]"
- Tráfego orgânico crescente
- Taxa de cliques (CTR)
- Tempo na página

### Conversão
- Cliques nos CTAs
- Downloads do portfólio
- Solicitações de orçamento
- Contatos via telefone/email

## 🔄 Atualizações

### Semanais
- Verificar posicionamento no Google
- Analisar métricas de performance
- Otimizar meta descriptions

### Mensais
- Adicionar novas cidades
- Atualizar conteúdo
- Revisar Schema.org

### Trimestrais
- Análise completa de SEO
- Otimização de performance
- Atualização de design

## 📞 Suporte

Para dúvidas ou suporte técnico:
- **Email**: atendimento@cirgrafica.com.br
- **Telefone**: (62) 3202-1150

---

**CIR Gráfica** - Especialistas em impressão digital e comunicação visual 