let historicoRelatorios = JSON.parse(localStorage.getItem('relatoriosSalvos')) || [];

//Pegando os elementos do html
const form = document.getElementById('relatorio-form');
const resultadoSection = document.getElementById('resultado-section');
const resultadoEmpty = document.getElementById('resultado-empty');
const resultadoBox = document.getElementById('resultado-box');
const sugestaoInteligente = document.getElementById('sugestao-inteligente');
const sugestaoDoacao = document.getElementById('sugestao-doacao');
const listaHistorico = document.getElementById('historico-lista');
const limparBtn = document.getElementById('limpar-btn');


atualizarListaHistorico();
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    if (gerarRelatorio()) {
        form.reset(); // Limpa os campos se tudo deu certo
    }
});

// Escuta o botão de limpar
limparBtn.addEventListener('click', function() {
    form.reset();
    limparErros();
    
    // Volta a tela para o estado original (esconde o resultado atual)
    resultadoSection.style.display = 'none';
    resultadoEmpty.style.display = 'block';
});

// 2. Função principal que faz as contas e gera o relatório
function gerarRelatorio() {
    limparErros();
    let formularioValido = true;

    // Pega os valores digitados (e converte os números para formato que o JS entenda)
    const periodoValue = document.getElementById('periodo').value;
    const sobraValue = parseFloat(document.getElementById('sobra').value);
    const producaoValue = parseFloat(document.getElementById('producao').value);
    const custoValue = parseFloat(document.getElementById('custo').value) || 0; // Se não digitar custo, assume 0

    // Validações simples de preenchimento
    if (!periodoValue) {
        document.getElementById('periodo-error').textContent = "Selecione o período.";
        formularioValido = false;
    }
    if (isNaN(sobraValue) || sobraValue < 0) {
        document.getElementById('sobra-error').textContent = "Digite uma quantidade válida.";
        formularioValido = false;
    }
    if (isNaN(producaoValue) || producaoValue <= 0) {
        document.getElementById('producao-error').textContent = "A produção deve ser maior que 0.";
        formularioValido = false;
    }
    // Regra matemática lógica: a sobra não pode ser maior que tudo o que foi produzido
    if (sobraValue > producaoValue) {
        document.getElementById('sobra-error').textContent = "A sobra não pode ser maior que a produção total.";
        formularioValido = false;
    }

    if (!formularioValido) return false;

    
    // Cálculo da porcentagem de desperdício: (Sobra / Produção) * 100
    const taxaDesperdicio = (sobraValue / producaoValue) * 100;
    
    // Cálculo do prejuízo financeiro total
    const prejuizoTotal = sobraValue * custoValue;

    //Textos automaticos
    let textoSugestao = "";
    let textoDoacao = "";

    // Condicional baseado na gravidade do desperdício
    if (taxaDesperdicio <= 5) {
        textoSugestao = "💡 <strong>Excelente controle!</strong> Seu desperdício está abaixo da média de mercado (5%). Continue monitorando os padrões de consumo.";
    } else if (taxaDesperdicio <= 15) {
        textoSugestao = "⚠️ <strong>Atenção moderada:</strong> Perdas perceptíveis. Recomendamos revisar o tamanho das porções produzidas e otimizar o armazenamento dos ingredientes.";
    } else {
        textoSugestao = "🚨 <strong>Alerta crítico:</strong> Nível de desperdício muito alto! Sugerimos recalcular imediatamente a demanda de produção diária e treinar a equipe para evitar excessos.";
    }

    // Condicional focado em Doação
    if (taxaDesperdicio > 10) {
        textoDoacao = "🤝 <strong>Oportunidade Social:</strong> Como o volume de sobra está alto, verifique se o alimento ainda está em condições seguras de consumo para realizar uma doação para ONGs locais parceiras.";
    } else {
        textoDoacao = "🌱 <strong>Consumo Consciente:</strong> Foque no reaproveitamento integral de cascas e talos para receitas internas, mantendo sua produção autossustentável.";
    }

    
    // Injeta os dados calculados dentro da caixa de resultado principal
    resultadoBox.innerHTML = `
        <h3>📊 Resultado do Relatório</h3>
        <p style="margin: 10px 0;"><strong>Período Analisado:</strong> ${periodoValue.toUpperCase()}</p>
        <p style="margin: 10px 0;"><strong>Desperdício Comercial:</strong> ${taxaDesperdicio.toFixed(1)}% da sua produção</p>
        <p style="margin: 10px 0; color: ${prejuizoTotal > 0 ? '#d32f2f' : '#333'};">
            <strong>Prejuízo Financeiro Estimado:</strong> R$ ${prejuizoTotal.toFixed(2)}
        </p>
    `;

    sugestaoInteligente.innerHTML = textoSugestao;
    sugestaoDoacao.innerHTML = textoDoacao;

    // Troca as divs para o resultado aparecer e o "vazio" sumir
    resultadoEmpty.style.display = 'none';
    resultadoSection.style.display = 'block';

    // Salva no Historico
    const novoRelatorio = {
        data: new Date().toLocaleDateString('pt-BR'), // Pega a data de hoje formatada do sistema
        periodo: periodoValue,
        taxa: taxaDesperdicio.toFixed(1),
        prejuizo: prejuizoTotal.toFixed(2)
    };

    historicoRelatorios.unshift(novoRelatorio);
    localStorage.setItem('relatoriosSalvos', JSON.stringify(historicoRelatorios));

    // Atualiza a listagem visual do histórico
    atualizarListaHistorico();

    return true;
}

// Função que desenha o histórico na barra inferior
function atualizarListaHistorico() {
    if (historicoRelatorios.length === 0) {
        listaHistorico.innerHTML = `<div class="empty-state"><p>Nenhum relatório gerado ainda.</p></div>`;
        return;
    }

    listaHistorico.innerHTML = historicoRelatorios.map(relatorio => {
        return `
            <div style="border-left: 4px solid #2e7d32; padding: 10px; margin-bottom: 10px; background: #000; border-radius: 0 4px 4px 0; font-size:0.9rem;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; margin-bottom:4px;">
                    <span>📅 Gerado em: ${relatorio.data} (${relatorio.periodo.toUpperCase()})</span>
                    <span style="color: #d32f2f;">${relatorio.taxa}% de Perda</span>
                </div>
                <div style="color:#555;">Custo do desperdício: <strong>R$ ${relatorio.prejuizo}</strong></div>
            </div> 
        `;
    }).join('');
}

// Limpa as mensagens textuais vermelhas de erro
function limparErros() {
    const erros = document.querySelectorAll('.field-error');
    erros.forEach(span => span.textContent = '');
}