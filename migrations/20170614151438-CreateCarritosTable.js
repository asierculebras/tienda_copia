'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
      return queryInterface.createTable(
           'Productos', 
           { id:        { type: Sequelize.INTEGER,  allowNull: false,
                          primaryKey: true,         autoIncrement: true,  
                          unique: true },
            UserId: {type: Sequelize.INTEGER},
             cajero:  { type: Sequelize.STRING,
                          validate: { notEmpty: {msg: "falta un nombre"} } },
             total:    { type: Sequelize.INTEGER,
                          validate: { notEmpty: {msg: "Poner el precio"} } },
             createdAt: { type: Sequelize.DATE,     allowNull: false },
             updatedAt: { type: Sequelize.DATE,     allowNull: false }
           },
           { sync: {force: true}
           }
      );
  },
  down: function (queryInterface, Sequelize) {
        return queryInterface.dropTable('Productos');
  }
};