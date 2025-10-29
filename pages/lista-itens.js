import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Favicon from '../components/Favicon'

const itensPredefinidos = [
  'Geladeira',
  'Cama Casal',
  'Sofá',
  'Fogão',
  'Máquina de Lavar',
  'TV',
  'Mesa',
  'Cadeiras',
  'Guarda-roupa',
  'Armário',
  'Cama Solteiro',
  'Microondas',
  'Geladeira Duplex',
  'Cama Queen',
  'Sofá de Canto',
  'Rack',
  'Estante',
  'Escritório',
  'Box de Casal',
  'Box Solteiro'
]

export default function ListaItens() {
  const [itens, setItens] = useState([])
  const [novoItem, setNovoItem] = useState('')
  const [mostrarInput, setMostrarInput] = useState(false)
  const [mostrarPreview, setMostrarPreview] = useState(false)

  const adicionarItemPredefinido = (nomeItem) => {
    const itemExistente = itens.find(item => item.nome.toLowerCase() === nomeItem.toLowerCase())
    
    if (itemExistente) {
      // Se já existe, aumenta a quantidade
      setItens(itens.map(item => 
        item.id === itemExistente.id 
          ? { ...item, quantidade: item.quantidade + 1 }
          : item
      ))
    } else {
      // Se não existe, adiciona novo
      setItens([...itens, {
        id: Date.now() + Math.random(),
        nome: nomeItem,
        quantidade: 1
      }])
    }
  }

  const adicionarItemCustomizado = () => {
    if (novoItem.trim()) {
      const itemExistente = itens.find(item => item.nome.toLowerCase() === novoItem.trim().toLowerCase())
      
      if (itemExistente) {
        setItens(itens.map(item => 
          item.id === itemExistente.id 
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        ))
      } else {
        setItens([...itens, {
          id: Date.now() + Math.random(),
          nome: novoItem.trim(),
          quantidade: 1
        }])
      }
      
      setNovoItem('')
      setMostrarInput(false)
    }
  }

  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id))
  }

  const atualizarQuantidade = (id, novaQuantidade) => {
    if (novaQuantidade < 1) {
      removerItem(id)
      return
    }
    
    setItens(itens.map(item => 
      item.id === id 
        ? { ...item, quantidade: novaQuantidade }
        : item
    ))
  }

  const gerarMensagemWhatsApp = () => {
    if (itens.length === 0) return ''
    
    let mensagem = `📋 *LISTA DE ITENS PARA MUDANÇA*\n\n`
    
    itens.forEach((item, index) => {
      mensagem += `${item.nome} ${item.quantidade > 1 ? `x${item.quantidade}` : ''}\n`
    })
    
    mensagem += `\n📞 Para orçamento ou dúvidas, entre em contato!\n_Equipe Pa-chego Fretes_`
    
    return mensagem
  }

  const enviarWhatsApp = () => {
    if (itens.length === 0) {
      alert('Adicione pelo menos um item antes de enviar!')
      return
    }
    
    const mensagem = gerarMensagemWhatsApp()
    const numero = '62991103510'
    const link = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`
    
    window.location.href = link
  }

  const totalItens = itens.reduce((total, item) => total + item.quantidade, 0)

  return (
    <>
      <Head>
        <title>Lista de Itens - Pá-chego Fretes</title>
        <meta name="description" content="Liste os itens da sua mudança e envie pelo WhatsApp. Facilite o orçamento da sua mudança com a Pá-chego Fretes." />
        <link rel="canonical" href="https://cotacao.pachego.com.br/lista-itens" />
      </Head>
      
      <Favicon />
      
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-4 sm:py-6">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Header */}
          <div className="text-center mb-4 sm:mb-6">
            <div className="flex justify-center mb-3 sm:mb-4">
              <Image
                src="/logo.png"
                alt="Pá-chego Fretes"
                width={120}
                height={48}
                className="object-contain"
              />
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
              Lista de Itens para Mudança
            </h1>
            <p className="text-sm sm:text-base text-gray-600">
              Marque os itens que você tem e envie pelo WhatsApp
            </p>
          </div>

          {/* Itens Predefinidos */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              📦 Itens Comuns
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {itensPredefinidos.map((item) => (
                <button
                  key={item}
                  onClick={() => adicionarItemPredefinido(item)}
                  className="px-4 py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 border border-blue-200"
                >
                  + {item}
                </button>
              ))}
            </div>
            
            {/* Botão para adicionar item customizado */}
            {!mostrarInput ? (
              <button
                onClick={() => setMostrarInput(true)}
                className="mt-4 w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                + Adicionar Item Personalizado
              </button>
            ) : (
              <div className="mt-4 flex gap-2">
                <input
                  type="text"
                  value={novoItem}
                  onChange={(e) => setNovoItem(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && adicionarItemCustomizado()}
                  placeholder="Digite o nome do item..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={adicionarItemCustomizado}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
                >
                  Adicionar
                </button>
                <button
                  onClick={() => {
                    setMostrarInput(false)
                    setNovoItem('')
                  }}
                  className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-700 rounded-lg font-medium transition-colors"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>

          {/* Lista de Itens Adicionados */}
          {itens.length > 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  ✅ Minha Lista ({totalItens} {totalItens === 1 ? 'item' : 'itens'})
                </h2>
                <button
                  onClick={() => setItens([])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Limpar Tudo
                </button>
              </div>
              
              <div className="space-y-3">
                {itens.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 transition-colors"
                  >
                    <span className="text-lg font-medium text-gray-900 flex-1">
                      {item.nome}
                    </span>
                    
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                        className="w-8 h-8 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center font-bold transition-colors"
                      >
                        −
                      </button>
                      
                      <span className="text-xl font-bold text-blue-600 min-w-[2rem] text-center">
                        {item.quantidade}
                      </span>
                      
                      <button
                        onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                        className="w-8 h-8 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center font-bold transition-colors"
                      >
                        +
                      </button>
                      
                      <button
                        onClick={() => removerItem(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                        title="Remover item"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg p-8 mb-6 text-center">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-600 text-lg">
                Nenhum item adicionado ainda. Clique nos itens acima para começar!
              </p>
            </div>
          )}

          {/* Botão de Enviar WhatsApp com Preview */}
          {itens.length > 0 && (
            <>
              {/* Overlay do drawer */}
              {mostrarPreview && (
                <div
                  className="fixed inset-0 bg-black bg-opacity-50 z-40"
                  onClick={() => setMostrarPreview(false)}
                />
              )}
              
              {/* Drawer de Preview (Mobile) */}
              <div
                className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-50 transition-transform duration-300 ease-out ${
                  mostrarPreview ? 'translate-y-0' : 'translate-y-full'
                }`}
                style={{ maxHeight: '70vh' }}
              >
                <div className="p-4">
                  {/* Handle para arrastar */}
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
                  
                  {/* Header do drawer */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-gray-900">
                      Minha Lista ({itens.length} {itens.length === 1 ? 'item' : 'itens'})
                    </h3>
                    <button
                      onClick={() => setMostrarPreview(false)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Lista de itens no drawer */}
                  <div className="overflow-y-auto max-h-[50vh] space-y-2">
                    {itens.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-1">
                          <span className="text-base font-medium text-gray-900">{item.nome}</span>
                          {item.quantidade > 1 && (
                            <span className="ml-2 text-sm text-gray-500">x{item.quantidade}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => atualizarQuantidade(item.id, item.quantidade - 1)}
                            className="w-7 h-7 bg-red-100 hover:bg-red-200 text-red-600 rounded-full flex items-center justify-center text-sm font-bold"
                          >
                            −
                          </button>
                          <span className="text-lg font-bold text-blue-600 min-w-[1.5rem] text-center">
                            {item.quantidade}
                          </span>
                          <button
                            onClick={() => atualizarQuantidade(item.id, item.quantidade + 1)}
                            className="w-7 h-7 bg-green-100 hover:bg-green-200 text-green-600 rounded-full flex items-center justify-center text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Barra fixa inferior */}
              <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-3 z-50">
                <div className="container mx-auto max-w-4xl px-4">
                  <div className="flex items-center gap-3">
                    {/* Botão de Preview da Lista */}
                    <button
                      onClick={() => setMostrarPreview(!mostrarPreview)}
                      className="relative flex-shrink-0 w-14 h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                      {itens.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                          {itens.length}
                        </span>
                      )}
                    </button>

                    {/* Botão de Enviar WhatsApp */}
                    <button
                      onClick={enviarWhatsApp}
                      className="flex-1 px-6 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center space-x-2 text-base sm:text-lg"
                    >
                      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                      </svg>
                      <span className="hidden sm:inline">Enviar Lista no WhatsApp</span>
                      <span className="sm:hidden">Enviar</span>
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Espaço para o botão fixo */}
          {itens.length > 0 && <div className="h-24"></div>}
        </div>
      </main>
    </>
  )
}

