import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const PropostaPage = () => {
  const router = useRouter()
  const { id } = router.query
  const [proposta, setProposta] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Marcar que estamos no cliente
    setIsClient(true)
    
    if (id) {
      carregarProposta()
    }
  }, [id])

  const carregarProposta = () => {
    try {
      // Verificar se estamos no cliente
      if (!isClient) {
        return
      }
      
      // Buscar proposta no localStorage
      const propostaData = localStorage.getItem(`proposta_${id}`)
      
      if (propostaData) {
        const propostaParsed = JSON.parse(propostaData)
        setProposta(propostaParsed)
        setLoading(false)
      } else {
        setError('Proposta não encontrada')
        setLoading(false)
      }
    } catch (err) {
      console.error('Erro ao carregar proposta:', err)
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
    if (!proposta || !isClient) return ''
    
    const numero = '62991103510'
    const urlAtual = window.location.href
    
    const mensagem = `Olá! Sua proposta de frete está pronta! 🚛

📋 *Detalhes da Proposta:*
• Cliente: ${proposta.solicitacao.nome}
• Origem: ${proposta.solicitacao.origem}
• Destino: ${proposta.solicitacao.destino}
• Serviço: ${proposta.solicitacao.tipoServico}
• Data: ${proposta.solicitacao.data}

💰 *Valor Total: ${formatarValor(proposta.valor)}*

📄 *Acesse sua proposta completa aqui:*
${urlAtual}

⏰ *Esta proposta é válida por 7 dias.*

Para aceitar ou tirar dúvidas, entre em contato conosco!`

    return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
  }

  // Renderizar apenas no cliente
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
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Proposta de Frete</h1>
              <p className="text-gray-600">Pá-chego Fretes</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">ID: {proposta.id}</p>
              <p className="text-sm text-gray-500">Gerada em: {new Date(proposta.data).toLocaleString('pt-BR', {
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
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Dados do Cliente */}
          <div className="bg-blue-50 px-6 py-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Dados do Cliente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Nome</p>
                <p className="font-medium">{proposta.solicitacao.nome}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Celular WhatsApp</p>
                <p className="font-medium">{proposta.solicitacao.celular}</p>
              </div>
            </div>
          </div>

          {/* Detalhes do Frete */}
          <div className="px-6 py-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Detalhes do Frete</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600">Origem</p>
                <p className="font-medium text-lg">{proposta.solicitacao.origem}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Destino</p>
                <p className="font-medium text-lg">{proposta.solicitacao.destino}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Tipo de Serviço</p>
                <p className="font-medium">{proposta.solicitacao.tipoServico}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Data Desejada</p>
                <p className="font-medium">{proposta.solicitacao.data}</p>
              </div>
            </div>

            {/* Observações */}
            {proposta.solicitacao.observacoes && (
              <div className="mt-6">
                <p className="text-sm text-gray-600">Observações</p>
                <p className="font-medium bg-gray-50 p-3 rounded-lg">{proposta.solicitacao.observacoes}</p>
              </div>
            )}
          </div>

          {/* Valor Total */}
          <div className="bg-green-50 px-6 py-6 border-t">
            <div className="text-center">
              <p className="text-sm text-gray-600 mb-2">Valor Total</p>
              <p className="text-4xl font-bold text-green-600">{formatarValor(proposta.valor)}</p>
              <p className="text-sm text-gray-500 mt-2">Proposta válida por 7 dias</p>
            </div>
          </div>

          {/* Ações */}
          <div className="px-6 py-6 bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={gerarMensagemWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                </svg>
                Falar no WhatsApp
              </a>
              
              <a
                href="/form"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Fazer Nova Cotação
              </a>
            </div>
          </div>
        </div>

        {/* Rodapé */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Pá-chego Fretes - Empresa Goiana que atende todo o território nacional</p>
          <p>Criada por uma equipe que pensa na experiência do cliente ❤️</p>
        </div>
      </div>
    </div>
  )
}

export default PropostaPage
