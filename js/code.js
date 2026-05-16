function verificarEmail() {
  var nome = document.getElementById("nome").value;
  var email = document.getElementById("email").value;
  var assunto = document.getElementById("assunto").value;
  var mensagem = document.getElementById("mensagem").value;
  var telefone = document.getElementById("telefone").value;

  var temArroba = false;
  var temPonto = false;

  // nome
  if (nome == "") {
    alert("Digite o nome");
    return;
  }

  // email vazio
  if (email == "") {
    alert("Digite seu e-mail");
    return;
  }

  // assunto
  if (assunto == "") {
    alert("Selecione um assunto");
    return;
  }

  // mensagem
  if (mensagem == "") {
    alert("Digite sua mensagem");
    return;
  }

  // validar email
  for (var i = 0; i < email.length; i++) {
    if (email[i] == "@") {
      temArroba = true;
    }
    if (email[i] == ".") {
      temPonto = true;
    }
  }

  if (temArroba == false || temPonto == false) {
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

  alert("Enviado com sucesso!");
}

