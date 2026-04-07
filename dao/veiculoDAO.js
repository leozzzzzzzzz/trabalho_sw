const Veiculo = require('../models/Veiculo');

class VeiculoDAO {
    static async getVeiculos() {
        try {
            return await Veiculo.query().orderBy('id');
        } catch (error) {
            throw "Erro ao buscar veículos: " + error;
        }
    }

    static async addVeiculo(tipo, placa, cor) {
        try {
            return await Veiculo.query().insert({
                tipo,
                placa,
                cor
            });
        } catch (error) {
            throw "Erro ao inserir veículo: " + error;
        }
    }

    static async updateVeiculo(id, tipo, placa, cor) {
        try {
            const result = await Veiculo.query()
                .where('id', id)
                .update({ tipo, placa, cor })
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao atualizar veículo: " + error;
        }
    }

    static async deleteVeiculo(id) {
        try {
            const result = await Veiculo.query()
                .where('id', id)
                .del()
                .returning('*');

            return result[0];
        } catch (error) {
            throw "Erro ao deletar veículo: " + error;
        }
    }

    static async getVeiculoById(id) {
        try {
            return await Veiculo.query().findById(id);
        } catch (error) {
            throw "Erro ao buscar veículo por id: " + error;
        }
    }
}

module.exports = VeiculoDAO;
