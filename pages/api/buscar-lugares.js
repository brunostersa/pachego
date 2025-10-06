export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { query, location = 'Goiânia, GO, Brasil' } = req.query

  if (!query || query.length < 3) {
    return res.status(400).json({ error: 'Query deve ter pelo menos 3 caracteres' })
  }

  try {
    // Usar Google Places API Text Search
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&location=${encodeURIComponent(location)}&radius=50000&key=${process.env.GOOGLE_MAPS_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Erro na API do Google Maps')
    }

    const data = await response.json()

    if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
      throw new Error(`Erro na API: ${data.status}`)
    }

    // Processar resultados
    const lugares = data.results.map(place => ({
      place_id: place.place_id,
      endereco: place.formatted_address,
      nome: place.name,
      lat: place.geometry.location.lat,
      lng: place.geometry.location.lng,
      tipos: place.types || [],
      rating: place.rating || null,
      user_ratings_total: place.user_ratings_total || 0,
      vicinity: place.vicinity || null
    }))

    return res.status(200).json({
      lugares,
      status: data.status,
      total: lugares.length
    })

  } catch (error) {
    console.error('Erro ao buscar lugares:', error)
    
    // Fallback para dados simulados em caso de erro
    const lugaresSimulados = getLugaresSimulados(query)
    
    return res.status(200).json({
      lugares: lugaresSimulados,
      status: 'FALLBACK',
      total: lugaresSimulados.length,
      erro: error.message
    })
  }
}

function getLugaresSimulados(query) {
  const lugaresSimulados = [
    // Goiânia
    { place_id: 'goiania_centro', endereco: 'Setor Central, Goiânia, GO, Brasil', nome: 'Setor Central', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_marista', endereco: 'Setor Marista, Goiânia, GO, Brasil', nome: 'Setor Marista', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_bueno', endereco: 'Setor Bueno, Goiânia, GO, Brasil', nome: 'Setor Bueno', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_oeste', endereco: 'Setor Oeste, Goiânia, GO, Brasil', nome: 'Setor Oeste', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_sul', endereco: 'Setor Sul, Goiânia, GO, Brasil', nome: 'Setor Sul', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_norte', endereco: 'Setor Norte, Goiânia, GO, Brasil', nome: 'Setor Norte', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_leste', endereco: 'Setor Leste, Goiânia, GO, Brasil', nome: 'Setor Leste', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_aeroporto', endereco: 'Setor Aeroporto, Goiânia, GO, Brasil', nome: 'Setor Aeroporto', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_campinas', endereco: 'Setor Campinas, Goiânia, GO, Brasil', nome: 'Setor Campinas', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    { place_id: 'goiania_jardim_america', endereco: 'Setor Jardim América, Goiânia, GO, Brasil', nome: 'Setor Jardim América', lat: -16.6864, lng: -49.2653, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Goiânia' },
    
    // Brasília
    { place_id: 'brasilia_asa_sul', endereco: 'Asa Sul, Brasília, DF, Brasil', nome: 'Asa Sul', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_asa_norte', endereco: 'Asa Norte, Brasília, DF, Brasil', nome: 'Asa Norte', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_taguatinga', endereco: 'Taguatinga, Brasília, DF, Brasil', nome: 'Taguatinga', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_ceilandia', endereco: 'Ceilândia, Brasília, DF, Brasil', nome: 'Ceilândia', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_samambaia', endereco: 'Samambaia, Brasília, DF, Brasil', nome: 'Samambaia', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_gama', endereco: 'Gama, Brasília, DF, Brasil', nome: 'Gama', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_guara', endereco: 'Guará, Brasília, DF, Brasil', nome: 'Guará', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    { place_id: 'brasilia_aguas_claras', endereco: 'Águas Claras, Brasília, DF, Brasil', nome: 'Águas Claras', lat: -15.7942, lng: -47.8822, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Brasília' },
    
    // Outras cidades
    { place_id: 'anapolis_centro', endereco: 'Centro, Anápolis, GO, Brasil', nome: 'Centro', lat: -16.3286, lng: -48.9534, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Anápolis' },
    { place_id: 'trindade_centro', endereco: 'Centro, Trindade, GO, Brasil', nome: 'Centro', lat: -16.6497, lng: -49.4889, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Trindade' },
    { place_id: 'senador_canedo_centro', endereco: 'Centro, Senador Canedo, GO, Brasil', nome: 'Centro', lat: -16.7056, lng: -49.0953, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Senador Canedo' },
    { place_id: 'aparecida_centro', endereco: 'Centro, Aparecida de Goiânia, GO, Brasil', nome: 'Centro', lat: -16.8225, lng: -49.2469, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Aparecida de Goiânia' },
    { place_id: 'catalao_centro', endereco: 'Centro, Catalão, GO, Brasil', nome: 'Centro', lat: -18.1703, lng: -47.9417, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Catalão' },
    { place_id: 'rio_verde_centro', endereco: 'Centro, Rio Verde, GO, Brasil', nome: 'Centro', lat: -17.7979, lng: -50.9176, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Rio Verde' },
    { place_id: 'jatai_centro', endereco: 'Centro, Jataí, GO, Brasil', nome: 'Centro', lat: -17.8814, lng: -51.7214, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Jataí' },
    { place_id: 'itumbiara_centro', endereco: 'Centro, Itumbiara, GO, Brasil', nome: 'Centro', lat: -18.4194, lng: -49.2156, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Itumbiara' },
    { place_id: 'caldas_novas_centro', endereco: 'Centro, Caldas Novas, GO, Brasil', nome: 'Centro', lat: -17.7447, lng: -48.6278, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Caldas Novas' },
    { place_id: 'pirenopolis_centro', endereco: 'Centro, Pirenópolis, GO, Brasil', nome: 'Centro', lat: -15.8517, lng: -48.9589, tipos: ['political', 'sublocality'], rating: null, user_ratings_total: 0, vicinity: 'Pirenópolis' }
  ]

  return lugaresSimulados.filter(lugar => 
    lugar.endereco.toLowerCase().includes(query.toLowerCase()) ||
    lugar.nome.toLowerCase().includes(query.toLowerCase()) ||
    lugar.vicinity.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 8)
}
