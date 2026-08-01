/**
 * 🌟 DADOS REAIS - Template para integração de scraper
 *
 * Este arquivo será preenchido com dados REAIS quando o scraper terminar.
 *
 * Estrutura:
 * {
 *   'cidade-normalizada': [
 *     {
 *       id: 'uf-001',
 *       nome: 'Nome Empresa',
 *       rating: 4.8,
 *       reviews: 245,
 *       tipos: ['mudanças', 'frete-rapido'],
 *       descricao: 'Descrição real',
 *       whatsapp: '11987654321',
 *       telefone: '(11) 3456-7890',
 *       disponivel: true,
 *       destaque: false,
 *       fonte: 'Google Maps | Trustpilot | Facebook',
 *       url: 'link público'
 *     }
 *   ]
 * }
 */

export const realWorldData = {
  // Será preenchido automaticamente pelo scraper-integrator.js
  // Agora contém dados de demo
};

/**
 * Busca profissionais reais de uma cidade
 * @param {string} cityNormalized - Cidade normalizada (ex: 'sao-paulo')
 * @returns {Array} Lista de profissionais ordenados por rating
 */
export function getProfissionaisRealCity(cityNormalized) {
  return (realWorldData[cityNormalized] || [])
    .sort((a, b) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return b.rating - a.rating;
    });
}

/**
 * Retorna top 5 profissionais reais
 */
export function getTop5RealCity(cityNormalized) {
  return getProfissionaisRealCity(cityNormalized).slice(0, 5);
}

/**
 * Retorna estatísticas dos dados reais
 */
export function getStatsRealData() {
  const allProfs = Object.values(realWorldData).flat();

  if (allProfs.length === 0) {
    return {
      status: 'aguardando',
      mensagem: 'Dados reais ainda não foram carregados',
      totalCidades: 0,
      totalProfissionais: 0,
    };
  }

  const ratings = allProfs.map(p => p.rating);
  const avgRating = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);

  return {
    status: 'ativo',
    dataAtualizacao: new Date().toISOString(),
    totalCidades: Object.keys(realWorldData).length,
    totalProfissionais: allProfs.length,
    ratingMedio: parseFloat(avgRating),
    ratingMinimo: Math.min(...ratings).toFixed(2),
    ratingMaximo: Math.max(...ratings).toFixed(2),
    reviewsTotal: allProfs.reduce((sum, p) => sum + p.reviews, 0),
    reviewsMedia: Math.round(
      allProfs.reduce((sum, p) => sum + p.reviews, 0) / allProfs.length
    ),
    empresasComHighRating: allProfs.filter(p => p.rating >= 4.8).length,
    fontesData: [...new Set(allProfs.map(p => p.fonte))],
  };
}

/**
 * Busca empresa por nome
 */
export function searchCompanyByName(name) {
  const normalized = name.toLowerCase().trim();
  const allProfs = Object.values(realWorldData).flat();

  return allProfs.filter(p =>
    p.nome.toLowerCase().includes(normalized)
  );
}

/**
 * Busca empresas por rating mínimo
 */
export function searchByRating(minRating = 4.5) {
  const allProfs = Object.values(realWorldData).flat();
  return allProfs.filter(p => p.rating >= minRating);
}

/**
 * Busca empresas por tipo de serviço
 */
export function searchByServiceType(serviceType) {
  const allProfs = Object.values(realWorldData).flat();
  return allProfs.filter(p => p.tipos.includes(serviceType));
}

/**
 * Retorna empresas por estado
 */
export function getByState(estado) {
  const allProfs = Object.values(realWorldData).flat();
  return allProfs.filter(p => p.id.startsWith(estado.toLowerCase()));
}

/**
 * Log de atualização
 */
export const LOG_ATUALIZACOES = [
  {
    data: new Date().toISOString(),
    acao: 'Criação do template',
    status: 'Aguardando dados do scraper',
  },
];

export function addUpdateLog(acao, status = 'sucesso') {
  LOG_ATUALIZACOES.push({
    data: new Date().toISOString(),
    acao,
    status,
  });
}
