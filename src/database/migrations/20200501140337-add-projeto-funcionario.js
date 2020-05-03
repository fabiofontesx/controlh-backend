'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('projeto_funcionario', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },

      id_projeto: {
        type: Sequelize.INTEGER,
        references: {
          model: 'projetos',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },

      id_funcionario: {
        type: Sequelize.INTEGER,
        references: {
          model: 'funcionarios',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('projeto_funcionario');
  }
};
