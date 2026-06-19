
// histórico de registro de desperdício
let historicoDesperdicio = JSON.parse(localStorage.getItem('registroDesperdicio')) || [];

const form = document.getElementById('desperdicio-form');
const listaHistorico = document.getElementById('historico-lista');
const limparBtn = document.getElementById('limpar-btn');

if (form) {
    form.addEventListener('submit', function (event){
        event.preventDefault();
        const registroValido = processarRegistro();
        if (registroValido) {
            alert('Desperdício registrado com sucesso!');
            form.reset();
        }
    });
}

if (limparBtn) {
    limparBtn.addEventListener('click', function(){
        if (form) form.reset();
        limparErros();
    });
}

atualizarListaHistorico();

function processarRegistro(){
    const dataElem = document.getElementById('data');
    const dataInput = dataElem ? dataElem.value : '';
    const tipoRadio = document.querySelector('input[name="tipo"]:checked');
    const qtdRadio = document.querySelector('input[name="quantidade"]:checked');
    const motivoRadio = document.querySelector('input[name="motivo"]:checked');
    const doacaoRadio = document.querySelector('input[name="doacao"]:checked');
    const freqRadio = document.querySelector('input[name="frequencia"]:checked');

    if (!dataInput || !tipoRadio || !qtdRadio || !motivoRadio || !doacaoRadio || !freqRadio) {
        alert("Por favor, preencha todos os campos obrigatórios.");
        return false;
    }

    const novoRegistro = {
        data: dataInput,
        tipo: tipoRadio.value,
        quantidade: qtdRadio.value,
        motivo: motivoRadio.value,
        doacao: doacaoRadio.value,
        frequencia: freqRadio.value
    };

    historicoDesperdicio.unshift(novoRegistro);
    localStorage.setItem('registroDesperdicio', JSON.stringify(historicoDesperdicio));
    atualizarListaHistorico();
    return true;
}

function atualizarListaHistorico(){
    if (!listaHistorico) return;
    if (!historicoDesperdicio || historicoDesperdicio.length === 0){
        listaHistorico.innerHTML = `
            <div class="empty-state">
                <p>Nenhum registro ainda.</p>
            </div>`;
        return;
    }

    listaHistorico.innerHTML = historicoDesperdicio.map(registro => {
        const partesData = (registro.data || '').split('-'); // Separa o ano, mês e dia
        const dataFormatada = (partesData.length === 3) ? `${partesData[2]}/${partesData[1]}/${partesData[0]}` : (registro.data || '');
        return `
            <div class="card-registro" style="border: 1px solid #e0e0e0; padding: 16px; margin-bottom: 12px; border-radius: 8px; background: #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.02);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-weight: bold; color: #2e7d32;">🍎 ${registro.tipo}</span>
                    <span style="font-size: 0.9rem; color: #666;">📅 ${dataFormatada}</span>
                </div>
                <div style="font-size: 0.95rem; color: #333; line-height: 1.5;">
                    <p><strong>Quantidade:</strong> ${registro.quantidade}</p>
                    <p><strong>Motivo:</strong> ${registro.motivo}</p>
                    <p><strong>Poderia ser doado?</strong> ${registro.doacao}</p>
                    <p><strong>Frequência:</strong> ${registro.frequencia}</p>
                </div>
            </div>
        `;
    }).join('');
}

function limparErros(){
    const erros = document.querySelectorAll('.field-error');
    erros.forEach(span => span.textContent = '');
}

