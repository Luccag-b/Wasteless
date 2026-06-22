// 1. Puxa os dados que você já cadastrou na tela de Registro!
let historicoDesperdicio = JSON.parse(localStorage.getItem('registroDesperdicio')) || [];

// Captura os elementos de texto dos cartões (KPIs)
const kpiRegistros = document.getElementById('kpi-registros');
const kpiDoacoes = document.getElementById('kpi-doacoes');
const kpiAlertas = document.getElementById('kpi-alertas');
const kpiUsuarios = document.getElementById('kpi-usuarios');

// Captura as seções de gráficos e alertas
const chartTipos = document.getElementById('chart-tipos');
const chartMotivos = document.getElementById('chart-motivos');
const alertasLista = document.getElementById('alertas-lista');
const clearBtn = document.getElementById('clear-btn');

// Roda a montagem do painel inteiro assim que a página abre
inicializarDashboard();

// Botão para apagar os dados e testar o estado vazio
clearBtn.addEventListener('click', function() {
    if(confirm("Tem certeza que deseja apagar todo o histórico de desperdício?")) {
        localStorage.removeItem('registroDesperdicio');
        historicoDesperdicio = [];
        inicializarDashboard();
    }
});

function inicializarDashboard() {
    // Atualiza os números do topo
    calcularKPIs();
    
    // Constrói os gráficos e os alertas usando apenas repetição (loops) e CSS
    renderizarGraficoTipos();
    renderizarGraficoMotivos();
    renderizarAlertas();
}

// --- 2. CÁLCULO DOS CARTOÕES DE TEXTO (KPIs) ---
function calcularKPIs() {
    kpiRegistros.textContent = historicoDesperdicio.length;

    // Filtra quantos registros aceitavam doação ("Sim")
    const doacoesPossiveis = historicoDesperdicio.filter(item => item.doacao === "Sim").length;
    kpiDoacoes.textContent = doacoesPossiveis;

    // Define alertas ativos baseado na gravidade (ex: itens com frequência "Diário")
    const alertasCriticos = historicoDesperdicio.filter(item => item.frequencia === "Diário").length;
    kpiAlertas.textContent = alertasCriticos;

    // Valor simulado apenas para preencher o cartão de usuários por enquanto
    kpiUsuarios.textContent = ""; 
}

// --- 3. GRÁFICO DE BARRAS DINÂMICO (Por Tipo de Alimento) ---
function renderizarGraficoTipos() {
    if (historicoDesperdicio.length === 0) {
        chartTipos.innerHTML = `<div class="empty-state"><p>Sem dados para exibir</p></div>`;
        return;
    }

    // Criamos um objeto para contar as ocorrências de cada tipo
    let contagem = { Frutas: 0, Carnes: 0, Laticínios: 0, Grãos: 0, Bebidas: 0, Outros: 0 };
    
    // Passamos por cada registro somando +1 no tipo correspondente
    historicoDesperdicio.forEach(item => {
        if (contagem[item.tipo] !== undefined) {
            contagem[item.tipo]++;
        }
    });

    // Monta o gráfico desenhando barrinhas horizontais em HTML/CSS pura
    chartTipos.innerHTML = Object.keys(contagem).map(tipo => {
        const quantidade = contagem[tipo];
        // Descobre a porcentagem da barra em relação ao total de registros
        const porcentagemBarra = (quantidade / historicoDisperdicio.length) * 100;

        return `
            <div style="margin-bottom: 12px; font-size: 0.9rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span>${tipo}</span>
                    <strong>${quantidade} registros</strong>
                </div>
                <div style="background: #f0f0f0; border-radius: 4px; height: 16px; width: 100%;">
                    <div style="background: #2e7d32; height: 100%; border-radius: 4px; width: ${porcentagemBarra}%; transition: width 0.5s;"></div>
                </div>
            </div>
        `;
    }).join('');
}

// --- 4. LISTAGEM DOS MAIORES MOTIVOS (Estilo Donut Visual adaptado para iniciantes) ---
function renderizarGraficoMotivos() {
    if (historicoDesperdicio.length === 0) {
        chartMotivos.innerHTML = `<div class="empty-state"><p>Sem dados para exibir</p></div>`;
        return;
    }

    let contagemMotivos = { Venceu: 0, Estragou: 0, "Excesso de estoque": 0, "Armazenamento incorreto": 0, Outros: 0 };

    historicoDesperdicio.forEach(item => {
        if (contagemMotivos[item.motivo] !== undefined) {
            contagemMotivos[item.motivo]++;
        }
    });

    // Monta uma lista estilizada com bolinhas coloridas simulando a legenda de um gráfico
    chartMotivos.innerHTML = Object.keys(contagemMotivos).map(motivo => {
        const quantidade = contagemMotivos[motivo];
        if (quantidade === 0) return ''; // Não exibe motivos que não aconteceram

        return `
            <div style="display:flex; justify-content:space-between; align-items:center; padding: 8px 0; border-bottom: 1px solid #f5f5f5; font-size: 0.9rem;">
                <div style="display:flex; align-items:center; gap:8px;">
                    <span style="display:inline-block; width:12px; height:12px; border-radius:50%; background:#ef6c00;"></span>
                    <span>${motivo}</span>
                </div>
                <strong>${quantidade} vezes</strong>
            </div>
        `;
    }).join('');
}

// --- 5. ALERTAS E RECOMENDAÇÕES AUTOMÁTICAS ---
function renderizarAlertas() {
    if (historicoDesperdicio.length === 0) {
        alertasLista.innerHTML = `<div class="empty-state"><p>Sem alertas no momento.</p></div>`;
        return;
    }

    let htmlAlertas = "";

    // Verifica se existem problemas diários
    const temDiario = historicoDesperdicio.some(item => item.frequencia === "Diário");
    // Verifica se o motivo principal é validade vencida
    const venceuMuito = historicoDesperdicio.filter(item => item.motivo === "Venceu").length > 2;

    if (temDiario) {
        htmlAlertas += `
            <div style="background: #ffebee; border-left: 4px solid #c62828; padding: 12px; margin-bottom: 10px; border-radius: 4px; font-size: 0.88rem;">
                <strong style="color: #c62828;">🚨 Alerta Crítico de Frequência</strong>
                <p style="margin: 4px 0 0 0; color: #555;">Há ocorrências de desperdício registradas como <strong>Diárias</strong>. Verifique o processo de produção imediatamente.</p>
            </div>
        `;
    }

    if (venceuMuito) {
        htmlAlertas += `
            <div style="background: #fff3e0; border-left: 4px solid #ef6c00; padding: 12px; margin-bottom: 10px; border-radius: 4px; font-size: 0.88rem;">
                <strong style="color: #ef6c00;">⚠️ Atenção com o Estoque</strong>
                <p style="margin: 4px 0 0 0; color: #555;">O motivo <strong>"Venceu"</strong> apareceu repetidas vezes. Considere aplicar a metodologia PVPS (Primeiro que Vence, Primeiro que Sai).</p>
            </div>
        `;
    }

    // Caso existam dados mas nenhum alerta crítico tenha sido disparado ainda
    if (htmlAlertas === "") {
        htmlAlertas = `
            <div style="background: #e8f5e9; border-left: 4px solid #2e7d32; padding: 12px; border-radius: 4px; font-size: 0.88rem;">
                <strong style="color: #2e7d32;">🌱 Operação Estável</strong>
                <p style="margin: 4px 0 0 0; color: #555;">Nenhum padrão crítico detectado. Seus registros atuais estão dentro dos limites recomendados.</p>
            </div>
        `;
    }

    alertasLista.innerHTML = htmlAlertas;
}