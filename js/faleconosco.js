// 1. Inicializa o histórico de mensagens lendo do LocalStorage ou criando um array vazio
let listaMensagens = JSON.parse(localStorage.getItem('contatosEnviados')) || [];

const form = document.getElementById('contato-form');
const listaMensagensDiv = document.getElementById('mensagens-lista');
const limparBtn = document.getElementById('limpar-btn');
const mensagemTextArea = document.getElementById('mensagem');
const msgCounter = document.getElementById('msg-counter');

// Mostra os contatos enviados anteriormente ao carregar a página
atualizarListaMensagens();

// Contador de caracteres dinâmico da mensagem
mensagemTextArea.addEventListener('input', function() {
    const totalCaracteres = mensagemTextArea.value.length;
    msgCounter.textContent = `${totalCaracteres} / 500`;
});

// Evento de envio do formulário
form.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede a página de recarregar

    if (processarContato()) {
        form.reset();
        msgCounter.textContent = "0 / 500"; // Reseta o contador visual
    }
});

// Evento do botão Limpar
limparBtn.addEventListener('click', function() {
    form.reset();
    limparErros();
    msgCounter.textContent = "0 / 500";
});

// 2. Função de validação e armazenamento
function processarContato() {
    limparErros();
    let formularioValido = true;

    // Captura os valores digitados
    const nomeValue = document.getElementById('nome').value.trim();
    const emailValue = document.getElementById('email').value.trim();
    const telefoneValue = document.getElementById('telefone').value.trim();
    const assuntoValue = document.getElementById('assunto').value;
    const mensagemValue = mensagemTextArea.value.trim();

    // Validações básicas obrigatórias
    if (!nomeValue) {
        document.getElementById('nome-error').textContent = "Por favor, digite seu nome.";
        formularioValido = false;
    }
    
    // Validação de e-mail simples (procura se tem um '@')
    if (!emailValue) {
        document.getElementById('email-error').textContent = "Por favor, digite seu e-mail.";
        formularioValido = false;
    } else if (!emailValue.includes('@')) {
        document.getElementById('email-error').textContent = "Insira um e-mail válido (contendo @).";
        formularioValido = false;
    }

    if (!assuntoValue) {
        document.getElementById('assunto-error').textContent = "Selecione o assunto do contato.";
        formularioValido = false;
    }

    if (!mensagemValue) {
        document.getElementById('mensagem-error').textContent = "O conteúdo da mensagem não pode ficar vazio.";
        formularioValido = false;
    }

    if (!formularioValido) return false;

    // Monta o objeto com os dados validados
    const novoContato = {
        data: new Date().toLocaleDateString('pt-BR'),
        nome: nomeValue,
        email: emailValue,
        telefone: telefoneValue || "Não informado",
        assunto: assuntoValue,
        mensagem: mensagemValue
    };

    // Adiciona o item no início do array e salva
    listaMensagens.unshift(novoContato);
    localStorage.setItem('contatosEnviados', JSON.stringify(listaMensagens));

    // Atualiza a listagem visual na tela
    atualizarListaMensagens();

    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    return true;
}

// 3. Renderização das mensagens enviadas na tela (coluna da direita)
function atualizarListaMensagens() {
    if (listaMensagens.length === 0) {
        listaMensagensDiv.innerHTML = `<div class="empty-state"><p>Nenhuma mensagem enviada ainda.</p></div>`;
        return;
    }

    listaMensagensDiv.innerHTML = listaMensagens.map(item => {
        return `
            <div style="border: 1px solid #000; padding: 16px; margin-bottom: 12px; border-radius: 8px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.02); font-size: 0.9rem;">
                <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-weight: bold; color: #2e7d32;">
                    <span>📌 ${item.assunto}</span>
                    <span style="font-size: 0.8rem; color: #000;">📅 ${item.data}</span>
                </div>
                <div style="color: #000; line-height: 1.4;">
                    <p style="margin: 2px 0;"><strong>De:</strong> ${item.nome} (${item.email})</p>
                    <p style="margin: 2px 0;"><strong>Tel:</strong> ${item.telefone}</p>
                    <p style="margin: 8px 0 0 0; padding: 8px; background: #f9f9f9; border-radius: 4px; color: #000; font-style: italic;">
                        "${item.mensagem}"
                    </p>
                </div>
            </div>
        `;
    }).join('');
}

// 4. Limpa erros visuais
function limparErros() {
    const erros = document.querySelectorAll('.field-error');
    erros.forEach(span => span.textContent = '');
}