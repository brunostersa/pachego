import { useState, useEffect } from 'react'
import Head from 'next/head'
import Favicon from '../components/Favicon'

const AdminPage = () => {
  const [solicitacoes, setSolicitacoes] = useState([])
  const [filtroStatus, setFiltroStatus] = useState('todos')
  const [solicitacaoSelecionada, setSolicitacaoSelecionada] = useState(null)
  const [mostrarModalProposta, setMostrarModalProposta] = useState(false)
  const [valorProposta, setValorProposta] = useState('')
  const [solicitacaoParaProposta, setSolicitacaoParaProposta] = useState(null)
  const [propostaGerada, setPropostaGerada] = useState(false)
  const [linkProposta, setLinkProposta] = useState('')
  const [mostrarDetalhes, setMostrarDetalhes] = useState(false)
  const [timeline, setTimeline] = useState([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Marcar que estamos no cliente
    setIsClient(true)
    
    // Carregar solicitações do localStorage
    const carregarSolicitacoes = () => {
      try {
        console.log('=== CARREGANDO SOLICITAÇÕES ===')
        console.log('Ambiente:', process.env.NODE_ENV)
        console.log('URL:', window.location.href)
        console.log('isClient:', isClient)
        
        const dados = localStorage.getItem('solicitacoes')
        console.log('Dados brutos do localStorage:', dados)
        
        if (dados) {
          const parsed = JSON.parse(dados)
          console.log('Solicitações carregadas:', parsed.length)
          console.log('Dados:', parsed)
          setSolicitacoes(parsed)
        } else {
          console.log('Nenhuma solicitação encontrada no localStorage')
        }
        console.log('=== FIM CARREGAMENTO ===')
      } catch (error) {
        console.error('Erro ao carregar solicitações:', error)
      }
    }

    carregarSolicitacoes()
    
    // Listener para detectar mudanças no localStorage
    const handleStorageChange = (e) => {
      if (e.key === 'solicitacoes') {
        console.log('Storage mudou, recarregando...')
        carregarSolicitacoes()
      }
    }
    
    window.addEventListener('storage', handleStorageChange)
    
    // Atualizar a cada 5 segundos
    const interval = setInterval(carregarSolicitacoes, 5000)
    
    return () => {
      clearInterval(interval)
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  const filtrarSolicitacoes = () => {
    if (filtroStatus === 'todos') {
      return solicitacoes
    }
    return solicitacoes.filter(s => s.status === filtroStatus)
  }

  const atualizarStatus = (id, novoStatus) => {
    const solicitacoesAtualizadas = solicitacoes.map(s => 
      s.id === id ? { ...s, status: novoStatus } : s
    )
    setSolicitacoes(solicitacoesAtualizadas)
    localStorage.setItem('solicitacoes', JSON.stringify(solicitacoesAtualizadas))
  }

  const excluirSolicitacao = (id) => {
    if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
      const solicitacoesAtualizadas = solicitacoes.filter(s => s.id !== id)
      setSolicitacoes(solicitacoesAtualizadas)
      localStorage.setItem('solicitacoes', JSON.stringify(solicitacoesAtualizadas))
    }
  }

  const abrirDetalhes = (solicitacao) => {
    setSolicitacaoSelecionada(solicitacao)
    setMostrarDetalhes(true)
    carregarTimeline(solicitacao.id)
  }

  const carregarTimeline = (solicitacaoId) => {
    // Carregar timeline do localStorage ou criar uma inicial
    const timelineData = localStorage.getItem(`timeline_${solicitacaoId}`)
    if (timelineData) {
      setTimeline(JSON.parse(timelineData))
    } else {
      // Timeline inicial baseada na solicitação
      const timelineInicial = [
        {
          id: 1,
          tipo: 'solicitacao',
          titulo: 'Solicitação Recebida',
          descricao: 'Cliente enviou solicitação de cotação',
          data: new Date().toISOString(),
          status: 'concluido'
        }
      ]
      setTimeline(timelineInicial)
      localStorage.setItem(`timeline_${solicitacaoId}`, JSON.stringify(timelineInicial))
    }
  }

  const adicionarEventoTimeline = (tipo, titulo, descricao) => {
    if (!solicitacaoSelecionada) return

    const novoEvento = {
      id: Date.now(),
      tipo,
      titulo,
      descricao,
      data: new Date().toISOString(),
      status: 'concluido'
    }

    const novaTimeline = [...timeline, novoEvento]
    setTimeline(novaTimeline)
    localStorage.setItem(`timeline_${solicitacaoSelecionada.id}`, JSON.stringify(novaTimeline))
  }

  const abrirModalProposta = (solicitacao) => {
    setSolicitacaoParaProposta(solicitacao)
    setValorProposta('')
    setPropostaGerada(false)
    setLinkProposta('')
    setMostrarModalProposta(true)
  }

  const gerarPDF = () => {
    if (!valorProposta || !solicitacaoParaProposta) return

    // Criar conteúdo do PDF baseado no exemplo
    const dataAtual = new Date().toLocaleDateString('pt-BR')
    const valorFormatado = parseFloat(valorProposta).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    // Gerar ID único para a proposta
    const propostaId = `proposta_${Date.now()}`
    const linkPropostaGerado = `${window.location.origin}/proposta/${propostaId}`

    const conteudoPDF = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Proposta de Frete - Pá-chego</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #2563eb; margin-bottom: 10px; }
          .subtitle { color: #666; font-size: 14px; }
          .section { margin: 20px 0; }
          .section-title { font-size: 18px; font-weight: bold; color: #333; margin-bottom: 10px; border-bottom: 2px solid #2563eb; padding-bottom: 5px; }
          .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 15px 0; }
          .info-item { margin: 8px 0; }
          .info-label { font-weight: bold; color: #555; }
          .info-value { color: #333; }
          .valor-destaque { font-size: 24px; font-weight: bold; color: #059669; text-align: center; background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .observacoes { background: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; }
          .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
          .badge { display: inline-block; background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 4px; font-size: 12px; margin-left: 8px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">PÁ-CHEGO FRETES</div>
          <div class="subtitle">Seu orçamento Chegou ;)</div>
        </div>

        <div class="section">
          <div class="section-title">📋 Dados da Solicitação</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Cliente:</div>
              <div class="info-value">${solicitacaoParaProposta.nome}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Contato:</div>
              <div class="info-value">${solicitacaoParaProposta.celular}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Data da Solicitação:</div>
              <div class="info-value">${solicitacaoParaProposta.data}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Data Desejada:</div>
              <div class="info-value">${solicitacaoParaProposta.dataDesejada || 'Não informada'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🚚 Detalhes do Frete</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Origem:</div>
              <div class="info-value">${solicitacaoParaProposta.origem}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Destino:</div>
              <div class="info-value">${solicitacaoParaProposta.destino}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Tamanho da Mudança:</div>
              <div class="info-value">${solicitacaoParaProposta.tamanhoMudanca} <span class="badge">${solicitacaoParaProposta.tamanhoMudanca === 'pequena' ? 'Até 2 cômodos' : solicitacaoParaProposta.tamanhoMudanca === 'media' ? '3-4 cômodos' : '5+ cômodos'}</span></div>
            </div>
            <div class="info-item">
              <div class="info-label">Ajudantes:</div>
              <div class="info-value">${solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} da empresa` : 'Próprios'}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">🏠 Informações dos Imóveis</div>
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">Imóvel de Origem:</div>
              <div class="info-value">${solicitacaoParaProposta.tipoImovelOrigem === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}${solicitacaoParaProposta.tipoImovelOrigem === 'apartamento' && solicitacaoParaProposta.andarOrigem > 0 ? ` - ${solicitacaoParaProposta.andarOrigem}º andar` : ''}${solicitacaoParaProposta.tipoImovelOrigem === 'apartamento' && solicitacaoParaProposta.elevadorOrigem ? ' (com elevador)' : ''}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Imóvel de Destino:</div>
              <div class="info-value">${solicitacaoParaProposta.tipoImovelDestino === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}${solicitacaoParaProposta.tipoImovelDestino === 'apartamento' && solicitacaoParaProposta.andarDestino > 0 ? ` - ${solicitacaoParaProposta.andarDestino}º andar` : ''}${solicitacaoParaProposta.tipoImovelDestino === 'apartamento' && solicitacaoParaProposta.elevadorDestino ? ' (com elevador)' : ''}</div>
            </div>
          </div>
        </div>

        ${solicitacaoParaProposta.observacao ? `
        <div class="section">
          <div class="section-title">📝 Observações</div>
          <div class="observacoes">
            ${solicitacaoParaProposta.observacao}
          </div>
        </div>
        ` : ''}

        <div class="valor-destaque">
          💰 VALOR DA PROPOSTA: ${valorFormatado}
        </div>

        <div class="section">
          <div class="section-title">✅ O que está incluído</div>
          <ul>
            <li>Veículo adequado para o tamanho da mudança</li>
            <li>${solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} ajudante(s) profissional(is)` : 'Suporte para seus ajudantes próprios'}</li>
            <li>Atendimento personalizado</li>
          </ul>
        </div>

        <div class="section">
          <div class="section-title">📞 Próximos Passos</div>
          <p>Para confirmar este orçamento ou esclarecer dúvidas, entre em contato conosco:</p>
          <ul>
            <li><strong>WhatsApp:</strong> (62) 99110-3510</li>
            <li><strong>Email:</strong> contato@pachego.com.br</li>
            <li><strong>Site:</strong> www.pachego.com.br</li>
          </ul>
        </div>

        <div class="footer">
          <p>Este orçamento é válido por 7 dias a partir da data de emissão.</p>
          <p>Pá-chego Fretes - Sua mudança com segurança e qualidade!</p>
          <p>Emitido em: ${dataAtual}</p>
        </div>
      </body>
      </html>
    `

    // Criar e baixar o PDF
    const blob = new Blob([conteudoPDF], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `proposta-frete-${solicitacaoParaProposta.nome.replace(/\s+/g, '-').toLowerCase()}-${Date.now()}.html`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Salvar o link da proposta para envio via WhatsApp
    setLinkProposta(linkPropostaGerado)
    setPropostaGerada(true)
    
    // Salvar proposta no localStorage
    const propostaData = {
      id: propostaId,
      solicitacaoId: solicitacaoParaProposta.id,
      valor: valorProposta,
      data: new Date().toISOString(),
      conteudo: conteudoPDF
    }
    localStorage.setItem(`proposta_${propostaId}`, JSON.stringify(propostaData))
    
    // Adicionar à timeline se estiver na tela de detalhes
    if (mostrarDetalhes && solicitacaoSelecionada) {
      adicionarEventoTimeline('proposta', 'Proposta Gerada', `Proposta de ${valorFormatado} criada e link gerado`)
    }
    
    // Atualizar status
    atualizarStatus(solicitacaoParaProposta.id, 'em_andamento')
  }

  const gerarMensagemWhatsApp = () => {
    if (!solicitacaoParaProposta) return ''
    
    const valorFormatado = parseFloat(valorProposta).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const mensagem = `🎉 *Seu orçamento ficou pronto!*

Olá ${solicitacaoParaProposta.nome}! 

Sua solicitação de frete foi analisada e já temos uma proposta personalizada para você:

📋 *RESUMO DO SERVIÇO:*
• *Origem:* ${solicitacaoParaProposta.origem}
• *Destino:* ${solicitacaoParaProposta.destino}
• *Tamanho:* ${solicitacaoParaProposta.tamanhoMudanca}
• *Ajudantes:* ${solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} da empresa` : 'Próprios'}

💰 *VALOR DA PROPOSTA: ${valorFormatado}*

📄 *Acesse sua proposta completa aqui:*
${linkProposta}

✅ *O que está incluído:*
• Veículo adequado para o tamanho da mudança
• ${solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} ajudante(s) profissional(is)` : 'Suporte para seus ajudantes próprios'}
• Atendimento personalizado

📞 *Para confirmar ou esclarecer dúvidas:*
• WhatsApp: (62) 99110-3510
• Email: contato@pachego.com.br

⏰ *Esta proposta é válida por 7 dias.*

Aguardamos seu retorno! 😊

_Equipe Pá-chego Fretes_`

    return encodeURIComponent(mensagem)
  }

  const gerarMensagemWhatsAppCompleta = () => {
    if (!solicitacaoSelecionada) return ''
    
    const valorFormatado = linkProposta ? parseFloat(valorProposta).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }) : 'A ser definido'

    const mensagem = `🎉 *Seu orçamento ficou pronto!*

Olá ${solicitacaoSelecionada.nome}! 

Sua solicitação de frete foi analisada e já temos uma proposta personalizada para você:

📋 *RESUMO DO SERVIÇO:*
• *Origem:* ${solicitacaoSelecionada.origem}
• *Destino:* ${solicitacaoSelecionada.destino}
• *Tipo:* ${solicitacaoSelecionada.tipoServico}
${solicitacaoSelecionada.tamanhoMudanca ? `• *Tamanho:* ${solicitacaoSelecionada.tamanhoMudanca}` : ''}
${solicitacaoSelecionada.tipoAjudantes ? `• *Ajudantes:* ${solicitacaoSelecionada.tipoAjudantes === 'empresa' ? `${solicitacaoSelecionada.quantidadeAjudantes} da empresa` : 'Próprios'}` : ''}

💰 *VALOR DA PROPOSTA: ${valorFormatado}*

${linkProposta ? `🔗 *ACESSE SUA PROPOSTA COMPLETA:*
${linkProposta}

` : ''}📞 *DÚVIDAS?* 
Estamos aqui para ajudar! Responda esta mensagem ou ligue para (62) 99110-3510

_Equipe Pá-chego Fretes_`

    return encodeURIComponent(mensagem)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendente': return 'bg-yellow-100 text-yellow-800'
      case 'em_andamento': return 'bg-blue-100 text-blue-800'
      case 'concluida': return 'bg-green-100 text-green-800'
      case 'cancelada': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pendente': return 'Pendente'
      case 'em_andamento': return 'Em Andamento'
      case 'concluida': return 'Concluída'
      case 'cancelada': return 'Cancelada'
      default: return status
    }
  }

  const solicitacoesFiltradas = filtrarSolicitacoes()

  return (
    <>
      <Head>
        <title>Dashboard - Pá-chego Fretes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Favicon />
      
      <div className="min-h-screen bg-gray-50">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                  <p className="text-sm text-gray-500">Pá-chego Fretes</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <a
                  href="/calculadora"
                  className="px-4 py-2 text-gray-600 hover:text-gray-900 font-medium transition-colors"
                >
                  Calculadora
                </a>
                <a
                  href="https://api.whatsapp.com/send?phone=62991103510&text=Olá!%20vim%20pelo%20dashboard%20gostaria%20de%20ajuda!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-colors flex items-center space-x-2"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </header>

        <main className="py-8">
          <div className="container mx-auto px-6">
            <div className="max-w-7xl mx-auto">

            {/* Loading State */}
            {!isClient && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando dados...</p>
                </div>
              </div>
            )}

            {/* Dashboard Stats */}
            {isClient && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total de Solicitações</p>
                    <p className="text-3xl font-bold text-gray-900">{solicitacoes.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">📋</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Pendentes</p>
                    <p className="text-3xl font-bold text-yellow-600">{solicitacoes.filter(s => s.status === 'pendente').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Em Andamento</p>
                    <p className="text-3xl font-bold text-blue-600">{solicitacoes.filter(s => s.status === 'em_andamento').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Concluídas</p>
                    <p className="text-3xl font-bold text-green-600">{solicitacoes.filter(s => s.status === 'concluida').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>
            </div>
            )}

            {/* Filtros */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
              <div className="flex flex-wrap gap-4 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-semibold text-gray-700">Filtrar por status:</label>
                  <select 
                    value={filtroStatus} 
                    onChange={(e) => setFiltroStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="todos">Todos os status</option>
                    <option value="pendente">Pendente</option>
                    <option value="em_andamento">Em Andamento</option>
                    <option value="concluida">Concluída</option>
                    <option value="cancelada">Cancelada</option>
                  </select>
                </div>
                <div className="text-sm text-gray-500">
                  Mostrando {solicitacoesFiltradas.length} de {solicitacoes.length} solicitações
                </div>
              </div>
            </div>

            {/* Lista de Solicitações */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              {solicitacoesFiltradas.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">📋</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhuma solicitação encontrada</h3>
                  <p className="text-gray-500">Tente ajustar os filtros ou aguarde novas solicitações</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Cliente
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Origem → Destino
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Data
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {solicitacoesFiltradas.map((solicitacao, index) => (
                        <tr key={solicitacao.id} className="hover:bg-gray-50 transition-colors duration-200">
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="flex items-center space-x-3">
                              <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                                  {solicitacao.nome.charAt(0).toUpperCase()}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-semibold text-gray-900 group-hover:text-blue-900 transition-colors">
                                  {solicitacao.nome}
                                </div>
                                <div className="text-sm text-gray-500 font-medium">
                                  📱 {solicitacao.celular}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6">
                            <div className="space-y-1">
                              <div className="text-sm font-medium text-gray-900">
                                📍 {solicitacao.origem}
                              </div>
                              <div className="text-sm text-gray-500">
                                🎯 {solicitacao.destino}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="text-sm text-gray-500 font-medium">
                              {solicitacao.data}
                            </div>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <span className={`inline-flex items-center px-3 py-1.5 text-xs font-bold rounded-full shadow-sm ${getStatusColor(solicitacao.status)}`}>
                              {getStatusLabel(solicitacao.status)}
                            </span>
                          </td>
                          <td className="px-6 py-6 whitespace-nowrap">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => abrirDetalhes(solicitacao)}
                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                👁️ Ver
                              </button>
                              <button
                                onClick={() => abrirModalProposta(solicitacao)}
                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                📄 Proposta
                              </button>
                              <select
                                value={solicitacao.status}
                                onChange={(e) => atualizarStatus(solicitacao.id, e.target.value)}
                                className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              >
                                <option value="pendente">⏳ Pendente</option>
                                <option value="em_andamento">🔄 Em Andamento</option>
                                <option value="concluida">✅ Concluída</option>
                                <option value="cancelada">❌ Cancelada</option>
                              </select>
                              <button
                                onClick={() => excluirSolicitacao(solicitacao.id)}
                                className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                              >
                                🗑️ Excluir
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tela de Detalhes */}
        {mostrarDetalhes && solicitacaoSelecionada && (
          <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
            {/* Header da Tela de Detalhes */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 shadow-lg">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setMostrarDetalhes(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                  >
                    ←
                  </button>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Detalhes da Solicitação</h2>
                    <p className="text-blue-100">ID: #{solicitacaoSelecionada.id}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => abrirModalProposta(solicitacaoSelecionada)}
                    className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Gerar Proposta
                  </button>
                  <button
                    onClick={() => setMostrarDetalhes(false)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Coluna 1: Dados do Cliente */}
                <div className="space-y-6">
                  {/* Dados Básicos */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">👤</span>
                      Dados do Cliente
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Nome</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.nome}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Celular</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.celular}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Data da Solicitação</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.data}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Data Desejada</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.dataDesejada || 'Não informada'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Coluna 2: Detalhes do Frete */}
                <div className="space-y-6">
                  {/* Detalhes do Frete */}
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-3">🚚</span>
                      Detalhes do Frete
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Origem</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.origem}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Destino</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.destino}</p>
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-gray-600">Tipo de Serviço</label>
                        <p className="text-gray-900 font-medium">{solicitacaoSelecionada.tipoServico}</p>
                      </div>
                      {solicitacaoSelecionada.tamanhoMudanca && (
                        <div>
                          <label className="text-sm font-semibold text-gray-600">Tamanho da Mudança</label>
                          <p className="text-gray-900 font-medium">{solicitacaoSelecionada.tamanhoMudanca}</p>
                        </div>
                      )}
                      {solicitacaoSelecionada.tipoAjudantes && (
                        <div>
                          <label className="text-sm font-semibold text-gray-600">Ajudantes</label>
                          <p className="text-gray-900 font-medium">
                            {solicitacaoSelecionada.tipoAjudantes === 'empresa' 
                              ? `${solicitacaoSelecionada.quantidadeAjudantes} da empresa`
                              : 'Próprios'
                            }
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Observações */}
                  {solicitacaoSelecionada.observacoes && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-3">📝</span>
                        Observações
                      </h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{solicitacaoSelecionada.observacoes}</p>
                    </div>
                  )}
                </div>

                {/* Coluna 3: Timeline e Links */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                      <span className="text-2xl mr-3">⏰</span>
                      Timeline de Contato
                    </h3>
                    
                    <div className="space-y-4">
                      {timeline.map((evento, index) => (
                        <div key={evento.id} className="relative">
                          {index < timeline.length - 1 && (
                            <div className="absolute left-4 top-8 w-0.5 h-8 bg-gray-200"></div>
                          )}
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              evento.tipo === 'solicitacao' ? 'bg-blue-100 text-blue-600' :
                              evento.tipo === 'proposta' ? 'bg-green-100 text-green-600' :
                              evento.tipo === 'contato' ? 'bg-yellow-100 text-yellow-600' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {evento.tipo === 'solicitacao' ? '📋' :
                               evento.tipo === 'proposta' ? '💰' :
                               evento.tipo === 'contato' ? '📞' : '📌'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-semibold text-gray-900">{evento.titulo}</h4>
                              <p className="text-sm text-gray-600 mt-1">{evento.descricao}</p>
                              <p className="text-xs text-gray-500 mt-1">
                                {new Date(evento.data).toLocaleString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Botão para adicionar evento */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => {
                          const titulo = prompt('Título do evento:')
                          const descricao = prompt('Descrição:')
                          if (titulo && descricao) {
                            adicionarEventoTimeline('contato', titulo, descricao)
                          }
                        }}
                        className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-200"
                      >
                        + Adicionar Evento
                      </button>
                    </div>
                  </div>

                  {/* Link da Proposta */}
                  {linkProposta && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-3">🔗</span>
                        Link da Proposta
                      </h3>
                      <div className="space-y-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600 mb-2">Link gerado:</p>
                          <p className="text-sm font-mono text-blue-600 break-all">{linkProposta}</p>
                        </div>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => navigator.clipboard.writeText(linkProposta)}
                            className="flex-1 px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-semibold rounded-lg transition-all duration-200"
                          >
                            Copiar Link
                          </button>
                          <a
                            href={`https://api.whatsapp.com/send?phone=${solicitacaoSelecionada.celular.replace(/\D/g, '')}&text=${encodeURIComponent(gerarMensagemWhatsAppCompleta())}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 px-3 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 text-center"
                          >
                            Enviar WhatsApp
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Proposta (mantido para compatibilidade) */}
        {mostrarModalProposta && solicitacaoParaProposta && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                      <span className="text-2xl">📋</span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">Detalhes da Solicitação</h3>
                      <p className="text-blue-100">ID: #{solicitacaoSelecionada.id}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setSolicitacaoSelecionada(null)}
                    className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Coluna 1 - Cliente e Locais */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                        <span className="text-base mr-2">👤</span>
                        Cliente
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium text-gray-700">Nome:</span> {solicitacaoSelecionada.nome}</p>
                        <p><span className="font-medium text-gray-700">Celular:</span> {solicitacaoSelecionada.celular}</p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                        <span className="text-base mr-2">📍</span>
                        Locais
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium text-gray-700">Origem:</span> {solicitacaoSelecionada.origem}</p>
                        <p><span className="font-medium text-gray-700">Destino:</span> {solicitacaoSelecionada.destino}</p>
                      </div>
                    </div>
                  </div>

                  {/* Coluna 2 - Mudança e Imóveis */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                        <span className="text-base mr-2">📦</span>
                        Mudança
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium text-gray-700">Tamanho:</span> 
                          <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {solicitacaoSelecionada.tamanhoMudanca}
                          </span>
                        </p>
                        <p><span className="font-medium text-gray-700">Ajudantes:</span> 
                          <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                            {solicitacaoSelecionada.tipoAjudantes === 'empresa' 
                              ? `${solicitacaoSelecionada.quantidadeAjudantes} da empresa` 
                              : 'Próprios'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                        <span className="text-base mr-2">🏠</span>
                        Imóveis
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium text-gray-700">Origem:</span> 
                          {solicitacaoSelecionada.tipoImovelOrigem === 'casa' ? ' 🏠 Casa' : ' 🏢 Apartamento'}
                          {solicitacaoSelecionada.tipoImovelOrigem === 'apartamento' && solicitacaoSelecionada.andarOrigem > 0 && 
                            ` - ${solicitacaoSelecionada.andarOrigem}º andar`}
                          {solicitacaoSelecionada.tipoImovelOrigem === 'apartamento' && solicitacaoSelecionada.elevadorOrigem && 
                            ' (com elevador)'}
                        </p>
                        <p><span className="font-medium text-gray-700">Destino:</span> 
                          {solicitacaoSelecionada.tipoImovelDestino === 'casa' ? ' 🏠 Casa' : ' 🏢 Apartamento'}
                          {solicitacaoSelecionada.tipoImovelDestino === 'apartamento' && solicitacaoSelecionada.andarDestino > 0 && 
                            ` - ${solicitacaoSelecionada.andarDestino}º andar`}
                          {solicitacaoSelecionada.tipoImovelDestino === 'apartamento' && solicitacaoSelecionada.elevadorDestino && 
                            ' (com elevador)'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Coluna 3 - Data, Status e Observações */}
                  <div className="space-y-3">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                        <span className="text-base mr-2">📅</span>
                        Data & Status
                      </h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium text-gray-700">Data desejada:</span> 
                          {solicitacaoSelecionada.dataDesejada || 'Não informada'}
                        </p>
                        <p><span className="font-medium text-gray-700">Status:</span> 
                          <span className={`ml-1 inline-flex items-center px-2 py-0.5 text-xs font-bold rounded-full ${getStatusColor(solicitacaoSelecionada.status)}`}>
                            {getStatusLabel(solicitacaoSelecionada.status)}
                          </span>
                        </p>
                      </div>
                    </div>

                    {solicitacaoSelecionada.observacao && (
                      <div className="bg-gray-50 rounded-lg p-3">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center text-sm">
                          <span className="text-base mr-2">📝</span>
                          Observações
                        </h4>
                        <p className="text-xs text-gray-700 bg-white p-2 rounded">{solicitacaoSelecionada.observacao}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-4">
                  <button
                    onClick={() => setSolicitacaoSelecionada(null)}
                    className="px-6 py-3 bg-gradient-to-r from-gray-400 to-gray-500 text-white font-semibold rounded-xl hover:from-gray-500 hover:to-gray-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Fechar
                  </button>
                  <a
                    href={`https://api.whatsapp.com/send?phone=${solicitacaoSelecionada.celular.replace(/\D/g, '')}&text=Olá ${solicitacaoSelecionada.nome}! Recebemos sua solicitação de cotação.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center"
                  >
                    💬 WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Proposta */}
        {mostrarModalProposta && solicitacaoParaProposta && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
              <div className="bg-gradient-to-r from-green-600 to-emerald-700 px-6 py-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <span className="text-xl">📄</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">Enviar Proposta</h3>
                      <p className="text-green-100 text-sm">{solicitacaoParaProposta.nome}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setMostrarModalProposta(false)}
                    className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
                  >
                    ✕
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      💰 Valor da Proposta (R$)
                    </label>
                    <input
                      type="number"
                      value={valorProposta}
                      onChange={(e) => setValorProposta(e.target.value)}
                      placeholder="Ex: 1500.00"
                      step="0.01"
                      min="0"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-colors text-lg font-medium"
                    />
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Resumo da Solicitação</h4>
                    <div className="space-y-1 text-sm text-gray-600">
                      <p><strong>Origem:</strong> {solicitacaoParaProposta.origem}</p>
                      <p><strong>Destino:</strong> {solicitacaoParaProposta.destino}</p>
                      <p><strong>Tamanho:</strong> {solicitacaoParaProposta.tamanhoMudanca}</p>
                      <p><strong>Ajudantes:</strong> {solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} da empresa` : 'Próprios'}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  {!propostaGerada ? (
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setMostrarModalProposta(false)}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={gerarPDF}
                        disabled={!valorProposta}
                        className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                      >
                        📄 Gerar PDF
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-2xl">✅</span>
                          <h4 className="font-semibold text-green-800">Proposta gerada com sucesso!</h4>
                        </div>
                        <p className="text-sm text-green-700">
                          O PDF foi baixado automaticamente. Agora você pode enviar o link da proposta para o cliente via WhatsApp.
                        </p>
                      </div>
                      
                      <div className="flex justify-between space-x-3">
                        <button
                          onClick={() => setMostrarModalProposta(false)}
                          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                        >
                          Fechar
                        </button>
                        <a
                          href={`https://api.whatsapp.com/send?phone=${solicitacaoParaProposta.celular.replace(/\D/g, '')}&text=${gerarMensagemWhatsApp()}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center space-x-2"
                        >
                          <span>💬</span>
                          <span>Enviar via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        </main>
      </div>
    </>
  )
}

export default AdminPage
