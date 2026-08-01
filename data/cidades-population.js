/**
 * Top cidades brasileiras por POPULAÇÃO (IBGE 2023)
 * Estrutura: { cidade, estado, populacao, regiao }
 * Foco em cidades com 100k+ população (demanda real para fretes)
 */

export const topCidadesPorPopulacao = {
  'SP': [
    { cidade: 'São Paulo', populacao: 11451245, regiao: 'Sudeste', demanda: 9.8 },
    { cidade: 'Guarulhos', populacao: 1390974, regiao: 'Sudeste', demanda: 8.9 },
    { cidade: 'Campinas', populacao: 1081033, regiao: 'Sudeste', demanda: 8.7 },
    { cidade: 'São Bernardo do Campo', populacao: 765463, regiao: 'Sudeste', demanda: 8.5 },
    { cidade: 'Santo André', populacao: 718138, regiao: 'Sudeste', demanda: 8.4 },
    { cidade: 'Osasco', populacao: 697400, regiao: 'Sudeste', demanda: 8.3 },
    { cidade: 'Sorocaba', populacao: 638350, regiao: 'Sudeste', demanda: 8.2 },
    { cidade: 'Jundiaí', populacao: 399532, regiao: 'Sudeste', demanda: 8.0 },
    { cidade: 'Ribeirão Preto', populacao: 696619, regiao: 'Sudeste', demanda: 8.1 },
    { cidade: 'Piracicaba', populacao: 385987, regiao: 'Sudeste', demanda: 7.8 },
  ],
  'RJ': [
    { cidade: 'Rio de Janeiro', populacao: 6211423, regiao: 'Sudeste', demanda: 9.7 },
    { cidade: 'Duque de Caxias', populacao: 872762, regiao: 'Sudeste', demanda: 8.6 },
    { cidade: 'São Gonçalo', populacao: 1059193, regiao: 'Sudeste', demanda: 8.8 },
    { cidade: 'Niterói', populacao: 511840, regiao: 'Sudeste', demanda: 8.2 },
    { cidade: 'Campos dos Goytacazes', populacao: 456299, regiao: 'Sudeste', demanda: 7.9 },
    { cidade: 'Nova Iguaçu', populacao: 798000, regiao: 'Sudeste', demanda: 8.4 },
    { cidade: 'Itabora', populacao: 230000, regiao: 'Sudeste', demanda: 7.5 },
    { cidade: 'Volta Redonda', populacao: 258248, regiao: 'Sudeste', demanda: 7.6 },
    { cidade: 'Macaé', populacao: 254848, regiao: 'Sudeste', demanda: 7.7 },
    { cidade: 'Cabo Frio', populacao: 230000, regiao: 'Sudeste', demanda: 7.5 },
  ],
  'MG': [
    { cidade: 'Belo Horizonte', populacao: 2520546, regiao: 'Sudeste', demanda: 9.6 },
    { cidade: 'Contagem', populacao: 682036, regiao: 'Sudeste', demanda: 8.3 },
    { cidade: 'Betim', populacao: 436199, regiao: 'Sudeste', demanda: 8.0 },
    { cidade: 'Uberlândia', populacao: 693761, regiao: 'Sudeste', demanda: 8.2 },
    { cidade: 'Juiz de Fora', populacao: 516247, regiao: 'Sudeste', demanda: 8.1 },
    { cidade: 'Governador Valadares', populacao: 278124, regiao: 'Sudeste', demanda: 7.7 },
    { cidade: 'Montes Claros', populacao: 405722, regiao: 'Sudeste', demanda: 7.9 },
    { cidade: 'Divinópolis', populacao: 237476, regiao: 'Sudeste', demanda: 7.5 },
    { cidade: 'Santa Luzia', populacao: 242929, regiao: 'Sudeste', demanda: 7.6 },
    { cidade: 'Uberaba', populacao: 340116, regiao: 'Sudeste', demanda: 7.8 },
  ],
  'BA': [
    { cidade: 'Salvador', populacao: 2417570, regiao: 'Nordeste', demanda: 9.5 },
    { cidade: 'Feira de Santana', populacao: 634794, regiao: 'Nordeste', demanda: 8.2 },
    { cidade: 'Vitória da Conquista', populacao: 343402, regiao: 'Nordeste', demanda: 7.8 },
    { cidade: 'Camaçari', populacao: 283617, regiao: 'Nordeste', demanda: 7.7 },
    { cidade: 'Ilhéus', populacao: 184236, regiao: 'Nordeste', demanda: 7.3 },
    { cidade: 'Jequié', populacao: 157157, regiao: 'Nordeste', demanda: 7.1 },
    { cidade: 'Santo Estêvão', populacao: 140000, regiao: 'Nordeste', demanda: 6.9 },
    { cidade: 'Teixeira de Freitas', populacao: 142000, regiao: 'Nordeste', demanda: 7.0 },
    { cidade: 'Alagoinhas', populacao: 142000, regiao: 'Nordeste', demanda: 7.0 },
    { cidade: 'Paulo Afonso', populacao: 121000, regiao: 'Nordeste', demanda: 6.8 },
  ],
  'RS': [
    { cidade: 'Porto Alegre', populacao: 1332659, regiao: 'Sul', demanda: 9.1 },
    { cidade: 'Caxias do Sul', populacao: 489193, regiao: 'Sul', demanda: 8.1 },
    { cidade: 'Pelotas', populacao: 364457, regiao: 'Sul', demanda: 7.8 },
    { cidade: 'Santa Maria', populacao: 283256, regiao: 'Sul', demanda: 7.6 },
    { cidade: 'Novo Hamburgo', populacao: 250000, regiao: 'Sul', demanda: 7.5 },
    { cidade: 'Gravataí', populacao: 280000, regiao: 'Sul', demanda: 7.7 },
    { cidade: 'Viamão', populacao: 238000, regiao: 'Sul', demanda: 7.4 },
    { cidade: 'Rio Grande', populacao: 207000, regiao: 'Sul', demanda: 7.2 },
    { cidade: 'Sapucaia do Sul', populacao: 140000, regiao: 'Sul', demanda: 6.9 },
    { cidade: 'Canoas', populacao: 340000, regiao: 'Sul', demanda: 7.9 },
  ],
  'PR': [
    { cidade: 'Curitiba', populacao: 1963726, regiao: 'Sul', demanda: 9.3 },
    { cidade: 'Londrina', populacao: 569028, regiao: 'Sul', demanda: 8.2 },
    { cidade: 'Maringá', populacao: 423248, regiao: 'Sul', demanda: 8.0 },
    { cidade: 'Ponta Grossa', populacao: 343719, regiao: 'Sul', demanda: 7.8 },
    { cidade: 'Cascavel', populacao: 336289, regiao: 'Sul', demanda: 7.8 },
    { cidade: 'Foz do Iguaçu', populacao: 323000, regiao: 'Sul', demanda: 7.7 },
    { cidade: 'Guarapuava', populacao: 183000, regiao: 'Sul', demanda: 7.2 },
    { cidade: 'Paranaguá', populacao: 145000, regiao: 'Sul', demanda: 7.0 },
    { cidade: 'Campo Largo', populacao: 140000, regiao: 'Sul', demanda: 6.9 },
    { cidade: 'Apucarana', populacao: 135000, regiao: 'Sul', demanda: 6.9 },
  ],
  'SC': [
    { cidade: 'Joinville', populacao: 612000, regiao: 'Sul', demanda: 8.3 },
    { cidade: 'Blumenau', populacao: 364000, regiao: 'Sul', demanda: 7.8 },
    { cidade: 'Florianópolis', populacao: 537000, regiao: 'Sul', demanda: 8.1 },
    { cidade: 'Itajaí', populacao: 220000, regiao: 'Sul', demanda: 7.4 },
    { cidade: 'Brusque', populacao: 142000, regiao: 'Sul', demanda: 7.0 },
    { cidade: 'Chapecó', populacao: 240000, regiao: 'Sul', demanda: 7.5 },
    { cidade: 'Criciúma', populacao: 210000, regiao: 'Sul', demanda: 7.3 },
    { cidade: 'Lages', populacao: 163000, regiao: 'Sul', demanda: 7.1 },
    { cidade: 'São José', populacao: 250000, regiao: 'Sul', demanda: 7.5 },
    { cidade: 'Palhoça', populacao: 150000, regiao: 'Sul', demanda: 7.0 },
  ],
  'GO': [
    { cidade: 'Goiânia', populacao: 1536097, regiao: 'Centro-Oeste', demanda: 9.2 },
    { cidade: 'Aparecida de Goiânia', populacao: 535652, regiao: 'Centro-Oeste', demanda: 8.1 },
    { cidade: 'Anápolis', populacao: 398862, regiao: 'Centro-Oeste', demanda: 7.9 },
    { cidade: 'Trindade', populacao: 130000, regiao: 'Centro-Oeste', demanda: 7.5 },
    { cidade: 'Senador Canedo', populacao: 110000, regiao: 'Centro-Oeste', demanda: 7.3 },
    { cidade: 'Águas Lindas de Goiás', populacao: 200000, regiao: 'Centro-Oeste', demanda: 7.4 },
    { cidade: 'Catalão', populacao: 119000, regiao: 'Centro-Oeste', demanda: 7.2 },
    { cidade: 'Itumbiara', populacao: 103000, regiao: 'Centro-Oeste', demanda: 7.1 },
    { cidade: 'Jataí', populacao: 113000, regiao: 'Centro-Oeste', demanda: 7.2 },
    { cidade: 'Mineiros', populacao: 89000, regiao: 'Centro-Oeste', demanda: 6.8 },
  ],
  'PE': [
    { cidade: 'Recife', populacao: 1633697, regiao: 'Nordeste', demanda: 9.1 },
    { cidade: 'Jaboatão dos Guararapes', populacao: 651530, regiao: 'Nordeste', demanda: 8.2 },
    { cidade: 'Olinda', populacao: 390459, regiao: 'Nordeste', demanda: 7.9 },
    { cidade: 'Caruaru', populacao: 314912, regiao: 'Nordeste', demanda: 7.7 },
    { cidade: 'Petrolina', populacao: 319780, regiao: 'Nordeste', demanda: 7.8 },
    { cidade: 'Paulista', populacao: 310000, regiao: 'Nordeste', demanda: 7.7 },
    { cidade: 'Garanhuns', populacao: 133000, regiao: 'Nordeste', demanda: 7.1 },
    { cidade: 'Arcoverde', populacao: 80000, regiao: 'Nordeste', demanda: 6.7 },
    { cidade: 'Araripina', populacao: 78000, regiao: 'Nordeste', demanda: 6.6 },
    { cidade: 'Pesqueira', populacao: 70000, regiao: 'Nordeste', demanda: 6.5 },
  ],
  'CE': [
    { cidade: 'Fortaleza', populacao: 2703551, regiao: 'Nordeste', demanda: 9.4 },
    { cidade: 'Caucaia', populacao: 346000, regiao: 'Nordeste', demanda: 7.8 },
    { cidade: 'Juazeiro do Norte', populacao: 261000, regiao: 'Nordeste', demanda: 7.6 },
    { cidade: 'Maracanaú', populacao: 243000, regiao: 'Nordeste', demanda: 7.5 },
    { cidade: 'Sobral', populacao: 197000, regiao: 'Nordeste', demanda: 7.3 },
    { cidade: 'Crato', populacao: 126000, regiao: 'Nordeste', demanda: 7.1 },
    { cidade: 'Iguatu', populacao: 103000, regiao: 'Nordeste', demanda: 7.0 },
    { cidade: 'Itapipoca', populacao: 120000, regiao: 'Nordeste', demanda: 7.0 },
    { cidade: 'Quixadá', populacao: 88000, regiao: 'Nordeste', demanda: 6.8 },
    { cidade: 'Barbalha', populacao: 63000, regiao: 'Nordeste', demanda: 6.4 },
  ],
}

/**
 * Cidades por estado (para rankings)
 */
export function getTop10CidadesPorEstado(estado) {
  return topCidadesPorPopulacao[estado] || []
}

/**
 * Todas as top cidades (flatten) ordenadas por demanda
 */
export function getTodasTopCidades() {
  return Object.values(topCidadesPorPopulacao)
    .flat()
    .sort((a, b) => b.demanda - a.demanda)
}

/**
 * Estados ordenados por soma de demanda (top 10)
 */
export function getTopEstados() {
  return Object.entries(topCidadesPorPopulacao)
    .map(([estado, cidades]) => ({
      estado,
      demandaTotal: cidades.reduce((sum, c) => sum + c.demanda, 0),
      cidadesAtendidas: cidades.length,
      cidadesMaiorDemanda: cidades.slice(0, 3).map(c => c.cidade),
    }))
    .sort((a, b) => b.demandaTotal - a.demandaTotal)
    .slice(0, 10)
}
