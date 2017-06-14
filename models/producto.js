
// Definicion del modelo Producto:

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Producto',
                          { nombre: { type: DataTypes.STRING,
                          	            validate: { notEmpty: {msg: "Falta poner un nombre"}}
                          	          },
                            precio:   { type: DataTypes.INTEGER,
                                        validate: { notEmpty: {msg: "Hay que ponerle un precio"}}
                                      }
                          });
};