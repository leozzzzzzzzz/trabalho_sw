/*create table veiculos (
    id serial not null primary key, 
    tipo integer not null references tipos (codigo),
    placa varchar (7) not null,
    check (
     placa ~ '^[A-Z]{3}[0-9]{4}$' 
     or 
     placa ~ '^[A-Z]{3}[0-9]{1}[A-Z]{1}[0-9]{2}$'
     ),
    cor varchar (20) not null
 );*/

const VeiculoDAO = require('../dao/veiculoDAO');

const getVeiculosDB = async () => {
    try {
        return await VeiculoDAO.getVeiculos();
    } catch (error) {
        throw new Error('Erro ao buscar veículos: ' + (error instanceof Error ? error.message : error));
    }
}

const addVeiculoDB = async (body) => {
    try {
        const { tipo, placa, cor } = body;
        return await VeiculoDAO.addVeiculo(tipo, placa, cor);
    } catch (error) {
        throw new Error('Erro ao adicionar veículo: ' + (error instanceof Error ? error.message : error));
    }
}

const updateVeiculoDB = async (id, body) => {
    try {
        const { tipo, placa, cor } = body;
        const veiculo = await VeiculoDAO.updateVeiculo(id, tipo, placa, cor);

        if (!veiculo) {
            throw new Error('Veículo não encontrado');
        }

        return veiculo;
    } catch (error) {
        if (error instanceof Error && error.message === 'Veículo não encontrado') {
            throw error;
        }
        throw new Error('Erro ao atualizar veículo: ' + (error instanceof Error ? error.message : error));
    }
}

const deleteVeiculoDB = async (id) => {
    try {
        const veiculo = await VeiculoDAO.deleteVeiculo(id);

        if (!veiculo) {
            throw new Error('Veículo não encontrado');
        }

        return veiculo;
    } catch (error) {
        if (error instanceof Error && error.message === 'Veículo não encontrado') {
            throw error;
        }
        throw new Error('Erro ao deletar veículo: ' + (error instanceof Error ? error.message : error));
    }
}

const getVeiculoByIdDB = async (id) => {
    try {
        const veiculo = await VeiculoDAO.getVeiculoById(id);

        if (!veiculo) {
            throw new Error('Veículo não encontrado');
        }

        return veiculo;
    } catch (error) {
        if (error instanceof Error && error.message === 'Veículo não encontrado') {
            throw error;
        }
        throw new Error('Erro ao buscar veículo: ' + (error instanceof Error ? error.message : error));
    }
}

module.exports = {
    getVeiculosDB,
    addVeiculoDB,
    updateVeiculoDB,
    deleteVeiculoDB,
    getVeiculoByIdDB
}