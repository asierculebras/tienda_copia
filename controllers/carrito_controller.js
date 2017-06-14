
var models = require('../models');
var Sequelize = require('sequelize');
var async = require('async');
var url = require('url');



exports.create = function(req, res, next) {

  console.log("SAAAAAAAAAAA");

var redir = req.body.redir || '/'

  console.log("EL REDIR ES "+ redir);

var login = req.body.login;

asincrono(req,res);



res.redirect(redir); // redirección a redir

};
var asincrono = function (req, res) {
async.waterfall([
        _function1(req),
        _function2,
        _function3
    ], function (error, success) {
        if (error) { alert('Something is wrong!'); }
        return alert('Done!');
            next();
    });
};

function _function1 (req) {
return function (callback) {
  console.log("ENTRA EN FUNCTION 1");


var login     = req.body.login;
var user = "";
var UserId = "";
var cajero = "";
console.log("EL LOGIN PARA BUSCAR EL USER ES " + login);

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

        
      })
    .catch(function(error) {
      console.log("CAGADA");
             //next(error);
    });
            
callback (null, UserId, cajero);

}
}

function _function2 (UserId, cajero, callback) {
  return function (callback) {
    console.log("ENTRA EN FUNCTION 2");
    console.log("EL USERID DEL cajero QUE TIENE EL CALLBACK ES: " + UserId);
    console.log("EL MOMBRE DEL cajero QUE TIENE EL CALLBACK ES: " + cajero);


  var carrito = models.Carrito.build({cajero: cajero ,total:'0',UserId: UserId });
      callback (err, carrito);
      }
    }

function _function3 (carrito, callback) {
  return function (callback) {
    console.log("ENTRA EN FUNCTION 3");
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

        callback (err);
  } 
}



exports.destroy = function (req, res, next) {
var session = req.session;
console.log("la sesion uqe hay es   " + session);

var user = session;
console.log("EL USER ES   " + user);

var id = user.id;
console.log("EL ID ES   " + id);


var username = req.session.user.username ;

console.log("EL CAJERO DEL CARRITO QUE BUSCO ES  " + username);


var carrito = models.Carrito.findOne({where: {cajero: username}});
console.log("EL  CARRITO QUE BUSCO ES  " + carrito);
console.log("con id:  " );




models.Carrito.findOne({where: {cajero: username}})
    .then(function(carrito) {
        console.log("EL CARRITO ENCONTRADO ES: " + carrito.id);
      if (carrito) {
        console.log("EL CARRITO ENCONTRADO ES: " + carrito.id);
        carrito.destroy()
           .then(function () {
             req.flash('success', 'Pista eliminada con éxito.');
              //next();
              //res.redirect("/session"); // redirect a login
          })
          .catch(function (error) {
            console.log("error number 1");
              //next(error);
    });
      } else {
        throw new Error('No existe ese Carrito en la BBDD.');
      }
    })
    .catch(function(error) {
      console.log("error number 2");

      //next(error);
    }); 
};
