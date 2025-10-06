# 🚛 Pá-chego Fretes

Sistema completo de calculadora de frete online e painel administrativo para a empresa Pá-chego Fretes.

## 🚀 Funcionalidades

### 📊 Calculadora de Frete
- Interface simplificada e intuitiva
- Autocomplete para cidades e setores
- Cálculo baseado em dados locais
- Campos para origem, destino, ajudantes, tamanho da mudança
- Informações sobre tipo de imóvel (casa/apartamento)
- Data desejada para o serviço
- Campo de observações opcional

### 🎛️ Painel Administrativo
- Listagem de todas as solicitações
- Filtros por status (Pendente, Em Andamento, Concluída, Cancelada)
- Contadores por status
- Visualização detalhada de cada solicitação
- Geração de PDF com propostas personalizadas
- Envio automático via WhatsApp
- Atualização de status em tempo real

### 🎨 Design e UX
- Interface moderna com Tailwind CSS
- Design responsivo para todos os dispositivos
- Animações e transições suaves
- Gradientes e efeitos visuais modernos
- Ícones intuitivos e emojis

## 🛠️ Tecnologias

- **Next.js 14** - Framework React
- **React 18** - Biblioteca de interface
- **Tailwind CSS** - Framework de estilos
- **JavaScript ES6+** - Linguagem de programação
- **LocalStorage** - Armazenamento local de dados
- **Vercel** - Plataforma de deploy

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/brunostersa/pachego.git

# Entre no diretório
cd pachego

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

## 🚀 Deploy no Vercel

1. **Conecte o repositório ao Vercel**
2. **Configure as variáveis de ambiente** (opcional)
3. **Deploy automático** a cada push

### Variáveis de Ambiente (Opcionais)
```
NEXT_PUBLIC_APP_URL=https://pachego.vercel.app
NEXT_PUBLIC_APP_NAME=Pá-chego Fretes
NEXT_PUBLIC_WHATSAPP_NUMBER=5562991103510
NEXT_PUBLIC_EMAIL=contato@pachego.com.br
NEXT_PUBLIC_SITE_URL=https://pachego.com.br
```

## 📱 Páginas

- **/** - Página inicial
- **/calculadora** - Calculadora de frete
- **/admin** - Painel administrativo
- **/api/calcular-distancia** - API de cálculo de distância
- **/api/buscar-lugares** - API de busca de lugares

## 🎯 Funcionalidades da Calculadora

### Campos Obrigatórios
- Cidade/Setor de origem
- Cidade/Setor de destino
- Nome completo
- Celular

### Campos Opcionais
- Tipo de ajudantes (empresa/próprios)
- Quantidade de ajudantes (1 ou 2)
- Tamanho da mudança (pequena, média, grande)
- Tipo de imóvel origem (casa/apartamento)
- Andar origem (se apartamento)
- Elevador origem (sim/não)
- Tipo de imóvel destino (casa/apartamento)
- Andar destino (se apartamento)
- Elevador destino (sim/não)
- Data desejada
- Observações

## 🎛️ Funcionalidades do Admin

### Gerenciamento de Solicitações
- Visualizar todas as solicitações
- Filtrar por status
- Ver detalhes completos
- Atualizar status
- Excluir solicitações

### Geração de Propostas
- Criar PDF personalizado
- Incluir todos os dados da solicitação
- Valor da proposta
- Enviar via WhatsApp automaticamente

## 📊 Status das Solicitações

- **⏳ Pendente** - Aguardando análise
- **🔄 Em Andamento** - Proposta enviada
- **✅ Concluída** - Serviço finalizado
- **❌ Cancelada** - Solicitação cancelada

## 🔧 Scripts Disponíveis

```bash
npm run dev      # Desenvolvimento
npm run build    # Build de produção
npm run start    # Servidor de produção
npm run export   # Export estático
```

## 📄 Licença

MIT License - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

**Bruno Stersa**
- GitHub: [@brunostersa](https://github.com/brunostersa)
- Email: brunostersa@gmail.com

## 🚀 Deploy

O projeto está configurado para deploy automático no Vercel. A cada push na branch `main`, o deploy é executado automaticamente.

**URL de Produção**: https://pachego.vercel.app

---

Desenvolvido com ❤️ para Pá-chego Fretes