
var models = require('../models');
var Sequelize = require('sequelize');
var url = require('url');



exports.create = function(req, res, next) {
  console.log("SAAAAAAAAAAA");

var redir = req.body.redir || '/'

  console.log("EL REDIR ES "+ redir);

var UserId = "";
var cajero = "";
var login     = req.body.login;

console.log("EL LOGIN PARA BUSCAR EL USER ES "+ login);




models.User.findOne({where: {username: login}})
    .then(function(user) { 
          console.log("CONSIGO este user " + user); 
            UserId = user.id;
            cajero = user.username;
            console.log("CONSIGO UN USER CON ID: " + UserId); 
        
      })
    .catch(function(error) {
      console.log("CAGADA");
             next(error);
    });

console.log("EL MOMBRE DEL USUARIO ES: " + cajero);
console.log("EL USUERID ES: " + UserId);



  var carrito = models.Carrito.build({cajero: cajero ,total:'0',UserId: UserId });
console.log("SE HA construido UN NUEVO CARRITO " + carrito.id);
  

  carrito.save()
    .then(function(carrito) {
      req.flash('success', 'Carrito creado con éxito.');
      console.log("SE HA CREADO UN NUEVO CARRITO " + carrito.id);

      res.redirect(redir); // redirección a redir
      //next();
    }) 
    .catch(Sequelize.ValidationError, function(error) {

      req.flash('error', 'Error al crear un Comentario: ' + error.message);
      next(error);
    });    
};



exports.destroy = function (req, res, next) {

var username = req.session.user && req.session.user.username || "";

models.User.findOne({where: {cajero: username}})
    .then(function(carrito) {
      if (carrito) {
        carrito.destroy()
           .then(function () {
             req.flash('success', 'Pista eliminada con éxito.');
              //next();
              res.redirect("/session"); // redirect a login
          })
          .catch(function (error) {
              next(error);
    });
      } else {
        throw new Error('No existe ese quiz en la BBDD.');
      }
    })
    .catch(function(error) {
      next(error);
    }); 
};
