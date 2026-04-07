const { Router } = require('express');

const { routesTipo } = require('./routeTipo'); 
const { routesLocal } = require('./routeLocal');
const { routesVeiculo } = require('./routeVeiculo');
const { routesPassagem } = require('./routePassagem');
const { routesUsuario } = require('./routeUsuario');
const { login } = require('../controllers/segurancaController')

const routes = new Router();

routes.use(routesTipo);
routes.use(routesLocal);
routes.use(routesVeiculo);
routes.use(routesPassagem);
routes.route("/login")
    .post(login)
routes.use(routesUsuario)
module.exports = routes;