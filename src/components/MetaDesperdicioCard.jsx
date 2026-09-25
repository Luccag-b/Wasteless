import { useState } from 'react'
import { calcularProgressoMeta } from '../utils/metaCalculo.js'

/**
 * Componente do Card de Meta de Desperdício
 *
 * @param {Object} props
 * @param {number} props.meta - Valor da meta em kg
 * @param {number} props.atual - Total desperdiçado acumulado no mês em kg
 * @param {Function} [props.onSalvarMeta] - Callback disparado ao salvar uma nova meta
 * @param {string} [props.unidade='kg'] - Unidade de medida
 * @param {string} [props.mesNome] - Nome amigável do mês (ex: 'Março')
 */
const MetaDesperdicioCard = ({
  meta = 50,
  atual = 0,
  onSalvarMeta,
  unidade = 'kg',
  mesNome,
}) => {
  const [modalAberto, setModalAberto] = useState(false)
  const [novaMetaInput, setNovaMetaInput] = useState(meta || 50)
  const [erroValidacao, setErroValidacao] = useState('')

  const {
    percentual,
    barraPercentual,
    diferenca,
    atingiu,
    status,
    corStatus,
    mensagem,
  } = calcularProgressoMeta(meta, atual)

  const handleAbrirModal = () => {
    setNovaMetaInput(meta || 50)
    setErroValidacao('')
    setModalAberto(true)
  }

  const handleSalvar = (e) => {
    e.preventDefault()
    const valor = parseFloat(novaMetaInput)
    if (isNaN(valor) || valor <= 0) {
      setErroValidacao('Informe um valor válido maior que zero.')
      return
    }

    if (onSalvarMeta) {
      onSalvarMeta(valor)
    }
    setModalAberto(false)
  }

  // Ícone dinâmico do status
  const getIconeStatus = () => {
    if (status === 'excedido') return '🚨'
    if (status === 'alerta') return '⚠️'
    return '🌱'
  }

  return (
    <div className="card meta-desperdicio-card">
      {/* Cabeçalho do Card */}
      <div className="meta-card-header">
        <div className="meta-card-title-group">
          <span className="meta-badge-icon">🎯</span>
          <div>
            <h3 className="meta-card-title">Meta de desperdício</h3>
            {mesNome && <span className="meta-card-subtitle">{mesNome}</span>}
          </div>
        </div>

        {onSalvarMeta && (
          <button
            type="button"
            className="btn btn-sm btn-ghost meta-btn-edit"
            onClick={handleAbrirModal}
            title="Editar meta mensal"
          >
            ✏️ Editar meta
          </button>
        )}
      </div>

      {/* Valores: Atual x Meta */}
      <div className="meta-card-values">
        <div className="meta-value-block">
          <span className="meta-label">Desperdiçado este mês</span>
          <div className="meta-number" style={{ color: corStatus }}>
            {atual} <span className="meta-unit">{unidade}</span>
          </div>
        </div>

        <div className="meta-value-divider">/</div>

        <div className="meta-value-block">
          <span className="meta-label">Meta estipulada</span>
          <div className="meta-number meta-target">
            {meta} <span className="meta-unit">{unidade}</span>
          </div>
        </div>

        <div className="meta-percent-pill" style={{ borderColor: corStatus, color: corStatus }}>
          {percentual}%
        </div>
      </div>

      {/* Barra de Progresso Visual */}
      <div className="meta-progress-wrapper">
        <div className="meta-progress-track">
          <div
            className={`meta-progress-fill ${status === 'excedido' ? 'fill-danger' : status === 'alerta' ? 'fill-warning' : 'fill-success'}`}
            style={{
              width: `${barraPercentual}%`,
              backgroundColor: corStatus,
            }}
          />
        </div>
        <div className="meta-progress-ticks">
          <span>0 {unidade}</span>
          <span className="meta-tick-target">Meta: {meta} {unidade}</span>
        </div>
      </div>

      {/* Mensagem Dinâmica */}
      <div className={`meta-dynamic-alert alert-${status}`}>
        <span className="meta-alert-icon">{getIconeStatus()}</span>
        <span className="meta-alert-text">{mensagem}</span>
      </div>

      {/* Modal de Edição de Meta */}
      {modalAberto && (
        <div className="meta-modal-backdrop" onClick={() => setModalAberto(false)}>
          <div className="meta-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="meta-modal-header">
              <h4>🎯 Definir Meta Mensal de Desperdício</h4>
              <button
                type="button"
                className="meta-modal-close"
                onClick={() => setModalAberto(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSalvar}>
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="input-meta-valor">
                  Limite máximo aceitável (em kg) <span className="required">*</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    id="input-meta-valor"
                    type="number"
                    step="0.5"
                    min="1"
                    className={`form-control ${erroValidacao ? 'error' : ''}`}
                    value={novaMetaInput}
                    onChange={(e) => {
                      setNovaMetaInput(e.target.value)
                      setErroValidacao('')
                    }}
                    placeholder="Ex: 50"
                    autoFocus
                  />
                  <span
                    style={{
                      position: 'absolute',
                      right: '14px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'var(--text-3)',
                      fontWeight: 600,
                    }}
                  >
                    kg
                  </span>
                </div>
                {erroValidacao && (
                  <span className="field-error show">{erroValidacao}</span>
                )}
                <p className="form-hint">
                  Defina o limite de perdas para o mês. O dashboard notificará conforme você se aproximar do limite.
                </p>
              </div>

              <div className="meta-modal-actions">
                <button
                  type="button"
                  className="btn btn-ghost"
                  onClick={() => setModalAberto(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Meta
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default MetaDesperdicioCard
