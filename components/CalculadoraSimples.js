import { useState } from 'react'
import { buscarLugares } from '../data/cidades-setores'

const CalculadoraSimples = () => {
  const [origem, setOrigem] = useState('')
  const [destino, setDestino] = useState('')
  const [tipoAjudantes, setTipoAjudantes] = useState('empresa')
  const [quantidadeAjudantes, setQuantidadeAjudantes] = useState(1)
  const [tamanhoMudanca, setTamanhoMudanca] = useState('media')
  const [tipoImovelOrigem, setTipoImovelOrigem] = useState('casa')
  const [tipoImovelDestino, setTipoImovelDestino] = useState('casa')
  const [elevadorOrigem, setElevadorOrigem] = useState(false)
  const [elevadorDestino, setElevadorDestino] = useState(false)
  const [andarOrigem, setAndarOrigem] = useState(0)
  const [andarDestino, setAndarDestino] = useState(0)
  const [dataDesejada, setDataDesejada] = useState('')
  const [observacao, setObservacao] = useState('')
  const [nome, setNome] = useState('')
  const [celular, setCelular] = useState('')
  const [resultado, setResultado] = useState(null)
  const [sugestoesOrigem, setSugestoesOrigem] = useState([])
  const [sugestoesDestino, setSugestoesDestino] = useState([])
  const [mostrarSugestoesOrigem, setMostrarSugestoesOrigem] = useState(false)
  const [mostrarSugestoesDestino, setMostrarSugestoesDestino] = useState(false)

  const buscarOrigem = (query) => {
    setOrigem(query)
    if (query.length >= 2) {
      setSugestoesOrigem(buscarLugares(query))
      setMostrarSugestoesOrigem(true)
    } else {
      setSugestoesOrigem([])
      setMostrarSugestoesOrigem(false)
    }
  }

  const buscarDestino = (query) => {
    setDestino(query)
    if (query.length >= 2) {
      setSugestoesDestino(buscarLugares(query))
      setMostrarSugestoesDestino(true)
    } else {
      setSugestoesDestino([])
      setMostrarSugestoesDestino(false)
    }
  }

  const selecionarOrigem = (lugar) => {
    setOrigem(lugar.endereco)
    setMostrarSugestoesOrigem(false)
  }

  const selecionarDestino = (lugar) => {
    setDestino(lugar.endereco)
    setMostrarSugestoesDestino(false)
  }


  const enviarCotacao = () => {
    if (!origem || !destino || !nome || !celular) return

    // Criar objeto com os dados da solicitação
    const solicitacao = {
      id: Date.now(), // ID simples baseado em timestamp
      data: new Date().toLocaleString('pt-BR'),
      nome,
      celular,
      origem,
      destino,
      tipoAjudantes,
      quantidadeAjudantes,
      tamanhoMudanca,
      tipoImovelOrigem,
      tipoImovelDestino,
      elevadorOrigem,
      elevadorDestino,
      andarOrigem,
      andarDestino,
      dataDesejada,
      observacao,
      status: 'pendente'
    }

    // Salvar no localStorage (simulando banco de dados)
    const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]')
    solicitacoes.push(solicitacao)
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes))

    setResultado(solicitacao)
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-gray-600">Simples, rápido e preciso</p>
      </div>

      {/* Formulário */}
      <div className="space-y-6">
        {/* 1. Setores de Origem e Destino */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2">📍 Locais</h3>
          
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cidade/Setor Origem</label>
            <input
              type="text"
              value={origem}
              onChange={(e) => buscarOrigem(e.target.value)}
              onFocus={() => origem.length >= 2 && setMostrarSugestoesOrigem(true)}
              placeholder="Ex: Goiânia, Setor Marista, Brasília..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
            {mostrarSugestoesOrigem && sugestoesOrigem.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {sugestoesOrigem.map((lugar, index) => (
                  <div
                    key={index}
                    onClick={() => selecionarOrigem(lugar)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{lugar.nome}</p>
                    <p className="text-sm text-gray-500">{lugar.endereco}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cidade/Setor Destino</label>
            <input
              type="text"
              value={destino}
              onChange={(e) => buscarDestino(e.target.value)}
              onFocus={() => destino.length >= 2 && setMostrarSugestoesDestino(true)}
              placeholder="Ex: Aparecida de Goiânia, Setor Sul, São Paulo..."
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
            />
            {mostrarSugestoesDestino && sugestoesDestino.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {sugestoesDestino.map((lugar, index) => (
                  <div
                    key={index}
                    onClick={() => selecionarDestino(lugar)}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  >
                    <p className="font-medium text-gray-900">{lugar.nome}</p>
                    <p className="text-sm text-gray-500">{lugar.endereco}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* 2. Ajudantes */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">👥 Ajudantes</h3>
          <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-4">
            <strong>💡 Dica:</strong> O motorista fica no caminhão para organização dos itens.
          </p>
          
          <div className="space-y-4">
            {/* Tipo de Ajudantes */}
            <div className="space-y-3">
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoAjudantes"
                    value="empresa"
                    checked={tipoAjudantes === 'empresa'}
                    onChange={(e) => setTipoAjudantes(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Contratar ajudantes da empresa</span>
                </label>
              </div>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoAjudantes"
                    value="proprios"
                    checked={tipoAjudantes === 'proprios'}
                    onChange={(e) => setTipoAjudantes(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">Usar ajudantes próprios</span>
                </label>
              </div>
            </div>

            {/* Quantidade de Ajudantes (apenas se contratar da empresa) */}
            {tipoAjudantes === 'empresa' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Quantidade de ajudantes</label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`p-3 border-2 rounded-xl cursor-pointer transition-colors ${
                    quantidadeAjudantes === 1 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="quantidadeAjudantes"
                      value="1"
                      checked={quantidadeAjudantes === 1}
                      onChange={(e) => setQuantidadeAjudantes(parseInt(e.target.value))}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-1">👤</div>
                      <div className="text-sm font-medium">1 Ajudante</div>
                      <div className="text-xs text-gray-500">Básico</div>
                    </div>
                  </label>
                  
                  <label className={`p-3 border-2 rounded-xl cursor-pointer transition-colors ${
                    quantidadeAjudantes === 2 ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <input
                      type="radio"
                      name="quantidadeAjudantes"
                      value="2"
                      checked={quantidadeAjudantes === 2}
                      onChange={(e) => setQuantidadeAjudantes(parseInt(e.target.value))}
                      className="hidden"
                    />
                    <div className="text-center">
                      <div className="text-2xl mb-1">👥</div>
                      <div className="text-sm font-medium">2 Ajudantes</div>
                      <div className="text-xs text-gray-500">Acelerado</div>
                    </div>
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 3. Tamanho da Mudança */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">📦 Tamanho da mudança</h3>
          <div className="grid grid-cols-3 gap-3">
            <label className={`p-3 border-2 rounded-xl cursor-pointer transition-colors ${
              tamanhoMudanca === 'pequena' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                name="tamanhoMudanca"
                value="pequena"
                checked={tamanhoMudanca === 'pequena'}
                onChange={(e) => setTamanhoMudanca(e.target.value)}
                className="hidden"
              />
              <div className="text-center">
                <div className="text-2xl mb-1">📦</div>
                <div className="text-sm font-medium">Pequena</div>
                <div className="text-xs text-gray-500">Até 2 cômodos</div>
              </div>
            </label>
            
            <label className={`p-3 border-2 rounded-xl cursor-pointer transition-colors ${
              tamanhoMudanca === 'media' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                name="tamanhoMudanca"
                value="media"
                checked={tamanhoMudanca === 'media'}
                onChange={(e) => setTamanhoMudanca(e.target.value)}
                className="hidden"
              />
              <div className="text-center">
                <div className="text-2xl mb-1">📦📦</div>
                <div className="text-sm font-medium">Média</div>
                <div className="text-xs text-gray-500">3-4 cômodos</div>
              </div>
            </label>
            
            <label className={`p-3 border-2 rounded-xl cursor-pointer transition-colors ${
              tamanhoMudanca === 'grande' ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}>
              <input
                type="radio"
                name="tamanhoMudanca"
                value="grande"
                checked={tamanhoMudanca === 'grande'}
                onChange={(e) => setTamanhoMudanca(e.target.value)}
                className="hidden"
              />
              <div className="text-center">
                <div className="text-2xl mb-1">📦📦📦</div>
                <div className="text-sm font-medium">Grande</div>
                <div className="text-xs text-gray-500">5+ cômodos</div>
              </div>
            </label>
          </div>
        </div>

        {/* 4. Tipo de Imóvel */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">🏠 Tipo de imóvel</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Origem</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoImovelOrigem"
                    value="casa"
                    checked={tipoImovelOrigem === 'casa'}
                    onChange={(e) => setTipoImovelOrigem(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">🏠 Casa</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoImovelOrigem"
                    value="apartamento"
                    checked={tipoImovelOrigem === 'apartamento'}
                    onChange={(e) => setTipoImovelOrigem(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">🏢 Apartamento</span>
                </label>
              </div>
              {tipoImovelOrigem === 'apartamento' && (
                <div className="mt-3 space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Andar</label>
                    <input
                      type="number"
                      value={andarOrigem}
                      onChange={(e) => setAndarOrigem(parseInt(e.target.value) || 0)}
                      min="0"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={elevadorOrigem}
                      onChange={(e) => setElevadorOrigem(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-xs">Possui elevador</span>
                  </label>
                </div>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destino</label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoImovelDestino"
                    value="casa"
                    checked={tipoImovelDestino === 'casa'}
                    onChange={(e) => setTipoImovelDestino(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">🏠 Casa</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="tipoImovelDestino"
                    value="apartamento"
                    checked={tipoImovelDestino === 'apartamento'}
                    onChange={(e) => setTipoImovelDestino(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-sm">🏢 Apartamento</span>
                </label>
              </div>
              {tipoImovelDestino === 'apartamento' && (
                <div className="mt-3 space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Andar</label>
                    <input
                      type="number"
                      value={andarDestino}
                      onChange={(e) => setAndarDestino(parseInt(e.target.value) || 0)}
                      min="0"
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={elevadorDestino}
                      onChange={(e) => setElevadorDestino(e.target.checked)}
                      className="mr-2"
                    />
                    <span className="text-xs">Possui elevador</span>
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 5. Data Desejada */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">📅 Data desejada</h3>
          <input
            type="date"
            value={dataDesejada}
            onChange={(e) => setDataDesejada(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
          />
        </div>

        {/* 6. Dados de Contato */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">👤 Seus Dados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nome completo *</label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome completo"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Celular *</label>
              <input
                type="tel"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
                placeholder="(62) 99999-9999"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                required
              />
            </div>
          </div>
        </div>

        {/* 7. Observações */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">📝 Observações</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Informações adicionais (opcional)</label>
            <textarea
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              placeholder="Ex: Itens frágeis, horário específico, restrições de acesso..."
              rows={3}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
            />
          </div>
        </div>

        {/* Botão Receber Cotação */}
        <button
          onClick={enviarCotacao}
          disabled={!origem || !destino || !nome || !celular}
          className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none"
        >
          📋 Receber Cotação
        </button>
      </div>

      {/* Confirmação de Cotação */}
      {resultado && (
        <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200">
          <div className="text-center">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Solicitação Enviada!</h3>
            <p className="text-gray-600 mb-4">
              Recebemos sua solicitação de cotação. Em breve entraremos em contato com o orçamento personalizado.
            </p>
            <div className="space-y-2 text-sm text-gray-600 bg-white p-4 rounded-lg">
              <p><strong>Cliente:</strong> {resultado.nome}</p>
              <p><strong>Contato:</strong> {resultado.celular}</p>
              <p><strong>Origem:</strong> {resultado.origem}</p>
              <p><strong>Destino:</strong> {resultado.destino}</p>
              <p><strong>Tamanho:</strong> {resultado.tamanhoMudanca}</p>
              <p><strong>Ajudantes:</strong> {resultado.tipoAjudantes === 'empresa' ? `${resultado.quantidadeAjudantes} da empresa` : 'próprios'}</p>
              <p><strong>Data desejada:</strong> {resultado.dataDesejada || 'Não informada'}</p>
              {resultado.observacao && (
                <p><strong>Observações:</strong> {resultado.observacao}</p>
              )}
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <a
              href="https://api.whatsapp.com/send?phone=5562991103510&text=Olá!%20Vim%20pelo%20site%20e%20gostaria%20de%20um%20orçamento%20de%20frete!"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl font-semibold hover:bg-green-700 transition-colors text-center"
            >
              💬 Falar no WhatsApp
            </a>
            <button 
              onClick={() => setResultado(null)}
              className="flex-1 bg-gray-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-gray-600 transition-colors"
            >
              Nova Cotação
            </button>
          </div>
        </div>
      )}

      {/* Informações */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-500">
          Cotação personalizada baseada nas suas necessidades específicas
        </p>
      </div>
    </div>
  )
}

export default CalculadoraSimples
