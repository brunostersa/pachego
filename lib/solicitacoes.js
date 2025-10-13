import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  orderBy,
  query,
  onSnapshot,
  getDoc
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
    console.log('🔥 EXCLUINDO NO FIREBASE')
    console.log('ID recebido:', id, 'Tipo:', typeof id)
    console.log('Coleção: solicitacoes')
    console.log('🔍 ID específico sendo processado:', id)
    
    // Validar ID
    if (!id || id === 'undefined' || id === 'null' || id.trim() === '') {
      console.error('❌ ID inválido!')
      return { success: false, error: 'ID inválido' }
    }
    
    // Verificar se o documento existe antes de excluir
    const docRef = doc(db, 'solicitacoes', id)
    console.log('Documento de referência criado:', docRef)
    console.log('Caminho do documento:', docRef.path)
    console.log('🔍 Verificando documento específico:', id)
    
    // Verificar se o documento existe
    console.log('🔍 Verificando se documento existe...')
    const docSnap = await getDoc(docRef)
    console.log('📄 Documento existe?', docSnap.exists())
    console.log('📄 Documento ID:', docSnap.id)
    
    if (!docSnap.exists()) {
      console.log('❌ Documento NÃO existe!')
      console.log('🔍 Tentando buscar documento na coleção...')
      
      // Tentar buscar todos os documentos para debug
      const q = query(collection(db, 'solicitacoes'))
      const querySnapshot = await getDocs(q)
      console.log('📋 Total de documentos na coleção:', querySnapshot.size)
      console.log('📋 IDs encontrados:', querySnapshot.docs.map(doc => doc.id))
      
      // Se o documento não existe, consideramos como sucesso (já foi excluído)
      console.log('ℹ️ Documento já foi excluído ou não existe')
      return { success: true, message: 'Documento já foi excluído' }
    }
    
    console.log('✅ Documento encontrado, dados:', docSnap.data())
    console.log('🗑️ Executando deleteDoc...')
    
    await deleteDoc(docRef)
    
    console.log('✅ SUCESSO! Solicitação excluída do Firebase:', id)
    console.log('✅ Documento removido da coleção solicitacoes')
    
    // Verificar se realmente foi excluído
    console.log('🔍 Verificando se documento foi realmente excluído...')
    const docSnapAfter = await getDoc(docRef)
    console.log('📄 Documento ainda existe após exclusão?', docSnapAfter.exists())
    
    // Aguardar um pouco para garantir que a exclusão foi processada
    await new Promise(resolve => setTimeout(resolve, 500))
    
    return { success: true }
  } catch (error) {
    console.error('❌ ERRO ao excluir solicitação:', error)
    console.error('Código do erro:', error.code)
    console.error('Mensagem do erro:', error.message)
    console.error('Stack trace:', error.stack)
    
    // Verificar tipos específicos de erro
    if (error.code === 'permission-denied') {
      console.error('🚫 ERRO DE PERMISSÃO! Verifique as regras do Firebase')
      return { success: false, error: 'Sem permissão para excluir' }
    }
    
    if (error.code === 'not-found') {
      console.error('❌ DOCUMENTO NÃO ENCONTRADO!')
      return { success: true, message: 'Documento já foi excluído' }
    }
    
    if (error.code === 'invalid-argument') {
      console.error('❌ ID INVÁLIDO!')
      return { success: false, error: 'ID inválido' }
    }
    
    return { success: false, error: error.message }
  }
}

// Escutar mudanças em tempo real
export const escutarSolicitacoes = (callback) => {
  console.log('🎧 CONFIGURANDO LISTENER FIREBASE...')
  const q = query(collection(db, 'solicitacoes'), orderBy('data', 'desc'))
  console.log('📋 Query configurada:', q)
  
  return onSnapshot(q, (querySnapshot) => {
    console.log('🔔 LISTENER FIREBASE DISPARADO!')
    console.log('📊 QuerySnapshot size:', querySnapshot.size)
    console.log('📋 QuerySnapshot empty:', querySnapshot.empty)
    
    const solicitacoes = []
    querySnapshot.forEach((doc) => {
      console.log('📄 Documento encontrado:', doc.id, doc.data())
      solicitacoes.push({
        id: doc.id, // Usar ID real do Firebase
        firebaseId: doc.id, // Manter referência ao ID do Firebase
        ...doc.data()
      })
    })
    
    console.log('📋 Total de solicitações processadas:', solicitacoes.length)
    console.log('🔄 Chamando callback...')
    callback(solicitacoes)
  }, (error) => {
    console.error('❌ ERRO NO LISTENER FIREBASE:', error)
  })
}
