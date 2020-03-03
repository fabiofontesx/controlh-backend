const Sequelize = require('sequelize');
const databaseConfig = require('../config/database');
const Usuarios = require('../models/Usuarios')
const Funcionarios = require('../models/Funcionarios')
const Cargos = require('../models/Cargos')

const connection = new Sequelize(databaseConfig);

Cargos.init(connection);
Funcionarios.init(connection);
Usuarios.init(connection);

Funcionarios.associate(connection.models);
Cargos.associate(connection.models);
Usuarios.associate(connection.models);

module.exports = connection;