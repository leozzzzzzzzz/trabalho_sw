const LocalDAO = require('../dao/localDAO');

const getLocaisDB = async () => {
    try {
        return await LocalDAO.getLocais();
    } catch (error) {
        throw new Error('Erro ao buscar locais: ' + (error instanceof Error ? error.message : error));
    }
}

const addLocalDB = async (body) => {
    try {
        const { nome, localizacao } = body;
        return await LocalDAO.addLocal(nome, localizacao);
    } catch (error) {
        throw new Error('Erro ao adicionar local: ' + (error instanceof Error ? error.message : error));
    }   
}

const updateLocalDB = async (codigo, body) => {
    try {
        const { nome, localizacao } = body;
        const local = await LocalDAO.updateLocal(codigo, nome, localizacao);

        if (!local) {
            throw new Error('Local não encontrado');
        }

        return local;
    } catch (error) {
        if (error instanceof Error && error.message === 'Local não encontrado') {
            throw error;
        }
        throw new Error('Erro ao atualizar local: ' + (error instanceof Error ? error.message : error));
    }
}

const deleteLocalDB = async (codigo) => {
    try {
        const local = await LocalDAO.deleteLocal(codigo);

        if (!local) {
            throw new Error('Local não encontrado');
        }

        return local;
    } catch (error) {
        if (error instanceof Error && error.message === 'Local não encontrado') {
            throw error;
        }
        throw new Error('Erro ao deletar local: ' + (error instanceof Error ? error.message : error));
    }
}

const getLocalByCodigoDB = async (codigo) => {
    try {
        const local = await LocalDAO.getLocalByCodigo(codigo);

        if (!local) {
            throw new Error('Local não encontrado');
        }

        return local;
    } catch (error) {
        if (error instanceof Error && error.message === 'Local não encontrado') {
            throw error;
        }
        throw new Error('Erro ao buscar local: ' + (error instanceof Error ? error.message : error));
    }
}

module.exports = {
    getLocaisDB,
    addLocalDB,
    updateLocalDB,
    deleteLocalDB,
    getLocalByCodigoDB
}