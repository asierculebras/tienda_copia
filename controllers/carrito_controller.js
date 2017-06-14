
var models = require('../models');
var Sequelize = require('sequelize');
var async = require('async');
var url = require('url');



exports.create = function(req, res, next) {

  console.log("SAAAAAAAAAAA");

var redir = req.body.redir || '/'

  console.log("EL REDIR ES "+ redir);

var login     = req.body.login;

asincrono(req,res);

res.redirect(redir); // redirección a redir

};
var asincrono = function (req, res) {
async.waterfall([
        _function1(req, res),
        _function2()
    ], function (error, success) {
        if (error) { alert('Something is wrong!'); }
        return alert('Done!');
    });
};

function _function1 (req, res, next) {
    return function (callback) {

var login     = req.body.login;
var user = "";
var UserId = "";
var cajero = "";
console.log("EL LOGIN PARA BUSCAR EL USER ES "+ login);

models.User.findOne({where: {username: login}})
    .then(function(user) { 
          console.log("CONSIGO este user " + user); 
            UserId = user.id;
            cajero = user.username;
            console.log("CONSIGO UN USER CON ID: " + UserId); 
            user = user;
          console.log("CONSIGO ESTE USER: " + UserId); 

          console.log("EL MOMBRE DEL USUARIO ES QUE PASO AL CALLBACK ES: " + cajero);
          console.log("EL USUERID QUE PASO AL CALLBACK ES: " + UserId);

            callback (null, UserId, cajero, req, res);
        
      })
    .catch(function(error) {
      console.log("CAGADA");
             next(error);
    });



}
}

function _function2 (UserId,cajero, callback) {
    return function (callback) {


  var carrito = models.Carrito.build({cajero: cajero ,total:'0',UserId: UserId });
  

  carrito.save()
    .then(function(carrito) {
      //req.flash('success', 'Carrito creado con éxito.');
      console.log("SE HA CREADO UN NUEVO CARRITO " + carrito);
      console.log("CON ID: " + carrito.id);
      console.log("Y EL CAJERO ES : " + carrito.cajero +" Y TOTAL: " + carrito.total);



      //res.redirect(redir); // redirección a redir
      //next();
    }) 
    .catch(Sequelize.ValidationError, function(error) {

      //req.flash('error', 'Error al crear un Comentario: ' + error.message);
      next(error);
    });   
    //callback (null);
    }
  } 



exports.destroy = function (req, res, next) {
var session = req.session;
console.log("la sesion uqe hay es   " + session);

var username = req.session.user.username ;

console.log("QUE CAJERO DEL CARRITO QUE BUSCO ES  " + username);


models.Carrito.findOne({where: {cajero: username}})
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
