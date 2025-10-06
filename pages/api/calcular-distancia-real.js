export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método não permitido' })
  }

  const { origem, destino } = req.query

  if (!origem || !destino) {
    return res.status(400).json({ error: 'Origem e destino são obrigatórios' })
  }

  try {
    // Usar Google Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origem)}&destinations=${encodeURIComponent(destino)}&units=metric&key=${process.env.GOOGLE_MAPS_API_KEY}`
    )

    if (!response.ok) {
      throw new Error('Erro na API do Google Maps')
    }

    const data = await response.json()

    if (data.status !== 'OK') {
      throw new Error(`Erro na API: ${data.status}`)
    }

    const element = data.rows[0]?.elements[0]

    if (!element || element.status !== 'OK') {
      throw new Error('Não foi possível calcular a distância')
    }

    const distancia = element.distance.value / 1000 // Converter para km
    const duracao = element.duration.value / 60 // Converter para minutos

    return res.status(200).json({
      distancia: Math.round(distancia),
      duracao: Math.round(duracao),
      status: 'OK',
      origem: data.origin_addresses[0],
      destino: data.destination_addresses[0],
      observacao: 'Distância calculada via Google Maps'
    })

  } catch (error) {
    console.error('Erro ao calcular distância:', error)
    
    // Fallback para cálculo aproximado
    return calcularDistanciaAproximada(origem, destino, res)
  }
}

function calcularDistanciaAproximada(origem, destino, res) {
  // Coordenadas aproximadas de cidades principais
  const coordenadas = {
    'goiania': { lat: -16.6864, lng: -49.2653 },
    'brasilia': { lat: -15.7942, lng: -47.8822 },
    'anapolis': { lat: -16.3286, lng: -48.9534 },
    'trindade': { lat: -16.6497, lng: -49.4889 },
    'senador canedo': { lat: -16.7056, lng: -49.0953 },
    'aparecida de goiania': { lat: -16.8225, lng: -49.2469 },
    'catalao': { lat: -18.1703, lng: -47.9417 },
    'rio verde': { lat: -17.7979, lng: -50.9176 },
    'jatai': { lat: -17.8814, lng: -51.7214 },
    'itumbiara': { lat: -18.4194, lng: -49.2156 },
    'caldas novas': { lat: -17.7447, lng: -48.6278 },
    'pirenopolis': { lat: -15.8517, lng: -48.9589 },
    'cidade ocidental': { lat: -16.0767, lng: -47.9258 },
    'luziania': { lat: -16.2525, lng: -47.9503 },
    'valparaiso de goias': { lat: -16.0653, lng: -47.9758 }
  }

  // Normalizar nomes das cidades
  const origemNormalizada = origem.toLowerCase().replace(/[^a-z]/g, '')
  const destinoNormalizada = destino.toLowerCase().replace(/[^a-z]/g, '')

  // Encontrar coordenadas
  const coordOrigem = coordenadas[origemNormalizada] || coordenadas['goiania']
  const coordDestino = coordenadas[destinoNormalizada] || coordenadas['goiania']

  // Calcular distância usando fórmula de Haversine
  const distancia = calcularDistanciaHaversine(coordOrigem, coordDestino)
  
  return res.status(200).json({ 
    distancia: Math.round(distancia),
    duracao: Math.round(distancia / 60),
    status: 'FALLBACK',
    origem,
    destino,
    observacao: 'Distância aproximada calculada (API do Google indisponível)'
  })
}

function calcularDistanciaHaversine(coord1, coord2) {
  const R = 6371 // Raio da Terra em km
  const dLat = (coord2.lat - coord1.lat) * Math.PI / 180
  const dLng = (coord2.lng - coord1.lng) * Math.PI / 180
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(coord1.lat * Math.PI / 180) * Math.cos(coord2.lat * Math.PI / 180) *
            Math.sin(dLng/2) * Math.sin(dLng/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}
