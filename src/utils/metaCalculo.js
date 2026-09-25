/**
 * Utilitários de cálculo para Metas de Desperdício
 */

/**
 * Converte diferentes formatos de quantidade em número (kg)
 * @param {Object} item - Registro de desperdício
 * @returns {number} Quantidade em kg
 */
export const extrairKg = (item) => {
  if (!item) return 0

  // Se já for numérico direto
  if (typeof item.peso === 'number') return item.peso
  if (typeof item.quantidadeKg === 'number') return item.quantidadeKg
  if (typeof item.quantidade === 'number') return item.quantidade

  const qtdStr = String(item.quantidade || '').trim()

  // Mapeamento das opções padrão do formulário do Wasteless
  const mapaPadrao = {
    'Até 1 kg/l': 1,
    'Até 5 kg/l': 5,
    'Até 10 kg/l': 10,
    'Até 20 kg/l': 20,
    'Mais de 20 kg/l': 25,
  }

  if (mapaPadrao[qtdStr] !== undefined) {
    return mapaPadrao[qtdStr]
  }

  // Tenta extrair número de strings livres (ex: "15 kg", "12.5", "8kg")
  const match = qtdStr.replace(',', '.').match(/[\d.]+/)
  if (match) {
    const num = parseFloat(match[0])
    return isNaN(num) ? 0 : num
  }

  return 0
}

/**
 * Filtra e calcula o total de desperdício acumulado no mês de referência
 * @param {Array} historico - Lista de registros de desperdício
 * @param {Date} [dataReferencia=new Date()] - Data para extrair mês e ano
 * @returns {number} Total acumulado em kg
 */
export const calcularDesperdicioMesAtual = (historico = [], dataReferencia = new Date()) => {
  if (!Array.isArray(historico)) return 0

  const anoRef = dataReferencia.getFullYear()
  const mesRef = dataReferencia.getMonth() + 1 // 1 a 12

  const registrosDoMes = historico.filter((item) => {
    if (!item.data) return false
    // Espera formato YYYY-MM-DD ou YYYY-MM
    const partes = item.data.split('-')
    if (partes.length < 2) return false
    const ano = parseInt(partes[0], 10)
    const mes = parseInt(partes[1], 10)
    return ano === anoRef && mes === mesRef
  })

  const total = registrosDoMes.reduce((acc, curr) => acc + extrairKg(curr), 0)
  return Number(total.toFixed(1))
}

/**
 * Calcula o progresso, percentual, status e mensagem dinâmica da meta
 * @param {number} meta - Meta estabelecida em kg
 * @param {number} atual - Total desperdiçado no mês em kg
 * @returns {Object} Informações detalhadas de status da meta
 */
export const calcularProgressoMeta = (meta, atual) => {
  const metaValida = Number(meta) > 0 ? Number(meta) : 0
  const valorAtual = Number(atual) >= 0 ? Number(atual) : 0

  if (metaValida <= 0) {
    return {
      percentual: 0,
      barraPercentual: 0,
      diferenca: 0,
      atingiu: false,
      status: 'indefinida',
      corStatus: '#a8b8ac',
      mensagem: 'Nenhuma meta definida para este mês. Clique em "Definir Meta" para começar.',
    }
  }

  const percentualExato = (valorAtual / metaValida) * 100
  const percentual = Math.round(percentualExato)
  // Limita a barra visual entre 0% e 100%
  const barraPercentual = Math.min(100, Math.max(0, percentualExato))
  const diferenca = Math.abs(Number((metaValida - valorAtual).toFixed(1)))
  const atingiu = valorAtual >= metaValida

  let status = 'seguro'
  let corStatus = 'var(--accent, #2dff7e)'
  let mensagem = ''

  if (atingiu) {
    status = 'excedido'
    corStatus = 'var(--danger, #ff4d4d)'
    const excedente = Number((valorAtual - metaValida).toFixed(1))
    if (excedente > 0) {
      mensagem = `Meta atingida! Você desperdiçou ${excedente} kg além do limite.`
    } else {
      mensagem = `Limite máximo atingido! Você alcançou exatamente os ${metaValida} kg da sua meta.`
    }
  } else {
    // Ainda dentro do limite
    if (percentual >= 80) {
      status = 'alerta'
      corStatus = 'var(--warning, #f5a623)'
      mensagem = `Atenção: Você atingiu ${percentual}% do limite! Faltam apenas ${diferenca} kg para atingir sua meta.`
    } else {
      status = 'seguro'
      corStatus = 'var(--accent, #2dff7e)'
      mensagem = `Faltam ${diferenca} kg para atingir sua meta.`
    }
  }

  return {
    percentual,
    barraPercentual: Number(barraPercentual.toFixed(1)),
    diferenca,
    atingiu,
    status,
    corStatus,
    mensagem,
  }
}
