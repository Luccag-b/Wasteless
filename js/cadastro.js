function cadastrarUsuario() {
    var nome = document.getElementById("nome").value;

    if (nome == "") {
        alert("Digite nome e sobrenome");
        return;
    }

    var partes = nome.split(" ");

    if (partes.length < 2) {
        alert("Digite nome e sobrenome");
        return;
    }

    if (partes[0].length < 2 || partes[1].length < 2) {
        alert("Nome e sobrenome devem ter pelo menos 2 letras");
        return;
    }

    alert("Usuário cadastrado com sucesso!");
}
