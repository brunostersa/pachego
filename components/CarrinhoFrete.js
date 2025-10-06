import { useState, useEffect } from 'react'

const CarrinhoFrete = ({ formData, isVisible, onClose }) => {
  const [total, setTotal] = useState(0)
  const [itens, setItens] = useState([])

  const tiposVeiculo = [
    { value: 'caminhao', label: 'Caminhão', base: 150, km: 3.50 }
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

  useEffect(() => {
    calcularTotal()
  }, [formData])

  const calcularTotal = () => {
    if (!formData.origem || !formData.destino) {
      setTotal(0)
      setItens([])
      return
    }

    const distancia = parseFloat(formData.distancia) || 50
    const ajudantes = parseInt(formData.ajudantes)
    const andarOrigem = parseInt(formData.andarOrigem) || 0
    const andarDestino = parseInt(formData.andarDestino) || 0
    
    const tipoVeiculoObj = tiposVeiculo.find(t => t.value === 'caminhao')
    const tamanhoObj = tamanhosMudanca.find(t => t.value === formData.tamanhoMudanca)
    
    // 1. Cálculo do veículo
    const custoVeiculo = tipoVeiculoObj.base + (distancia * tipoVeiculoObj.km)
    
    // 2. Cálculo dos ajudantes
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
    
    // 3. Aplicar multiplicador do tamanho da mudança
    const valorBase = custoVeiculo + custoTotalAjudantes
    const valorFinal = valorBase * tamanhoObj.multiplicador

    // Criar itens do carrinho
    const novosItens = [
      {
        id: 'veiculo',
        nome: 'Caminhão',
        descricao: `${distancia}km de distância`,
        valor: custoVeiculo,
        tipo: 'veiculo'
      }
    ]

    if (formData.tipoAjudantes === 'empresa' && custoTotalAjudantes > 0) {
      novosItens.push({
        id: 'ajudantes',
        nome: `${ajudantes} ajudante${ajudantes > 1 ? 's' : ''}`,
        descricao: formData.tipoOrigem === 'apartamento' || formData.tipoDestino === 'apartamento' ? 'Apartamento' : 'Casa',
        valor: custoTotalAjudantes,
        tipo: 'ajudantes'
      })
    }

    if (tamanhoObj.multiplicador > 1) {
      novosItens.push({
        id: 'tamanho',
        nome: `Mudança ${tamanhoObj.label}`,
        descricao: tamanhoObj.descricao,
        valor: valorBase * (tamanhoObj.multiplicador - 1),
        tipo: 'tamanho'
      })
    }

    setItens(novosItens)
    setTotal(valorFinal)
  }

  if (!isVisible) return null

  return (
    <div className="fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <h3 className="text-lg font-semibold">🛒 Carrinho de Frete</h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {itens.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🛒</div>
              <p className="text-gray-500">Preencha os campos para ver o cálculo em tempo real</p>
            </div>
          ) : (
            <div className="space-y-4">
              {itens.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-500 animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{item.nome}</h4>
                      <p className="text-sm text-gray-600">{item.descricao}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-600">R$ {item.valor.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {itens.length > 0 && (
          <div className="border-t bg-gray-50 p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold text-gray-900">Total:</span>
              <span className="text-2xl font-bold text-green-600">R$ {total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-2">
              <button className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-700 transition duration-300">
                📋 Solicitar Orçamento Oficial
              </button>
              <button className="w-full bg-green-500 text-white py-3 px-4 rounded-lg font-semibold hover:bg-green-600 transition duration-300">
                💬 WhatsApp
              </button>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default CarrinhoFrete
