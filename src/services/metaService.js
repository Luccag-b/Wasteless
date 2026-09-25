/**
 * Serviço de gerenciamento de Metas de Desperdício
 * Fornece persistência em localStorage para a aplicação atual
 * e funções preparadas para integração com API Backend REST.
 */

const getChaveStorage = (usuarioEmail, mesReferencia) => {
  const mesFormatado = mesReferencia || new Date().toISOString().slice(0, 7) // 'YYYY-MM'
  return `metaDesperdicio_${usuarioEmail || 'padrao'}_${mesFormatado}`
}

/**
 * Busca a meta do usuário para o mês de referência
 * @param {string} usuarioEmail
 * @param {string} [mesReferencia] Formato 'YYYY-MM'
 * @returns {number|null} Valor da meta em kg
 */
export const getMeta = (usuarioEmail, mesReferencia) => {
  try {
    const chave = getChaveStorage(usuarioEmail, mesReferencia)
    const salvo = localStorage.getItem(chave)
    if (salvo !== null) {
      const valor = parseFloat(salvo)
      return isNaN(valor) ? null : valor
    }

    // Fallback: se não tiver meta para o mês específico, busca a meta geral do usuário
    const chaveGeral = `metaDesperdicio_${usuarioEmail || 'padrao'}`
    const geral = localStorage.getItem(chaveGeral)
    if (geral !== null) {
      const valor = parseFloat(geral)
      return isNaN(valor) ? null : valor
    }

    // Valor padrão sugerido (50 kg) na primeira utilização
    return 50
  } catch (error) {
    console.error('Erro ao buscar meta no storage:', error)
    return 50
  }
}

/**
 * Salva a meta do usuário para o mês de referência
 * @param {string} usuarioEmail
 * @param {number} valorMeta
 * @param {string} [mesReferencia] Formato 'YYYY-MM'
 * @returns {boolean}
 */
export const salvarMeta = (usuarioEmail, valorMeta, mesReferencia) => {
  try {
    const valorNumerico = parseFloat(valorMeta)
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      throw new Error('O valor da meta deve ser um número maior que zero.')
    }

    const chave = getChaveStorage(usuarioEmail, mesReferencia)
    localStorage.setItem(chave, valorNumerico.toString())

    // Salva também na chave geral como última meta configurada
    const chaveGeral = `metaDesperdicio_${usuarioEmail || 'padrao'}`
    localStorage.setItem(chaveGeral, valorNumerico.toString())

    return true
  } catch (error) {
    console.error('Erro ao salvar meta no storage:', error)
    throw error
  }
}

/**
 * Exemplo de integração com API REST Backend (futuro ou backend dedicado)
 */
export const apiFetchMeta = async (usuarioId, mesReferencia) => {
  const response = await fetch(`/api/metas/${usuarioId}/${mesReferencia}`)
  if (!response.ok) {
    throw new Error('Falha ao obter meta do backend')
  }
  return await response.json()
}

export const apiSalvarMeta = async ({ usuarioId, valorMeta, mesReferencia }) => {
  const response = await fetch('/api/metas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario_id: usuarioId,
      valor_meta: valorMeta,
      mes_referencia: mesReferencia,
    }),
  })
  if (!response.ok) {
    throw new Error('Falha ao salvar meta no backend')
  }
  return await response.json()
}
