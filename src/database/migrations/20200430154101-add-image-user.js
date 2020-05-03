'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('funcionarios', 'avatar', {
      type: Sequelize.TEXT('long'),
    });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('funcionarios', 'avatar');
  }
};
