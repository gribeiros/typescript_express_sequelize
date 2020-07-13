'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.createTable('User',
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
          allowNull: false
        },
        name: {
          type: Sequelize.STRING(120),
          allowNull: false
        },
        cpf:{
          type:Sequelize.STRING(15),
          allowNull:false,
          unique:true
        },
        email: {
          type: Sequelize.STRING(80),
          allowNull: false
        },
        password: {
          type: Sequelize.STRING(25),
          allowNull: false
        },
        passwordHash: {
          type: Sequelize.STRING(125),
          allowNull:false
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false
        },
        updatedAt: {
          type: Sequelize.DATE,
          allowNull: false
        }

      });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User');
  }
};
