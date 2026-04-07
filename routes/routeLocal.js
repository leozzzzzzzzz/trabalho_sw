const { Router } = require('express');

const { getLocais, addLocal, updateLocal, deleteLocal, getLocalByCodigo} = require('../controllers/localController');

const { verificaJWT } = require('../controllers/segurancaController')

const routesLocal = new Router();

routesLocal.route('/local')
    .get(verificaJWT, getLocais)
    .post(verificaJWT, addLocal)

routesLocal.route('/local/:codigo')
    .get(verificaJWT, getLocalByCodigo)
    .put(verificaJWT, updateLocal)
    .delete(verificaJWT, deleteLocal)

module.exports ={ routesLocal };