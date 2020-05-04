const { Router } = require('express');
const routes = Router();
const JwtManager = require('./middlewares/JwtManager');

const ControllerFuncionarios = require('./controllers/Funcionarios');
const ControllerUsuarios = require('./controllers/Usuarios');
const ControllerEmpresas = require('./controllers/Empresas');
const ControllerProjeto = require('./controllers/Projetos');
const ControllerApontamentos = require('./controllers/Apontamentos');



routes.get('/funcionarios/:matricula', JwtManager.verifyToken, ControllerFuncionarios.findByMatricula);
routes.post('/funcionarios/', ControllerFuncionarios.store);
routes.get('/funcionarios/', JwtManager.verifyToken, ControllerFuncionarios.getAll);


routes.post('/usuarios/login', ControllerUsuarios.login);
routes.post('/usuarios/sigin', ControllerUsuarios.store);
routes.post('/usuarios/updatePassword',JwtManager.verifyToken, ControllerUsuarios.changePassword);

routes.post('/empresas/cadastrar', ControllerEmpresas.store);
routes.get('/empresas/buscar', ControllerEmpresas.findByNomeFantasia);

routes.post('/projetos/cadastrar', ControllerProjeto.store);
routes.post('/projetos/vincularFuncionario', ControllerProjeto.addProjetoFuncionario);
routes.get('/projetos/getByFuncionario', JwtManager.verifyToken, ControllerProjeto.getProjetosFuncionario);

routes.post('/apontamentos/addApontamento',JwtManager.verifyToken, ControllerApontamentos.addApontamento);
routes.get('/apontamentos/findByIdFuncionario', JwtManager.verifyToken, ControllerApontamentos.findAllByFuncionario);
routes.get('/apontamentos/findByFuncionarioAndData',JwtManager.verifyToken, ControllerApontamentos.findByFuncionarioAndData);
routes.delete('/apontamentos/:id',JwtManager.verifyToken, ControllerApontamentos.deleteById);



routes.get('/health/check', (req, res)=>{
    return res.json({health: 'ok'})
});




module.exports = routes;


