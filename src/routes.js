const { Router } = require('express');
const routes = Router();
const JwtManager = require('./middlewares/JwtManager');

const ControllerFuncionarios = require('./controllers/Funcionarios');
const ControllerUsuarios = require('./controllers/Usuarios');



routes.get('/funcionarios/:matricula', JwtManager.verifyToken, ControllerFuncionarios.findByMatricula);
routes.post('/funcionarios/', JwtManager.verifyToken, ControllerFuncionarios.store);


routes.post('/usuarios/login', ControllerUsuarios.login);

module.exports = routes;


