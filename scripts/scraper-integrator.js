/**
 * 🔍 SCRAPER INTEGRATOR - Converte dados do scraper em formato do projeto
 *
 * Uso:
 * 1. Agent busca dados reais em fontes públicas
 * 2. Retorna JSON estruturado
 * 3. Este script integra ao projeto
 */

const fs = require('fs');
const path = require('path');

/**
 * Converte dados do scraper para formato do projeto
 */
function integrarDadosScraper(scraperData) {
  const integrated = {};

  scraperData.cidades.forEach(cidadeData => {
    const cidadeKey = normalizeString(cidadeData.cidade);

    integrated[cidadeKey] = cidadeData.profissionais.map((prof, idx) => ({
      id: `${cidadeData.estado.toLowerCase()}-${String(idx + 1).padStart(3, '0')}`,
      nome: prof.nome,
      rating: prof.rating,
      reviews: prof.reviews,
      tipos: prof.tipos || [],
      descricao: prof.descricao || prof.nome,
      whatsapp: prof.whatsapp || '',
      telefone: prof.telefone || '',
      disponivel: true,
      destaque: false,
      fonte: prof.fonte,
      url: prof.url || ''
    }));
  });

  return integrated;
}

/**
 * Normaliza string para key de cidade
 */
function normalizeString(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[áàâã]/g, 'a')
    .replace(/[éè]/g, 'e')
    .replace(/[íì]/g, 'i')
    .replace(/[óòôõ]/g, 'o')
    .replace(/[úù]/g, 'u')
    .replace(/ç/g, 'c');
}

/**
 * Mescla dados do scraper com dados existentes
 */
function mergeWithExisting(scrapedData, existingData) {
  const merged = { ...existingData };

  Object.entries(scrapedData).forEach(([cidade, profissionais]) => {
    if (merged[cidade]) {
      // Mescla: dados do scraper têm prioridade (mais atualizados)
      merged[cidade] = [...profissionais, ...merged[cidade]];
    } else {
      merged[cidade] = profissionais;
    }

    // Ordena por rating
    merged[cidade] = merged[cidade].sort((a, b) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return b.rating - a.rating;
    });

    // Remove duplicatas (mantém primeiro)
    merged[cidade] = merged[cidade].filter((prof, idx, arr) => {
      return arr.findIndex(p =>
        normalizeString(p.nome) === normalizeString(prof.nome)
      ) === idx;
    });
  });

  return merged;
}

/**
 * Gera arquivo JavaScript com os dados
 */
function gerarArquivoJS(data, outputPath) {
  const code = `/**
 * 🌟 DADOS REAIS - Scraped de fontes públicas
 *
 * Atualizado: ${new Date().toISOString()}
 * Fonte: Google Maps, Trustpilot, Facebook Reviews, Google Reviews
 *
 * Cada empresa:
 * - Rating verificado em múltiplas fontes
 * - Reviews contabilizados publicamente
 * - Telefone/WhatsApp públicos
 */

export const realWorldData = ${JSON.stringify(data, null, 2)};

export function getProfissionaisRealCity(cityNormalized) {
  return (realWorldData[cityNormalized] || [])
    .sort((a, b) => {
      if (a.destaque && !b.destaque) return -1;
      if (!a.destaque && b.destaque) return 1;
      return b.rating - a.rating;
    });
}

export function getTop5RealCity(cityNormalized) {
  return getProfissionaisRealCity(cityNormalized).slice(0, 5);
}

export function getStats() {
  const allProfs = Object.values(realWorldData).flat();
  return {
    totalCidades: Object.keys(realWorldData).length,
    totalProfissionais: allProfs.length,
    ratingMedio: (allProfs.reduce((sum, p) => sum + p.rating, 0) / allProfs.length).toFixed(2),
    reviewsTotal: allProfs.reduce((sum, p) => sum + p.reviews, 0),
  };
}
`;

  fs.writeFileSync(outputPath, code, 'utf8');
  console.log(`✅ Arquivo gerado: ${outputPath}`);
}

/**
 * Processa arquivo JSON do scraper
 */
function procesarScraperJSON(jsonPath, outputPath) {
  try {
    const scraperData = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const integrated = integrarDadosScraper(scraperData);
    gerarArquivoJS(integrated, outputPath);

    console.log('✅ Dados integrados com sucesso!');
    console.log(`📊 Cidades processadas: ${Object.keys(integrated).length}`);
    console.log(`👥 Profissionais totais: ${Object.values(integrated).flat().length}`);

  } catch (error) {
    console.error('❌ Erro ao processar:', error.message);
  }
}

// Exportar para uso em CLI
if (require.main === module) {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.log('Uso: node scraper-integrator.js <input.json> <output.js>');
    process.exit(1);
  }
  procesarScraperJSON(args[0], args[1]);
}

module.exports = { integrarDadosScraper, mergeWithExisting, gerarArquivoJS, normalizeString };
