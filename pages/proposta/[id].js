import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

const PropostaPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [proposta, setProposta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isClient, setIsClient] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Marcar que estamos no cliente
    setMounted(true)
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (mounted && id && router.isReady) {
      carregarProposta()
    }
  }, [mounted, id, router.isReady])

  const carregarProposta = () => {
    try {
      console.log('🔍 Carregando proposta...')
      console.log('ID:', id)
      console.log('isClient:', isClient)
      
      // Verificar se estamos no cliente
      if (!isClient) {
        console.log('❌ Não é cliente ainda')
        return
      }
      
      // Buscar proposta no localStorage
      const chave = `proposta_${id}`
      console.log('Chave do localStorage:', chave)
      
      const propostaData = localStorage.getItem(chave)
      console.log('Dados encontrados:', propostaData ? 'Sim' : 'Não')
      
      if (propostaData) {
        const propostaParsed = JSON.parse(propostaData)
        console.log('Proposta parseada:', propostaParsed)
        
        // Verificar se a estrutura está correta
        if (propostaParsed.solicitacao) {
          console.log('✅ Estrutura correta encontrada')
          setProposta(propostaParsed)
        } else {
          console.log('❌ Estrutura incorreta, tentando corrigir...')
          // Se não tem solicitacao, pode ser que os dados estão diretamente no objeto
          const propostaCorrigida = {
            id: propostaParsed.id || id,
            data: propostaParsed.data || new Date().toISOString(),
            valor: propostaParsed.valor || 0,
            solicitacao: {
              nome: propostaParsed.nome || 'Nome não informado',
              celular: propostaParsed.celular || 'Celular não informado',
              origem: propostaParsed.origem || 'Origem não informada',
              destino: propostaParsed.destino || 'Destino não informado',
              tipoServico: propostaParsed.tipoServico || 'Serviço não informado',
              data: propostaParsed.data || new Date().toISOString(),
              observacoes: propostaParsed.observacoes || ''
            }
          }
          console.log('Proposta corrigida:', propostaCorrigida)
          setProposta(propostaCorrigida)
        }
        setLoading(false)
      } else {
        console.log('❌ Proposta não encontrada no localStorage')
        setError('Proposta não encontrada')
        setLoading(false)
      }
    } catch (err) {
      console.error('❌ Erro ao carregar proposta:', err)
      console.error('Stack:', err.stack)
      setError('Erro ao carregar proposta')
      setLoading(false)
    }
  }

  const formatarValor = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor)
  }

  const gerarMensagemWhatsApp = () => {
    if (!proposta || !isClient || !proposta.solicitacao) return ''
    
    const numero = '62991103510'
    const urlAtual = `https://cotacao.pachego.com.br/proposta/${id}`
    
    const mensagem = `*SEU ORÇAMENTO FICOU PRONTO!*

Olá ${proposta.solicitacao.nome || 'Cliente'}! 

Sua solicitação de frete foi analisada e já temos uma proposta personalizada para você:

*RESUMO DO SERVIÇO:*
• Origem: ${proposta.solicitacao.origem || 'Não informado'}
• Destino: ${proposta.solicitacao.destino || 'Não informado'}
• Tipo: ${proposta.solicitacao.tipoServico || 'Não informado'}
• Tamanho: ${proposta.solicitacao.tamanhoMudanca || 'Não informado'}
• Ajudantes: ${proposta.solicitacao.tipoAjudantes === 'empresa' 
  ? `${proposta.solicitacao.quantidadeAjudantes || 1} da empresa`
  : 'Próprios'}

*VALOR TOTAL: ${formatarValor(proposta.valor || 0)}*

*ACESSE SUA PROPOSTA COMPLETA:*
${urlAtual}

*DÚVIDAS?* 
Estamos aqui para ajudar! Responda esta mensagem ou ligue para (62) 99110-3510

_Equipe Pa-chego Fretes_`

    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
  }

  // Renderizar apenas no cliente
  if (!mounted) {
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
          <p className="text-gray-600">Carregando proposta...</p>
        </div>
      </div>
    )
  }

  if (error || !proposta) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Proposta não encontrada</h1>
          <p className="text-gray-600 mb-6">A proposta solicitada não existe ou expirou.</p>
          <a 
            href="/form" 
            className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Fazer Nova Cotação
          </a>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Proposta de Frete - Pá-chego Fretes</title>
        <style>{`
          @media print {
            @page {
              size: A4;
              margin: 1cm;
            }
            
            * {
              print-color-adjust: exact;
              -webkit-print-color-adjust: exact;
            }
            
            .no-print {
              display: none !important;
            }
            
            .print-page {
              background: white !important;
              min-height: auto !important;
              padding: 0 !important;
            }
            
            .print-content {
              box-shadow: none !important;
              border: none !important;
              max-width: 100% !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            
            .print-header {
              background: white !important;
              border-bottom: 1px solid #2563eb !important;
              padding: 0.5rem 0 !important;
              margin-bottom: 0.5rem !important;
            }
            
            /* Reduzir espaçamentos drasticamente */
            .p-6, .px-6, .py-6 {
              padding: 0.5rem !important;
            }
            
            .p-4, .px-4, .py-4 {
              padding: 0.25rem !important;
            }
            
            .mb-6, .my-6 {
              margin-bottom: 0.5rem !important;
            }
            
            .mb-4, .my-4 {
              margin-bottom: 0.25rem !important;
            }
            
            .space-y-4 > * + * {
              margin-top: 0.25rem !important;
            }
            
            .space-y-6 > * + * {
              margin-top: 0.5rem !important;
            }
            
            /* Reduzir tamanhos de fonte */
            .text-2xl {
              font-size: 1.25rem !important;
              line-height: 1.5 !important;
            }
            
            .text-xl {
              font-size: 1.125rem !important;
              line-height: 1.4 !important;
            }
            
            .text-lg {
              font-size: 1rem !important;
              line-height: 1.4 !important;
            }
            
            /* Otimizar seções para caber em menos páginas */
            .print-section {
              margin-bottom: 0.5rem !important;
              padding: 0.25rem !important;
            }
            
            /* Remover quebras de página desnecessárias */
            .bg-blue-50, .bg-green-50, .bg-gray-50 {
              page-break-inside: auto !important;
              margin-bottom: 0.25rem !important;
            }
            
            /* Compactar grid */
            .grid-cols-2 {
              gap: 0.25rem !important;
            }
            
            /* Reduzir altura dos botões e elementos */
            button, .btn {
              padding: 0.25rem 0.5rem !important;
              font-size: 0.875rem !important;
            }
            
            /* Otimizar footer */
            .print-footer {
              font-size: 8px !important;
              padding: 0.25rem !important;
              margin-top: 0.5rem !important;
            }
            
            /* Forçar conteúdo em menos páginas */
            .min-h-screen {
              min-height: auto !important;
            }
            
            /* Reduzir espaçamento entre elementos */
            div {
              margin-bottom: 0.125rem !important;
            }
            
            /* Compactar listas */
            ul, ol {
              margin: 0.125rem 0 !important;
              padding-left: 1rem !important;
            }
            
            li {
              margin-bottom: 0.125rem !important;
            }
          }
        `}</style>
      </Head>
      
      <div className="min-h-screen bg-gray-100 print-page">
        {/* Header */}
        <div className="bg-white shadow-sm border-b print-header">
          <div className="max-w-4xl mx-auto px-4 py-3">
            {/* Desktop Layout */}
            <div className="hidden md:flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Image
                  src="/logo.png"
                  alt="Pá-chego Fretes"
                  width={80}
                  height={32}
                  className="object-contain"
                />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Proposta de Frete</h1>
                  <p className="text-sm text-gray-600">Empresa Goiana - Atendimento Nacional</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Proposta: #{proposta.id.split('_')[1]}</p>
                <p className="text-xs text-gray-500">Gerada em: {new Date(proposta.data).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
              <div className="no-print">
                <button
                  onClick={() => window.print()}
                  className="px-3 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1 text-xs"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                  </svg>
                  <span>Imprimir</span>
                </button>
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo.png"
                    alt="Pá-chego Fretes"
                    width={60}
                    height={24}
                    className="object-contain"
                  />
                  <div>
                    <h1 className="text-lg font-bold text-gray-900">Proposta de Frete</h1>
                    <p className="text-xs text-gray-600">Empresa Goiana</p>
                  </div>
                </div>
                <div className="no-print">
                  <button
                    onClick={() => window.print()}
                    className="px-2 py-1.5 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-1 text-xs"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    <span>PDF</span>
                  </button>
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600">
                <p>Proposta: #{proposta.id.split('_')[1]}</p>
                <p>Gerada em: {new Date(proposta.data).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
          </div>
        </div>

      {/* Conteúdo */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden print-content">
          {/* Dados do Cliente */}
          <div className="bg-blue-50 px-4 py-3 border-b print-section">
            <h2 className="text-base font-semibold text-blue-600 mb-2">Dados do Cliente</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-gray-600 mb-1">Nome</p>
                <p className="font-medium text-sm">{proposta.solicitacao?.nome || 'Não informado'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Celular WhatsApp</p>
                <p className="font-medium text-sm">{proposta.solicitacao?.celular || 'Não informado'}</p>
              </div>
            </div>
          </div>

          {/* Detalhes do Frete */}
          <div className="px-4 py-4 border-t print-section">
            <h2 className="text-base font-semibold text-blue-600 mb-4">Detalhes do Frete</h2>
            
            {/* Rota e Serviço */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center mb-2">
                  <span className="text-blue-600 mr-2">📍</span>
                  <p className="text-sm font-medium text-blue-700">Rota</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Origem</p>
                    <p className="font-medium text-sm">{proposta.solicitacao?.origem || 'Não informado'}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Destino</p>
                    <p className="font-medium text-sm">{proposta.solicitacao?.destino || 'Não informado'}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center mb-2">
                  <span className="text-green-600 mr-2">🚚</span>
                  <p className="text-sm font-medium text-green-700">Serviço</p>
                </div>
                <div className="space-y-2">
                  <div>
                    <p className="text-xs text-gray-600 mb-1">Tipo de Serviço</p>
                    <p className="font-medium text-sm">{proposta.solicitacao?.tipoServico || 'Não informado'}</p>
                  </div>
                  {proposta.solicitacao?.tamanhoMudanca && (
                    <div>
                      <p className="text-xs text-gray-600 mb-1">Tamanho da Mudança</p>
                      <p className="font-medium text-sm capitalize">{proposta.solicitacao.tamanhoMudanca}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Datas e Ajudantes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-gray-600 mr-2">📅</span>
                  <p className="text-xs font-medium text-gray-700">Data da Solicitação</p>
                </div>
                <p className="font-medium text-sm">{proposta.solicitacao?.data ? new Date(proposta.solicitacao.data).toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                }) : 'Não informado'}</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="flex items-center mb-2">
                  <span className="text-gray-600 mr-2">⏰</span>
                  <p className="text-xs font-medium text-gray-700">Data Desejada</p>
                </div>
                <p className="font-medium text-sm">{proposta.solicitacao?.dataDesejada ? new Date(proposta.solicitacao.dataDesejada).toLocaleDateString('pt-BR') : 'Não informada'}</p>
              </div>
              
              {proposta.solicitacao?.tipoAjudantes && (
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center mb-2">
                    <span className="text-gray-600 mr-2">👥</span>
                    <p className="text-xs font-medium text-gray-700">Ajudantes</p>
                  </div>
                  <p className="font-medium text-sm">
                    {proposta.solicitacao.tipoAjudantes === 'empresa' 
                      ? `${proposta.solicitacao.quantidadeAjudantes || 1} da empresa`
                      : 'Próprios'
                    }
                  </p>
                </div>
              )}
            </div>

            {/* Informações dos Imóveis */}
            {(proposta.solicitacao?.tipoImovelOrigem || proposta.solicitacao?.tipoImovelDestino) && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-blue-600 mb-4">Informações dos Imóveis</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {proposta.solicitacao?.tipoImovelOrigem && (
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                      <div className="flex items-center mb-3">
                        <span className="text-orange-600 mr-2">🏠</span>
                        <p className="text-sm font-medium text-orange-700">Imóvel de Origem</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Tipo</p>
                          <p className="font-medium text-sm">
                            {proposta.solicitacao.tipoImovelOrigem === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}
                          </p>
                        </div>
                        {proposta.solicitacao.tipoImovelOrigem === 'apartamento' && (
                          <div className="grid grid-cols-2 gap-2">
                            {proposta.solicitacao.andarOrigem > 0 && (
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Andar</p>
                                <p className="font-medium text-sm">{proposta.solicitacao.andarOrigem}º andar</p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Elevador</p>
                              <p className="font-medium text-sm">
                                {proposta.solicitacao.elevadorOrigem ? '✅ Sim' : '❌ Não'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {proposta.solicitacao?.tipoImovelDestino && (
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <div className="flex items-center mb-3">
                        <span className="text-purple-600 mr-2">🏠</span>
                        <p className="text-sm font-medium text-purple-700">Imóvel de Destino</p>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-600 mb-1">Tipo</p>
                          <p className="font-medium text-sm">
                            {proposta.solicitacao.tipoImovelDestino === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}
                          </p>
                        </div>
                        {proposta.solicitacao.tipoImovelDestino === 'apartamento' && (
                          <div className="grid grid-cols-2 gap-2">
                            {proposta.solicitacao.andarDestino > 0 && (
                              <div>
                                <p className="text-xs text-gray-600 mb-1">Andar</p>
                                <p className="font-medium text-sm">{proposta.solicitacao.andarDestino}º andar</p>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-gray-600 mb-1">Elevador</p>
                              <p className="font-medium text-sm">
                                {proposta.solicitacao.elevadorDestino ? '✅ Sim' : '❌ Não'}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Observações */}
            {(proposta.solicitacao?.observacao || proposta.solicitacao?.observacoes) && (
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-semibold text-blue-600 mb-4">Observações</h3>
                <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-start">
                    <span className="text-yellow-600 mr-3 mt-0.5">📝</span>
                    <p className="font-medium text-sm text-gray-800 leading-relaxed">
                      {proposta.solicitacao.observacao || proposta.solicitacao.observacoes}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Status da Proposta */}
          {proposta.status === 'em_analise' ? (
            <div className="bg-yellow-50 px-4 py-4 border-t print-section">
              <div className="text-center">
                <div className="flex items-center justify-center mb-3">
                  <span className="text-yellow-600 mr-2">⏳</span>
                  <p className="text-lg font-semibold text-yellow-800">Proposta em Análise</p>
                </div>
                <p className="text-sm text-yellow-700 mb-2">
                  Nossa equipe está analisando sua solicitação e preparando o orçamento personalizado.
                </p>
                <p className="text-xs text-yellow-600">
                  Você receberá uma notificação quando a proposta estiver pronta.
                </p>
              </div>
            </div>
          ) : (
            /* Valor Total */
            <div className="bg-green-50 px-4 py-4 border-t print-section">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">Valor Total da Proposta</p>
                <p className="text-3xl sm:text-4xl font-bold text-green-600 mb-2">{formatarValor(proposta.valor)}</p>
                <p className="text-xs text-gray-500">⏰ Proposta válida por 7 dias a partir da data de emissão</p>
              </div>
            </div>
          )}

          {/* Informações de Contato - Aparece na impressão */}
          <div className="px-4 py-3 bg-gray-50 border-t-2 border-gray-300 print-section">
            <h3 className="text-sm font-semibold text-blue-600 mb-3">📞 Entre em Contato</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
              <div className="bg-white p-3 rounded-lg text-center">
                <p className="text-gray-600 text-xs mb-1">WhatsApp</p>
                <p className="font-medium text-sm">(62) 99110-3510</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <p className="text-gray-600 text-xs mb-1">Email</p>
                <p className="font-medium text-sm">contato@pachego.com.br</p>
              </div>
              <div className="bg-white p-3 rounded-lg text-center">
                <p className="text-gray-600 text-xs mb-1">Site</p>
                <p className="font-medium text-sm">www.pachego.com.br</p>
              </div>
            </div>
          </div>

          {/* Ações - Não imprime */}
          <div className="px-4 py-4 bg-gray-50 border-t-2 border-gray-300 no-print">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  const link = gerarMensagemWhatsApp()
                  console.log('🔗 Abrindo WhatsApp:', link)
                  window.location.href = link
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Falar no WhatsApp
              </button>
              
              <a
                href="/form"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Fazer Nova Cotação
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-6 text-gray-500 text-sm">
          <div className="border-t border-gray-300 pt-4">
            <p className="font-semibold text-gray-700">Pá-chego Fretes</p>
            <p>Empresa Goiana que atende todo o território nacional</p>
            <p className="mt-2">WhatsApp: (62) 99110-3510 | Email: contato@pachego.com.br</p>
            <p className="mt-1">www.pachego.com.br</p>
            <p className="mt-3 text-xs">Criada por uma equipe que pensa na experiência do cliente ❤️</p>
            <p className="mt-1 text-xs text-gray-400">
              © {new Date().getFullYear()} Pá-chego Fretes - Todos os direitos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default PropostaPage
