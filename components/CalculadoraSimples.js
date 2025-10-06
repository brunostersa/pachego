import { useState, useMemo } from 'react'

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
  const [mostrarTelaSucesso, setMostrarTelaSucesso] = useState(false)
  const [erros, setErros] = useState({})

  // Função para aplicar máscara de telefone
  const formatarTelefone = (valor) => {
    // Remove tudo que não é dígito
    const apenasNumeros = valor.replace(/\D/g, '')
    
    // Aplica a máscara (62) 99999-9999
    if (apenasNumeros.length <= 2) {
      return apenasNumeros
    } else if (apenasNumeros.length <= 7) {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2)}`
    } else {
      return `(${apenasNumeros.slice(0, 2)}) ${apenasNumeros.slice(2, 7)}-${apenasNumeros.slice(7, 11)}`
    }
  }

  const handleCelularChange = (e) => {
    const valorFormatado = formatarTelefone(e.target.value)
    setCelular(valorFormatado)
  }

  const handleOrigemChange = (e) => {
    setOrigem(e.target.value)
    if (erros.origem) {
      setErros(prev => ({ ...prev, origem: null }))
    }
  }

  const handleDestinoChange = (e) => {
    setDestino(e.target.value)
    if (erros.destino) {
      setErros(prev => ({ ...prev, destino: null }))
    }
  }

  const handleNomeChange = (e) => {
    setNome(e.target.value)
    if (erros.nome) {
      setErros(prev => ({ ...prev, nome: null }))
    }
  }

  const handleCelularChangeWithValidation = (e) => {
    const valorFormatado = formatarTelefone(e.target.value)
    setCelular(valorFormatado)
    if (erros.celular) {
      setErros(prev => ({ ...prev, celular: null }))
    }
  }


  const enviarCotacao = () => {
    // Limpar erros anteriores
    setErros({})
    
    // Validar todas as etapas
    if (!validarEtapa1() || !validarEtapa3()) {
      return
    }

    // Criar objeto com os dados da solicitação
    const solicitacao = {
      id: Date.now(), // ID simples baseado em timestamp
      data: new Date().toLocaleString('pt-BR'),
      tipoServico,
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
        try {
          if (typeof window !== 'undefined') {
            const solicitacoes = JSON.parse(localStorage.getItem('solicitacoes') || '[]')
            solicitacoes.push(solicitacao)
            localStorage.setItem('solicitacoes', JSON.stringify(solicitacoes))
            
            // Debug: verificar se salvou
            console.log('Solicitação salva:', solicitacao)
            console.log('Total de solicitações:', solicitacoes.length)
          } else {
            console.log('localStorage não disponível (SSR)')
          }
        } catch (error) {
          console.error('Erro ao salvar solicitação:', error)
        }

        setResultado(solicitacao)
        setMostrarTelaSucesso(true)
  }

  const [etapaAtual, setEtapaAtual] = useState(1)
  const [tipoServico, setTipoServico] = useState('')
  const [servicoSelecionado, setServicoSelecionado] = useState(false)

  const tiposServico = [
    { id: 'mudanca', nome: 'Mudança', icone: '📦', descricao: 'Mudança residencial ou comercial' },
    { id: 'frete-itens', nome: 'Frete de itens', icone: '📋', descricao: 'Transporte de mercadorias' },
    { id: 'guincho-munck', nome: 'Caminhão Guincho Munck', icone: '🏗️', descricao: 'Içamento de itens personalizados' },
    { id: 'aberto', nome: 'Caminhão aberto', icone: '🚚', descricao: 'Carga seca e volumosa' },
    { id: 'bau-rampa', nome: 'Caminhão baú com Rampa', icone: '📦', descricao: 'Carga protegida com facilidade' },
    { id: 'carreta', nome: 'Transporte com carreta', icone: '🚛', descricao: 'Cargas grandes e pesadas' }
  ]

  const etapas = [
    { numero: 1, titulo: "Origem & Destino", icone: "📍", descricao: "Onde está e para onde vai" },
    { numero: 2, titulo: "Detalhes", icone: "📦", descricao: "Informações específicas" },
    { numero: 3, titulo: "Seus Dados", icone: "👤", descricao: "Contato e observações" }
  ]

  const avancarEtapa = () => {
    if (etapaAtual < 3) {
      setEtapaAtual(etapaAtual + 1)
    }
  }

  const voltarEtapa = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1)
    }
  }

  const confirmarServico = () => {
    if (tipoServico) {
      setServicoSelecionado(true)
    }
  }

  const voltarSelecaoServico = () => {
    setServicoSelecionado(false)
    setEtapaAtual(1)
  }

  const voltarEtapaAnterior = () => {
    if (etapaAtual > 1) {
      setEtapaAtual(etapaAtual - 1)
    } else {
      // Se estiver na etapa 1, volta para seleção de serviço
      voltarSelecaoServico()
    }
  }

  // Validações sem efeitos colaterais para uso no JSX
  const validarEtapa1SemEfeito = useMemo(() => {
    return tipoServico && origem.trim() && destino.trim()
  }, [tipoServico, origem, destino])

  const validarEtapa3SemEfeito = useMemo(() => {
    return nome.trim() && celular.trim() && celular.replace(/\D/g, '').length >= 10
  }, [nome, celular])

  // Funções de validação com efeitos colaterais para uso em botões
  const validarEtapa1 = () => {
    const novosErros = {}
    
    if (!tipoServico) {
      novosErros.tipoServico = 'Selecione um tipo de serviço'
    }
    if (!origem.trim()) {
      novosErros.origem = 'Origem é obrigatória'
    }
    if (!destino.trim()) {
      novosErros.destino = 'Destino é obrigatório'
    }
    
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  const validarEtapa2 = () => {
    return true // Sempre válida pois tem valores padrão
  }

  const validarEtapa3 = () => {
    const novosErros = {}
    
    if (!nome.trim()) {
      novosErros.nome = 'Nome é obrigatório'
    } else if (nome.trim().length < 2) {
      novosErros.nome = 'Nome deve ter pelo menos 2 caracteres'
    }
    
    if (!celular.trim()) {
      novosErros.celular = 'Celular é obrigatório'
    } else if (celular.replace(/\D/g, '').length < 10) {
      novosErros.celular = 'Celular deve ter pelo menos 10 dígitos'
    }
    
    setErros(novosErros)
    return Object.keys(novosErros).length === 0
  }

  return (
    <>
      <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8">
      {/* Tela de Sucesso */}
      {mostrarTelaSucesso ? (
        <div className="text-center py-8 sm:py-12">
          <div className="mb-6 flex justify-center">
            <img 
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExMzVkN3Ztdml2c2gxNWEya3d5cWR0amtteHhsZTNhazFmN2tkcTlnbiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/TIeTxUeyPeFI771jTF/giphy.gif" 
              alt="Sucesso" 
              className="w-24 h-24 sm:w-32 sm:h-32"
            />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Solicitação Enviada!
          </h2>
          <p className="text-gray-600 mb-8 text-sm sm:text-base max-w-md mx-auto">
            Recebemos sua solicitação de cotação. Em breve entraremos em contato com o orçamento personalizado.
          </p>
          
          {/* Resumo da Solicitação */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto">
            <h3 className="font-semibold text-gray-900 mb-4 text-center">Resumo da sua solicitação</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Serviço:</strong> {tiposServico.find(s => s.id === resultado?.tipoServico)?.nome || resultado?.tipoServico}</p>
              <p><strong>Cliente:</strong> {resultado?.nome}</p>
              <p><strong>Contato:</strong> {resultado?.celular}</p>
              <p><strong>Origem:</strong> {resultado?.origem}</p>
              <p><strong>Destino:</strong> {resultado?.destino}</p>
              {resultado?.tipoServico === 'mudanca' && (
                <>
                  <p><strong>Tamanho:</strong> {resultado?.tamanhoMudanca}</p>
                  <p><strong>Ajudantes:</strong> {resultado?.tipoAjudantes === 'empresa' ? `${resultado?.quantidadeAjudantes} da empresa` : 'próprios'}</p>
                </>
              )}
              <p><strong>Data desejada:</strong> {resultado?.dataDesejada || 'Não informada'}</p>
              {resultado?.observacao && (
                <p><strong>Observações:</strong> {resultado?.observacao}</p>
              )}
            </div>
          </div>
          
          {/* Botões de Ação */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <a
              href="https://api.whatsapp.com/send?phone=62991103510&text=Estou%20fazendo%20um%20orçamento,%20pode%20me%20ajudar?"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors text-center text-sm sm:text-base"
            >
              💬 Falar no WhatsApp
            </a>
            <button 
              onClick={() => {
                setMostrarTelaSucesso(false)
                setResultado(null)
                setServicoSelecionado(false)
                setEtapaAtual(1)
                setTipoServico('')
                setOrigem('')
                setDestino('')
                setNome('')
                setCelular('')
                setObservacao('')
                setDataDesejada('')
              }}
              className="px-8 py-3 bg-gray-500 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors text-sm sm:text-base"
            >
              Nova Cotação
            </button>
          </div>

          {/* Assinatura da Empresa */}
          <div className="border-t border-gray-200 pt-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800 mb-2">Pá-chego Fretes ❤️</div>
              <p className="text-sm text-gray-600 mb-2">
                Empresa goiana que atende todo o território nacional
              </p>
              <p className="text-xs text-gray-500 italic">
                Criada por uma equipe que pensa na experiência do cliente
              </p>
            </div>
          </div>
        </div>
      ) : !servicoSelecionado ? (
        <div className="space-y-6 sm:space-y-8">
          {/* Seletor de Tipo de Serviço */}
          <div>
            <div className="text-center mb-6 sm:mb-8 pt-4">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 px-2">⚙️ Escolha o tipo de serviço</h2>
              <p className="text-gray-600 text-sm sm:text-base px-4">Selecione o serviço que melhor atende sua necessidade</p>
            </div>

            <div className="space-y-3">
              {tiposServico.map((servico) => (
                <label
                  key={servico.id}
                  className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-lg ${
                    tipoServico === servico.id
                      ? 'border-blue-500 bg-blue-50 shadow-md'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tipoServico"
                    value={servico.id}
                    checked={tipoServico === servico.id}
                    onChange={(e) => setTipoServico(e.target.value)}
                    className="hidden"
                  />
                  <div className="flex items-center w-full">
                    <div className="text-3xl sm:text-4xl mr-4">{servico.icone}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-base sm:text-lg mb-1">{servico.nome}</div>
                      <div className="text-sm text-gray-600">{servico.descricao}</div>
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      tipoServico === servico.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-gray-300'
                    }`}>
                      {tipoServico === servico.id && (
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      )}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            {/* Botão Continuar - Fixo no Bottom */}
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
              <div className="container mx-auto max-w-4xl">
                <div className="flex justify-center">
                  <button
                    onClick={confirmarServico}
                    disabled={!tipoServico}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none text-sm sm:text-base"
                  >
                    Continuar →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Header Compacto com Serviço Selecionado */}
          <div className="flex items-center justify-between mb-4 sm:mb-6 p-3 bg-gray-50 rounded-xl">
            <button
              onClick={voltarEtapaAnterior}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
              title="Voltar etapa anterior"
            >
              <span className="text-lg">←</span>
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-lg">{tiposServico.find(s => s.id === tipoServico)?.icone}</span>
              <span className="text-sm font-semibold text-gray-900">
                {tiposServico.find(s => s.id === tipoServico)?.nome}
              </span>
            </div>
            <div className="w-8"></div> {/* Espaçador para centralizar */}
          </div>

          {/* Timeline */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-between relative px-2">
              {/* Linha inicial antes do primeiro círculo */}
              <div className={`absolute top-5 sm:top-6 left-0 h-0.5 w-1/2 ${
                etapaAtual > 1 ? 'bg-blue-500' : 'bg-gray-300'
              }`} style={{zIndex: -1}} />
              
              {etapas.map((etapa, index) => (
                <div key={etapa.numero} className="flex flex-col items-center relative z-10 flex-1">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-white font-bold text-sm sm:text-lg transition-all duration-300 ${
                    etapaAtual >= etapa.numero 
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg' 
                      : 'bg-gray-300'
                  }`}>
                    {etapaAtual > etapa.numero ? '✓' : etapa.numero}
                  </div>
                  <div className="mt-2 text-center px-1">
                    <p className={`text-xs sm:text-sm font-semibold ${
                      etapaAtual >= etapa.numero ? 'text-blue-600' : 'text-gray-400'
                    }`}>
                      {etapa.titulo}
                    </p>
                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">{etapa.descricao}</p>
                  </div>
                  {index < etapas.length - 1 && (
                    <div className={`absolute top-5 sm:top-6 left-1/2 h-0.5 ${
                      etapaAtual > etapa.numero ? 'bg-blue-500' : 'bg-gray-300'
                    }`} style={{width: 'calc(100% - 1.25rem)', transform: 'translateX(50%)', zIndex: -1}} />
                  )}
                </div>
              ))}
              
              {/* Linha final após o último círculo */}
              <div className={`absolute top-5 sm:top-6 right-0 h-0.5 w-1/2 ${
                etapaAtual >= etapas.length ? 'bg-blue-500' : 'bg-gray-300'
              }`} style={{zIndex: -1}} />
            </div>
          </div>

          {/* Formulário por Etapas */}
          <div className="space-y-6 sm:space-y-8">
            {/* ETAPA 1: Origem & Destino */}
            {etapaAtual === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* Origem */}
              <div className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cidade/Setor Origem</label>
                  <input
                    type="text"
                    value={origem}
                    onChange={handleOrigemChange}
                    placeholder="Ex: Goiânia, Setor Marista, Brasília..."
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base shadow-sm ${
                      erros.origem 
                        ? 'border-red-500 bg-red-50 focus:bg-red-50 focus:border-red-500' 
                        : 'border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500'
                    }`}
                    required
                    aria-required="true"
                    tabIndex={1}
                    autoComplete="address-line1"
                  />
                  {erros.origem && (
                    <p className="mt-1 text-sm text-red-600">{erros.origem}</p>
                  )}
                </div>

                {/* Tipo de Imóvel Origem - apenas para mudança */}
                {tipoServico === 'mudanca' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de imóvel de origem</label>
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
                )}
              </div>

              {/* Destino */}
              <div className="space-y-4">
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cidade/Setor Destino</label>
                  <input
                    type="text"
                    value={destino}
                    onChange={handleDestinoChange}
                    placeholder="Ex: Aparecida de Goiânia, Setor Sul, São Paulo..."
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base shadow-sm ${
                      erros.destino 
                        ? 'border-red-500 bg-red-50 focus:bg-red-50 focus:border-red-500' 
                        : 'border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500'
                    }`}
                    required
                    aria-required="true"
                    tabIndex={2}
                    autoComplete="address-line2"
                  />
                  {erros.destino && (
                    <p className="mt-1 text-sm text-red-600">{erros.destino}</p>
                  )}
                </div>

                {/* Tipo de Imóvel Destino - apenas para mudança */}
                {tipoServico === 'mudanca' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Tipo de imóvel de destino</label>
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
                )}
              </div>
            </div>

                {/* Botões de Navegação Etapa 1 - Fixos no Bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                  <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-center">
                      <button
                        onClick={avancarEtapa}
                        disabled={!validarEtapa1SemEfeito}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none text-sm sm:text-base"
                      >
                        Continuar →
                      </button>
                    </div>
                  </div>
                </div>
          </div>
        )}

            {/* ETAPA 2: Detalhes */}
            {etapaAtual === 2 && (
              <div className="space-y-6">

            <div className="space-y-8">
              {/* Campos específicos para Mudança */}
              {tipoServico === 'mudanca' && (
                <>
                  {/* Ajudantes */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">👥 Ajudantes</h3>
                    <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-4">
                      <strong>💡 Dica:</strong> O motorista fica no caminhão para organização dos itens.
                    </p>
                    
                    <div className="space-y-4">
                      {/* Tipo de Ajudantes */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <label className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                          tipoAjudantes === 'empresa' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="tipoAjudantes"
                            value="empresa"
                            checked={tipoAjudantes === 'empresa'}
                            onChange={(e) => setTipoAjudantes(e.target.value)}
                            className="hidden"
                          />
                          <div className="text-center">
                            <div className="text-2xl mb-2">🏢</div>
                            <div className="text-sm font-medium text-gray-900">Contratar da empresa</div>
                            <div className="text-xs text-gray-500 mt-1">Profissionais especializados</div>
                          </div>
                        </label>
                        
                        <label className={`p-4 border-2 rounded-xl cursor-pointer transition-colors ${
                          tipoAjudantes === 'proprios' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <input
                            type="radio"
                            name="tipoAjudantes"
                            value="proprios"
                            checked={tipoAjudantes === 'proprios'}
                            onChange={(e) => setTipoAjudantes(e.target.value)}
                            className="hidden"
                          />
                          <div className="text-center">
                            <div className="text-2xl mb-2">👥</div>
                            <div className="text-sm font-medium text-gray-900">Usar próprios</div>
                            <div className="text-xs text-gray-500 mt-1">Ajudantes familiares/amigos</div>
                          </div>
                        </label>
                      </div>

                      {/* Quantidade de Ajudantes (apenas se contratar da empresa) */}
                      {tipoAjudantes === 'empresa' && (
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">👥 Quantidade de ajudantes</h3>
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

                  {/* Tamanho da Mudança */}
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
                </>
              )}

              {/* Campos para outros tipos de serviço */}
              {tipoServico !== 'mudanca' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">📋 Informações do Serviço</h3>
                  <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg mb-4">
                    <strong>💡 Dica:</strong> Descreva detalhadamente o que precisa transportar para um orçamento mais preciso.
                  </p>
                </div>
              )}

              {/* Data Desejada */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">📅 Data desejada</h3>
                <input
                  type="date"
                  value={dataDesejada}
                  onChange={(e) => setDataDesejada(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors bg-gray-50 focus:bg-white shadow-sm"
                />
              </div>
            </div>

                {/* Botões de Navegação Etapa 2 - Fixos no Bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                  <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-center">
                      <button
                        onClick={avancarEtapa}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-200 transform hover:scale-105 text-sm sm:text-base"
                      >
                        Continuar →
                      </button>
                    </div>
                  </div>
                </div>
          </div>
        )}

            {/* ETAPA 3: Seus Dados */}
            {etapaAtual === 3 && (
              <div className="space-y-6">

            <div className="space-y-8">
              {/* Dados de Contato */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">👤 Dados de Contato</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primeiro nome *</label>
                    <input
                      type="text"
                      value={nome}
                      onChange={handleNomeChange}
                      placeholder="Exemplo: Maria"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors placeholder-gray-400 text-sm sm:text-base shadow-sm ${
                        erros.nome 
                          ? 'border-red-500 bg-red-50 focus:bg-red-50 focus:border-red-500' 
                          : 'border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500'
                      }`}
                      required
                      aria-required="true"
                      tabIndex={1}
                      autoComplete="given-name"
                      minLength={2}
                    />
                    {erros.nome && (
                      <p className="mt-1 text-sm text-red-600">{erros.nome}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Celular WhatsApp *</label>
                    <input
                      type="tel"
                      value={celular}
                      onChange={handleCelularChangeWithValidation}
                      placeholder="(62) 99999-9999"
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 rounded-xl focus:outline-none transition-colors text-sm sm:text-base shadow-sm ${
                        erros.celular 
                          ? 'border-red-500 bg-red-50 focus:bg-red-50 focus:border-red-500' 
                          : 'border-gray-300 bg-gray-50 focus:bg-white focus:border-blue-500'
                      }`}
                      required
                      aria-required="true"
                      tabIndex={2}
                      autoComplete="tel"
                      minLength={14}
                      maxLength={15}
                    />
                    {erros.celular && (
                      <p className="mt-1 text-sm text-red-600">{erros.celular}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Observações */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-200 pb-2 mb-4">📝 Observações</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Informações adicionais (opcional)</label>
                  <textarea
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    placeholder="Ex: Itens frágeis, horário específico, restrições de acesso..."
                    rows={3}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none text-sm sm:text-base bg-gray-50 focus:bg-white shadow-sm"
                    tabIndex={3}
                    maxLength={500}
                  />
                </div>
              </div>
            </div>

                {/* Botões de Navegação Etapa 3 - Fixos no Bottom */}
                <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-40">
                  <div className="container mx-auto max-w-4xl">
                    <div className="flex justify-center">
                      <button
                        onClick={enviarCotacao}
                        disabled={!validarEtapa3SemEfeito}
                        className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-xl hover:from-green-700 hover:to-green-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 disabled:transform-none text-sm sm:text-base"
                      >
                        📋 Receber Cotação
                      </button>
                    </div>
                  </div>
                </div>
          </div>
        )}
      </div>

        </>
      )}

      </div>
    </>
  )
}

export default CalculadoraSimples
