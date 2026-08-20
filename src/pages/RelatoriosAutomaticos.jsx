import { useEffect, useRef, useState } from 'react'

const RelatoriosAutomaticos = () => {
  const formRef = useRef(null)
  const [historicoRelatorios, setHistoricoRelatorios] = useState(() => {
    return JSON.parse(localStorage.getItem('relatoriosSalvos')) || []
  })
  const [resultadoVisivel, setResultadoVisivel] = useState(false)
  const [resultado, setResultado] = useState({ periodo: '', taxa: '', prejuizo: '' })
  const [textoSugestao, setTextoSugestao] = useState('')
  const [textoDoacao, setTextoDoacao] = useState('')

  useEffect(() => {
    document.title = 'Wasteless | Relatórios Automáticos'
  }, [])

  const limparErros = () => {
    const erros = document.querySelectorAll('.field-error')
    erros.forEach((span) => (span.textContent = ''))
  }

  const gerarRelatorio = () => {
    limparErros()
    let formularioValido = true

    const periodoValue = document.getElementById('periodo').value
    const sobraValue = parseFloat(document.getElementById('sobra').value)
    const producaoValue = parseFloat(document.getElementById('producao').value)
    const custoValue = parseFloat(document.getElementById('custo').value) || 0

    if (!periodoValue) {
      document.getElementById('periodo-error').textContent = 'Selecione o período.'
      formularioValido = false
    }
    if (isNaN(sobraValue) || sobraValue < 0) {
      document.getElementById('sobra-error').textContent = 'Digite uma quantidade válida.'
      formularioValido = false
    }
    if (isNaN(producaoValue) || producaoValue <= 0) {
      document.getElementById('producao-error').textContent = 'A produção deve ser maior que 0.'
      formularioValido = false
    }
    if (sobraValue > producaoValue) {
      document.getElementById('sobra-error').textContent = 'A sobra não pode ser maior que a produção total.'
      formularioValido = false
    }

    if (!formularioValido) return false

    const taxaDesperdicio = (sobraValue / producaoValue) * 100
    const prejuizoTotal = sobraValue * custoValue

    let sugestao = ''
    let doacao = ''

    if (taxaDesperdicio <= 5) {
      sugestao =
        '💡 <strong>Excelente controle!</strong> Seu desperdício está abaixo da média de mercado (5%). Continue monitorando os padrões de consumo.'
    } else if (taxaDesperdicio <= 15) {
      sugestao =
        '⚠️ <strong>Atenção moderada:</strong> Perdas perceptíveis. Recomendamos revisar o tamanho das porções produzidas e otimizar o armazenamento dos ingredientes.'
    } else {
      sugestao =
        '🚨 <strong>Alerta crítico:</strong> Nível de desperdício muito alto! Sugerimos recalcular imediatamente a demanda de produção diária e treinar a equipe para evitar excessos.'
    }

    if (taxaDesperdicio > 10) {
      doacao =
        '🤝 <strong>Oportunidade Social:</strong> Como o volume de sobra está alto, verifique se o alimento ainda está em condições seguras de consumo para realizar uma doação para ONGs locais parceiras.'
    } else {
      doacao =
        '🌱 <strong>Consumo Consciente:</strong> Foque no reaproveitamento integral de cascas e talos para receitas internas, mantendo sua produção autossustentável.'
    }

    setResultado({
      periodo: periodoValue.toUpperCase(),
      taxa: taxaDesperdicio.toFixed(1),
      prejuizo: prejuizoTotal.toFixed(2),
      prejuizoPositivo: prejuizoTotal > 0,
    })
    setTextoSugestao(sugestao)
    setTextoDoacao(doacao)
    setResultadoVisivel(true)

    const novoRelatorio = {
      data: new Date().toLocaleDateString('pt-BR'),
      periodo: periodoValue,
      taxa: taxaDesperdicio.toFixed(1),
      prejuizo: prejuizoTotal.toFixed(2),
    }

    const novoHistorico = [novoRelatorio, ...historicoRelatorios]
    setHistoricoRelatorios(novoHistorico)
    localStorage.setItem('relatoriosSalvos', JSON.stringify(novoHistorico))

    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (gerarRelatorio()) {
      formRef.current.reset()
    }
  }

  const handleLimpar = () => {
    formRef.current.reset()
    limparErros()
    setResultadoVisivel(false)
  }

  return (
    <main>
      <div className="page-container">
        <div className="page-header">
          <h1>Relatórios Automáticos</h1>
          <p>Gere análises detalhadas e receba sugestões inteligentes de redução de desperdício</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '32px', alignItems: 'start' }}>
          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}> Parâmetros do Relatório</h3>
            <form id="relatorio-form" noValidate ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Período de análise <span className="required">*</span>
                </label>
                <select className="form-control" id="periodo">
                  <option value="">Selecione</option>
                  <option value="dia">Diário</option>
                  <option value="semana">Semanal</option>
                  <option value="mes">Mensal</option>
                </select>
                <span className="field-error" id="periodo-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Sobra / Perda (kg) <span className="required">*</span>
                </label>
                <input className="form-control" type="number" id="sobra" min="0" step="0.1" placeholder="Ex.: 15" />
                <span className="field-error" id="sobra-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Produção total (kg) <span className="required">*</span>
                </label>
                <input className="form-control" type="number" id="producao" min="1" step="0.1" placeholder="Ex.: 100" />
                <span className="field-error" id="producao-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Custo por kg (R$) <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(opcional)</span>
                </label>
                <input className="form-control" type="number" id="custo" min="0" step="0.01" placeholder="Ex.: 8.50" />
              </div>

              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button type="button" className="btn btn-ghost" id="limpar-btn" onClick={handleLimpar}>
                  Limpar
                </button>
                <button type="submit" className="btn btn-primary"> Gerar Relatório</button>
              </div>
            </form>
          </div>

          <div>
            <div id="resultado-section" style={{ display: resultadoVisivel ? 'block' : 'none' }}>
              <div className="result-box" id="resultado-box">
                <h3>📊 Resultado do Relatório</h3>
                <p style={{ margin: '10px 0' }}><strong>Período Analisado:</strong> {resultado.periodo}</p>
                <p style={{ margin: '10px 0' }}><strong>Desperdício Comercial:</strong> {resultado.taxa}% da sua produção</p>
                <p style={{ margin: '10px 0', color: resultado.prejuizoPositivo ? '#d32f2f' : '#333' }}>
                  <strong>Prejuízo Financeiro Estimado:</strong> R$ {resultado.prejuizo}
                </p>
              </div>

              <div
                id="sugestao-inteligente"
                className="suggestion-box"
                style={{ marginTop: '16px' }}
                dangerouslySetInnerHTML={{ __html: textoSugestao }}
              ></div>
              <div
                id="sugestao-doacao"
                className="suggestion-box"
                style={{ marginTop: '16px' }}
                dangerouslySetInnerHTML={{ __html: textoDoacao }}
              ></div>
            </div>

            {!resultadoVisivel && (
              <div id="resultado-empty">
                <div className="empty-state" style={{ marginTop: 0, padding: '60px 24px' }}>
                  <div className="icon"></div>
                  <p>Preencha os parâmetros ao lado e clique em "Gerar Relatório".</p>
                </div>
              </div>
            )}

            <div className="card" style={{ marginTop: '24px' }}>
              <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}> Histórico de Relatórios</h3>
              <div id="historico-lista">
                {historicoRelatorios.length === 0 ? (
                  <div className="empty-state"><p>Nenhum relatório gerado ainda.</p></div>
                ) : (
                  historicoRelatorios.map((relatorio, index) => (
                    <div
                      key={index}
                      style={{
                        borderLeft: '4px solid #2e7d32',
                        padding: '10px',
                        marginBottom: '10px',
                        background: '#000',
                        borderRadius: '0 4px 4px 0',
                        fontSize: '0.9rem',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', marginBottom: '4px' }}>
                        <span>📅 Gerado em: {relatorio.data} ({relatorio.periodo.toUpperCase()})</span>
                        <span style={{ color: '#d32f2f' }}>{relatorio.taxa}% de Perda</span>
                      </div>
                      <div style={{ color: '#555' }}>Custo do desperdício: <strong>R$ {relatorio.prejuizo}</strong></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RelatoriosAutomaticos
