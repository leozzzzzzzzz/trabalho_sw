class Usuario {
    constructor(email, cpf, telefone, nome, tipo) {
        this.email = email;
        this.cpf = cpf;
        this.telefone = telefone;
        this.nome = nome;
        this.tipo = tipo;
    }
}

module.exports = Usuario;