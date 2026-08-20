import { useEffect } from 'react'
import logo from '../img/logo-wateless.png'

const Cadastro = () => {
  useEffect(() => {
    document.title = 'Wasteless | Cadastro de Usuário'
  }, [])

  // Réplica fiel da função cadastrarUsuario() de js/cadastro.js
  const cadastrarUsuario = () => {
    const nome = document.getElementById('nome').value

    if (nome === '') {
      alert('Digite nome e sobrenome')
      return
    }

    const partes = nome.split(' ')

    if (partes.length < 2) {
      alert('Digite nome e sobrenome')
      return
    }

    if (partes[0].length < 2 || partes[1].length < 2) {
      alert('Nome e sobrenome devem ter pelo menos 2 letras')
      return
    }

    alert('Usuário cadastrado com sucesso!')
  }

  return (
    <main>
      <div className="page-container">
        <div className="page-header">
          <h1>Cadastro de Usuário</h1>
          <p>Crie sua conta para começar a monitorar o desperdício</p>
        </div>

        <div className="lado-esquerdo">
          <img className="logo-imagem" src={logo} alt="Wasteless" />

          <p className="slogan">
            Tecnologia e consciência<br />
            para um futuro sem desperdício.
          </p>

          <ul className="lista-beneficios">
            <li className="item-beneficio">
              <div className="bolinha-icone">📊</div>
              <div className="texto-beneficio">
                <h3>Monitore o desperdício</h3>
                <p>Acompanhe dados em tempo real.</p>
              </div>
              <div className="clear"></div>
            </li>
            <li className="item-beneficio">
              <div className="bolinha-icone">🌿</div>
              <div className="texto-beneficio">
                <h3>Reduza impactos</h3>
                <p>Tome decisões mais sustentáveis.</p>
              </div>
              <div className="clear"></div>
            </li>
            <li className="item-beneficio">
              <div className="bolinha-icone">👥</div>
              <div className="texto-beneficio">
                <h3>Transforme o futuro</h3>
                <p>Juntos por um planeta melhor.</p>
              </div>
              <div className="clear"></div>
            </li>
          </ul>
        </div>

        <div className="lado-direito">
          <div className="card" style={{ maxWidth: '680px', margin: '0 auto' }}>
            <div id="form-alert"></div>

            <form id="cadastro-form" noValidate>
              <p className="section-title">Dados Pessoais</p>

              <div className="form-group">
                <label className="form-label">
                  Nome completo <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  type="text"
                  id="nome"
                  placeholder="Ex.: Ana Souza"
                  autoComplete="name"
                />
                <span className="field-error"></span>
              </div>

              <div className="form-group">
                <label className="form-label">
                  E-mail <span className="required">*</span>
                </label>
                <input
                  className="form-control"
                  type="email"
                  id="email"
                  placeholder="ana@empresa.com"
                  autoComplete="email"
                />
                <span className="field-error"></span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">
                    Senha <span className="required">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="senha"
                    placeholder="Mínimo 6 caracteres"
                    autoComplete="new-password"
                  />
                  <span className="field-error"></span>
                </div>
                <div className="form-group">
                  <label className="form-label">
                    Confirmar Senha <span className="required">*</span>
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    id="confirm"
                    placeholder="Repita a senha"
                    autoComplete="new-password"
                  />
                  <span className="field-error"></span>
                </div>
              </div>

              <p className="section-title">Perfil</p>

              <div>
                <div className="form-group">
                  <label className="form-label" htmlFor="perfil">
                    Perfil <span className="required">*</span>
                  </label>
                  <select className="form-control" id="perfil">
                    <option value="">Selecione o perfil</option>
                    <option>Gerente</option>
                    <option>Supervisor</option>
                    <option>Funcionário</option>
                  </select>
                  <span className="field-error"></span>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="setor">
                    Setor <span className="required">*</span>
                  </label>
                  <select className="form-control" id="setor">
                    <option value="">Selecione o setor</option>
                    <option>TI</option>
                    <option>RH</option>
                    <option>Financeiro</option>
                    <option>Operações</option>
                    <option>Marketing</option>
                  </select>
                  <span className="field-error"></span>
                </div>
              </div>

              <p className="section-title">Observações (opcional) </p>

              <div className="form-group">
                <textarea
                  className="form-control"
                  id="obs"
                  rows="3"
                  maxLength="300"
                  placeholder="Alguma informação adicional..."
                ></textarea>
                <div className="char-counter" id="obs-counter">0 / 300</div>
              </div>

              <hr className="divider" />

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn btn-ghost" id="limpar-btn">
                  Limpar
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-lg"
                  onClick={cadastrarUsuario}
                >
                  Cadastrar →
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="limpa-colunas"></div>

        <div style={{ maxWidth: '680px', margin: '32px auto 0' }}>
          <p className="section-title">Usuários Cadastrados</p>
          <div id="usuarios-lista">
            <div className="empty-state">
              <p>Nenhum usuário cadastrado ainda.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Cadastro
