import { useState, useEffect } from 'react'
import Head from 'next/head'
import Favicon from '../components/Favicon'
import { buscarSolicitacoes, atualizarStatus, excluirSolicitacao, escutarSolicitacoes } from '../lib/solicitacoes'
import { db } from '../lib/firebase'

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

  // Carregar solicitações do Firebase
  const carregarSolicitacoes = async () => {
    try {
      console.log('=== CARREGANDO SOLICITAÇÕES DO FIREBASE ===')
      console.log('Ambiente:', process.env.NODE_ENV)
      console.log('URL:', window.location.href)
      
      const resultado = await buscarSolicitacoes()
      
      if (resultado.success) {
        console.log('✅ Solicitações carregadas do Firebase:', resultado.data.length)
        setSolicitacoes(resultado.data)
      } else {
        console.error('❌ Erro ao carregar do Firebase:', resultado.error)
        // Fallback para localStorage
        const dados = localStorage.getItem('solicitacoes')
        if (dados) {
          const parsed = JSON.parse(dados)
          console.log('💾 Carregando do localStorage como fallback:', parsed.length)
          setSolicitacoes(parsed)
        }
      }
    } catch (error) {
      console.error('❌ Erro geral ao carregar:', error)
    }
  }

  useEffect(() => {
    // Marcar que estamos no cliente
    setIsClient(true)
    
    // Carregar inicialmente
    carregarSolicitacoes()
    
    // Escutar mudanças em tempo real do Firebase
    const unsubscribe = escutarSolicitacoes((novasSolicitacoes) => {
      console.log('🔄 LISTENER FIREBASE ATIVADO!')
      console.log('📊 Novas solicitações recebidas:', novasSolicitacoes.length)
      console.log('📋 IDs das solicitações:', novasSolicitacoes.map(s => s.id))
      
      // Verificar se houve mudança no número de solicitações
      const diferenca = solicitacoes.length - novasSolicitacoes.length
      if (diferenca > 0) {
        console.log(`📉 ${diferenca} solicitação(ões) removida(s)`)
        console.log('🗑️ Solicitações removidas:', solicitacoes.filter(s => !novasSolicitacoes.find(ns => ns.id === s.id)).map(s => s.id))
      } else if (diferenca < 0) {
        console.log(`📈 ${Math.abs(diferenca)} solicitação(ões) adicionada(s)`)
      } else {
        console.log('📊 Número de solicitações mantido')
      }
      
      setSolicitacoes(novasSolicitacoes)
    })
    
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [])

  const filtrarSolicitacoes = () => {
    if (filtroStatus === 'todos') {
      return solicitacoes
    }
    return solicitacoes.filter(s => s.status === filtroStatus)
  }

  const atualizarStatusSolicitacao = async (id, novoStatus) => {
    try {
      console.log('🔄 Atualizando status:', id, 'Tipo:', typeof id, 'Para:', novoStatus)
      
      // Converter ID para string se necessário
      const idString = String(id)
      console.log('🔄 ID convertido para string:', idString)
      
      const resultado = await atualizarStatus(idString, novoStatus)
      if (resultado.success) {
        console.log('✅ Status atualizado no Firebase')
      } else {
        console.error('❌ Erro ao atualizar status:', resultado.error)
      }
    } catch (error) {
      console.error('❌ Erro geral ao atualizar:', error)
    }
  }

  const excluirSolicitacaoSolicitacao = async (id) => {
    console.log('🚀 INICIANDO EXCLUSÃO...')
    console.log('ID recebido:', id)
    console.log('Firebase conectado:', !!db)
    console.log('🔍 ID específico:', id)
    
    if (confirm('Tem certeza que deseja excluir esta solicitação?')) {
      console.log('✅ Usuário confirmou exclusão')
      
      try {
        console.log('🗑️ EXCLUINDO SOLICITAÇÃO')
        console.log('ID original:', id, 'Tipo:', typeof id)
        console.log('ID completo:', JSON.stringify(id))
        
        // Verificar se é um ID válido do Firebase
        if (!id || id === 'undefined' || id === 'null') {
          console.error('❌ ID inválido!')
          alert('ID da solicitação inválido!')
          return
        }
        
        // Converter ID para string se necessário
        const idString = String(id).trim()
        console.log('ID convertido para string:', idString)
        console.log('🔍 ID sendo processado:', idString)
        console.log('🔍 Este é o ID real do Firebase:', idString)
        
        console.log('🔥 Chamando função excluirSolicitacao...')
        console.log('⏳ Aguardando resposta do Firebase...')
        
        const inicio = Date.now()
        const resultado = await excluirSolicitacao(idString)
        const tempo = Date.now() - inicio
        
        console.log('📊 Resultado da exclusão:', resultado)
        console.log('Success:', resultado.success)
        console.log('Error:', resultado.error)
        console.log('Message:', resultado.message)
        console.log('⏱️ Tempo de resposta:', tempo + 'ms')
        
        if (resultado.success) {
          console.log('✅ Solicitação excluída do Firebase com sucesso!')
          console.log('🔄 Aguardando atualização em tempo real...')
          
          // Mostrar mensagem de sucesso para o usuário
          alert('Solicitação excluída com sucesso!')
          
          // Mostrar mensagem de sucesso
          if (resultado.message) {
            console.log('ℹ️ Mensagem:', resultado.message)
          }
          
          // Não precisa recarregar manualmente, o listener vai atualizar
          console.log('✅ Aguardando listener do Firebase...')
        } else {
          console.error('❌ Erro ao excluir:', resultado.error)
          alert('Erro ao excluir solicitação: ' + resultado.error)
        }
      } catch (error) {
        console.error('❌ Erro geral ao excluir:', error)
        console.error('Stack trace:', error.stack)
        
        // Verificar se é erro de rede ou Firebase
        if (error.message.includes('network') || error.message.includes('offline')) {
          alert('Erro de conexão. Verifique sua internet e tente novamente.')
        } else {
          alert('Erro ao excluir solicitação: ' + error.message)
        }
      }
    } else {
      console.log('❌ Usuário cancelou exclusão')
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
    if (!solicitacaoSelecionada?.id) return

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

  const gerarLinkProposta = (solicitacao, valor = 0) => {
    // Gerar ID único para a proposta
    const propostaId = `proposta_${Date.now()}`
    const linkPropostaGerado = `${window.location.origin}/proposta/${propostaId}`
    
    // Criar dados da proposta com TODOS os campos
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
        dataDesejada: solicitacao.dataDesejada || '',
        tamanhoMudanca: solicitacao.tamanhoMudanca || '',
        tipoAjudantes: solicitacao.tipoAjudantes || '',
        quantidadeAjudantes: solicitacao.quantidadeAjudantes || 1,
        tipoImovelOrigem: solicitacao.tipoImovelOrigem || '',
        tipoImovelDestino: solicitacao.tipoImovelDestino || '',
        andarOrigem: solicitacao.andarOrigem || 0,
        andarDestino: solicitacao.andarDestino || 0,
        elevadorOrigem: solicitacao.elevadorOrigem || false,
        elevadorDestino: solicitacao.elevadorDestino || false,
        observacao: solicitacao.observacao || solicitacao.observacoes || ''
      }
    }
    
    // Salvar no localStorage
    localStorage.setItem(`proposta_${propostaId}`, JSON.stringify(propostaData))
    
    // Salvar o link na timeline da solicitação
    const timelineData = localStorage.getItem(`timeline_${solicitacao.id}`)
    const timeline = timelineData ? JSON.parse(timelineData) : []
    
    // Adicionar evento de proposta com o link
    const eventoProposta = {
      id: Date.now(),
      tipo: 'proposta',
      titulo: 'Link da Proposta Gerado',
      descricao: `Link gerado: ${linkPropostaGerado}`,
      link: linkPropostaGerado,
      data: new Date().toISOString()
    }
    
    timeline.push(eventoProposta)
    localStorage.setItem(`timeline_${solicitacao.id}`, JSON.stringify(timeline))
    
    return { link: linkPropostaGerado, propostaData }
  }

  const gerarPDF = () => {
    if (!valorProposta || !solicitacaoParaProposta) return

    // Criar conteúdo do PDF baseado no exemplo
    const dataAtual = new Date().toLocaleDateString('pt-BR')
    const valorFormatado = parseFloat(valorProposta).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    // Gerar link da proposta
    const { link: linkPropostaGerado, propostaData: propostaDataGerada } = gerarLinkProposta(solicitacaoParaProposta, parseFloat(valorProposta))
    const propostaId = propostaDataGerada.id
    
    // Atualizar proposta provisória se existir
    const propostaProvisoriaId = `proposta_${solicitacaoParaProposta.id.split('_')[1]}`
    const propostaProvisoria = localStorage.getItem(`proposta_${propostaProvisoriaId}`)
    
    if (propostaProvisoria) {
      console.log('🔄 Atualizando proposta provisória...')
      // Atualizar a proposta provisória com os dados finais
      const propostaAtualizada = {
        ...propostaDataGerada,
        status: 'finalizada', // Mudar status de 'em_analise' para 'finalizada'
        valor: parseFloat(valorProposta)
      }
      localStorage.setItem(`proposta_${propostaId}`, JSON.stringify(propostaAtualizada))
      // Manter também a versão provisória atualizada para compatibilidade
      localStorage.setItem(`proposta_${propostaProvisoriaId}`, JSON.stringify(propostaAtualizada))
      console.log('✅ Proposta provisória atualizada com sucesso!')
    }

    const conteudoPDF = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Proposta de Frete - Pá-chego</title>
        <style>
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
            
            .print-section {
              margin-bottom: 0.5rem !important;
              padding: 0.25rem !important;
            }
            
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
          }
          
          body { 
            font-family: Arial, sans-serif; 
            margin: 0; 
            padding: 0; 
            line-height: 1.4; 
            background: #f3f4f6;
          }
          
          .print-page {
            background: white;
            min-height: 100vh;
          }
          
          .print-header {
            background: white;
            border-bottom: 1px solid #2563eb;
            padding: 0.5rem 0;
            margin-bottom: 0.5rem;
          }
          
          .header-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 0 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          
          .logo-section {
            display: flex;
            align-items: center;
            gap: 0.75rem;
          }
          
          .logo-text {
            font-size: 1.25rem;
            font-weight: bold;
            color: #1f2937;
          }
          
          .subtitle {
            font-size: 0.875rem;
            color: #6b7280;
          }
          
          .header-info {
            text-align: right;
          }
          
          .proposal-id {
            font-size: 0.75rem;
            color: #6b7280;
          }
          
          .proposal-date {
            font-size: 0.75rem;
            color: #6b7280;
          }
          
          .print-content {
            max-width: 800px;
            margin: 0 auto;
            padding: 1rem;
            background: white;
            border-radius: 0.5rem;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .section {
            margin-bottom: 0.5rem;
            padding: 0.25rem;
          }
          
          .section-header {
            background: #dbeafe;
            padding: 0.5rem 1rem;
            border-bottom: 1px solid #93c5fd;
            margin-bottom: 0.5rem;
          }
          
          .section-title {
            font-size: 1rem;
            font-weight: 600;
            color: #1f2937;
            margin: 0;
          }
          
          .section-content {
            padding: 0.5rem 1rem;
          }
          
          .info-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
          }
          
          .info-item {
            margin-bottom: 0.25rem;
          }
          
          .info-label {
            font-size: 0.75rem;
            color: #6b7280;
            margin-bottom: 0.125rem;
          }
          
          .info-value {
            font-size: 0.875rem;
            font-weight: 500;
            color: #1f2937;
          }
          
          .valor-section {
            background: #dcfce7;
            border-top: 2px solid #22c55e;
            padding: 0.75rem 1rem;
            text-align: center;
          }
          
          .valor-label {
            font-size: 0.75rem;
            color: #6b7280;
            margin-bottom: 0.25rem;
          }
          
          .valor-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #16a34a;
          }
          
          .valor-note {
            font-size: 0.75rem;
            color: #6b7280;
            margin-top: 0.25rem;
          }
          
          .contact-section {
            background: #f9fafb;
            border-top: 2px solid #d1d5db;
            padding: 0.5rem 1rem;
          }
          
          .contact-title {
            font-size: 0.875rem;
            font-weight: 600;
            color: #1f2937;
            margin-bottom: 0.5rem;
          }
          
          .contact-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.5rem;
            font-size: 0.75rem;
          }
          
          .contact-item {
            text-align: center;
          }
          
          .contact-label {
            color: #6b7280;
            margin-bottom: 0.125rem;
          }
          
          .contact-value {
            font-weight: 500;
            color: #1f2937;
          }
        </style>
      </head>
      <body>
        <div class="print-page">
          <!-- Header -->
          <div class="print-header">
            <div class="header-content">
              <div class="logo-section">
                <div>
                  <div class="logo-text">Pá-chego Fretes</div>
                  <div class="subtitle">Empresa Goiana - Atendimento Nacional</div>
                </div>
              </div>
              <div class="header-info">
                <div class="proposal-id">Proposta: #${propostaId.split('_')[1]}</div>
                <div class="proposal-date">Gerada em: ${new Date().toLocaleString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</div>
              </div>
            </div>
          </div>

          <!-- Conteúdo -->
          <div class="print-content">
            <!-- Dados do Cliente -->
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Dados do Cliente</h2>
              </div>
              <div class="section-content">
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Nome</div>
                    <div class="info-value">${solicitacaoParaProposta.nome || 'Não informado'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Celular WhatsApp</div>
                    <div class="info-value">${solicitacaoParaProposta.celular || 'Não informado'}</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Detalhes do Frete -->
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Detalhes do Frete</h2>
              </div>
              <div class="section-content">
                <div class="info-grid">
                  <div class="info-item">
                    <div class="info-label">Origem</div>
                    <div class="info-value">${solicitacaoParaProposta.origem || 'Não informado'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Destino</div>
                    <div class="info-value">${solicitacaoParaProposta.destino || 'Não informado'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Tipo de Serviço</div>
                    <div class="info-value">${solicitacaoParaProposta.tipoServico || 'Não informado'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Data da Solicitação</div>
                    <div class="info-value">${solicitacaoParaProposta.data ? new Date(solicitacaoParaProposta.data).toLocaleString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    }) : 'Não informado'}</div>
                  </div>
                  <div class="info-item">
                    <div class="info-label">Data Desejada para o Serviço</div>
                    <div class="info-value">${solicitacaoParaProposta.dataDesejada ? new Date(solicitacaoParaProposta.dataDesejada).toLocaleDateString('pt-BR') : 'Não informada'}</div>
                  </div>
                  ${solicitacaoParaProposta.tamanhoMudanca ? `
                  <div class="info-item">
                    <div class="info-label">Tamanho da Mudança</div>
                    <div class="info-value">${solicitacaoParaProposta.tamanhoMudanca}</div>
                  </div>
                  ` : ''}
                  ${solicitacaoParaProposta.tipoAjudantes ? `
                  <div class="info-item">
                    <div class="info-label">Ajudantes</div>
                    <div class="info-value">${solicitacaoParaProposta.tipoAjudantes === 'empresa' 
                      ? `${solicitacaoParaProposta.quantidadeAjudantes || 1} da empresa`
                      : 'Próprios'}</div>
                  </div>
                  ` : ''}
                </div>
              </div>
            </div>

            <!-- Informações dos Imóveis -->
            ${(solicitacaoParaProposta.tipoImovelOrigem || solicitacaoParaProposta.tipoImovelDestino) ? `
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Informações dos Imóveis</h2>
              </div>
              <div class="section-content">
                <div class="info-grid">
                  ${solicitacaoParaProposta.tipoImovelOrigem ? `
                  <div class="info-item">
                    <div class="info-label">Imóvel de Origem</div>
                    <div class="info-value">${solicitacaoParaProposta.tipoImovelOrigem === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}${solicitacaoParaProposta.tipoImovelOrigem === 'apartamento' && solicitacaoParaProposta.andarOrigem > 0 ? ` - ${solicitacaoParaProposta.andarOrigem}º andar` : ''}${solicitacaoParaProposta.tipoImovelOrigem === 'apartamento' && solicitacaoParaProposta.elevadorOrigem ? ' (com elevador)' : ''}${solicitacaoParaProposta.tipoImovelOrigem === 'apartamento' && !solicitacaoParaProposta.elevadorOrigem && solicitacaoParaProposta.andarOrigem > 0 ? ' (sem elevador)' : ''}</div>
                  </div>
                  ` : ''}
                  ${solicitacaoParaProposta.tipoImovelDestino ? `
                  <div class="info-item">
                    <div class="info-label">Imóvel de Destino</div>
                    <div class="info-value">${solicitacaoParaProposta.tipoImovelDestino === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}${solicitacaoParaProposta.tipoImovelDestino === 'apartamento' && solicitacaoParaProposta.andarDestino > 0 ? ` - ${solicitacaoParaProposta.andarDestino}º andar` : ''}${solicitacaoParaProposta.tipoImovelDestino === 'apartamento' && solicitacaoParaProposta.elevadorDestino ? ' (com elevador)' : ''}${solicitacaoParaProposta.tipoImovelDestino === 'apartamento' && !solicitacaoParaProposta.elevadorDestino && solicitacaoParaProposta.andarDestino > 0 ? ' (sem elevador)' : ''}</div>
                  </div>
                  ` : ''}
                </div>
              </div>
            </div>
            ` : ''}

            <!-- Observações -->
            ${(solicitacaoParaProposta.observacao || solicitacaoParaProposta.observacoes) ? `
            <div class="section">
              <div class="section-header">
                <h2 class="section-title">Observações</h2>
              </div>
              <div class="section-content">
                <div class="info-value" style="background: #f9fafb; padding: 0.5rem; border-radius: 0.25rem;">${solicitacaoParaProposta.observacao || solicitacaoParaProposta.observacoes}</div>
              </div>
            </div>
            ` : ''}

            <!-- Valor Total -->
            <div class="valor-section">
              <div class="valor-label">Valor Total da Proposta</div>
              <div class="valor-value">${valorFormatado}</div>
              <div class="valor-note">⏰ Proposta válida por 7 dias a partir da data de emissão</div>
            </div>

            <!-- Informações de Contato -->
            <div class="contact-section">
              <div class="contact-title">📞 Entre em Contato</div>
              <div class="contact-grid">
                <div class="contact-item">
                  <div class="contact-label">WhatsApp</div>
                  <div class="contact-value">(62) 99110-3510</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">Email</div>
                  <div class="contact-value">contato@pachego.com.br</div>
                </div>
                <div class="contact-item">
                  <div class="contact-label">Site</div>
                  <div class="contact-value">www.pachego.com.br</div>
                </div>
              </div>
            </div>
          </div>
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
    
    // Salvar proposta completa no localStorage com TODOS os campos
    const propostaDataCompleta = {
      id: propostaId,
      solicitacaoId: solicitacaoParaProposta.id,
      valor: parseFloat(valorProposta),
      data: new Date().toISOString(),
      conteudo: conteudoPDF,
      solicitacao: {
        nome: solicitacaoParaProposta.nome || 'Nome não informado',
        celular: solicitacaoParaProposta.celular || 'Celular não informado',
        origem: solicitacaoParaProposta.origem || 'Origem não informada',
        destino: solicitacaoParaProposta.destino || 'Destino não informado',
        tipoServico: solicitacaoParaProposta.tipoServico || 'Serviço não informado',
        data: solicitacaoParaProposta.data || new Date().toISOString(),
        dataDesejada: solicitacaoParaProposta.dataDesejada || '',
        tamanhoMudanca: solicitacaoParaProposta.tamanhoMudanca || '',
        tipoAjudantes: solicitacaoParaProposta.tipoAjudantes || '',
        quantidadeAjudantes: solicitacaoParaProposta.quantidadeAjudantes || 1,
        tipoImovelOrigem: solicitacaoParaProposta.tipoImovelOrigem || '',
        tipoImovelDestino: solicitacaoParaProposta.tipoImovelDestino || '',
        andarOrigem: solicitacaoParaProposta.andarOrigem || 0,
        andarDestino: solicitacaoParaProposta.andarDestino || 0,
        elevadorOrigem: solicitacaoParaProposta.elevadorOrigem || false,
        elevadorDestino: solicitacaoParaProposta.elevadorDestino || false,
        observacao: solicitacaoParaProposta.observacao || solicitacaoParaProposta.observacoes || ''
      }
    }
    localStorage.setItem(`proposta_${propostaId}`, JSON.stringify(propostaDataCompleta))
    
    // Adicionar à timeline se estiver na tela de detalhes
    if (mostrarDetalhes && solicitacaoSelecionada) {
      // Adicionar evento de proposta com o link
      const eventoProposta = {
        id: Date.now(),
        tipo: 'proposta',
        titulo: 'Proposta Gerada',
        descricao: `Proposta de ${valorFormatado} criada e link gerado`,
        link: linkPropostaGerado,
        data: new Date().toISOString(),
        status: 'concluido'
      }
      
      const novaTimeline = [...timeline, eventoProposta]
      setTimeline(novaTimeline)
      localStorage.setItem(`timeline_${solicitacaoSelecionada.id}`, JSON.stringify(novaTimeline))
    }
    
    // Atualizar status
    atualizarStatusSolicitacao(solicitacaoParaProposta.id, 'em_andamento')
  }

  const gerarMensagemWhatsApp = () => {
    if (!solicitacaoParaProposta) return ''
    
    const valorFormatado = parseFloat(valorProposta).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const mensagem = `*SEU ORCAMENTO FICOU PRONTO!*

Ola ${solicitacaoParaProposta.nome}! 

Sua solicitacao de frete foi analisada e ja temos uma proposta personalizada para voce:

*RESUMO DO SERVICO:*
• Origem: ${solicitacaoParaProposta.origem}
• Destino: ${solicitacaoParaProposta.destino}
• Tamanho: ${solicitacaoParaProposta.tamanhoMudanca}
• Ajudantes: ${solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} da empresa` : 'Proprios'}

*VALOR DA PROPOSTA: ${valorFormatado}*

*ACESSE SUA PROPOSTA COMPLETA:*
${linkProposta}

*O QUE ESTA INCLUIDO:*
• Veiculo adequado para o tamanho da mudanca
• ${solicitacaoParaProposta.tipoAjudantes === 'empresa' ? `${solicitacaoParaProposta.quantidadeAjudantes} ajudante(s) profissional(is)` : 'Suporte para seus ajudantes proprios'}
• Atendimento personalizado

*PARA CONFIRMAR OU ESCLARECER DUVIDAS:*
• WhatsApp: (62) 99110-3510
• Email: contato@pachego.com.br

Esta proposta e valida por 7 dias.

Aguardamos seu retorno!

_Equipe Pa-chego Fretes_`

    return encodeURIComponent(mensagem)
  }

  const gerarMensagemWhatsAppCompleta = () => {
    if (!solicitacaoSelecionada?.nome) return ''
    
    const valorFormatado = linkProposta ? parseFloat(valorProposta).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }) : 'A ser definido'

    const mensagem = `*SEU ORCAMENTO FICOU PRONTO!*

Ola ${solicitacaoSelecionada.nome}! 

Sua solicitacao de frete foi analisada e ja temos uma proposta personalizada para voce:

*RESUMO DO SERVICO:*
• Origem: ${solicitacaoSelecionada.origem}
• Destino: ${solicitacaoSelecionada.destino}
• Tipo: ${solicitacaoSelecionada.tipoServico}
${solicitacaoSelecionada.tamanhoMudanca ? `• Tamanho: ${solicitacaoSelecionada.tamanhoMudanca}` : ''}
${solicitacaoSelecionada.tipoAjudantes ? `• Ajudantes: ${solicitacaoSelecionada.tipoAjudantes === 'empresa' ? `${solicitacaoSelecionada.quantidadeAjudantes} da empresa` : 'Proprios'}` : ''}

*VALOR DA PROPOSTA: ${valorFormatado}*

${linkProposta ? `*ACESSE SUA PROPOSTA COMPLETA:*
${linkProposta}

` : ''}*DUVIDAS?* 
Estamos aqui para ajudar! Responda esta mensagem ou ligue para (62) 99110-3510

_Equipe Pa-chego Fretes_`

    return encodeURIComponent(mensagem)
  }

  const gerarMensagemWhatsAppProposta = (linkProposta) => {
    if (!solicitacaoSelecionada?.nome) return ''
    
    const mensagem = `Ola! Sua proposta de frete esta pronta!
    
*DETALHES DA PROPOSTA:*
• Cliente: ${solicitacaoSelecionada.nome || 'Nao informado'}
• Origem: ${solicitacaoSelecionada.origem || 'Nao informado'}
• Destino: ${solicitacaoSelecionada.destino || 'Nao informado'}
• Servico: ${solicitacaoSelecionada.tipoServico || 'Nao informado'}

*ACESSE SUA PROPOSTA COMPLETA:*
${linkProposta}

Esta proposta e valida por 7 dias.

Para aceitar ou tirar duvidas, entre em contato conosco!

_Equipe Pa-chego Fretes_`

    return mensagem
  }

  const excluirProposta = (eventoId) => {
    if (!confirm('Tem certeza que deseja excluir esta proposta? Esta ação não pode ser desfeita.')) {
      return
    }

    // Remover da timeline
    const novaTimeline = timeline.filter(evento => evento.id !== eventoId)
    setTimeline(novaTimeline)
    localStorage.setItem(`timeline_${solicitacaoSelecionada.id}`, JSON.stringify(novaTimeline))

    // Encontrar e remover dados da proposta do localStorage
    const evento = timeline.find(e => e.id === eventoId)
    if (evento && evento.link) {
      const propostaId = evento.link.split('/').pop()
      localStorage.removeItem(`proposta_${propostaId}`)
    }

    alert('Proposta excluída com sucesso!')
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
                  href="/form"
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
                              {new Date(solicitacao.data).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
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
                              {/* Botão Link - só aparece se já foi gerado */}
                              {(() => {
                                // Verificar se já existe link gerado na timeline
                                const timelineData = localStorage.getItem(`timeline_${solicitacao.id}`)
                                const temLink = timelineData ? JSON.parse(timelineData).some(e => e.tipo === 'proposta') : false
                                
                                return temLink ? (
                                  <button
                                    onClick={() => {
                                      // Buscar o link existente na timeline
                                      const timelineData = localStorage.getItem(`timeline_${solicitacao.id}`)
                                      const timeline = timelineData ? JSON.parse(timelineData) : []
                                      const eventoProposta = timeline.find(e => e.tipo === 'proposta')
                                      
                                      if (eventoProposta && eventoProposta.link) {
                                        navigator.clipboard.writeText(eventoProposta.link)
                                        alert('Link copiado para a área de transferência!')
                                      }
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                    title="Copiar link da proposta"
                                  >
                                    📋 Copiar
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => {
                                      const { link } = gerarLinkProposta(solicitacao, 0)
                                      navigator.clipboard.writeText(link)
                                      
                                      alert('Link gerado e copiado para a área de transferência!')
                                      
                                      // Recarregar a página para atualizar o botão
                                      window.location.reload()
                                    }}
                                    className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-semibold rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                                    title="Gerar link da proposta"
                                  >
                                    🔗 Gerar
                                  </button>
                                )
                              })()}
                              <select
                                value={solicitacao.status}
                                onChange={(e) => atualizarStatusSolicitacao(solicitacao.id, e.target.value)}
                                className="text-xs border-2 border-gray-200 rounded-lg px-2 py-1.5 bg-white hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all duration-200"
                              >
                                <option value="pendente">⏳ Pendente</option>
                                <option value="em_andamento">🔄 Em Andamento</option>
                                <option value="concluida">✅ Concluída</option>
                                <option value="cancelada">❌ Cancelada</option>
                              </select>
                              <button
                                onClick={() => excluirSolicitacaoSolicitacao(solicitacao.firebaseId || solicitacao.id)}
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
        {mostrarDetalhes && solicitacaoSelecionada?.id && (
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
                    <p className="text-blue-100">ID: #{solicitacaoSelecionada?.id || 'N/A'}</p>
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
                        <p className="text-gray-900 font-medium">
                          {new Date(solicitacaoSelecionada.data).toLocaleDateString('pt-BR', {
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

                  {/* Informações dos Imóveis - NOVO */}
                  {(solicitacaoSelecionada.tipoImovelOrigem || solicitacaoSelecionada.tipoImovelDestino) && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-3">🏠</span>
                        Informações dos Imóveis
                      </h3>
                      <div className="space-y-4">
                        {solicitacaoSelecionada.tipoImovelOrigem && (
                          <div>
                            <label className="text-sm font-semibold text-gray-600">Imóvel de Origem</label>
                            <p className="text-gray-900 font-medium">
                              {solicitacaoSelecionada.tipoImovelOrigem === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}
                              {solicitacaoSelecionada.tipoImovelOrigem === 'apartamento' && (
                                <>
                                  {solicitacaoSelecionada.andarOrigem > 0 && ` - ${solicitacaoSelecionada.andarOrigem}º andar`}
                                  {solicitacaoSelecionada.elevadorOrigem && ' (com elevador)'}
                                  {!solicitacaoSelecionada.elevadorOrigem && solicitacaoSelecionada.andarOrigem > 0 && ' (sem elevador)'}
                                </>
                              )}
                            </p>
                          </div>
                        )}
                        {solicitacaoSelecionada.tipoImovelDestino && (
                          <div>
                            <label className="text-sm font-semibold text-gray-600">Imóvel de Destino</label>
                            <p className="text-gray-900 font-medium">
                              {solicitacaoSelecionada.tipoImovelDestino === 'casa' ? '🏠 Casa' : '🏢 Apartamento'}
                              {solicitacaoSelecionada.tipoImovelDestino === 'apartamento' && (
                                <>
                                  {solicitacaoSelecionada.andarDestino > 0 && ` - ${solicitacaoSelecionada.andarDestino}º andar`}
                                  {solicitacaoSelecionada.elevadorDestino && ' (com elevador)'}
                                  {!solicitacaoSelecionada.elevadorDestino && solicitacaoSelecionada.andarDestino > 0 && ' (sem elevador)'}
                                </>
                              )}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Observações */}
                  {(solicitacaoSelecionada.observacao || solicitacaoSelecionada.observacoes) && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                        <span className="text-2xl mr-3">📝</span>
                        Observações
                      </h3>
                      <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{solicitacaoSelecionada.observacao || solicitacaoSelecionada.observacoes}</p>
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
                                {new Date(evento.data).toLocaleDateString('pt-BR', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                              
                              {/* Link da Proposta integrado na timeline */}
                              {evento.tipo === 'proposta' && evento.link && (
                                <div className="mt-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                  <div className="space-y-3">
                                    {/* Link em linha separada */}
                                    <div>
                                      <p className="text-sm text-gray-600 mb-2">Link da proposta:</p>
                                      <div className="bg-white p-3 rounded-lg border border-gray-300">
                                        <p className="text-sm font-mono text-blue-600 break-all">{evento.link}</p>
                                      </div>
                                    </div>
                                    
                                    {/* Botões de ação */}
                                    <div className="flex flex-wrap gap-2">
                                      <button
                                        onClick={() => navigator.clipboard.writeText(evento.link)}
                                        className="px-3 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-all duration-200 text-sm flex items-center space-x-1"
                                        title="Copiar link"
                                      >
                                        <span>📋</span>
                                        <span>Copiar</span>
                                      </button>
                                      <a
                                        href={evento.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200 text-sm flex items-center space-x-1"
                                        title="Abrir link"
                                      >
                                        <span>🔗</span>
                                        <span>Abrir</span>
                                      </a>
                                      <a
                                        href={`https://api.whatsapp.com/send?phone=${solicitacaoSelecionada?.celular?.replace(/\D/g, '')}&text=${encodeURIComponent(gerarMensagemWhatsAppProposta(evento.link))}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-all duration-200 text-sm flex items-center space-x-1"
                                        title="Enviar WhatsApp"
                                      >
                                        <span>📱</span>
                                        <span>WhatsApp</span>
                                      </a>
                                      <button
                                        onClick={() => window.open(evento.link, '_blank')}
                                        className="px-3 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-all duration-200 text-sm flex items-center space-x-1"
                                        title="Imprimir PDF"
                                      >
                                        <span>🖨️</span>
                                        <span>Imprimir</span>
                                      </button>
                                      <button
                                        onClick={() => excluirProposta(evento.id)}
                                        className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200 text-sm flex items-center space-x-1"
                                        title="Excluir proposta"
                                      >
                                        <span>🗑️</span>
                                        <span>Excluir</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              )}
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
                    <p className="text-blue-100">ID: #{solicitacaoSelecionada?.id || 'N/A'}</p>
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
