// Função para normalizar texto removendo acentos
export function normalizeText(text) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/ /g, '-') // Substitui espaços por hífens
    .replace(/[^a-z0-9-]/g, ''); // Remove caracteres especiais
} 