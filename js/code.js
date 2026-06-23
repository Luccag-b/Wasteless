// FALE CONOSCO - VALIDAÇÃO DE FORMULÁRIO -------------------

function verificarEmail() {
  var nome = document.getElementById("nome").value.trim();
  var email = document.getElementById("email").value;
  var assunto = document.getElementById("assunto").value;
  var mensagem = document.getElementById("mensagem").value;
  var telefone = document.getElementById("telefone").value;

  // Nome e sobrenome
  if (nome === "") {
    alert("Digite o nome e sobrenome");
    return;
  }

var partes = nome.split(" ");

if (partes.length < 2) {
    alert("Digite o nome e sobrenome");
    return;
}

if (partes[0].length < 2 || partes[1].length < 2) {
    alert("Nome e sobrenome devem ter pelo menos 2 letras");
    return;
}

  // E-mail
  if (email == "") {
    alert("Digite seu e-mail");
    return;
  }

  // Assunto
  if (assunto == "") {
    alert("Selecione um assunto");
    return;
  }

  // Mensagem
  if (mensagem == "") {
    alert("Digite sua mensagem");
    return;
  }

  // Validar e-mail
  if (email.indexOf("@") == -1 || email.indexOf(".") == -1) {
    alert("E-mail inválido");
    return;
  }

  // telefone (opcional)
  if (telefone != "") {
    for (var i = 0; i < telefone.length; i++) {
      if (
        telefone[i] != "0" &&
        telefone[i] != "1" &&
        telefone[i] != "2" &&
        telefone[i] != "3" &&
        telefone[i] != "4" &&
        telefone[i] != "5" &&
        telefone[i] != "6" &&
        telefone[i] != "7" &&
        telefone[i] != "8" &&
        telefone[i] != "9" &&
        telefone[i] != "(" &&
        telefone[i] != ")" &&
        telefone[i] != "-" &&
        telefone[i] != " "
      ) {
        alert("Telefone inválido (somente números)");
        return;
      }
    }
  }

  alert("Mensagem enviada com sucesso!");
}

