# Configuração do Google Maps API

Para usar o serviço completo de busca de lugares e cálculo de distância, você precisa configurar a Google Maps API.

## 1. Criar Projeto no Google Cloud Console

1. Acesse [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a faturação para o projeto

## 2. Habilitar APIs Necessárias

Habilite as seguintes APIs:
- **Places API** - Para busca de lugares
- **Distance Matrix API** - Para cálculo de distância

## 3. Criar Chave de API

1. Vá para "Credenciais" no menu lateral
2. Clique em "Criar Credenciais" > "Chave de API"
3. Copie a chave gerada

## 4. Configurar Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```bash
GOOGLE_MAPS_API_KEY=sua_chave_aqui
```

## 5. Restringir a Chave (Recomendado)

Para segurança, restrinja a chave:
- **Restrições de aplicativo**: HTTP referrers
- **Restrições de API**: Places API, Distance Matrix API

## 6. Testar a Configuração

Após configurar, o sistema irá:
- ✅ Buscar lugares reais do Google Maps
- ✅ Calcular distâncias precisas
- ✅ Mostrar avaliações e informações detalhadas
- ⚠️ Usar dados simulados como fallback se a API falhar

## Custos

- **Places API**: ~$0.017 por 1000 requisições
- **Distance Matrix API**: ~$0.005 por 1000 requisições

Para uso moderado, os custos são muito baixos.
