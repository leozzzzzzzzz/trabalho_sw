const Tipo = require('../models/Tipo');

class TipoDAO {
    static async getTipos() {
        try {
            return await Tipo.query().orderBy('codigo');
        } catch (error) {
            throw "Erro ao buscar tipos: " + error;
        }
    }

    static async addTipo(nome, tarifa) {
        try {
            return await Tipo.query().insert({
                nome,
                tarifa
            });
        } catch (error) {
            throw "Erro ao inserir tipo: " + error;
        }
    }

    static async updateTipo(codigo, nome, tarifa) {
        try {
            const result = await Tipo.query()
                .where('codigo', codigo)
                .update({ nome, tarifa })
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao atualizar tipo: " + error;
        }
    }

    static async deleteTipo(codigo) {
        try {
            const result = await Tipo.query()
                .where('codigo', codigo)
                .del()
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao deletar tipo: " + error;
        }
    }

    static async getTipoByCodigo(codigo) {
        try {
            return await Tipo.query().findById(codigo);
        } catch (error) {
            throw "Erro ao buscar tipo por código: " + error;
        }
    }
}

module.exports = TipoDAO;
