import { useState, useEffect } from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
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

  useEffect(() => {
    // Carregar solicitações do localStorage
    const carregarSolicitacoes = () => {
      const dados = localStorage.getItem('solicitacoes')
      if (dados) {
        setSolicitacoes(JSON.parse(dados))
      }
    }

    carregarSolicitacoes()
    
    // Atualizar a cada 5 segundos
    const interval = setInterval(carregarSolicitacoes, 5000)
    return () => clearInterval(interval)
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
    setLinkProposta(url)
    setPropostaGerada(true)
    
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
        <title>Administração - Pá-chego Fretes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <Favicon />
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl mb-4 shadow-lg">
                <span className="text-2xl">📊</span>
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent mb-2">
                Painel Administrativo
              </h1>
              <p className="text-lg text-gray-600">Gerencie as solicitações de cotação com eficiência</p>
            </div>

            {/* Filtros */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 mb-8">
              <div className="flex flex-wrap gap-6 items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Filtrar por status</label>
                    <select
                      value={filtroStatus}
                      onChange={(e) => setFiltroStatus(e.target.value)}
                      className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 font-medium"
                    >
                      <option value="todos">🔍 Todos os status</option>
                      <option value="pendente">⏳ Pendente</option>
                      <option value="em_andamento">🔄 Em Andamento</option>
                      <option value="concluida">✅ Concluída</option>
                      <option value="cancelada">❌ Cancelada</option>
                    </select>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
                    📊 {solicitacoesFiltradas.length} solicitação(ões)
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold shadow-lg">
                    💰 {solicitacoes.filter(s => s.status === 'concluida').length} concluídas
                  </div>
                </div>
              </div>
            </div>

            {/* Contadores por Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-100 text-sm font-medium">Pendentes</p>
                    <p className="text-3xl font-bold">{solicitacoes.filter(s => s.status === 'pendente').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">⏳</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-400 to-blue-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm font-medium">Em Andamento</p>
                    <p className="text-3xl font-bold">{solicitacoes.filter(s => s.status === 'em_andamento').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">🔄</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-400 to-emerald-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-100 text-sm font-medium">Concluídas</p>
                    <p className="text-3xl font-bold">{solicitacoes.filter(s => s.status === 'concluida').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✅</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-red-400 to-red-600 rounded-2xl p-6 text-white shadow-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-100 text-sm font-medium">Canceladas</p>
                    <p className="text-3xl font-bold">{solicitacoes.filter(s => s.status === 'cancelada').length}</p>
                  </div>
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">❌</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista de Solicitações */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {solicitacoesFiltradas.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
                    <span className="text-4xl">📋</span>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhuma solicitação encontrada</h3>
                  <p className="text-gray-500">Tente ajustar os filtros ou aguarde novas solicitações</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200/50">
                    <thead className="bg-gradient-to-r from-slate-50 to-gray-100">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          👤 Cliente
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          📍 Origem → Destino
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          📅 Data
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          🏷️ Status
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                          ⚡ Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white/50 divide-y divide-gray-200/30">
                      {solicitacoesFiltradas.map((solicitacao, index) => (
                        <tr key={solicitacao.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-indigo-50/50 transition-all duration-300 group">
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
                                onClick={() => setSolicitacaoSelecionada(solicitacao)}
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

        {/* Modal de Detalhes */}
        {solicitacaoSelecionada && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-5xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-white/20 overflow-hidden animate-in fade-in-0 zoom-in-95 duration-300">
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

      <Footer />
    </>
  )
}

export default AdminPage
