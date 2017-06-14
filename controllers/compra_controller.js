
var models = require('../models');
var Sequelize = require('sequelize');




// GET /compra
exports.index = function(req, res, next) {
			var precio = req.query.precio || 'mierda'
			res.render('compra/index.ejs', {precio: precio});
};




// GET /quizzes/:id
exports.show = function(req, res, next) {

	var login     = req.body.login;
    var password  = req.body.password;

	res.render('productos/show', {producto: req.producto,
								answer: answer});
};
