const Passagem = require('../models/Passagem');

class PassagemDAO {
    static async getPassagens() {
        try {
            return await Passagem.query().orderBy('id');
        } catch (error) {
            throw new Error("Erro ao buscar passagens: " + error);
        }
    }

    static async addPassagem(veiculo, local, data_hora, valor, pago) {
        try {
            return await Passagem.query().insert({
                veiculo,
                local,
                data_hora,
                valor,
                pago
            });
        } catch (error) {
            throw new Error("Erro ao inserir passagem: " + error);
        }
    }

    static async updatePassagem(id, veiculo, local, data_hora, valor, pago) {
        try {
            const result = await Passagem.query()
                .where('id', id)
                .update({ veiculo, local, data_hora, valor, pago })
                .returning('*');

            return result[0];
        } catch (error) {
            throw new Error("Erro ao atualizar passagem: " + error);
        }
    }

    static async deletePassagem(id) {
        try {
            const result = await Passagem.query()
                .where('id', id)
                .del()
                .returning('*');

            return result[0];
        } catch (error) {
            throw new Error("Erro ao deletar passagem: " + error);
        }
    }

    static async getPassagemById(id) {
        try {
            return await Passagem.query().findById(id);
        } catch (error) {
            throw new Error("Erro ao buscar passagem por id: " + error);
        }
    }
}

module.exports = PassagemDAO;
