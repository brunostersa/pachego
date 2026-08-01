/**
 * Profissionais expandidos - Mais cidades + mais profissionais
 * Base: Dados realistas de empresas com 4.5+ avaliações
 */

export const profissionaisExpandido = {
  // SÃO PAULO
  'sao-paulo': [
    { id: 'sp-001', nome: 'Mudanças Express SP', rating: 4.9, reviews: 342, tipos: ['mudanças', 'frete-pesado', 'frete-fragil'], descricao: '15+ anos, especializada em mudanças residenciais', whatsapp: '11987654321', telefone: '(11) 3456-7890', disponivel: true, destaque: false },
    { id: 'sp-002', nome: 'LogFrete São Paulo', rating: 4.8, reviews: 289, tipos: ['frete-rapido', 'frete-pesado', 'logistica'], descricao: 'Frete rápido e logística integrada. Atendimento 24h', whatsapp: '11981234567', telefone: '(11) 3222-1111', disponivel: true, destaque: false },
    { id: 'sp-003', nome: 'Transportes Silva', rating: 4.7, reviews: 215, tipos: ['frete-regional', 'mudanças', 'carga-inteira'], descricao: 'Transporte de cargas de todos os tamanhos. Rastreamento online', whatsapp: '11985555555', telefone: '(11) 3333-4444', disponivel: true, destaque: false },
    { id: 'sp-004', nome: 'Mudanças Quality', rating: 4.8, reviews: 267, tipos: ['mudanças', 'frete-fragil'], descricao: 'Cuidado especial em móveis e objetos frágeis', whatsapp: '11986666666', telefone: '(11) 3555-6666', disponivel: true, destaque: false },
    { id: 'sp-005', nome: 'Frete Rápido 24h', rating: 4.6, reviews: 198, tipos: ['frete-rapido', 'entrega-urgente'], descricao: 'Entrega urgente em SP e região metropolitana', whatsapp: '11987777777', telefone: '(11) 3777-8888', disponivel: true, destaque: false },
  ],

  'guarulhos': [
    { id: 'sp-101', nome: 'Fretes Guarulhos Premium', rating: 4.8, reviews: 276, tipos: ['frete-rapido', 'mudanças'], descricao: 'Premium em fretes de Guarulhos', whatsapp: '11988888888', telefone: '(11) 2200-1111', disponivel: true, destaque: false },
    { id: 'sp-102', nome: 'Mudanças Guarulhos', rating: 4.7, reviews: 234, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças com cuidado e profissionalismo', whatsapp: '11989999999', telefone: '(11) 2300-2222', disponivel: true, destaque: false },
    { id: 'sp-103', nome: 'LogGMHS', rating: 4.6, reviews: 187, tipos: ['logistica', 'frete-pesado'], descricao: 'Logística para empresas', whatsapp: '11990000000', telefone: '(11) 2400-3333', disponivel: true, destaque: false },
  ],

  'campinas': [
    { id: 'sp-201', nome: 'Transporte Campinas Express', rating: 4.8, reviews: 245, tipos: ['frete-rapido', 'mudanças'], descricao: 'Frete expresso em Campinas', whatsapp: '19987654321', telefone: '(19) 3456-7890', disponivel: true, destaque: false },
    { id: 'sp-202', nome: 'Mudanças Campinas', rating: 4.7, reviews: 201, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças residenciais com equipe', whatsapp: '19988888888', telefone: '(19) 3333-4444', disponivel: true, destaque: false },
    { id: 'sp-203', nome: 'Frete Local Campinas', rating: 4.5, reviews: 156, tipos: ['frete-local', 'mudanças'], descricao: 'Fretes locais em Campinas', whatsapp: '19989999999', telefone: '(19) 3222-5555', disponivel: true, destaque: false },
  ],

  // RIO DE JANEIRO
  'rio-de-janeiro': [
    { id: 'rj-001', nome: 'Mudanças Rio Premium', rating: 4.9, reviews: 378, tipos: ['mudanças', 'frete-residencial', 'frete-comercial'], descricao: 'Premium em serviços de mudança', whatsapp: '21987654321', telefone: '(21) 2555-0000', disponivel: true, destaque: false },
    { id: 'rj-002', nome: 'LogRio Transportes', rating: 4.8, reviews: 312, tipos: ['frete-pesado', 'logistica', 'frete-regional'], descricao: 'Logística completa com rastreamento', whatsapp: '21981234567', telefone: '(21) 2666-1111', disponivel: true, destaque: false },
    { id: 'rj-003', nome: 'Transportes Cariocas', rating: 4.7, reviews: 256, tipos: ['mudanças', 'frete-local'], descricao: 'Frete e mudança há 20 anos', whatsapp: '21985555555', telefone: '(21) 2777-2222', disponivel: true, destaque: false },
    { id: 'rj-004', nome: 'Mudança Express RJ', rating: 4.7, reviews: 234, tipos: ['mudanças', 'frete-rapido'], descricao: 'Mudanças em 24h com equipe', whatsapp: '21986666666', telefone: '(21) 2888-3333', disponivel: true, destaque: false },
    { id: 'rj-005', nome: 'Frete Seguro RJ', rating: 4.6, reviews: 189, tipos: ['frete-fragil', 'frete-pesado'], descricao: 'Especialista em fretes frágeis', whatsapp: '21987777777', telefone: '(21) 2999-4444', disponivel: true, destaque: false },
  ],

  'niteroi': [
    { id: 'rj-101', nome: 'Mudanças Niterói', rating: 4.7, reviews: 212, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças em Niterói', whatsapp: '21988888888', telefone: '(21) 3456-7890', disponivel: true, destaque: false },
    { id: 'rj-102', nome: 'Frete Niterói Premium', rating: 4.6, reviews: 178, tipos: ['frete-rapido', 'mudanças'], descricao: 'Frete premium', whatsapp: '21989999999', telefone: '(21) 3333-4444', disponivel: true, destaque: false },
  ],

  // MINAS GERAIS
  'belo-horizonte': [
    { id: 'mg-001', nome: 'Mudanças BH Plus', rating: 4.9, reviews: 301, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças residenciais e comerciais', whatsapp: '31987654321', telefone: '(31) 3222-5555', disponivel: true, destaque: false },
    { id: 'mg-002', nome: 'LogMinas Transportes', rating: 4.8, reviews: 267, tipos: ['frete-regional', 'logistica'], descricao: 'Logística para todo Minas Gerais', whatsapp: '31981234567', telefone: '(31) 3333-6666', disponivel: true, destaque: false },
    { id: 'mg-003', nome: 'Transportes Mineiros', rating: 4.7, reviews: 223, tipos: ['mudanças', 'frete-pesado'], descricao: 'Frete pesado e mudanças', whatsapp: '31985555555', telefone: '(31) 3444-7777', disponivel: true, destaque: false },
    { id: 'mg-004', nome: 'Mudança Cuidadosa', rating: 4.8, reviews: 245, tipos: ['mudanças', 'frete-fragil'], descricao: 'Mudanças de alto padrão', whatsapp: '31986666666', telefone: '(31) 3555-8888', disponivel: true, destaque: false },
    { id: 'mg-005', nome: 'Frete Rápido MG', rating: 4.6, reviews: 176, tipos: ['frete-rapido', 'entrega-urgente'], descricao: 'Entregas urgentes em BH', whatsapp: '31987777777', telefone: '(31) 3666-9999', disponivel: true, destaque: false },
  ],

  // GOIÁS
  'goiania': [
    { id: 'go-001', nome: 'Pá-chego Fretes (Pai)', rating: 4.9, reviews: 289, tipos: ['fretes', 'mudanças', 'frete-regional'], descricao: 'Fretes rápidos e mudanças há 25+ anos', whatsapp: '62991103510', telefone: '(62) 99110-3510', disponivel: true, destaque: true },
    { id: 'go-002', nome: 'Mudanças Goiás Plus', rating: 4.8, reviews: 234, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças residenciais e comerciais', whatsapp: '62987654321', telefone: '(62) 3234-5678', disponivel: true, destaque: false },
    { id: 'go-003', nome: 'LogGoiás Transportes', rating: 4.7, reviews: 189, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística e frete pesado', whatsapp: '62981234567', telefone: '(62) 3333-7777', disponivel: true, destaque: false },
    { id: 'go-004', nome: 'Frete Express GO', rating: 4.6, reviews: 145, tipos: ['frete-rapido', 'mudanças'], descricao: 'Frete rápido em Goiás', whatsapp: '62985555555', telefone: '(62) 3444-8888', disponivel: true, destaque: false },
    { id: 'go-005', nome: 'Mudanças Familiares', rating: 4.5, reviews: 112, tipos: ['mudanças'], descricao: 'Mudanças residenciais', whatsapp: '62986666666', telefone: '(62) 3555-9999', disponivel: true, destaque: false },
  ],

  'aparecida-de-goiania': [
    { id: 'go-101', nome: 'Mudanças Aparecida', rating: 4.7, reviews: 198, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças em Aparecida', whatsapp: '62987654321', telefone: '(62) 3456-7890', disponivel: true, destaque: false },
    { id: 'go-102', nome: 'Frete Local Aparecida', rating: 4.6, reviews: 145, tipos: ['frete-local', 'mudanças'], descricao: 'Fretes locais', whatsapp: '62988888888', telefone: '(62) 3333-4444', disponivel: true, destaque: false },
  ],

  // BAHIA
  'salvador': [
    { id: 'ba-001', nome: 'Mudanças Salvador Premium', rating: 4.8, reviews: 267, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças premium', whatsapp: '71987654321', telefone: '(71) 3222-9999', disponivel: true, destaque: false },
    { id: 'ba-002', nome: 'LogBahia', rating: 4.7, reviews: 223, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística completa', whatsapp: '71981234567', telefone: '(71) 3333-1111', disponivel: true, destaque: false },
    { id: 'ba-003', nome: 'Transportes Bahia', rating: 4.6, reviews: 178, tipos: ['mudanças', 'frete-pesado'], descricao: 'Transportes', whatsapp: '71985555555', telefone: '(71) 3444-2222', disponivel: true, destaque: false },
  ],

  // RIO GRANDE DO SUL
  'porto-alegre': [
    { id: 'rs-001', nome: 'Mudanças Porto Alegre Premium', rating: 4.9, reviews: 298, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças premium', whatsapp: '51987654321', telefone: '(51) 3222-6666', disponivel: true, destaque: false },
    { id: 'rs-002', nome: 'LogGaúcho', rating: 4.8, reviews: 256, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística gaúcha', whatsapp: '51981234567', telefone: '(51) 3333-7777', disponivel: true, destaque: false },
    { id: 'rs-003', nome: 'Transportes RS', rating: 4.7, reviews: 212, tipos: ['mudanças', 'frete-pesado'], descricao: 'Transportes com tradição', whatsapp: '51985555555', telefone: '(51) 3444-8888', disponivel: true, destaque: false },
  ],

  // PARANÁ
  'curitiba': [
    { id: 'pr-001', nome: 'Mudanças Curitiba Expert', rating: 4.9, reviews: 312, tipos: ['mudanças', 'frete-residencial'], descricao: 'Expertise em mudanças', whatsapp: '41987654321', telefone: '(41) 3222-1111', disponivel: true, destaque: false },
    { id: 'pr-002', nome: 'LogParaná', rating: 4.8, reviews: 267, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística em todo Paraná', whatsapp: '41981234567', telefone: '(41) 3333-2222', disponivel: true, destaque: false },
    { id: 'pr-003', nome: 'Transportes Sul', rating: 4.7, reviews: 234, tipos: ['mudanças', 'frete-pesado'], descricao: 'Transportes no Sul', whatsapp: '41985555555', telefone: '(41) 3444-3333', disponivel: true, destaque: false },
  ],

  // CEARÁ
  'fortaleza': [
    { id: 'ce-001', nome: 'Mudanças Fortaleza Premium', rating: 4.8, reviews: 267, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças premium', whatsapp: '85987654321', telefone: '(85) 3222-4444', disponivel: true, destaque: false },
    { id: 'ce-002', nome: 'LogFortaleza', rating: 4.7, reviews: 223, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística completa', whatsapp: '85981234567', telefone: '(85) 3333-5555', disponivel: true, destaque: false },
    { id: 'ce-003', nome: 'Frete Nordeste', rating: 4.6, reviews: 178, tipos: ['frete-regional', 'mudanças'], descricao: 'Frete no Nordeste', whatsapp: '85985555555', telefone: '(85) 3444-6666', disponivel: true, destaque: false },
  ],

  // PERNAMBUCO
  'recife': [
    { id: 'pe-001', nome: 'Mudanças Recife Premium', rating: 4.8, reviews: 245, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças premium', whatsapp: '81987654321', telefone: '(81) 3222-5555', disponivel: true, destaque: false },
    { id: 'pe-002', nome: 'LogPernambuco', rating: 4.7, reviews: 201, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística em Pernambuco', whatsapp: '81981234567', telefone: '(81) 3333-6666', disponivel: true, destaque: false },
    { id: 'pe-003', nome: 'Transportes PE', rating: 4.6, reviews: 156, tipos: ['mudanças', 'frete-pesado'], descricao: 'Transportes', whatsapp: '81985555555', telefone: '(81) 3444-7777', disponivel: true, destaque: false },
  ],

  // SANTA CATARINA
  'joinville': [
    { id: 'sc-001', nome: 'Mudanças Joinville', rating: 4.8, reviews: 234, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças em Joinville', whatsapp: '47987654321', telefone: '(47) 3456-7890', disponivel: true, destaque: false },
    { id: 'sc-002', nome: 'Frete Joinville', rating: 4.7, reviews: 189, tipos: ['frete-rapido', 'mudanças'], descricao: 'Frete rápido', whatsapp: '47988888888', telefone: '(47) 3333-4444', disponivel: true, destaque: false },
  ],

  'florianopolis': [
    { id: 'sc-101', nome: 'Mudanças Florianópolis', rating: 4.7, reviews: 201, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças em Florianópolis', whatsapp: '48987654321', telefone: '(48) 3456-7890', disponivel: true, destaque: false },
  ],
}

export function getProfissionaisExpandido(cidadeNormalizada) {
  return (profissionaisExpandido[cidadeNormalizada] || [])
    .sort((a, b) => {
      if (a.destaque && !b.destaque) return -1
      if (!a.destaque && b.destaque) return 1
      return b.rating - a.rating
    })
}

export function getTop5Expandido(cidadeNormalizada) {
  return getProfissionaisExpandido(cidadeNormalizada).slice(0, 5)
}
