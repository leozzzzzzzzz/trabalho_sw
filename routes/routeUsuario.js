const { Router } = require('express');
const { cadastraUsuario, getUsuario, updateUsuario } = require('../controllers/segurancaController');
const { verificaJWT } = require('../controllers/segurancaController');

const routesUsuario = new Router();

routesUsuario.route('/usuario')
    .post(cadastraUsuario);

routesUsuario.route('/usuario/:cpf')
    .get(verificaJWT, getUsuario)
    .put(verificaJWT, updateUsuario);

module.exports = {
    routesUsuario
};