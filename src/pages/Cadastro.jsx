import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import logo from '../img/logo-wateless.png'

const Cadastro = ({ onCadastrarSucesso}) => {
  const navigate = useNavigate();
  const [usuarios, setUsuarios] = useState(() => {
    return JSON.parse(localStorage.getItem('usuariosCadastrados')) || []
  })

  const [endereco, setEndereco] = useState({
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
  })
  const [buscandoCep, setBuscandoCep] = useState(false)
  const [erroCep, setErroCep] = useState('')

  useEffect(() => {
    document.title = 'Wasteless | Cadastro de Usuário'
  }, [])

  const atualizarEndereco = (campo, valor) => {
    setEndereco((atual) => ({ ...atual, [campo]: valor }))
  }

  const formatarCep = (valor) => {
    const numeros = valor.replace(/\D/g, '').slice(0, 8)
    return numeros.length > 5 ? `${numeros.slice(0, 5)}-${numeros.slice(5)}` : numeros
  }

  const buscarCep = async (valorCep) => {
    const cep = valorCep.replace(/\D/g, '')
    if (cep.length !== 8) return

    setBuscandoCep(true)
    setErroCep('')
    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
      if (!resposta.ok) throw new Error('Falha na consulta')
      const dados = await resposta.json()

      if (dados.erro) {
        setErroCep('CEP não encontrado')
        return
      }

      setEndereco((atual) => ({
        ...atual,
        logradouro: dados.logradouro || '',
        bairro: dados.bairro || '',
        cidade: dados.localidade || '',
        uf: dados.uf || '',
      }))
    } catch {
      setErroCep('Não foi possível consultar o CEP. Preencha manualmente.')
    } finally {
      setBuscandoCep(false)
    }
  }

  const [senha, setSenha] = useState('')
  const [confirmar, setConfirmar] = useState('')
  const [erroSenha, setErroSenha] = useState('')
  const [erroConfirmar, setErroConfirmar] = useState('')

  const validarSenha = (valor) => {
    if (!valor) return 'Digite uma senha'
    if (valor.length < 6) return 'A senha deve ter no mínimo 6 caracteres'
    if (/\s/.test(valor)) return 'A senha não pode conter espaços'
    if (!/[A-Za-z]/.test(valor) || !/\d/.test(valor)) {
      return 'A senha deve conter letras e números'
    }
    return ''
  }

  const validarConfirmacao = (valorSenha, valorConfirmar) => {
    if (!valorConfirmar) return 'Confirme a senha'
    if (valorSenha !== valorConfirmar) return 'As senhas não coincidem'
    return ''
  }

  const cadastrarUsuario = () => {
    const nome = document.getElementById('nome').value
    const email = document.getElementById('email').value
    const perfil = document.getElementById('perfil').value
    const setor = document.getElementById('setor').value

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

    const msgSenha = validarSenha(senha)
    const msgConfirmar = validarConfirmacao(senha, confirmar)
    setErroSenha(msgSenha)
    setErroConfirmar(msgConfirmar)
    if (msgSenha || msgConfirmar) {
      return
    }

    const novoUsuario = {
      id: Date.now(),
      nome,
      email,
      perfil,
      setor,
      endereco,
      data: new Date().toLocaleDateString('pt-BR'),
    }

    const lista = [...usuarios, novoUsuario]
    localStorage.setItem('usuariosCadastrados', JSON.stringify(lista))
    setUsuarios(lista)

    alert('Usuário cadastrado com sucesso!')
    onCadastrarSucesso(novoUsuario)
    navigate('/registro-desperdicio')
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
                    value={senha}
                    onChange={(e) => {
                      setSenha(e.target.value)
                      setErroSenha(validarSenha(e.target.value))
                      if (confirmar) setErroConfirmar(validarConfirmacao(e.target.value, confirmar))
                    }}
                  />
                  <span className="field-error">{erroSenha}</span>
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
                    value={confirmar}
                    onChange={(e) => {
                      setConfirmar(e.target.value)
                      setErroConfirmar(validarConfirmacao(senha, e.target.value))
                    }}
                  />
                  <span className="field-error">{erroConfirmar}</span>
                </div>
              </div>

              <p className="section-title">Endereço</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="cep">CEP</label>
                  <input
                    className="form-control"
                    type="text"
                    id="cep"
                    inputMode="numeric"
                    placeholder="00000-000"
                    autoComplete="postal-code"
                    value={endereco.cep}
                    onChange={(e) => {
                      const cep = formatarCep(e.target.value)
                      atualizarEndereco('cep', cep)
                      if (cep.length === 9) buscarCep(cep)
                    }}
                  />
                  <span className="field-error">
                    {buscandoCep ? 'Buscando...' : erroCep}
                  </span>
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="logradouro">Rua</label>
                  <input
                    className="form-control"
                    type="text"
                    id="logradouro"
                    autoComplete="address-line1"
                    value={endereco.logradouro}
                    onChange={(e) => atualizarEndereco('logradouro', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="numero">Número</label>
                  <input
                    className="form-control"
                    type="text"
                    id="numero"
                    value={endereco.numero}
                    onChange={(e) => atualizarEndereco('numero', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="bairro">Bairro</label>
                  <input
                    className="form-control"
                    type="text"
                    id="bairro"
                    value={endereco.bairro}
                    onChange={(e) => atualizarEndereco('bairro', e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label" htmlFor="cidade">Cidade</label>
                  <input
                    className="form-control"
                    type="text"
                    id="cidade"
                    value={endereco.cidade}
                    onChange={(e) => atualizarEndereco('cidade', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" htmlFor="uf">UF</label>
                  <input
                    className="form-control"
                    type="text"
                    id="uf"
                    maxLength="2"
                    value={endereco.uf}
                    onChange={(e) => atualizarEndereco('uf', e.target.value.toUpperCase())}
                  />
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

      </div>
    </main>
  )
}

export default Cadastro
