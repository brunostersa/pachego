import { useState } from 'react'
import { salvarSolicitacao, buscarSolicitacoes } from '../lib/solicitacoes'

const TesteFirebase = () => {
  const [resultado, setResultado] = useState('')
  const [solicitacoes, setSolicitacoes] = useState([])

  const testarSalvar = async () => {
    console.log('🧪 Testando salvamento...')
    
    const solicitacaoTeste = {
      nome: 'Teste Firebase',
      celular: '(62) 99999-9999',
      origem: 'Goiânia',
      destino: 'Brasília',
      tipoServico: 'mudanca',
      data: new Date().toLocaleString('pt-BR')
    }

    const resultado = await salvarSolicitacao(solicitacaoTeste)
    
    if (resultado.success) {
      setResultado('✅ SUCESSO! Dados salvos no Firebase!')
    } else {
      setResultado(`❌ ERRO: ${resultado.error}`)
    }
  }

  const testarBuscar = async () => {
    console.log('🧪 Testando busca...')
    
    const resultado = await buscarSolicitacoes()
    
    if (resultado.success) {
      setSolicitacoes(resultado.data)
      setResultado(`✅ SUCESSO! Encontradas ${resultado.data.length} solicitações`)
    } else {
      setResultado(`❌ ERRO: ${resultado.error}`)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Teste Firebase</h1>
        
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Testes</h2>
          
          <div className="space-y-4">
            <button
              onClick={testarSalvar}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              🔥 Testar Salvar
            </button>
            
            <button
              onClick={testarBuscar}
              className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 ml-4"
            >
              📊 Testar Buscar
            </button>
          </div>
          
          {resultado && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <strong>Resultado:</strong> {resultado}
            </div>
          )}
        </div>

        {solicitacoes.length > 0 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Solicitações ({solicitacoes.length})</h2>
            <div className="space-y-2">
              {solicitacoes.map((solicitacao, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded border">
                  <div><strong>Nome:</strong> {solicitacao.nome}</div>
                  <div><strong>Celular:</strong> {solicitacao.celular}</div>
                  <div><strong>Origem:</strong> {solicitacao.origem}</div>
                  <div><strong>Destino:</strong> {solicitacao.destino}</div>
                  <div><strong>Data:</strong> {solicitacao.data}</div>
                  <div><strong>ID:</strong> {solicitacao.id}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TesteFirebase
