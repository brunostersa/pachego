// 🎯 Palavras-chave estratégicas para SEO por cidade
export const getSeoKeywords = (cidade, estado) => {
  const baseKeywords = [
    'frete',
    'mudanças',
    'transporte',
    'carga',
    'entrega',
    'logística',
    'fretes rápidos',
    'mudanças residenciais',
    'transporte de cargas',
    'frete expresso',
    'frete econômico',
    'frete empresarial',
    'frete frágil',
    'mudanças completas',
    'carregadores',
    'equipe de mudanças',
    'transporte seguro',
    'atendimento 24h',
    'orçamento gratuito',
    'Pá-chego',
    'Pá-chego Fretes'
  ];

  // 🗺️ Rotas estratégicas para cada cidade
  const rotasEstrategicas = {
    'GO': {
      'Goiânia': [
        'frete Goiânia até Brasília',
        'frete Goiânia para Anápolis',
        'frete Goiânia até Aparecida de Goiânia',
        'frete Goiânia para Trindade',
        'frete Goiânia até Senador Canedo',
        'mudanças Goiânia para Luziânia',
        'mudanças Goiânia até Rio Verde',
        'transporte Goiânia para Catalão',
        'frete Goiânia até Jataí',
        'mudanças Goiânia para Itumbiara'
      ],
      'Anápolis': [
        'frete Anápolis até Goiânia',
        'frete Anápolis para Brasília',
        'frete Anápolis até Aparecida de Goiânia',
        'mudanças Anápolis para Trindade',
        'transporte Anápolis até Senador Canedo',
        'frete Anápolis para Luziânia',
        'mudanças Anápolis até Rio Verde'
      ],
      'Aparecida de Goiânia': [
        'frete Aparecida de Goiânia até Goiânia',
        'frete Aparecida de Goiânia para Anápolis',
        'mudanças Aparecida de Goiânia até Brasília',
        'transporte Aparecida de Goiânia para Trindade',
        'frete Aparecida de Goiânia até Senador Canedo'
      ],
      'Trindade': [
        'frete Trindade até Goiânia',
        'frete Trindade para Anápolis',
        'mudanças Trindade até Aparecida de Goiânia',
        'transporte Trindade para Brasília',
        'frete Trindade até Senador Canedo'
      ],
      'Senador Canedo': [
        'frete Senador Canedo até Goiânia',
        'frete Senador Canedo para Anápolis',
        'mudanças Senador Canedo até Aparecida de Goiânia',
        'transporte Senador Canedo para Trindade'
      ]
    },
    'DF': {
      'Brasília': [
        'frete Brasília até Goiânia',
        'frete Brasília para Anápolis',
        'mudanças Brasília até Aparecida de Goiânia',
        'transporte Brasília para Trindade',
        'frete Brasília até Senador Canedo',
        'mudanças Brasília para Luziânia',
        'frete Brasília até Taguatinga',
        'transporte Brasília para Ceilândia'
      ],
      'Taguatinga': [
        'frete Taguatinga até Goiânia',
        'frete Taguatinga para Brasília',
        'mudanças Taguatinga até Anápolis',
        'transporte Taguatinga para Aparecida de Goiânia'
      ],
      'Ceilândia': [
        'frete Ceilândia até Goiânia',
        'frete Ceilândia para Brasília',
        'mudanças Ceilândia até Anápolis',
        'transporte Ceilândia para Trindade'
      ]
    },
    'MG': {
      'Uberlândia': [
        'frete Uberlândia até Goiânia',
        'frete Uberlândia para Anápolis',
        'mudanças Uberlândia até Brasília',
        'transporte Uberlândia para Aparecida de Goiânia',
        'frete Uberlândia até Uberaba',
        'mudanças Uberlândia para Araguari'
      ],
      'Uberaba': [
        'frete Uberaba até Goiânia',
        'frete Uberaba para Uberlândia',
        'mudanças Uberaba até Anápolis',
        'transporte Uberaba para Brasília'
      ]
    },
    'SP': {
      'Barretos': [
        'frete Barretos até Goiânia',
        'frete Barretos para Anápolis',
        'mudanças Barretos até Brasília',
        'transporte Barretos para Aparecida de Goiânia',
        'frete Barretos até Franca',
        'mudanças Barretos para Ribeirão Preto'
      ],
      'Franca': [
        'frete Franca até Goiânia',
        'frete Franca para Anápolis',
        'mudanças Franca até Brasília',
        'transporte Franca para Barretos'
      ],
      'Ribeirão Preto': [
        'frete Ribeirão Preto até Goiânia',
        'frete Ribeirão Preto para Anápolis',
        'mudanças Ribeirão Preto até Brasília',
        'transporte Ribeirão Preto para Franca'
      ]
    }
  };

  // 🎯 Palavras-chave específicas por tipo de cidade
  const keywordsPorTipo = {
    'capital': [
      'frete capital',
      'mudanças capital',
      'transporte capital',
      'frete centro',
      'mudanças centro',
      'frete zona sul',
      'frete zona norte',
      'frete zona leste',
      'frete zona oeste'
    ],
    'interior': [
      'frete interior',
      'mudanças interior',
      'transporte interior',
      'frete região',
      'mudanças região',
      'frete cidade pequena',
      'frete cidade média'
    ],
    'metropolitana': [
      'frete região metropolitana',
      'mudanças região metropolitana',
      'transporte metropolitano',
      'frete RMA',
      'mudanças RMA'
    ]
  };

  // 🏙️ Classificar tipo de cidade
  const getTipoCidade = (cidade, estado) => {
    const capitais = ['Goiânia', 'Brasília'];
    const metropolitanas = ['Aparecida de Goiânia', 'Trindade', 'Senador Canedo', 'Taguatinga', 'Ceilândia'];
    
    if (capitais.includes(cidade)) return 'capital';
    if (metropolitanas.includes(cidade)) return 'metropolitana';
    return 'interior';
  };

  // 🎯 Gerar palavras-chave específicas
  const tipoCidade = getTipoCidade(cidade, estado);
  const rotasCidade = rotasEstrategicas[estado]?.[cidade] || [];
  const keywordsTipo = keywordsPorTipo[tipoCidade] || [];

  // 🔗 Combinar todas as palavras-chave
  const keywordsEspecificas = [
    `frete ${cidade}`,
    `mudanças ${cidade}`,
    `transporte ${cidade}`,
    `frete em ${cidade}`,
    `mudanças em ${cidade}`,
    `transporte em ${cidade}`,
    `frete ${cidade} ${estado}`,
    `mudanças ${cidade} ${estado}`,
    `transporte ${cidade} ${estado}`,
    `frete para ${cidade}`,
    `mudanças para ${cidade}`,
    `transporte para ${cidade}`,
    `frete até ${cidade}`,
    `mudanças até ${cidade}`,
    `transporte até ${cidade}`,
    ...rotasCidade,
    ...keywordsTipo
  ];

  return [...baseKeywords, ...keywordsEspecificas];
};

// 📊 Gerar meta description otimizada
export const getMetaDescription = (cidade, estado) => {
  const descriptions = [
    `Frete em ${cidade}, ${estado}. Fretes rápidos e mudanças com +25 anos de experiência. Atendimento em Goiânia e região. Solicite seu orçamento agora.`,
    `Mudanças em ${cidade}, ${estado}. Serviços de fretes rápidos e mudanças residenciais. Equipe confiável e profissional. Nota 5.0 de avaliação.`,
    `Transporte em ${cidade}, ${estado}. Fretes rápidos e mudanças com cuidado total. Atendimento 24h. +25 anos de experiência no mercado.`,
    `Frete para ${cidade}, ${estado}. Serviços de transporte e mudanças com equipe qualificada. Orçamento gratuito. Atendimento personalizado.`,
    `Mudanças para ${cidade}, ${estado}. Fretes rápidos e mudanças residenciais. Equipe de carregadores profissionais. Cuidado total com seus móveis.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

// 🎯 Gerar título otimizado
export const getPageTitle = (cidade, estado) => {
  const titles = [
    `Frete em ${cidade} – Fretes Rápidos e Mudanças | Pá-chego Fretes`,
    `Mudanças em ${cidade}, ${estado} – Transporte e Logística | Pá-chego`,
    `Frete para ${cidade} – Serviços de Transporte | Pá-chego Fretes`,
    `Transporte em ${cidade}, ${estado} – Fretes e Mudanças | Pá-chego`,
    `Frete até ${cidade} – Mudanças Residenciais | Pá-chego Fretes`
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
};

// 🔗 Gerar URLs canônicas otimizadas
export const getCanonicalUrl = (cidade, estado, normalizeText) => {
  const baseUrl = 'https://pachego.com.br';
  const cidadeNormalizada = normalizeText(cidade);
  const estadoLower = estado.toLowerCase();
  
  return `${baseUrl}/fretes/${estadoLower}/${cidadeNormalizada}`;
};

// 🎯 SEO para páginas de estado
export const getEstadoSeoKeywords = (estado) => {
  const baseKeywords = [
    'frete',
    'mudanças',
    'transporte',
    'carga',
    'entrega',
    'logística',
    'fretes rápidos',
    'mudanças residenciais',
    'transporte de cargas',
    'frete expresso',
    'frete econômico',
    'frete empresarial',
    'frete frágil',
    'mudanças completas',
    'carregadores',
    'equipe de mudanças',
    'transporte seguro',
    'atendimento 24h',
    'orçamento gratuito',
    'Pá-chego',
    'Pá-chego Fretes'
  ];

  const estadoKeywords = [
    `frete ${estado}`,
    `mudanças ${estado}`,
    `transporte ${estado}`,
    `frete em ${estado}`,
    `mudanças em ${estado}`,
    `transporte em ${estado}`,
    `frete para ${estado}`,
    `mudanças para ${estado}`,
    `transporte para ${estado}`,
    `frete até ${estado}`,
    `mudanças até ${estado}`,
    `transporte até ${estado}`,
    `frete ${estado} cidades`,
    `mudanças ${estado} cidades`,
    `transporte ${estado} cidades`,
    `frete ${estado} região`,
    `mudanças ${estado} região`,
    `transporte ${estado} região`
  ];

  return [...baseKeywords, ...estadoKeywords];
};

export const getEstadoMetaDescription = (estado, numCidades) => {
  const descriptions = [
    `Frete em ${estado}. Fretes rápidos e mudanças em ${numCidades} cidades com +25 anos de experiência. Atendimento em Goiânia e região. Solicite seu orçamento agora.`,
    `Mudanças em ${estado}. Serviços de fretes rápidos e mudanças residenciais em ${numCidades} cidades. Equipe confiável e profissional. Nota 4.8 de avaliação.`,
    `Transporte em ${estado}. Fretes rápidos e mudanças com cuidado total em ${numCidades} cidades. Atendimento 24h. +25 anos de experiência no mercado.`,
    `Frete para ${estado}. Serviços de transporte e mudanças com equipe qualificada em ${numCidades} cidades. Orçamento gratuito. Atendimento personalizado.`,
    `Mudanças para ${estado}. Fretes rápidos e mudanças residenciais em ${numCidades} cidades. Equipe de carregadores profissionais. Nota 5.0 de avaliação.`
  ];
  
  return descriptions[Math.floor(Math.random() * descriptions.length)];
};

export const getEstadoPageTitle = (estado, numCidades) => {
  const titles = [
    `Frete em ${estado} – Fretes Rápidos e Mudanças | Pá-chego Fretes`,
    `Mudanças em ${estado} – Transporte e Logística | Pá-chego`,
    `Frete para ${estado} – Serviços de Transporte | Pá-chego Fretes`,
    `Transporte em ${estado} – Fretes e Mudanças | Pá-chego`,
    `Frete até ${estado} – Mudanças Residenciais | Pá-chego Fretes`
  ];
  
  return titles[Math.floor(Math.random() * titles.length)];
};

export const getEstadoCanonicalUrl = (estado) => {
  const baseUrl = 'https://pachego.com.br';
  const estadoLower = estado.toLowerCase();
  
  return `${baseUrl}/fretes/estado/${estadoLower}`;
}; 