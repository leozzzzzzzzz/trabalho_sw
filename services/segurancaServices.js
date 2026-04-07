const SegurancaDAO = require('../dao/segurancaDAO');

const autenticaUsuarioDB = async (body) => {
    try {           
        const { email, senha } = body;
        const usuario = await SegurancaDAO.autenticaUsuario(email, senha);
        
        if (!usuario) {
            throw new Error('Usuário ou senha inválidos');
        }

        return usuario;
    } catch (err) {
        if (err instanceof Error && err.message === 'Usuário ou senha inválidos') {
            throw err;
        }
        throw new Error('Erro ao autenticar o usuário: ' + (err instanceof Error ? err.message : err));
    }    
}

const cadastraUsuarioDB = async (body) => {
    try {
        const { email, cpf, telefone, nome, tipo, senha } = body;
        return await SegurancaDAO.cadastraUsuario(email, cpf, telefone, nome, tipo, senha);
    } catch (err) {
        throw new Error('Erro ao tentar cadastrar o usuário: ' + (err instanceof Error ? err.message : err));
    }
}

const updateUsuarioDB = async (cpf, body) => {
    try {
        const { email, telefone, nome, tipo, senha } = body;
        const usuario = await SegurancaDAO.updateUsuario(cpf, email, telefone, nome, tipo, senha);

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return usuario;
    } catch (error) {
        if (error instanceof Error && error.message === 'Usuário não encontrado') {
            throw error;
        }
        throw new Error('Erro ao atualizar usuário: ' + (error instanceof Error ? error.message : error));
    }
}

const getUsuarioDB = async (cpf) => {
    try {
        const usuario = await SegurancaDAO.getUsuarioByCpf(cpf);

        if (!usuario) {
            throw new Error('Usuário não encontrado');
        }

        return usuario;
    } catch (err) {
        if (err instanceof Error && err.message === 'Usuário não encontrado') {
            throw err;
        }
        throw new Error('Erro ao tentar obter o usuário: ' + (err instanceof Error ? err.message : err));
    }
}

module.exports = {
    autenticaUsuarioDB,
    cadastraUsuarioDB,
    updateUsuarioDB,
    getUsuarioDB
}