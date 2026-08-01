/**
 * ⚠️ DADOS DE DEMONSTRAÇÃO - MVP/Prototipagem
 * 
 * Estes dados são SIMULADOS mas baseados em padrões reais.
 * Para produção, integrar com Google Maps API + Trustpilot API
 */

export const allProfissionaisData = {
  'sao-paulo': [
    { id: 'sp-001', nome: 'Mudanças Express SP', rating: 4.9, reviews: 342, tipos: ['mudanças', 'frete-pesado'], descricao: '15+ anos, especializada em mudanças', whatsapp: '11987654321', telefone: '(11) 3456-7890', disponivel: true },
    { id: 'sp-002', nome: 'LogFrete São Paulo', rating: 4.8, reviews: 289, tipos: ['frete-rapido', 'logistica'], descricao: 'Frete rápido e logística 24h', whatsapp: '11981234567', telefone: '(11) 3222-1111', disponivel: true },
    { id: 'sp-003', nome: 'Transportes Silva', rating: 4.7, reviews: 215, tipos: ['frete-regional', 'mudanças'], descricao: 'Cargas de todos os tamanhos', whatsapp: '11985555555', telefone: '(11) 3333-4444', disponivel: true },
    { id: 'sp-004', nome: 'Mudanças Quality', rating: 4.8, reviews: 267, tipos: ['mudanças', 'frete-fragil'], descricao: 'Cuidado especial em frágeis', whatsapp: '11986666666', telefone: '(11) 3555-6666', disponivel: true },
    { id: 'sp-005', nome: 'Frete Rápido 24h', rating: 4.6, reviews: 198, tipos: ['frete-rapido', 'entrega-urgente'], descricao: 'Entregas urgentes SP', whatsapp: '11987777777', telefone: '(11) 3777-8888', disponivel: true },
  ],
  'guarulhos': [
    { id: 'sp-101', nome: 'Fretes Guarulhos Premium', rating: 4.8, reviews: 276, tipos: ['frete-rapido', 'mudanças'], descricao: 'Premium em fretes', whatsapp: '11988888888', telefone: '(11) 2200-1111', disponivel: true },
    { id: 'sp-102', nome: 'Mudanças Guarulhos', rating: 4.7, reviews: 234, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças profissionais', whatsapp: '11989999999', telefone: '(11) 2300-2222', disponivel: true },
    { id: 'sp-103', nome: 'LogGMHS', rating: 4.6, reviews: 187, tipos: ['logistica', 'frete-pesado'], descricao: 'Logística empresarial', whatsapp: '11990000000', telefone: '(11) 2400-3333', disponivel: true },
  ],
  'campinas': [
    { id: 'sp-201', nome: 'Transporte Campinas Express', rating: 4.8, reviews: 245, tipos: ['frete-rapido', 'mudanças'], descricao: 'Frete expresso', whatsapp: '19987654321', telefone: '(19) 3456-7890', disponivel: true },
    { id: 'sp-202', nome: 'Mudanças Campinas', rating: 4.7, reviews: 201, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças residenciais', whatsapp: '19988888888', telefone: '(19) 3333-4444', disponivel: true },
  ],
  'rio-de-janeiro': [
    { id: 'rj-001', nome: 'Mudanças Rio Premium', rating: 4.9, reviews: 378, tipos: ['mudanças', 'frete-residencial'], descricao: 'Serviço premium', whatsapp: '21987654321', telefone: '(21) 2555-0000', disponivel: true },
    { id: 'rj-002', nome: 'LogRio Transportes', rating: 4.8, reviews: 312, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística com rastreamento', whatsapp: '21981234567', telefone: '(21) 2666-1111', disponivel: true },
    { id: 'rj-003', nome: 'Transportes Cariocas', rating: 4.7, reviews: 256, tipos: ['mudanças', 'frete-local'], descricao: 'Experiência de 20 anos', whatsapp: '21985555555', telefone: '(21) 2777-2222', disponivel: true },
  ],
  'niteroi': [
    { id: 'rj-101', nome: 'Mudanças Niterói', rating: 4.7, reviews: 212, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças em Niterói', whatsapp: '21988888888', telefone: '(21) 3456-7890', disponivel: true },
  ],
  'belo-horizonte': [
    { id: 'mg-001', nome: 'Mudanças BH Plus', rating: 4.9, reviews: 301, tipos: ['mudanças', 'frete-residencial'], descricao: 'Serviço completo', whatsapp: '31987654321', telefone: '(31) 3222-5555', disponivel: true },
    { id: 'mg-002', nome: 'LogMinas Transportes', rating: 4.8, reviews: 267, tipos: ['frete-regional', 'logistica'], descricao: 'Logística MG', whatsapp: '31981234567', telefone: '(31) 3333-6666', disponivel: true },
    { id: 'mg-003', nome: 'Transportes Mineiros', rating: 4.7, reviews: 223, tipos: ['mudanças', 'frete-pesado'], descricao: 'Transporte qualificado', whatsapp: '31985555555', telefone: '(31) 3444-7777', disponivel: true },
  ],
  'goiania': [
    { id: 'go-001', nome: 'Pá-chego Fretes', rating: 4.9, reviews: 289, tipos: ['fretes', 'mudanças'], descricao: '25+ anos Goiás', whatsapp: '62991103510', telefone: '(62) 99110-3510', disponivel: true, destaque: true },
    { id: 'go-002', nome: 'Mudanças Goiás Plus', rating: 4.8, reviews: 234, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças GO', whatsapp: '62987654321', telefone: '(62) 3234-5678', disponivel: true },
    { id: 'go-003', nome: 'LogGoiás', rating: 4.7, reviews: 189, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística GO', whatsapp: '62981234567', telefone: '(62) 3333-7777', disponivel: true },
  ],
  'aparecida-de-goiania': [
    { id: 'go-101', nome: 'Mudanças Aparecida', rating: 4.7, reviews: 198, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças', whatsapp: '62987654321', telefone: '(62) 3456-7890', disponivel: true },
  ],
  'salvador': [
    { id: 'ba-001', nome: 'Mudanças Salvador', rating: 4.8, reviews: 267, tipos: ['mudanças', 'frete-residencial'], descricao: 'Premium Salvador', whatsapp: '71987654321', telefone: '(71) 3222-9999', disponivel: true },
    { id: 'ba-002', nome: 'LogBahia', rating: 4.7, reviews: 223, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística BA', whatsapp: '71981234567', telefone: '(71) 3333-1111', disponivel: true },
  ],
  'porto-alegre': [
    { id: 'rs-001', nome: 'Mudanças POA Premium', rating: 4.9, reviews: 298, tipos: ['mudanças', 'frete-residencial'], descricao: 'Premium RS', whatsapp: '51987654321', telefone: '(51) 3222-6666', disponivel: true },
    { id: 'rs-002', nome: 'LogGaúcho', rating: 4.8, reviews: 256, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística gaúcha', whatsapp: '51981234567', telefone: '(51) 3333-7777', disponivel: true },
  ],
  'curitiba': [
    { id: 'pr-001', nome: 'Mudanças Curitiba', rating: 4.9, reviews: 312, tipos: ['mudanças', 'frete-residencial'], descricao: 'Expert Curitiba', whatsapp: '41987654321', telefone: '(41) 3222-1111', disponivel: true },
    { id: 'pr-002', nome: 'LogParaná', rating: 4.8, reviews: 267, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística PR', whatsapp: '41981234567', telefone: '(41) 3333-2222', disponivel: true },
  ],
  'fortaleza': [
    { id: 'ce-001', nome: 'Mudanças Fortaleza', rating: 4.8, reviews: 267, tipos: ['mudanças', 'frete-residencial'], descricao: 'Premium Fortaleza', whatsapp: '85987654321', telefone: '(85) 3222-4444', disponivel: true },
    { id: 'ce-002', nome: 'LogFortaleza', rating: 4.7, reviews: 223, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística CE', whatsapp: '85981234567', telefone: '(85) 3333-5555', disponivel: true },
  ],
  'recife': [
    { id: 'pe-001', nome: 'Mudanças Recife', rating: 4.8, reviews: 245, tipos: ['mudanças', 'frete-residencial'], descricao: 'Premium Recife', whatsapp: '81987654321', telefone: '(81) 3222-5555', disponivel: true },
    { id: 'pe-002', nome: 'LogPernambuco', rating: 4.7, reviews: 201, tipos: ['frete-pesado', 'logistica'], descricao: 'Logística PE', whatsapp: '81981234567', telefone: '(81) 3333-6666', disponivel: true },
  ],
  'joinville': [
    { id: 'sc-001', nome: 'Mudanças Joinville', rating: 4.8, reviews: 234, tipos: ['mudanças', 'frete-residencial'], descricao: 'Mudanças SC', whatsapp: '47987654321', telefone: '(47) 3456-7890', disponivel: true },
  ],
}

export function getProfissionaisCity(cityNormalized) {
  return (allProfissionaisData[cityNormalized] || [])
    .sort((a, b) => {
      if (a.destaque && !b.destaque) return -1
      if (!a.destaque && b.destaque) return 1
      return b.rating - a.rating
    })
}

export function getTop5City(cityNormalized) {
  return getProfissionaisCity(cityNormalized).slice(0, 5)
}
