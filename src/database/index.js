const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');

const Usuarios = require('../models/Usuarios');
const Funcionarios = require('../models/Funcionarios');
const Cargos = require('../models/Cargos');
const Empresas = require('../models/Empresas');
const Projetos = require('../models/Projetos');
const Apontamentos = require('../models/Apontamentos')

const connection = new Sequelize(databaseConfig);

Cargos.init(connection);
Funcionarios.init(connection);
Usuarios.init(connection);
Empresas.init(connection);
Projetos.init(connection);
Apontamentos.init(connection);

Funcionarios.associate(connection.models);
Cargos.associate(connection.models);
Usuarios.associate(connection.models);
Empresas.associate(connection.models);
Projetos.associate(connection.models);
Apontamentos.associate(connection.models);


module.exports = connection;