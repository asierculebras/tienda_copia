'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {

      return queryInterface.bulkInsert('Productos', [ 
         { nombre: 'Champú anti caida', precio: '15',
           createdAt: new Date(), updatedAt: new Date() },
         { nombre: 'Galletas sin gluten', precio: '7',
           createdAt: new Date(), updatedAt: new Date() },
         { nombre: 'Barra de pan', precio: '1',
           createdAt: new Date(), updatedAt: new Date() },
        ]);
  },

  down: function (queryInterface, Sequelize) {
      return queryInterface.bulkDelete('Productos', null, {});
  }
};
