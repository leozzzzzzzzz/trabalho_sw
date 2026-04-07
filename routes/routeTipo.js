const { Router } = require('express');

const {getTipos, addTipo, updateTipo, deleteTipo, getTipoByCodigo} = require('../controllers/tipoController');

const { verificaJWT } = require('../controllers/segurancaController');

const routesTipo = new Router();


routesTipo.route('/tipo')
    .get(verificaJWT, getTipos)
    .post(verificaJWT, addTipo)
routesTipo.route('/tipo/:codigo') 
    .get(verificaJWT, getTipoByCodigo)
    .put(verificaJWT, updateTipo)
    .delete(verificaJWT, deleteTipo)

module.exports = { routesTipo };
