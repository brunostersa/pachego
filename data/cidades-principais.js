// Dados específicos para cidades principais de Goiás
export const cidadesPrincipais = {
  'goiania': {
    nome: 'Goiânia',
    estado: 'GO',
    areasAtendidas: [
      'Setor Central', 'Setor Oeste', 'Setor Leste', 'Setor Sul', 'Setor Norte',
      'Setor Bueno', 'Marista', 'Jardim América', 'Campinas', 'Bairro da Vitória',
      'Conjunto Vera Cruz', 'Setor Garavelo', 'Jardim dos Buritis', 'Vila São João'
    ],
    servicosEspeciais: [
      'Frete Rápido em até 24h',
      'Mudanças Residenciais Completas',
      'Frete Frágil com Cuidado Especial',
      'Frete Empresarial',
      'Frete Econômico'
    ],
    vantagens: [
      '+25 anos de experiência em Goiânia',
      'Conhecimento profundo da cidade',
      'Equipe local especializada',
      'Atendimento personalizado'
    ],
    descricao: 'Mudanças residenciais e fretes rápidos em Goiânia e região metropolitana com +25 anos de experiência.',
    keywords: 'frete Goiânia, mudanças Goiânia, frete rápido Goiânia, mudanças residenciais Goiânia, transporte Goiânia'
  },
  'aparecida-de-goiania': {
    nome: 'Aparecida de Goiânia',
    estado: 'GO',
    areasAtendidas: [
      'Centro', 'Jardim Olímpico', 'Vila São José', 'Jardim Buriti Sereno',
      'Setor Central', 'Jardim América', 'Vila União', 'Jardim Nova Era',
      'Setor Garavelo', 'Jardim dos Buritis', 'Vila São João', 'Jardim Nova Esperança'
    ],
    servicosEspeciais: [
      'Frete Rápido em até 24h',
      'Mudanças Residenciais Completas',
      'Frete Frágil com Cuidado Especial',
      'Frete Empresarial',
      'Frete Econômico'
    ],
    vantagens: [
      '+25 anos de experiência na região',
      'Conhecimento profundo da cidade',
      'Equipe local especializada',
      'Atendimento personalizado'
    ],
    descricao: 'Mudanças residenciais e fretes rápidos em Aparecida de Goiânia e região metropolitana com +25 anos de experiência.',
    keywords: 'frete Aparecida de Goiânia, mudanças Aparecida de Goiânia, frete rápido Aparecida de Goiânia, mudanças residenciais Aparecida de Goiânia, transporte Aparecida de Goiânia'
  },
  'senador-canedo': {
    nome: 'Senador Canedo',
    estado: 'GO',
    areasAtendidas: [
      'Centro', 'Jardim das Américas', 'Setor Central', 'Jardim Nova Esperança',
      'Vila São José', 'Jardim Buriti Sereno', 'Setor Garavelo', 'Jardim Nova Era',
      'Vila União', 'Jardim dos Buritis', 'Vila São João', 'Jardim Nova Esperança'
    ],
    servicosEspeciais: [
      'Frete Rápido em até 24h',
      'Mudanças Residenciais Completas',
      'Frete Frágil com Cuidado Especial',
      'Frete Empresarial',
      'Frete Econômico'
    ],
    vantagens: [
      '+25 anos de experiência na região',
      'Conhecimento profundo da cidade',
      'Equipe local especializada',
      'Atendimento personalizado'
    ],
    descricao: 'Mudanças residenciais e fretes rápidos em Senador Canedo e região metropolitana com +25 anos de experiência.',
    keywords: 'frete Senador Canedo, mudanças Senador Canedo, frete rápido Senador Canedo, mudanças residenciais Senador Canedo, transporte Senador Canedo'
  },
  'trindade': {
    nome: 'Trindade',
    estado: 'GO',
    areasAtendidas: [
      'Centro', 'Jardim das Américas', 'Setor Central', 'Jardim Nova Esperança',
      'Vila São José', 'Jardim Buriti Sereno', 'Setor Garavelo', 'Jardim Nova Era',
      'Vila União', 'Jardim dos Buritis', 'Vila São João', 'Jardim Nova Esperança'
    ],
    servicosEspeciais: [
      'Frete Rápido em até 24h',
      'Mudanças Residenciais Completas',
      'Frete Frágil com Cuidado Especial',
      'Frete Empresarial',
      'Frete Econômico'
    ],
    vantagens: [
      '+25 anos de experiência na região',
      'Conhecimento profundo da cidade',
      'Equipe local especializada',
      'Atendimento personalizado'
    ],
    descricao: 'Mudanças residenciais e fretes rápidos em Trindade e região metropolitana com +25 anos de experiência.',
    keywords: 'frete Trindade, mudanças Trindade, frete rápido Trindade, mudanças residenciais Trindade, transporte Trindade'
  },
  'goianira': {
    nome: 'Goianira',
    estado: 'GO',
    areasAtendidas: [
      'Centro', 'Jardim das Américas', 'Setor Central', 'Jardim Nova Esperança',
      'Vila São José', 'Jardim Buriti Sereno', 'Setor Garavelo', 'Jardim Nova Era',
      'Vila União', 'Jardim dos Buritis', 'Vila São João', 'Jardim Nova Esperança'
    ],
    servicosEspeciais: [
      'Frete Rápido em até 24h',
      'Mudanças Residenciais Completas',
      'Frete Frágil com Cuidado Especial',
      'Frete Empresarial',
      'Frete Econômico'
    ],
    vantagens: [
      '+25 anos de experiência na região',
      'Conhecimento profundo da cidade',
      'Equipe local especializada',
      'Atendimento personalizado'
    ],
    descricao: 'Mudanças residenciais e fretes rápidos em Goianira e região metropolitana com +25 anos de experiência.',
    keywords: 'frete Goianira, mudanças Goianira, frete rápido Goianira, mudanças residenciais Goianira, transporte Goianira'
  }
}

// Função para obter dados de uma cidade principal
export function getCidadePrincipal(cidadeNormalizada) {
  return cidadesPrincipais[cidadeNormalizada] || null
}

// Função para verificar se uma cidade é principal
export function isCidadePrincipal(cidadeNormalizada) {
  return cidadeNormalizada in cidadesPrincipais
}
