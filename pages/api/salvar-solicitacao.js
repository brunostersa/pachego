export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Método não permitido' })
  }

  try {
    const solicitacao = req.body
    
    // Simular salvamento em arquivo (em produção seria um banco de dados)
    const fs = require('fs')
    const path = require('path')
    
    const filePath = path.join(process.cwd(), 'data', 'solicitacoes.json')
    
    // Criar diretório se não existir
    const dataDir = path.dirname(filePath)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
    
    // Ler dados existentes
    let solicitacoes = []
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8')
      solicitacoes = JSON.parse(data)
    }
    
    // Adicionar nova solicitação
    solicitacoes.push({
      ...solicitacao,
      id: Date.now(),
      data: new Date().toISOString()
    })
    
    // Salvar no arquivo
    fs.writeFileSync(filePath, JSON.stringify(solicitacoes, null, 2))
    
    res.status(200).json({ 
      success: true, 
      message: 'Solicitação salva com sucesso',
      id: solicitacao.id 
    })
    
  } catch (error) {
    console.error('Erro ao salvar solicitação:', error)
    res.status(500).json({ 
      success: false, 
      message: 'Erro interno do servidor' 
    })
  }
}
