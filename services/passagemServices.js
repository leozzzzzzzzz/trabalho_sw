const PassagemDAO = require('../dao/passagemDAO');

const getPassagensDB = async () => {
    try {
        return await PassagemDAO.getPassagens();
    } catch (error) {
        throw new Error('Erro ao buscar passagens: ' + (error instanceof Error ? error.message : error));
    }
}

const addPassagemDB = async (body) => {
    try {
        const { veiculo, local, data_hora, valor, pago } = body;
        return await PassagemDAO.addPassagem(veiculo, local, data_hora, valor, pago);
    } catch (error) {
        throw new Error('Erro ao adicionar passagem: ' + (error instanceof Error ? error.message : error));
    }
}

const updatePassagemDB = async (body) => {
    try {
        const { id, veiculo, local, data_hora, valor, pago } = body;
        const passagem = await PassagemDAO.updatePassagem(id, veiculo, local, data_hora, valor, pago);

        if (!passagem) {
            const notFoundError = new Error('Passagem não encontrada');
            notFoundError.status = 404;
            throw notFoundError;
        }

        return passagem;
    } catch (error) {
        if (error instanceof Error && error.message === 'Passagem não encontrada') {
            throw error;
        }
        throw new Error('Erro ao atualizar passagem: ' + (error instanceof Error ? error.message : error));
    }
}

const deletePassagemDB = async (id) => {
    try {
        const passagem = await PassagemDAO.deletePassagem(id);

        if (!passagem) {
            const notFoundError = new Error('Passagem não encontrada');
            notFoundError.status = 404;
            throw notFoundError;
        }

        return passagem;
    } catch (error) {
        if (error instanceof Error && error.message === 'Passagem não encontrada') {
            throw error;
        }
        throw new Error('Erro ao deletar passagem: ' + (error instanceof Error ? error.message : error));
    }
}

const getPassagemByIdDB = async (id) => {
    try {
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId)) {
            const invalidIdError = new Error('ID inválido');
            invalidIdError.status = 400;
            throw invalidIdError;
        }
        const passagem = await PassagemDAO.getPassagemById(parsedId);

        if (!passagem) {
            const notFoundError = new Error('Passagem não encontrada');
            notFoundError.status = 404;
            throw notFoundError;
        }

        return passagem;
    } catch (error) {
        if (error instanceof Error && (error.message === 'Passagem não encontrada' || error.message === 'ID inválido')) {
            throw error;
        }
        throw new Error('Erro ao buscar passagem: ' + (error instanceof Error ? error.message : error));
    }
}

module.exports = {
    getPassagensDB,
    addPassagemDB,
    updatePassagemDB,
    deletePassagemDB,
    getPassagemByIdDB
}