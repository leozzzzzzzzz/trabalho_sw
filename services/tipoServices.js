const TipoDAO = require('../dao/tipoDAO');

const getTiposDB = async () => {
    try {
        return await TipoDAO.getTipos();
    } catch (error) {
        throw new Error('Erro ao buscar tipos: ' + (error instanceof Error ? error.message : error));
    }
}

const addTipoDB = async (body) => {
    try {
        const { nome, tarifa } = body;
        return await TipoDAO.addTipo(nome, tarifa);
    } catch (error) {
        throw new Error('Erro ao adicionar tipo: ' + (error instanceof Error ? error.message : error));
    }   
}

const updateTipoDB = async (body) => {
    try {
        const { codigo, nome, tarifa } = body;
        const tipo = await TipoDAO.updateTipo(codigo, nome, tarifa);

        if (!tipo) {
            throw new Error('Tipo não encontrado');
        }

        return tipo;
    } catch (error) {
        if (error instanceof Error && error.message === 'Tipo não encontrado') {
            throw error;
        }
        throw new Error('Erro ao atualizar tipo: ' + (error instanceof Error ? error.message : error));
    }
}

const deleteTipoDB = async (codigo) => {
    try {
        const tipo = await TipoDAO.deleteTipo(codigo);

        if (!tipo) {
            throw new Error('Tipo não encontrado');
        }

        return tipo;
    } catch (error) {
        if (error instanceof Error && error.message === 'Tipo não encontrado') {
            throw error;
        }
        throw new Error('Erro ao deletar tipo: ' + (error instanceof Error ? error.message : error));
    }
}

const getTipoByCodigoDB = async (codigo) => {
    let tipo;
    try {
        tipo = await TipoDAO.getTipoByCodigo(codigo);
    } catch (error) {
        if (error instanceof Error && error.message === 'Tipo não encontrado') {
            throw error;
        }
        throw new Error('Erro ao buscar tipo: ' + (error instanceof Error ? error.message : error));
    }
    if (!tipo) {
        throw new Error('Tipo não encontrado');
    }
    return tipo;
}

module.exports = {
    getTiposDB,
    addTipoDB,
    updateTipoDB,
    deleteTipoDB,
    getTipoByCodigoDB
}