import { useState, useEffect } from 'react'
import CarrinhoFrete from './CarrinhoFrete'
import EnderecoAutocomplete from './EnderecoAutocomplete'
import { calcularDistancia } from '../data/cidades-setores'

const FreteCalculator = () => {
  const [formData, setFormData] = useState({
    origem: '',
    setorOrigem: '',
    tipoOrigem: 'casa',
    andarOrigem: 0,
    elevadorOrigem: false,
    destino: '',
    setorDestino: '',
    tipoDestino: 'casa',
    andarDestino: 0,
    elevadorDestino: false,
    distancia: '',
    ajudantes: 1,
    tipoAjudantes: 'empresa',
    tamanhoMudanca: 'media',
    fotos: [],
    dataDesejada: ''
  })

  const [resultado, setResultado] = useState(null)
  const [calculandoDistancia, setCalculandoDistancia] = useState(false)
  const [carrinhoAberto, setCarrinhoAberto] = useState(false)
  const [totalTempoReal, setTotalTempoReal] = useState(0)
  const [coordenadasOrigem, setCoordenadasOrigem] = useState(null)
  const [coordenadasDestino, setCoordenadasDestino] = useState(null)

  const tiposVeiculo = [
    { value: 'caminhao', label: 'Caminhão', base: 150, km: 3.50 },
    { value: 'carroceria', label: 'Carroceria', base: 120, km: 3.00 }
  ]

  const tamanhosMudanca = [
    { value: 'pequena', label: 'Pequena', descricao: 'Até 2 cômodos, poucos móveis', multiplicador: 1.0 },
    { value: 'media', label: 'Média', descricao: '3-4 cômodos, móveis padrão', multiplicador: 1.2 },
    { value: 'grande', label: 'Grande', descricao: '5+ cômodos, muitos móveis', multiplicador: 1.5 }
  ]

  const tiposAjudantes = [
    { value: 'empresa', label: 'Contratar ajudantes da empresa', custo: 150 },
    { value: 'proprios', label: 'Usar ajudantes próprios', custo: 0 }
  ]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files)
    const newFotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name
    }))
    
    setFormData(prev => ({
      ...prev,
      fotos: [...prev.fotos, ...newFotos]
    }))
  }

  const removeFoto = (index) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }))
  }

  const calcularTotalTempoReal = () => {
    if (!formData.origem || !formData.destino) {
      setTotalTempoReal(0)
      return
    }

    const distancia = parseFloat(formData.distancia) || 50
    const ajudantes = parseInt(formData.ajudantes)
    const andarOrigem = parseInt(formData.andarOrigem) || 0
    const andarDestino = parseInt(formData.andarDestino) || 0
    
    const tipoVeiculoObj = tiposVeiculo.find(t => t.value === 'caminhao')
    const tamanhoObj = tamanhosMudanca.find(t => t.value === formData.tamanhoMudanca)
    
    const custoVeiculo = tipoVeiculoObj.base + (distancia * tipoVeiculoObj.km)
    
    let custoTotalAjudantes = 0
    
    if (formData.tipoAjudantes === 'empresa') {
      const temApartamento = formData.tipoOrigem === 'apartamento' || formData.tipoDestino === 'apartamento'
      const valorBaseAjudante = temApartamento ? 180 : 150
      
      const custoBaseAjudantes = ajudantes * valorBaseAjudante
      
      let custoAndares = 0
      
      if (formData.tipoOrigem === 'apartamento' && !formData.elevadorOrigem && andarOrigem > 1) {
        custoAndares += ajudantes * (andarOrigem * 20)
      }
      
      if (formData.tipoDestino === 'apartamento' && !formData.elevadorDestino && andarDestino > 1) {
        custoAndares += ajudantes * (andarDestino * 20)
      }
      
      custoTotalAjudantes = custoBaseAjudantes + custoAndares
    }
    
    const valorBase = custoVeiculo + custoTotalAjudantes
    const valorFinal = valorBase * tamanhoObj.multiplicador
    
    setTotalTempoReal(valorFinal)
  }

  useEffect(() => {
    calcularTotalTempoReal()
  }, [formData])

  const handleOrigemSelect = (place) => {
    setCoordenadasOrigem({ lat: place.lat, lng: place.lng })
    // Extrair cidade e setor do endereço
    const partes = place.endereco.split(', ')
    if (partes.length >= 2) {
      setFormData(prev => ({
        ...prev,
        origem: partes[partes.length - 2] + ', ' + partes[partes.length - 1], // Cidade, Estado
        setorOrigem: partes[0] // Setor/Bairro
      }))
    }
  }

  const handleDestinoSelect = (place) => {
    setCoordenadasDestino({ lat: place.lat, lng: place.lng })
    // Extrair cidade e setor do endereço
    const partes = place.endereco.split(', ')
    if (partes.length >= 2) {
      setFormData(prev => ({
        ...prev,
        destino: partes[partes.length - 2] + ', ' + partes[partes.length - 1], // Cidade, Estado
        setorDestino: partes[0] // Setor/Bairro
      }))
    }
  }

  const calcularDistanciaFrete = async () => {
    if (!formData.origem || !formData.destino) {
      alert('Por favor, preencha origem e destino para calcular a distância!')
      return
    }

    setCalculandoDistancia(true)
    
    try {
      let distancia = 0
      
      // Se temos coordenadas, calcular distância precisa
      if (coordenadasOrigem && coordenadasDestino) {
        distancia = calcularDistancia(coordenadasOrigem, coordenadasDestino)
      } else {
        // Usar a API existente como fallback
        const response = await fetch(`/api/calcular-distancia?origem=${encodeURIComponent(formData.origem)}&destino=${encodeURIComponent(formData.destino)}`)
        
        if (response.ok) {
          const data = await response.json()
          distancia = data.distancia
        } else {
          throw new Error('Erro na API')
        }
      }
      
      setFormData(prev => ({
        ...prev,
        distancia: Math.round(distancia)
      }))
      alert(`Distância calculada: ${Math.round(distancia)} km`)
    } catch (error) {
      console.error('Erro ao calcular distância:', error)
      alert('Erro ao calcular distância. Verifique sua conexão.')
    } finally {
      setCalculandoDistancia(false)
    }
  }

  const calcularFrete = () => {
    if (!formData.origem || !formData.destino) {
      alert('Por favor, preencha origem e destino!')
      return
    }

    const distancia = parseFloat(formData.distancia) || 50
    const ajudantes = parseInt(formData.ajudantes)
    const andarOrigem = parseInt(formData.andarOrigem) || 0
    const andarDestino = parseInt(formData.andarDestino) || 0
    
    const tipoVeiculoObj = tiposVeiculo.find(t => t.value === 'caminhao') // Sempre usar caminhão
    const tamanhoObj = tamanhosMudanca.find(t => t.value === formData.tamanhoMudanca)
    const tipoAjudanteObj = tiposAjudantes.find(t => t.value === formData.tipoAjudantes)
    
    // 1. Cálculo do veículo
    const custoVeiculo = tipoVeiculoObj.base + (distancia * tipoVeiculoObj.km)
    
    // 2. Cálculo dos ajudantes
    let custoTotalAjudantes = 0
    
    if (formData.tipoAjudantes === 'empresa') {
      // Verificar se há pelo menos um apartamento
      const temApartamento = formData.tipoOrigem === 'apartamento' || formData.tipoDestino === 'apartamento'
      const valorBaseAjudante = temApartamento ? 180 : 150
      
      // Custo base dos ajudantes
      const custoBaseAjudantes = ajudantes * valorBaseAjudante
      
      // Adicional por andar sem elevador
      let custoAndares = 0
      
      // Origem
      if (formData.tipoOrigem === 'apartamento' && !formData.elevadorOrigem && andarOrigem > 1) {
        custoAndares += ajudantes * (andarOrigem * 20)
      }
      
      // Destino
      if (formData.tipoDestino === 'apartamento' && !formData.elevadorDestino && andarDestino > 1) {
        custoAndares += ajudantes * (andarDestino * 20)
      }
      
      custoTotalAjudantes = custoBaseAjudantes + custoAndares
    }
    
    // 3. Aplicar multiplicador do tamanho da mudança
    const valorBase = custoVeiculo + custoTotalAjudantes
    const valorFinal = valorBase * tamanhoObj.multiplicador
    
    setResultado({
      valor: valorFinal.toFixed(2),
      veiculo: tipoVeiculoObj.label,
      custoVeiculo: custoVeiculo.toFixed(2),
      distancia,
      ajudantes,
      tipoAjudantes: formData.tipoAjudantes,
      custoTotalAjudantes: custoTotalAjudantes.toFixed(2),
      tamanhoMudanca: tamanhoObj.label,
      multiplicador: tamanhoObj.multiplicador,
      origem: `${formData.origem}${formData.setorOrigem ? ` - ${formData.setorOrigem}` : ''} (${formData.tipoOrigem}${formData.tipoOrigem === 'apartamento' ? `, ${andarOrigem}º andar` : ''})`,
      destino: `${formData.destino}${formData.setorDestino ? ` - ${formData.setorDestino}` : ''} (${formData.tipoDestino}${formData.tipoDestino === 'apartamento' ? `, ${andarDestino}º andar` : ''})`,
      dataDesejada: formData.dataDesejada,
      fotos: formData.fotos.length
    })
  }

  const limparCalculadora = () => {
    // Limpar URLs das fotos para evitar vazamentos de memória
    formData.fotos.forEach(foto => {
      URL.revokeObjectURL(foto.preview)
    })
    
    setFormData({
      origem: '',
      setorOrigem: '',
      tipoOrigem: 'casa',
      andarOrigem: 0,
      elevadorOrigem: false,
      destino: '',
      setorDestino: '',
      tipoDestino: 'casa',
      andarDestino: 0,
      elevadorDestino: false,
      distancia: '',
      ajudantes: 1,
      tipoAjudantes: 'empresa',
      tamanhoMudanca: 'media',
      fotos: [],
      dataDesejada: ''
    })
    setResultado(null)
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        🧮 Calculadora de Frete
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Calcule o valor do seu frete ou mudança de forma rápida e gratuita
      </p>

      {/* Status das Coordenadas */}
      {formData.origem && formData.destino && (
        <div className="mb-4 flex gap-2">
          <div className={`flex-1 p-3 rounded-lg ${coordenadasOrigem ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-center">
              <span className="text-lg mr-2">{coordenadasOrigem ? '✅' : '⏳'}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Origem</p>
                <p className="text-xs text-gray-600">
                  {coordenadasOrigem ? 'Localização confirmada' : 'Aguardando seleção específica'}
                </p>
              </div>
            </div>
          </div>
          <div className={`flex-1 p-3 rounded-lg ${coordenadasDestino ? 'bg-green-50 border border-green-200' : 'bg-yellow-50 border border-yellow-200'}`}>
            <div className="flex items-center">
              <span className="text-lg mr-2">{coordenadasDestino ? '✅' : '⏳'}</span>
              <div>
                <p className="text-sm font-medium text-gray-900">Destino</p>
                <p className="text-xs text-gray-600">
                  {coordenadasDestino ? 'Localização confirmada' : 'Aguardando seleção específica'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Total em Tempo Real */}
      {totalTempoReal > 0 && (
        <div className="mb-6 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-4 animate-pulse">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">💰 Total Estimado</h3>
              <p className="text-sm text-gray-600">
                {coordenadasOrigem && coordenadasDestino ? 'Cálculo preciso com coordenadas' : 'Cálculo aproximado'}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-green-600">R$ {totalTempoReal.toFixed(2)}</p>
              <button
                onClick={() => setCarrinhoAberto(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Ver detalhes →
              </button>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Origem */}
        <div>
          <EnderecoAutocomplete
            label="Ponto de Origem *"
            placeholder="Digite o endereço de origem..."
            value={formData.origem}
            onChange={(value) => setFormData(prev => ({ ...prev, origem: value }))}
            onPlaceSelect={handleOrigemSelect}
          />
          {formData.setorOrigem && (
            <div className="mt-2 p-2 bg-blue-50 rounded-md">
              <p className="text-sm text-blue-800">
                <strong>Setor/Bairro:</strong> {formData.setorOrigem}
              </p>
            </div>
          )}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Local (Origem)
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoOrigem"
                  value="casa"
                  checked={formData.tipoOrigem === 'casa'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">🏠 Casa</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoOrigem"
                  value="apartamento"
                  checked={formData.tipoOrigem === 'apartamento'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">🏢 Apartamento</span>
              </label>
            </div>
            
            {/* Campos específicos para apartamento */}
            {formData.tipoOrigem === 'apartamento' && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Andar
                  </label>
                  <input
                    type="number"
                    name="andarOrigem"
                    value={formData.andarOrigem}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Elevador
                  </label>
                  <select
                    name="elevadorOrigem"
                    value={formData.elevadorOrigem.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, elevadorOrigem: e.target.value === 'true' }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Destino */}
        <div>
          <EnderecoAutocomplete
            label="Ponto de Destino *"
            placeholder="Digite o endereço de destino..."
            value={formData.destino}
            onChange={(value) => setFormData(prev => ({ ...prev, destino: value }))}
            onPlaceSelect={handleDestinoSelect}
          />
          {formData.setorDestino && (
            <div className="mt-2 p-2 bg-green-50 rounded-md">
              <p className="text-sm text-green-800">
                <strong>Setor/Bairro:</strong> {formData.setorDestino}
              </p>
            </div>
          )}
          <div className="mt-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Local (Destino)
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoDestino"
                  value="casa"
                  checked={formData.tipoDestino === 'casa'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">🏠 Casa</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="tipoDestino"
                  value="apartamento"
                  checked={formData.tipoDestino === 'apartamento'}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">🏢 Apartamento</span>
              </label>
            </div>
            
            {/* Campos específicos para apartamento */}
            {formData.tipoDestino === 'apartamento' && (
              <div className="mt-3 grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Andar
                  </label>
                  <input
                    type="number"
                    name="andarDestino"
                    value={formData.andarDestino}
                    onChange={handleInputChange}
                    min="0"
                    placeholder="0"
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Elevador
                  </label>
                  <select
                    name="elevadorDestino"
                    value={formData.elevadorDestino.toString()}
                    onChange={(e) => setFormData(prev => ({ ...prev, elevadorDestino: e.target.value === 'true' }))}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="true">Sim</option>
                    <option value="false">Não</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>




        {/* Distância */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Distância (km)
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              name="distancia"
              value={formData.distancia}
              onChange={handleInputChange}
              placeholder="Ex: 200 (opcional)"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={calcularDistanciaFrete}
              disabled={calculandoDistancia || !formData.origem || !formData.destino}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition duration-300"
            >
              {calculandoDistancia ? '🔄' : '📍'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            💡 Clique para calcular automaticamente
          </p>
        </div>



        {/* Ajudantes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ajudantes *
          </label>
          <select
            name="ajudantes"
            value={formData.ajudantes}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="1">1 ajudante</option>
            <option value="2">2 ajudantes</option>
            <option value="3">3 ajudantes</option>
            <option value="4">4 ajudantes</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            💡 Motorista fica no caminhão. Cada ajudante adicional: +R$ 100,00
          </p>
        </div>

        {/* Tipo de Ajudantes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contratação de Ajudantes
          </label>
          <div className="space-y-2">
            {tiposAjudantes.map(tipo => (
              <label key={tipo.value} className="flex items-center">
                <input
                  type="radio"
                  name="tipoAjudantes"
                  value={tipo.value}
                  checked={formData.tipoAjudantes === tipo.value}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <span className="text-sm">{tipo.label}</span>
                {tipo.custo > 0 && (
                  <span className="text-xs text-gray-500 ml-2">(R$ {tipo.custo} cada)</span>
                )}
              </label>
            ))}
          </div>
        </div>

        {/* Tamanho da Mudança */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tamanho da Mudança
          </label>
          <div className="space-y-2">
            {tamanhosMudanca.map(tamanho => (
              <label key={tamanho.value} className="flex items-center">
                <input
                  type="radio"
                  name="tamanhoMudanca"
                  value={tamanho.value}
                  checked={formData.tamanhoMudanca === tamanho.value}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                <div>
                  <span className="text-sm font-medium">{tamanho.label}</span>
                  <p className="text-xs text-gray-500">{tamanho.descricao}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Data Desejada */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Data Desejada
          </label>
          <input
            type="date"
            name="dataDesejada"
            value={formData.dataDesejada}
            onChange={handleInputChange}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Data mínima: hoje
          </p>
        </div>

        {/* Upload de Fotos */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Fotos dos Itens Principais (Opcional)
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            💡 Envie fotos dos móveis ou itens principais para melhor avaliação
          </p>
          
          {/* Preview das fotos */}
          {formData.fotos.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Fotos enviadas ({formData.fotos.length}):
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {formData.fotos.map((foto, index) => (
                  <div key={index} className="relative">
                    <img
                      src={foto.preview}
                      alt={foto.name}
                      className="w-full h-20 object-cover rounded border"
                    />
                    <button
                      type="button"
                      onClick={() => removeFoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ×
                    </button>
                    <p className="text-xs text-gray-500 truncate mt-1">{foto.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Botões */}
      <div className="flex gap-4 mt-6">
        <button
          onClick={calcularFrete}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
        >
          🧮 Calcular Frete
        </button>
        <button
          onClick={() => setCarrinhoAberto(true)}
          className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition duration-300"
        >
          🛒 Ver Carrinho
        </button>
        <button
          onClick={limparCalculadora}
          className="flex-1 bg-gray-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-600 transition duration-300"
        >
          🔄 Limpar
        </button>
      </div>

      {/* Resultado */}
      {resultado && (
        <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-4">
            📊 Resultado do Cálculo
          </h3>
                     <div className="grid md:grid-cols-2 gap-4">
             <div>
               <p className="text-sm text-gray-600">Valor Total:</p>
               <p className="text-2xl font-bold text-green-600">
                 R$ {resultado.valor}
               </p>
             </div>
             <div>
               <p className="text-sm text-gray-600">Veículo:</p>
               <p className="text-lg font-semibold text-gray-800">
                 {resultado.veiculo} - R$ {resultado.custoVeiculo}
               </p>
             </div>
             <div>
               <p className="text-sm text-gray-600">Origem:</p>
               <p className="text-lg font-semibold text-gray-800">
                 {resultado.origem}
               </p>
             </div>
             <div>
               <p className="text-sm text-gray-600">Destino:</p>
               <p className="text-lg font-semibold text-gray-800">
                 {resultado.destino}
               </p>
             </div>
             <div>
               <p className="text-sm text-gray-600">Ajudantes:</p>
               <p className="text-lg font-semibold text-gray-800">
                 {resultado.ajudantes} ajudante{resultado.ajudantes > 1 ? 's' : ''} ({resultado.tipoAjudantes === 'empresa' ? 'da empresa' : 'próprios'})
               </p>
               {resultado.tipoAjudantes === 'empresa' && (
                 <p className="text-sm text-gray-500">Custo: R$ {resultado.custoTotalAjudantes}</p>
               )}
             </div>
             <div>
               <p className="text-sm text-gray-600">Distância:</p>
               <p className="text-lg font-semibold text-gray-800">
                 {resultado.distancia} km
               </p>
             </div>
             <div>
               <p className="text-sm text-gray-600">Tamanho da Mudança:</p>
               <p className="text-lg font-semibold text-gray-800">
                 {resultado.tamanhoMudanca} (x{resultado.multiplicador})
               </p>
             </div>
             {resultado.dataDesejada && (
               <div>
                 <p className="text-sm text-gray-600">Data Desejada:</p>
                 <p className="text-lg font-semibold text-gray-800">
                   {new Date(resultado.dataDesejada).toLocaleDateString('pt-BR')}
                 </p>
               </div>
             )}
             {resultado.fotos > 0 && (
               <div>
                 <p className="text-sm text-gray-600">Fotos Enviadas:</p>
                 <p className="text-lg font-semibold text-gray-800">
                   {resultado.fotos} foto{resultado.fotos > 1 ? 's' : ''}
                 </p>
               </div>
             )}
           </div>
          
                     <div className="mt-4 p-4 bg-blue-50 rounded-lg">
             <p className="text-sm text-blue-800">
               <strong>💡 Observação:</strong> Valor estimado. Para orçamento preciso, entre em contato.
             </p>
           </div>

          <div className="mt-4 flex gap-3">
            <a
              href="/form"
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-700 transition duration-300"
            >
              📋 Solicitar Orçamento Oficial
            </a>
            <a
              href="https://api.whatsapp.com/send?phone=62991103510&text=Ol%C3%A1!%20vim%20pelo%20site%20gostaria%20de%20um%20or%C3%A7amento%20de%20frete!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg text-center font-semibold hover:bg-green-600 transition duration-300"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      )}

             {/* Informações Adicionais */}
       <div className="mt-6 bg-gray-50 rounded-lg p-4">
         <h4 className="font-semibold text-gray-900 mb-2">ℹ️ Como funciona o cálculo:</h4>
         <ul className="text-sm text-gray-600 space-y-1">
           <li>• <strong>Veículo:</strong> Caminhão - R$ 150,00 + R$ 3,50/km</li>
           <li>• <strong>Ajudantes (casa):</strong> R$ 150,00 cada (se contratados)</li>
           <li>• <strong>Ajudantes (apto):</strong> R$ 180,00 cada (se contratados)</li>
           <li>• <strong>Adicional por andar:</strong> +R$ 20,00 por andar por ajudante (sem elevador)</li>
           <li>• <strong>Elevador:</strong> Não adiciona custo</li>
           <li>• <strong>Mudança Pequena:</strong> x1,0 (até 2 cômodos)</li>
           <li>• <strong>Mudança Média:</strong> x1,2 (3-4 cômodos)</li>
           <li>• <strong>Mudança Grande:</strong> x1,5 (5+ cômodos)</li>
         </ul>
         <div className="mt-3 p-3 bg-blue-50 rounded-lg">
           <p className="text-sm text-blue-800">
             <strong>💡 Importante:</strong> Motorista fica no caminhão. Ajudantes fazem carregamento/descarregamento.
           </p>
         </div>
         <div className="mt-2 p-3 bg-green-50 rounded-lg">
           <p className="text-sm text-green-800">
             <strong>📸 Fotos:</strong> Envie fotos dos itens principais para um orçamento mais preciso.
           </p>
         </div>
       </div>

      {/* Carrinho */}
      <CarrinhoFrete 
        formData={formData}
        isVisible={carrinhoAberto}
        onClose={() => setCarrinhoAberto(false)}
      />
    </div>
  )
}

export default FreteCalculator 