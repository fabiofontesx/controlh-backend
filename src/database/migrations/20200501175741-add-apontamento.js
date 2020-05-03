'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('apontamentos', {
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

      data: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },

      inicio: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      fim: {
        type: Sequelize.DATE,
        allowNull: false,

      },

      observacao: {
        type: Sequelize.TEXT
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('apontamentos');
  }
};
