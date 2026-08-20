import { useEffect, useRef, useState } from 'react'

const FaleConosco = () => {
  const formRef = useRef(null)
  const mensagemRef = useRef(null)
  const [msgCounterText, setMsgCounterText] = useState('0 / 500')
  const [listaMensagens, setListaMensagens] = useState(() => {
    return JSON.parse(localStorage.getItem('contatosEnviados')) || []
  })

  useEffect(() => {
    document.title = 'Wasteless | Fale Conosco'
  }, [])

  const limparErros = () => {
    const erros = document.querySelectorAll('.field-error')
    erros.forEach((span) => (span.textContent = ''))
  }

  const handleMensagemChange = () => {
    const total = mensagemRef.current.value.length
    setMsgCounterText(`${total} / 500`)
  }

  // Réplica da validação de js/code.js (verificarEmail), que é quem
  // efetivamente controla o envio no botão original.
  const verificarEmail = () => {
    const nome = document.getElementById('nome').value.trim()
    const email = document.getElementById('email').value
    const assunto = document.getElementById('assunto').value
    const mensagem = document.getElementById('mensagem').value
    const telefone = document.getElementById('telefone').value

    if (nome === '') {
      alert('Digite o nome e sobrenome')
      return false
    }

    const partes = nome.split(' ')

    if (partes.length < 2) {
      alert('Digite o nome e sobrenome')
      return false
    }

    if (partes[0].length < 2 || partes[1].length < 2) {
      alert('Nome e sobrenome devem ter pelo menos 2 letras')
      return false
    }

    if (email === '') {
      alert('Digite seu e-mail')
      return false
    }

    if (assunto === '') {
      alert('Selecione um assunto')
      return false
    }

    if (mensagem === '') {
      alert('Digite sua mensagem')
      return false
    }

    if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      alert('E-mail inválido')
      return false
    }

    if (telefone !== '') {
      for (let i = 0; i < telefone.length; i++) {
        const c = telefone[i]
        if (!'0123456789()- '.includes(c)) {
          alert('Telefone inválido (somente números)')
          return false
        }
      }
    }

    return true
  }

  const processarContato = () => {
    limparErros()

    const nomeValue = document.getElementById('nome').value.trim()
    const emailValue = document.getElementById('email').value.trim()
    const telefoneValue = document.getElementById('telefone').value.trim()
    const assuntoValue = document.getElementById('assunto').value
    const mensagemValue = mensagemRef.current.value.trim()

    const novoContato = {
      data: new Date().toLocaleDateString('pt-BR'),
      nome: nomeValue,
      email: emailValue,
      telefone: telefoneValue || 'Não informado',
      assunto: assuntoValue,
      mensagem: mensagemValue,
    }

    const novaLista = [novoContato, ...listaMensagens]
    setListaMensagens(novaLista)
    localStorage.setItem('contatosEnviados', JSON.stringify(novaLista))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!verificarEmail()) return

    processarContato()
    alert('Mensagem enviada com sucesso! Entraremos em contato em breve.')
    formRef.current.reset()
    setMsgCounterText('0 / 500')
  }

  const handleLimpar = () => {
    formRef.current.reset()
    limparErros()
    setMsgCounterText('0 / 500')
  }

  return (
    <main>
      <div className="page-container">
        <div className="page-header">
          <h1>Fale Conosco</h1>
          <p>Entre em contato com a equipe Wasteless</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'start' }}>
          <div>
            <div className="card">
              <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}> Envie sua mensagem</h3>
              <form id="contato-form" ref={formRef} onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">
                    Nome <span className="required">*</span>
                  </label>
                  <input className="form-control" type="text" id="nome" placeholder="Seu nome completo" autoComplete="name" />
                  <span className="field-error"></span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    E-mail <span className="required">*</span>
                  </label>
                  <input className="form-control" type="email" id="email" placeholder="seu@email.com" autoComplete="email" />
                  <span className="field-error"></span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Telefone <span style={{ fontWeight: 400, color: 'var(--text-muted)' }}>(opcional)</span>
                  </label>
                  <input className="form-control" type="tel" id="telefone" placeholder="(11) 99999-9999" />
                  <span className="field-error"></span>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Assunto <span className="required">*</span>
                  </label>
                  <select className="form-control" id="assunto">
                    <option value="">Selecione</option>
                    <option>Dúvida</option>
                    <option>Suporte técnico</option>
                    <option>Financeiro</option>
                    <option>Parceria</option>
                    <option>Outro</option>
                  </select>
                  <span className="field-error"></span>
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    id="mensagem"
                    ref={mensagemRef}
                    rows="5"
                    maxLength="500"
                    placeholder="Digite sua mensagem..."
                    onChange={handleMensagemChange}
                  ></textarea>
                  <div className="char-counter" id="msg-counter">{msgCounterText}</div>
                  <span className="field-error"></span>
                </div>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  <button type="button" className="btn btn-ghost" id="limpar-btn" onClick={handleLimpar}>
                    Limpar
                  </button>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}> Enviar mensagem</button>
                </div>
              </form>
            </div>

            <div className="contact-info" style={{ marginTop: '20px' }}>
              <div className="contact-info-item">
                <div><strong>E-mail</strong> contato@wasteless.com.br</div>
              </div>
              <div className="contact-info-item">
                <div><strong>Telefone</strong> (11) 3000-0000 · Seg–Sex, 9h–18h</div>
              </div>
              <div className="contact-info-item">
                <div><strong>Endereço</strong> Av. Paulista, 1234 — São Paulo, SP</div>
              </div>
            </div>
          </div>

          <div>
            <p className="section-title">Mensagens enviadas:</p>
            <div id="mensagens-lista">
              {listaMensagens.length === 0 ? (
                <div className="empty-state"><p>Nenhuma mensagem enviada ainda.</p></div>
              ) : (
                listaMensagens.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      border: '1px solid #000',
                      padding: '16px',
                      marginBottom: '12px',
                      borderRadius: '8px',
                      background: '#fff',
                      boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
                      fontSize: '0.9rem',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontWeight: 'bold', color: '#2e7d32' }}>
                      <span>📌 {item.assunto}</span>
                      <span style={{ fontSize: '0.8rem', color: '#000' }}>📅 {item.data}</span>
                    </div>
                    <div style={{ color: '#000', lineHeight: '1.4' }}>
                      <p style={{ margin: '2px 0' }}><strong>De:</strong> {item.nome} ({item.email})</p>
                      <p style={{ margin: '2px 0' }}><strong>Tel:</strong> {item.telefone}</p>
                      <p style={{ margin: '8px 0 0 0', padding: '8px', background: '#f9f9f9', borderRadius: '4px', color: '#000', fontStyle: 'italic' }}>
                        "{item.mensagem}"
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default FaleConosco
