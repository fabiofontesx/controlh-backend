'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('funcionarios', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false
      },
      matricula: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      id_cargo: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cargos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('funcionarios');
  }
};
