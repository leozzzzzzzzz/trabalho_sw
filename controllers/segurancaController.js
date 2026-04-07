const { autenticaUsuarioDB, cadastraUsuarioDB, getUsuarioDB, updateUsuarioDB } = require('../services/segurancaServices');

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const getErrorMessage = (error) => error instanceof Error ? error.message : String(error);

const login = async (request, response) => {
    const { email, senha } = request.body;
    if (!email || !senha) {
        return response.status(400).json({ auth: false, message: 'E-mail e senha são obrigatórios.' });
    }

    await autenticaUsuarioDB(request.body)
        .then(usuario => {
            const token = jwt.sign({ usuario }, process.env.SECRET, {
                expiresIn: 3600 // expira em 1h
            });
            return response.json({ auth: true, token });
        })
        .catch(err => response.status(401).json({ auth: false, message: getErrorMessage(err) }));
}

// verificação do token
function verificaJWT(request, response, next) {
    const authHeader = request.headers['authorization'];
    if (!authHeader) return response.status(401).json({ auth: false, message: 'Nenhum token recebido.' });

    const token = authHeader.split(' ')[1]; // Extrai o token após "Bearer "
    if (!token) return response.status(401).json({ auth: false, message: 'Formato do token inválido. Use: Bearer <token>' });

    try {
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            if (err) return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
            request.usuario = decoded.usuario;
            next();
        });
    } catch (error) {
        return response.status(401).json({ auth: false, message: 'Erro ao autenticar o token.' });
    }
}

function cadastraUsuario (request, response) {
    cadastraUsuarioDB(request.body)
        .then(usuario => response.status(201).json(usuario))
        .catch(err => response.status(400).json({ message: getErrorMessage(err) }));
}

function getUsuario (request, response) {
    if (request.usuario.cpf !== request.params.cpf) {
        return response.status(403).json({ message: "Acesso negado: só é permitido consultar o próprio usuário." });
    }
    getUsuarioDB(request.params.cpf)
        .then(usuario => response.status(200).json(usuario))
        .catch(err => response.status(404).json({ message: getErrorMessage(err) }));
}

function updateUsuario (request, response) {
    if (request.usuario.cpf !== request.params.cpf) {
        return response.status(403).json({ message: "Acesso negado: só é permitido consultar o próprio usuário." });
    } 
    updateUsuarioDB(request.params.cpf, request.body)
        .then(usuario => response.status(200).json(usuario))
        .catch(err => {
            const message = getErrorMessage(err);
            if (message.includes('não encontrado')) {
                return response.status(404).json({ message });
            }
            return response.status(400).json({ message });
        });
}

module.exports = {
    login, verificaJWT, cadastraUsuario, getUsuario, updateUsuario
}