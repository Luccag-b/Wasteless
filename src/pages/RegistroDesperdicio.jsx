import { useEffect, useRef, useState } from 'react'

const RegistroDesperdicio = () => {
  const formRef = useRef(null)
  const [historicoDesperdicio, setHistoricoDesperdicio] = useState(() => {
    return JSON.parse(localStorage.getItem('registroDesperdicio')) || []
  })

  useEffect(() => {
    document.title = 'Wasteless | Registro de Desperdício'
  }, [])

  const limparErros = () => {
    const erros = document.querySelectorAll('.field-error')
    erros.forEach((span) => (span.textContent = ''))
  }

  const processarRegistro = () => {
    const dataElem = document.getElementById('data')
    const dataInput = dataElem ? dataElem.value : ''
    const tipoRadio = document.querySelector('input[name="tipo"]:checked')
    const qtdRadio = document.querySelector('input[name="quantidade"]:checked')
    const motivoRadio = document.querySelector('input[name="motivo"]:checked')
    const doacaoRadio = document.querySelector('input[name="doacao"]:checked')
    const freqRadio = document.querySelector('input[name="frequencia"]:checked')

    if (!dataInput || !tipoRadio || !qtdRadio || !motivoRadio || !doacaoRadio || !freqRadio) {
      alert('Por favor, preencha todos os campos obrigatórios.')
      return false
    }

    const novoRegistro = {
      data: dataInput,
      tipo: tipoRadio.value,
      quantidade: qtdRadio.value,
      motivo: motivoRadio.value,
      doacao: doacaoRadio.value,
      frequencia: freqRadio.value,
    }

    const novoHistorico = [novoRegistro, ...historicoDesperdicio]
    setHistoricoDesperdicio(novoHistorico)
    localStorage.setItem('registroDesperdicio', JSON.stringify(novoHistorico))
    return true
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const registroValido = processarRegistro()
    if (registroValido) {
      alert('Desperdício registrado com sucesso!')
      formRef.current.reset()
    }
  }

  const handleLimpar = () => {
    if (formRef.current) formRef.current.reset()
    limparErros()
  }

  return (
    <main>
      <div className="page-container">
        <div className="page-header">
          <h1>Registro de Desperdício</h1>
          <p>Registre ocorrências de desperdício alimentar para análise e controle</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div className="card">
            <form id="desperdicio-form" noValidate ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Data do desperdício <span className="required">*</span>
                </label>
                <input className="form-control" type="date" id="data" />
                <span className="field-error" id="data-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Tipo do alimento <span className="required">*</span>
                </label>
                <div className="radio-group" id="tipo-grupo">
                  <label className="radio-label"><input type="radio" name="tipo" value="Frutas" />  Frutas</label>
                  <label className="radio-label"><input type="radio" name="tipo" value="Carnes" />  Carnes</label>
                  <label className="radio-label"><input type="radio" name="tipo" value="Laticínios" />  Laticínios</label>
                  <label className="radio-label"><input type="radio" name="tipo" value="Grãos" />  Grãos</label>
                  <label className="radio-label"><input type="radio" name="tipo" value="Bebidas" />  Bebidas</label>
                  <label className="radio-label"><input type="radio" name="tipo" value="Outros" />  Outros</label>
                </div>
                <span className="field-error" id="tipo-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Quantidade aproximada <span className="required">*</span>
                </label>
                <div className="radio-group" id="qtd-grupo">
                  <label className="radio-label"><input type="radio" name="quantidade" value="Até 1 kg/l" /> Até 1 kg/l</label>
                  <label className="radio-label"><input type="radio" name="quantidade" value="Até 5 kg/l" /> Até 5 kg/l</label>
                  <label className="radio-label"><input type="radio" name="quantidade" value="Até 10 kg/l" /> Até 10 kg/l</label>
                  <label className="radio-label"><input type="radio" name="quantidade" value="Até 20 kg/l" /> Até 20 kg/l</label>
                  <label className="radio-label"><input type="radio" name="quantidade" value="Mais de 20 kg/l" /> Mais de 20 kg/l</label>
                </div>
                <span className="field-error" id="qtd-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Motivo do desperdício <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label"><input type="radio" name="motivo" value="Venceu" />  Venceu</label>
                  <label className="radio-label"><input type="radio" name="motivo" value="Estragou" />  Estragou</label>
                  <label className="radio-label"><input type="radio" name="motivo" value="Excesso de estoque" />  Excesso de estoque</label>
                  <label className="radio-label"><input type="radio" name="motivo" value="Armazenamento incorreto" />  Armazenamento incorreto</label>
                  <label className="radio-label"><input type="radio" name="motivo" value="Outros" />  Outros</label>
                </div>
                <span className="field-error" id="motivo-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Poderia ter sido doado? <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label"><input type="radio" name="doacao" value="Sim" />  Sim</label>
                  <label className="radio-label"><input type="radio" name="doacao" value="Não" />  Não</label>
                  <label className="radio-label"><input type="radio" name="doacao" value="Talvez" />  Talvez</label>
                  <label className="radio-label"><input type="radio" name="doacao" value="Não sei" />  Não sei</label>
                </div>
                <span className="field-error" id="doacao-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Frequência do desperdício <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label"><input type="radio" name="frequencia" value="Diário" />  Diário</label>
                  <label className="radio-label"><input type="radio" name="frequencia" value="Semanal" />  Semanal</label>
                  <label className="radio-label"><input type="radio" name="frequencia" value="Mensal" />  Mensal</label>
                  <label className="radio-label"><input type="radio" name="frequencia" value="Raramente" />  Raramente</label>
                  <label className="radio-label"><input type="radio" name="frequencia" value="Primeira vez" />  Primeira vez</label>
                </div>
                <span className="field-error" id="freq-error"></span>
              </div>

              <hr />

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" id="limpar-btn" onClick={handleLimpar}>
                  Limpar
                </button>
                <button type="submit" className="btn btn-primary btn-lg">Registrar →</button>
              </div>
            </form>
          </div>

          <div>
            <p className="section-title">Registros recentes</p>
            <div id="historico-lista">
              {historicoDesperdicio.length === 0 ? (
                <div className="empty-state"><p>Nenhum registro ainda.</p></div>
              ) : (
                historicoDesperdicio.map((registro, index) => {
                  const partesData = (registro.data || '').split('-')
                  const dataFormatada =
                    partesData.length === 3
                      ? `${partesData[2]}/${partesData[1]}/${partesData[0]}`
                      : registro.data || ''
                  return (
                    <div
                      key={index}
                      className="card-registro"
                      style={{
                        border: '1px solid #e0e0e0',
                        padding: '16px',
                        marginBottom: '12px',
                        borderRadius: '8px',
                        background: '#fff',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontWeight: 'bold', color: '#2e7d32' }}>🍎 {registro.tipo}</span>
                        <span style={{ fontSize: '0.9rem', color: '#666' }}>📅 {dataFormatada}</span>
                      </div>
                      <div style={{ fontSize: '0.95rem', color: '#333', lineHeight: '1.5' }}>
                        <p><strong>Quantidade:</strong> {registro.quantidade}</p>
                        <p><strong>Motivo:</strong> {registro.motivo}</p>
                        <p><strong>Poderia ser doado?</strong> {registro.doacao}</p>
                        <p><strong>Frequência:</strong> {registro.frequencia}</p>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default RegistroDesperdicio
