const Local = require('../models/Local');

class LocalDAO {
    static async getLocais() {
        try {
            return await Local.query().orderBy('codigo');
        } catch (error) {
            throw "Erro ao buscar locais: " + error;
        }
    }

    static async addLocal(nome, localizacao) {
        try {
            return await Local.query().insert({
                nome,
                localizacao
            });
        } catch (error) {
            throw "Erro ao inserir local: " + error;
        }
    }

    static async updateLocal(codigo, nome, localizacao) {
        try {
            const result = await Local.query()
                .where('codigo', codigo)
                .update({ nome, localizacao })
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao atualizar local: " + error;
        }
    }

    static async deleteLocal(codigo) {
        try {
            const result = await Local.query()
                .where('codigo', codigo)
                .del()
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao deletar local: " + error;
        }
    }

    static async getLocalByCodigo(codigo) {
        try {
            return await Local.query().findById(codigo);
        } catch (error) {
            throw "Erro ao buscar local por código: " + error;
        }
    }
}

module.exports = LocalDAO;
