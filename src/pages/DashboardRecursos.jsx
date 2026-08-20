import { useEffect, useState } from 'react'

const DashboardRecursos = () => {
  const [historicoDesperdicio, setHistoricoDesperdicio] = useState(() => {
    return JSON.parse(localStorage.getItem('registroDesperdicio')) || []
  })

  useEffect(() => {
    document.title = 'Wasteless | Dashboard de Recursos'
  }, [])

  const handleClear = () => {
    if (confirm('Tem certeza que deseja apagar todo o histórico de desperdício?')) {
      localStorage.removeItem('registroDesperdicio')
      setHistoricoDesperdicio([])
    }
  }

  // --- KPIs ---
  const kpiRegistros = historicoDesperdicio.length
  const kpiDoacoes = historicoDesperdicio.filter((item) => item.doacao === 'Sim').length
  const kpiAlertas = historicoDesperdicio.filter((item) => item.frequencia === 'Diário').length
  const kpiUsuarios = ''

  // --- Gráfico de barras por tipo ---
  const contagemTipos = { Frutas: 0, Carnes: 0, Laticínios: 0, Grãos: 0, Bebidas: 0, Outros: 0 }
  historicoDesperdicio.forEach((item) => {
    if (contagemTipos[item.tipo] !== undefined) contagemTipos[item.tipo]++
  })

  // --- Lista de motivos ---
  const contagemMotivos = { Venceu: 0, Estragou: 0, 'Excesso de estoque': 0, 'Armazenamento incorreto': 0, Outros: 0 }
  historicoDesperdicio.forEach((item) => {
    if (contagemMotivos[item.motivo] !== undefined) contagemMotivos[item.motivo]++
  })

  // --- Alertas ---
  const temDiario = historicoDesperdicio.some((item) => item.frequencia === 'Diário')
  const venceuMuito = historicoDesperdicio.filter((item) => item.motivo === 'Venceu').length > 2

  return (
    <main>
      <div className="page-container">
        <div className="page-header">
          <h1>Dashboard de Recursos</h1>
          <p>Visão geral dos indicadores e dados de desperdício</p>
        </div>

        <div className="stats-grid" id="kpi-grid">
          <div className="stat-card">
            <div className="stat-icon green">📋</div>
            <div className="stat-value" id="kpi-registros">{kpiRegistros}</div>
            <div className="stat-label">Registros totais</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon orange">🎁</div>
            <div className="stat-value" id="kpi-doacoes">{kpiDoacoes}</div>
            <div className="stat-label">Poderiam ser doados</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon red">⚠️</div>
            <div className="stat-value" id="kpi-alertas">{kpiAlertas}</div>
            <div className="stat-label">Alertas ativos</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon blue">👤</div>
            <div className="stat-value" id="kpi-usuarios">{kpiUsuarios}</div>
            <div className="stat-label">Usuários cadastrados</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}>Desperdício por Tipo</h3>
            <div className="chart-bar-wrap" id="chart-tipos">
              {historicoDesperdicio.length === 0 ? (
                <div className="empty-state"><p>Sem dados para exibir</p></div>
              ) : (
                Object.keys(contagemTipos).map((tipo) => {
                  const quantidade = contagemTipos[tipo]
                  const porcentagemBarra = (quantidade / historicoDesperdicio.length) * 100
                  return (
                    <div key={tipo} style={{ marginBottom: '12px', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                        <span>{tipo}</span>
                        <strong>{quantidade} registros</strong>
                      </div>
                      <div style={{ background: '#f0f0f0', borderRadius: '4px', height: '16px', width: '100%' }}>
                        <div
                          style={{
                            background: '#2e7d32',
                            height: '100%',
                            borderRadius: '4px',
                            width: `${porcentagemBarra}%`,
                            transition: 'width 0.5s',
                          }}
                        ></div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '20px' }}> Principais Motivos</h3>
            <div className="donut-wrap" id="chart-motivos">
              {historicoDesperdicio.length === 0 ? (
                <div className="empty-state"><p>Sem dados para exibir</p></div>
              ) : (
                Object.keys(contagemMotivos).map((motivo) => {
                  const quantidade = contagemMotivos[motivo]
                  if (quantidade === 0) return null
                  return (
                    <div
                      key={motivo}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 0',
                        borderBottom: '1px solid #f5f5f5',
                        fontSize: '0.9rem',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span
                          style={{
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            borderRadius: '50%',
                            background: '#ef6c00',
                          }}
                        ></span>
                        <span>{motivo}</span>
                      </div>
                      <strong>{quantidade} vezes</strong>
                    </div>
                  )
                })
              )}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}> Alertas e Recomendações</h3>
            <div id="alertas-lista">
              {historicoDesperdicio.length === 0 ? (
                <div className="empty-state"><p>Sem alertas no momento.</p></div>
              ) : (
                <>
                  {temDiario && (
                    <div
                      style={{
                        background: '#ffebee',
                        borderLeft: '4px solid #c62828',
                        padding: '12px',
                        marginBottom: '10px',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                      }}
                    >
                      <strong style={{ color: '#c62828' }}>🚨 Alerta Crítico de Frequência</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#555' }}>
                        Há ocorrências de desperdício registradas como <strong>Diárias</strong>. Verifique o
                        processo de produção imediatamente.
                      </p>
                    </div>
                  )}
                  {venceuMuito && (
                    <div
                      style={{
                        background: '#fff3e0',
                        borderLeft: '4px solid #ef6c00',
                        padding: '12px',
                        marginBottom: '10px',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                      }}
                    >
                      <strong style={{ color: '#ef6c00' }}>⚠️ Atenção com o Estoque</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#555' }}>
                        O motivo <strong>"Venceu"</strong> apareceu repetidas vezes. Considere aplicar a
                        metodologia PVPS (Primeiro que Vence, Primeiro que Sai).
                      </p>
                    </div>
                  )}
                  {!temDiario && !venceuMuito && (
                    <div
                      style={{
                        background: '#e8f5e9',
                        borderLeft: '4px solid #2e7d32',
                        padding: '12px',
                        borderRadius: '4px',
                        fontSize: '0.88rem',
                      }}
                    >
                      <strong style={{ color: '#2e7d32' }}>🌱 Operação Estável</strong>
                      <p style={{ margin: '4px 0 0 0', color: '#555' }}>
                        Nenhum padrão crítico detectado. Seus registros atuais estão dentro dos limites
                        recomendados.
                      </p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="card">
            <h3 style={{ fontSize: '1rem', marginBottom: '16px' }}> Ações Rápidas</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a className="btn btn-primary" href="/registro-desperdicio"> Registrar desperdício</a>
              <a className="btn btn-outline" href="/relatorios-automaticos"> Ver relatórios</a>
              <a className="btn btn-ghost" href="/fale-conosco"> Fale conosco</a>
              <a className="btn btn-ghost" href="/"> Gerenciar usuários</a>
            </div>
            <hr className="divider" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '.83rem', color: 'var(--text-muted)' }}>Limpar todos os dados</span>
              <button className="btn btn-sm btn-danger" id="clear-btn" onClick={handleClear}> Apagar</button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DashboardRecursos
