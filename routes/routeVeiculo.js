const { Router } = require('express');

const { getVeiculoById, getVeiculos, addVeiculo, updateVeiculo, deleteVeiculo } = require('../controllers/veiculoController');

const { verificaJWT } = require('../controllers/segurancaController');
const routesVeiculo = new Router();

routesVeiculo.route('/veiculo')
    .get(verificaJWT, getVeiculos)
    .post(verificaJWT, addVeiculo)

routesVeiculo.route('/veiculo/:id')
    .get(verificaJWT, getVeiculoById)
    .put(verificaJWT, updateVeiculo)
    .delete(verificaJWT, deleteVeiculo)

    module.exports = { routesVeiculo }; 