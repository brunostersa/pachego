import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore'
import { db } from './firebase'

// Salvar nova solicitação
export const salvarSolicitacao = async (solicitacao) => {
  try {
    console.log('🔥 Tentando conectar ao Firebase...')
    console.log('📊 Dados a serem salvos:', solicitacao)
    
    const docRef = await addDoc(collection(db, 'solicitacoes'), {
      ...solicitacao,
      data: new Date().toISOString(),
      status: 'pendente',
      criadoEm: new Date().toISOString()
    })
    
    console.log('✅ SUCESSO! Solicitação salva no Firebase!')
    console.log('🆔 ID do documento:', docRef.id)
    console.log('📅 Timestamp:', new Date().toISOString())
    
    return { success: true, id: docRef.id }
  } catch (error) {
    console.error('❌ ERRO ao salvar no Firebase:', error)
    console.error('🔍 Detalhes do erro:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    })
    return { success: false, error: error.message }
  }
}

// Buscar todas as solicitações
export const buscarSolicitacoes = async () => {
  try {
    const q = query(collection(db, 'solicitacoes'), orderBy('data', 'desc'))
    const querySnapshot = await getDocs(q)
    const solicitacoes = []
    
    querySnapshot.forEach((doc) => {
      solicitacoes.push({
        id: doc.id,
        ...doc.data()
      })
    })
    
    console.log('Solicitações carregadas:', solicitacoes.length)
    return { success: true, data: solicitacoes }
  } catch (error) {
    console.error('Erro ao buscar solicitações:', error)
    return { success: false, error: error.message, data: [] }
  }
}

// Atualizar status da solicitação
export const atualizarStatus = async (id, novoStatus) => {
  try {
    const docRef = doc(db, 'solicitacoes', id)
    await updateDoc(docRef, {
      status: novoStatus,
      atualizadoEm: new Date().toISOString()
    })
    console.log('Status atualizado para:', novoStatus)
    return { success: true }
  } catch (error) {
    console.error('Erro ao atualizar status:', error)
    return { success: false, error: error.message }
  }
}

// Excluir solicitação
export const excluirSolicitacao = async (id) => {
  try {
    await deleteDoc(doc(db, 'solicitacoes', id))
    console.log('Solicitação excluída:', id)
    return { success: true }
  } catch (error) {
    console.error('Erro ao excluir solicitação:', error)
    return { success: false, error: error.message }
  }
}

// Escutar mudanças em tempo real
export const escutarSolicitacoes = (callback) => {
  const q = query(collection(db, 'solicitacoes'), orderBy('data', 'desc'))
  
  return onSnapshot(q, (querySnapshot) => {
    const solicitacoes = []
    querySnapshot.forEach((doc) => {
      solicitacoes.push({
        id: doc.id,
        ...doc.data()
      })
    })
    callback(solicitacoes)
  })
}
