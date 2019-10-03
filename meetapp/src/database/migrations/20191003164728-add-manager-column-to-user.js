module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'manager', {
      type: Sequelize.BOOLEAN,
      allowNul: false,
      defaultValue: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'manager');
  },
};
