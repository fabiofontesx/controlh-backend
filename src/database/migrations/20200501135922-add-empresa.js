'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('empresas', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      cnpj: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nome_fantasia: {
        type: Sequelize.STRING,
        allowNull: false
      },
    })
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('empresas');
  }
};
