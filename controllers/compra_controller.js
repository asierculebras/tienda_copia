
var models = require('../models');
var Sequelize = require('sequelize');




// GET /compra
exports.index = function(req, res, next) {
			res.render('compra/index.ejs', { productos: productos});
};


// GET /quizzes/:id
exports.show = function(req, res, next) {

	var answer = req.query.answer || '';

	res.render('productos/show', {producto: req.producto,
								answer: answer});
};
