const {  Router } = require('express'); 

const { getPassagemById, getPassagens, addPassagem, updatePassagem, deletePassagem } = require('../controllers/passagemController');

const routesPassagem = new Router();

const { verificaJWT } = require('../controllers/segurancaController');

routesPassagem.route('/passagem')
    .get(verificaJWT, getPassagens)
    .post(verificaJWT, addPassagem)

routesPassagem.route('/passagem/:id')
    .get(verificaJWT, getPassagemById)
    .put(verificaJWT, updatePassagem)
    .delete(verificaJWT, deletePassagem) 



module.exports = { routesPassagem };