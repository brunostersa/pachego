// Base de dados local de cidades e setores para Goiás e região
export const cidadesSetores = [
  // Goiânia
  {
    cidade: "Goiânia",
    estado: "GO",
    coordenadas: { lat: -16.6864, lng: -49.2653 },
    setores: [
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Marista", tipo: "residencial" },
      { nome: "Setor Bueno", tipo: "residencial" },
      { nome: "Setor Oeste", tipo: "residencial" },
      { nome: "Setor Sul", tipo: "residencial" },
      { nome: "Setor Norte", tipo: "residencial" },
      { nome: "Setor Leste", tipo: "residencial" },
      { nome: "Setor Aeroporto", tipo: "comercial" },
      { nome: "Setor Campinas", tipo: "residencial" },
      { nome: "Setor Jardim América", tipo: "residencial" },
      { nome: "Setor Jardim Goiás", tipo: "residencial" },
      { nome: "Setor Bela Vista", tipo: "residencial" },
      { nome: "Setor Vila Nova", tipo: "residencial" },
      { nome: "Setor Coimbra", tipo: "residencial" },
      { nome: "Setor Finsocial", tipo: "residencial" },
      { nome: "Setor Garavelo", tipo: "residencial" },
      { nome: "Setor Itatiaia", tipo: "residencial" },
      { nome: "Setor Jaó", tipo: "residencial" },
      { nome: "Setor Kennedy", tipo: "residencial" },
      { nome: "Setor Macambira", tipo: "residencial" },
      { nome: "Setor Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Maracanã", tipo: "residencial" },
      { nome: "Setor Morumbi", tipo: "residencial" },
      { nome: "Setor Nova Suíça", tipo: "residencial" },
      { nome: "Setor Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Progresso", tipo: "residencial" },
      { nome: "Setor Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Araguaia", tipo: "residencial" },
      { nome: "Setor Residencial Bela Vista", tipo: "residencial" },
      { nome: "Setor Residencial Boa Vista", tipo: "residencial" },
      { nome: "Setor Residencial Cidade Jardim", tipo: "residencial" },
      { nome: "Setor Residencial Conde dos Arcos", tipo: "residencial" },
      { nome: "Setor Residencial Dom Fernando", tipo: "residencial" },
      { nome: "Setor Residencial dos Funcionários", tipo: "residencial" },
      { nome: "Setor Residencial Estrela Dalva", tipo: "residencial" },
      { nome: "Setor Residencial Finsocial", tipo: "residencial" },
      { nome: "Setor Residencial Jardim América", tipo: "residencial" },
      { nome: "Setor Residencial Jardim Goiás", tipo: "residencial" },
      { nome: "Setor Residencial Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Residencial Maracanã", tipo: "residencial" },
      { nome: "Setor Residencial Morumbi", tipo: "residencial" },
      { nome: "Setor Residencial Nova Suíça", tipo: "residencial" },
      { nome: "Setor Residencial Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Residencial Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Residencial Progresso", tipo: "residencial" },
      { nome: "Setor Residencial Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Santo Antônio", tipo: "residencial" },
      { nome: "Setor Residencial São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Residencial Vila Nova", tipo: "residencial" },
      { nome: "Setor Santo Antônio", tipo: "residencial" },
      { nome: "Setor São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Vila Nova", tipo: "residencial" }
    ]
  },
  
  // Brasília
  {
    cidade: "Brasília",
    estado: "DF",
    coordenadas: { lat: -15.7942, lng: -47.8822 },
    setores: [
      { nome: "Asa Sul", tipo: "residencial" },
      { nome: "Asa Norte", tipo: "residencial" },
      { nome: "Taguatinga", tipo: "residencial" },
      { nome: "Ceilândia", tipo: "residencial" },
      { nome: "Samambaia", tipo: "residencial" },
      { nome: "Gama", tipo: "residencial" },
      { nome: "Guará", tipo: "residencial" },
      { nome: "Águas Claras", tipo: "residencial" },
      { nome: "Candangolândia", tipo: "residencial" },
      { nome: "Cruzeiro", tipo: "residencial" },
      { nome: "Lago Norte", tipo: "residencial" },
      { nome: "Lago Sul", tipo: "residencial" },
      { nome: "Núcleo Bandeirante", tipo: "residencial" },
      { nome: "Park Way", tipo: "residencial" },
      { nome: "Planaltina", tipo: "residencial" },
      { nome: "Recanto das Emas", tipo: "residencial" },
      { nome: "Riacho Fundo", tipo: "residencial" },
      { nome: "Riacho Fundo II", tipo: "residencial" },
      { nome: "Santa Maria", tipo: "residencial" },
      { nome: "São Sebastião", tipo: "residencial" },
      { nome: "Sobradinho", tipo: "residencial" },
      { nome: "Sobradinho II", tipo: "residencial" },
      { nome: "Sudoeste", tipo: "residencial" },
      { nome: "Varjão", tipo: "residencial" },
      { nome: "Vicente Pires", tipo: "residencial" }
    ]
  },

  // Anápolis
  {
    cidade: "Anápolis",
    estado: "GO",
    coordenadas: { lat: -16.3286, lng: -48.9534 },
    setores: [
      { nome: "Centro", tipo: "centro" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Aeroporto", tipo: "comercial" },
      { nome: "Setor Bela Vista", tipo: "residencial" },
      { nome: "Setor Boa Vista", tipo: "residencial" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Coimbra", tipo: "residencial" },
      { nome: "Setor Garavelo", tipo: "residencial" },
      { nome: "Setor Itatiaia", tipo: "residencial" },
      { nome: "Setor Jaó", tipo: "residencial" },
      { nome: "Setor Kennedy", tipo: "residencial" },
      { nome: "Setor Macambira", tipo: "residencial" },
      { nome: "Setor Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Maracanã", tipo: "residencial" },
      { nome: "Setor Morumbi", tipo: "residencial" },
      { nome: "Setor Nova Suíça", tipo: "residencial" },
      { nome: "Setor Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Progresso", tipo: "residencial" },
      { nome: "Setor Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Araguaia", tipo: "residencial" },
      { nome: "Setor Residencial Bela Vista", tipo: "residencial" },
      { nome: "Setor Residencial Boa Vista", tipo: "residencial" },
      { nome: "Setor Residencial Cidade Jardim", tipo: "residencial" },
      { nome: "Setor Residencial Conde dos Arcos", tipo: "residencial" },
      { nome: "Setor Residencial Dom Fernando", tipo: "residencial" },
      { nome: "Setor Residencial dos Funcionários", tipo: "residencial" },
      { nome: "Setor Residencial Estrela Dalva", tipo: "residencial" },
      { nome: "Setor Residencial Finsocial", tipo: "residencial" },
      { nome: "Setor Residencial Jardim América", tipo: "residencial" },
      { nome: "Setor Residencial Jardim Goiás", tipo: "residencial" },
      { nome: "Setor Residencial Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Residencial Maracanã", tipo: "residencial" },
      { nome: "Setor Residencial Morumbi", tipo: "residencial" },
      { nome: "Setor Residencial Nova Suíça", tipo: "residencial" },
      { nome: "Setor Residencial Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Residencial Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Residencial Progresso", tipo: "residencial" },
      { nome: "Setor Residencial Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Santo Antônio", tipo: "residencial" },
      { nome: "Setor Residencial São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Residencial Vila Nova", tipo: "residencial" },
      { nome: "Setor Santo Antônio", tipo: "residencial" },
      { nome: "Setor São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Vila Nova", tipo: "residencial" }
    ]
  },

  // Outras cidades importantes
  {
    cidade: "Aparecida de Goiânia",
    estado: "GO",
    coordenadas: { lat: -16.8225, lng: -49.2469 },
    setores: [
      { nome: "Centro", tipo: "centro" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Aeroporto", tipo: "comercial" },
      { nome: "Setor Bela Vista", tipo: "residencial" },
      { nome: "Setor Boa Vista", tipo: "residencial" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Coimbra", tipo: "residencial" },
      { nome: "Setor Garavelo", tipo: "residencial" },
      { nome: "Setor Itatiaia", tipo: "residencial" },
      { nome: "Setor Jaó", tipo: "residencial" },
      { nome: "Setor Kennedy", tipo: "residencial" },
      { nome: "Setor Macambira", tipo: "residencial" },
      { nome: "Setor Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Maracanã", tipo: "residencial" },
      { nome: "Setor Morumbi", tipo: "residencial" },
      { nome: "Setor Nova Suíça", tipo: "residencial" },
      { nome: "Setor Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Progresso", tipo: "residencial" },
      { nome: "Setor Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Araguaia", tipo: "residencial" },
      { nome: "Setor Residencial Bela Vista", tipo: "residencial" },
      { nome: "Setor Residencial Boa Vista", tipo: "residencial" },
      { nome: "Setor Residencial Cidade Jardim", tipo: "residencial" },
      { nome: "Setor Residencial Conde dos Arcos", tipo: "residencial" },
      { nome: "Setor Residencial Dom Fernando", tipo: "residencial" },
      { nome: "Setor Residencial dos Funcionários", tipo: "residencial" },
      { nome: "Setor Residencial Estrela Dalva", tipo: "residencial" },
      { nome: "Setor Residencial Finsocial", tipo: "residencial" },
      { nome: "Setor Residencial Jardim América", tipo: "residencial" },
      { nome: "Setor Residencial Jardim Goiás", tipo: "residencial" },
      { nome: "Setor Residencial Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Residencial Maracanã", tipo: "residencial" },
      { nome: "Setor Residencial Morumbi", tipo: "residencial" },
      { nome: "Setor Residencial Nova Suíça", tipo: "residencial" },
      { nome: "Setor Residencial Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Residencial Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Residencial Progresso", tipo: "residencial" },
      { nome: "Setor Residencial Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Santo Antônio", tipo: "residencial" },
      { nome: "Setor Residencial São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Residencial Vila Nova", tipo: "residencial" },
      { nome: "Setor Santo Antônio", tipo: "residencial" },
      { nome: "Setor São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Vila Nova", tipo: "residencial" }
    ]
  },

  // Mais cidades...
  {
    cidade: "Trindade",
    estado: "GO",
    coordenadas: { lat: -16.6497, lng: -49.4889 },
    setores: [
      { nome: "Centro", tipo: "centro" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Aeroporto", tipo: "comercial" },
      { nome: "Setor Bela Vista", tipo: "residencial" },
      { nome: "Setor Boa Vista", tipo: "residencial" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Coimbra", tipo: "residencial" },
      { nome: "Setor Garavelo", tipo: "residencial" },
      { nome: "Setor Itatiaia", tipo: "residencial" },
      { nome: "Setor Jaó", tipo: "residencial" },
      { nome: "Setor Kennedy", tipo: "residencial" },
      { nome: "Setor Macambira", tipo: "residencial" },
      { nome: "Setor Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Maracanã", tipo: "residencial" },
      { nome: "Setor Morumbi", tipo: "residencial" },
      { nome: "Setor Nova Suíça", tipo: "residencial" },
      { nome: "Setor Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Progresso", tipo: "residencial" },
      { nome: "Setor Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Araguaia", tipo: "residencial" },
      { nome: "Setor Residencial Bela Vista", tipo: "residencial" },
      { nome: "Setor Residencial Boa Vista", tipo: "residencial" },
      { nome: "Setor Residencial Cidade Jardim", tipo: "residencial" },
      { nome: "Setor Residencial Conde dos Arcos", tipo: "residencial" },
      { nome: "Setor Residencial Dom Fernando", tipo: "residencial" },
      { nome: "Setor Residencial dos Funcionários", tipo: "residencial" },
      { nome: "Setor Residencial Estrela Dalva", tipo: "residencial" },
      { nome: "Setor Residencial Finsocial", tipo: "residencial" },
      { nome: "Setor Residencial Jardim América", tipo: "residencial" },
      { nome: "Setor Residencial Jardim Goiás", tipo: "residencial" },
      { nome: "Setor Residencial Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Residencial Maracanã", tipo: "residencial" },
      { nome: "Setor Residencial Morumbi", tipo: "residencial" },
      { nome: "Setor Residencial Nova Suíça", tipo: "residencial" },
      { nome: "Setor Residencial Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Residencial Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Residencial Progresso", tipo: "residencial" },
      { nome: "Setor Residencial Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Santo Antônio", tipo: "residencial" },
      { nome: "Setor Residencial São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Residencial Vila Nova", tipo: "residencial" },
      { nome: "Setor Santo Antônio", tipo: "residencial" },
      { nome: "Setor São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Vila Nova", tipo: "residencial" }
    ]
  },

  {
    cidade: "Senador Canedo",
    estado: "GO",
    coordenadas: { lat: -16.7056, lng: -49.0953 },
    setores: [
      { nome: "Centro", tipo: "centro" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Aeroporto", tipo: "comercial" },
      { nome: "Setor Bela Vista", tipo: "residencial" },
      { nome: "Setor Boa Vista", tipo: "residencial" },
      { nome: "Setor Central", tipo: "centro" },
      { nome: "Setor Coimbra", tipo: "residencial" },
      { nome: "Setor Garavelo", tipo: "residencial" },
      { nome: "Setor Itatiaia", tipo: "residencial" },
      { nome: "Setor Jaó", tipo: "residencial" },
      { nome: "Setor Kennedy", tipo: "residencial" },
      { nome: "Setor Macambira", tipo: "residencial" },
      { nome: "Setor Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Maracanã", tipo: "residencial" },
      { nome: "Setor Morumbi", tipo: "residencial" },
      { nome: "Setor Nova Suíça", tipo: "residencial" },
      { nome: "Setor Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Progresso", tipo: "residencial" },
      { nome: "Setor Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Araguaia", tipo: "residencial" },
      { nome: "Setor Residencial Bela Vista", tipo: "residencial" },
      { nome: "Setor Residencial Boa Vista", tipo: "residencial" },
      { nome: "Setor Residencial Cidade Jardim", tipo: "residencial" },
      { nome: "Setor Residencial Conde dos Arcos", tipo: "residencial" },
      { nome: "Setor Residencial Dom Fernando", tipo: "residencial" },
      { nome: "Setor Residencial dos Funcionários", tipo: "residencial" },
      { nome: "Setor Residencial Estrela Dalva", tipo: "residencial" },
      { nome: "Setor Residencial Finsocial", tipo: "residencial" },
      { nome: "Setor Residencial Jardim América", tipo: "residencial" },
      { nome: "Setor Residencial Jardim Goiás", tipo: "residencial" },
      { nome: "Setor Residencial Mansões Goiânia", tipo: "residencial" },
      { nome: "Setor Residencial Maracanã", tipo: "residencial" },
      { nome: "Setor Residencial Morumbi", tipo: "residencial" },
      { nome: "Setor Residencial Nova Suíça", tipo: "residencial" },
      { nome: "Setor Residencial Oeste Vila Nova", tipo: "residencial" },
      { nome: "Setor Residencial Pedro Ludovico", tipo: "residencial" },
      { nome: "Setor Residencial Progresso", tipo: "residencial" },
      { nome: "Setor Residencial Recanto das Minas Gerais", tipo: "residencial" },
      { nome: "Setor Residencial Santo Antônio", tipo: "residencial" },
      { nome: "Setor Residencial São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Residencial Vila Nova", tipo: "residencial" },
      { nome: "Setor Santo Antônio", tipo: "residencial" },
      { nome: "Setor São Judas Tadeu", tipo: "residencial" },
      { nome: "Setor Vila Nova", tipo: "residencial" }
    ]
  },

  // Cidades menores com apenas centro
  { cidade: "Catalão", estado: "GO", coordenadas: { lat: -18.1703, lng: -47.9417 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Rio Verde", estado: "GO", coordenadas: { lat: -17.7979, lng: -50.9176 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Jataí", estado: "GO", coordenadas: { lat: -17.8814, lng: -51.7214 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Itumbiara", estado: "GO", coordenadas: { lat: -18.4194, lng: -49.2156 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Caldas Novas", estado: "GO", coordenadas: { lat: -17.7447, lng: -48.6278 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Pirenópolis", estado: "GO", coordenadas: { lat: -15.8517, lng: -48.9589 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Cidade Ocidental", estado: "GO", coordenadas: { lat: -16.0767, lng: -47.9258 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Luziânia", estado: "GO", coordenadas: { lat: -16.2525, lng: -47.9503 }, setores: [{ nome: "Centro", tipo: "centro" }] },
  { cidade: "Valparaíso de Goiás", estado: "GO", coordenadas: { lat: -16.0653, lng: -47.9758 }, setores: [{ nome: "Centro", tipo: "centro" }] }
]

// Função para buscar lugares
export function buscarLugares(query) {
  if (!query || query.length < 2) return []
  
  const queryLower = query.toLowerCase()
  const resultados = []
  
  cidadesSetores.forEach(cidade => {
    // Buscar por cidade
    if (cidade.cidade.toLowerCase().includes(queryLower) || 
        `${cidade.cidade}, ${cidade.estado}`.toLowerCase().includes(queryLower)) {
      resultados.push({
        endereco: `${cidade.cidade}, ${cidade.estado}`,
        nome: cidade.cidade,
        lat: cidade.coordenadas.lat,
        lng: cidade.coordenadas.lng,
        tipo: 'cidade',
        cidade: cidade.cidade,
        estado: cidade.estado
      })
    }
    
    // Buscar por setores
    cidade.setores.forEach(setor => {
      if (setor.nome.toLowerCase().includes(queryLower)) {
        resultados.push({
          endereco: `${setor.nome}, ${cidade.cidade}, ${cidade.estado}`,
          nome: setor.nome,
          lat: cidade.coordenadas.lat,
          lng: cidade.coordenadas.lng,
          tipo: 'setor',
          cidade: cidade.cidade,
          estado: cidade.estado,
          setor: setor.nome
        })
      }
    })
  })
  
  return resultados.slice(0, 10) // Limitar a 10 resultados
}

// Função para calcular distância entre duas coordenadas
export function calcularDistancia(coord1, coord2) {
  const R = 6371 // Raio da Terra em km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
