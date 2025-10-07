import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { buscarSolicitacoes, atualizarStatus, excluirSolicitacao } from '../../../lib/solicitacoes'

const DetalhesSolicitacao = () => {
  const router = useRouter()
  const { id } = router.query
  const [solicitacao, setSolicitacao] = useState(null)
  const [timeline, setTimeline] = useState([])
  const [linkProposta, setLinkProposta] = useState('')
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (id) {
      carregarSolicitacao()
    }
  }, [id])

  const carregarSolicitacao = async () => {
    try {
      setLoading(true)
      
      // Buscar todas as solicitações
      const resultado = await buscarSolicitacoes()
      
      if (resultado.success) {
        // Encontrar a solicitação pelo ID
        const solicitacaoEncontrada = resultado.data.find(s => s.id === id)
        
        if (solicitacaoEncontrada) {
          setSolicitacao(solicitacaoEncontrada)
          carregarTimeline(solicitacaoEncontrada.id)
        } else {
          console.error('Solicitação não encontrada:', id)
          router.push('/admin')
        }
      } else {
        console.error('Erro ao carregar solicitações:', resultado.error)
        router.push('/admin')
      }
    } catch (error) {
      console.error('Erro ao carregar solicitação:', error)
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }

  const carregarTimeline = (solicitacaoId) => {
    if (!isClient) return
    
    try {
      const timelineData = localStorage.getItem(`timeline_${solicitacaoId}`)
      if (timelineData) {
        const timelineParsed = JSON.parse(timelineData)
        setTimeline(timelineParsed)
        
        // Verificar se há link de proposta na timeline
        const eventoProposta = timelineParsed.find(e => e.tipo === 'proposta')
        if (eventoProposta && eventoProposta.link) {
          setLinkProposta(eventoProposta.link)
        }
      } else {
        // Timeline inicial
        const timelineInicial = [
          {
            id: Date.now(),
            tipo: 'solicitacao',
            titulo: 'Solicitação Recebida',
            descricao: 'Nova solicitação de frete recebida',
            data: new Date().toISOString()
          }
        ]
        setTimeline(timelineInicial)
        localStorage.setItem(`timeline_${solicitacaoId}`, JSON.stringify(timelineInicial))
      }
    } catch (error) {
      console.error('Erro ao carregar timeline:', error)
    }
  }

  const adicionarEventoTimeline = (tipo, titulo, descricao) => {
    const novoEvento = {
      id: Date.now(),
      tipo,
      titulo,
      descricao,
      data: new Date().toISOString()
    }
    
    const novaTimeline = [...timeline, novoEvento]
    setTimeline(novaTimeline)
    localStorage.setItem(`timeline_${solicitacao.id}`, JSON.stringify(novaTimeline))
  }

  const gerarLinkProposta = (solicitacao, valor = 0) => {
    const propostaId = `proposta_${Date.now()}`
    const linkPropostaGerado = `${window.location.origin}/proposta/${propostaId}`
    
    const propostaData = {
      id: propostaId,
      data: new Date().toISOString(),
      valor: valor,
      solicitacao: {
        nome: solicitacao.nome || 'Nome não informado',
        celular: solicitacao.celular || 'Celular não informado',
        origem: solicitacao.origem || 'Origem não informada',
        destino: solicitacao.destino || 'Destino não informado',
        tipoServico: solicitacao.tipoServico || 'Serviço não informado',
        data: solicitacao.data || new Date().toISOString(),
        observacoes: solicitacao.observacoes || ''
      }
    }
    
    localStorage.setItem(`proposta_${propostaId}`, JSON.stringify(propostaData))
    
    return { link: linkPropostaGerado, propostaData }
  }

  const gerarMensagemWhatsAppCompleta = () => {
    if (!solicitacao) return ''
    
    const numero = solicitacao.celular.replace(/\D/g, '')
    const mensagem = `Olá ${solicitacao.nome}! 

Sua solicitação de frete foi analisada e já temos uma proposta personalizada para você:

📋 *Detalhes da Proposta:*
• *Cliente:* ${solicitacao.nome}
• *Origem:* ${solicitacao.origem}
• *Destino:* ${solicitacao.destino}
• *Tipo:* ${solicitacao.tipoServico}
${solicitacao.tamanhoMudanca ? `• *Tamanho:* ${solicitacao.tamanhoMudanca}` : ''}
${solicitacao.tipoAjudantes ? `• *Ajudantes:* ${solicitacao.tipoAjudantes === 'empresa' ? `${solicitacao.quantidadeAjudantes} da empresa` : 'Próprios'}` : ''}

📄 *Acesse sua proposta completa aqui:*
${linkProposta}

⏰ *Esta proposta é válida por 7 dias.*

Para aceitar ou tirar dúvidas, entre em contato conosco!`

    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
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
      case 'pendente': return '⏳ Pendente'
      case 'em_andamento': return '🔄 Em Andamento'
      case 'concluida': return '✅ Concluída'
      case 'cancelada': return '❌ Cancelada'
      default: return '📋 ' + status
    }
  }

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando solicitação...</p>
        </div>
      </div>
    )
  }

  if (!solicitacao) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Solicitação não encontrada</h1>
          <p className="text-gray-600 mb-6">A solicitação solicitada não existe.</p>
          <button 
            onClick={() => router.push('/admin')}
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Voltar ao Admin
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 shadow-lg">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => router.push('/admin')}
              className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center text-white transition-all duration-200 hover:scale-110"
            >
              ←
            </button>
            <div>
              <h2 className="text-2xl font-bold text-white">Detalhes da Solicitação</h2>
              <p className="text-blue-100">ID: #{solicitacao.id}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => {
                const { link } = gerarLinkProposta(solicitacao, 0)
                navigator.clipboard.writeText(link)
                adicionarEventoTimeline('proposta', 'Link Gerado', `Link da proposta gerado e copiado para área de transferência`)
                setLinkProposta(link)
                alert('Link gerado e copiado para a área de transferência!')
              }}
              className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-lg transition-all duration-200"
            >
              🔗 Gerar Link
            </button>
            <a
              href={`https://api.whatsapp.com/send?phone=${solicitacao.celular.replace(/\D/g, '')}&text=Olá ${solicitacao.nome}! Recebemos sua solicitação de cotação.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200"
            >
              📱 WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Coluna 1: Dados do Cliente */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">👤 Dados do Cliente</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Nome</label>
                <p className="text-gray-900 font-medium">{solicitacao.nome}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Celular</label>
                <p className="text-gray-900 font-medium">{solicitacao.celular}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Data da Solicitação</label>
                <p className="text-gray-900 font-medium">
                  {new Date(solicitacao.data).toLocaleDateString('pt-BR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Data Desejada</label>
                <p className="text-gray-900 font-medium">{solicitacao.dataDesejada || 'Não informada'}</p>
              </div>
            </div>
          </div>

          {/* Coluna 2: Detalhes do Frete */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">🚛 Detalhes do Frete</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-gray-600">Origem</label>
                <p className="text-gray-900 font-medium">{solicitacao.origem}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Destino</label>
                <p className="text-gray-900 font-medium">{solicitacao.destino}</p>
              </div>
              <div>
                <label className="text-sm font-semibold text-gray-600">Tipo de Serviço</label>
                <p className="text-gray-900 font-medium">{solicitacao.tipoServico}</p>
              </div>
              
              {solicitacao.tamanhoMudanca && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Tamanho da Mudança</label>
                  <p className="text-gray-900 font-medium">{solicitacao.tamanhoMudanca}</p>
                </div>
              )}
              
              {solicitacao.tipoAjudantes && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Ajudantes</label>
                  <p className="text-gray-900 font-medium">
                    {solicitacao.tipoAjudantes === 'empresa' 
                      ? `${solicitacao.quantidadeAjudantes} da empresa`
                      : 'Próprios'
                    }
                  </p>
                </div>
              )}

              {solicitacao.observacoes && (
                <div>
                  <label className="text-sm font-semibold text-gray-600">Observações</label>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{solicitacao.observacoes}</p>
                </div>
              )}
            </div>
          </div>

          {/* Coluna 3: Timeline */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">📅 Timeline</h3>
            
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
                        {new Date(evento.data).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      
                      {/* Link da Proposta integrado na timeline */}
                      {evento.tipo === 'proposta' && linkProposta && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs text-gray-500 mb-1">Link da proposta:</p>
                              <p className="text-xs font-mono text-blue-600 truncate">{linkProposta}</p>
                            </div>
                            <div className="flex space-x-2 ml-3">
                              <button
                                onClick={() => navigator.clipboard.writeText(linkProposta)}
                                className="p-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200"
                                title="Copiar link"
                              >
                                📋
                              </button>
                              <a
                                href={linkProposta}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                                title="Abrir link"
                              >
                                🔗
                              </a>
                              <a
                                href={gerarMensagemWhatsAppCompleta()}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200"
                                title="Enviar WhatsApp"
                              >
                                📱
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetalhesSolicitacao
