const Usuario = require('../models/Usuario');

class SegurancaDAO {
    static async autenticaUsuario(email, senha) {
        try {
            return await Usuario.query()
                .where('email', email)
                .where('senha', senha)
                .first();
        } catch (error) {
            throw "Erro ao autenticar usuário: " + error;
        }
    }

    static async cadastraUsuario(email, cpf, telefone, nome, tipo, senha) {
        try {
            return await Usuario.query().insert({
                email,
                cpf,
                telefone,
                nome,
                tipo,
                senha
            });
        } catch (error) {
            throw "Erro ao cadastrar usuário: " + error;
        }
    }

    static async updateUsuario(cpf, email, telefone, nome, tipo, senha) {
        try {
            const result = await Usuario.query()
                .where('cpf', cpf)
                .update({ email, telefone, nome, tipo, senha })
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao atualizar usuário: " + error;
        }
    }

    static async getUsuarioByCpf(cpf) {
        try {
            return await Usuario.query().findById(cpf);
        } catch (error) {
            throw "Erro ao buscar usuário: " + error;
        }
    }
}

module.exports = SegurancaDAO;
