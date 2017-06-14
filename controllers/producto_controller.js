
var models = require('../models');
var Sequelize = require('sequelize');

// Autoload el quiz asociado a :quizId
exports.load = function(req, res, next, productoId) {
	models.Producto.findById(productoId)
  		.then(function(producto) {
      		if (producto) {
        		req.producto = producto;
        		next();
      		} else { 
      			throw new Error('No existe productoId = ' + productoId);
      		}
        })
        .catch(function(error) { next(error); });
};


// GET /quizzes
exports.index = function(req, res, next) {
	models.Producto.findAll()
		.then(function(productos) {
			res.render('productos/index.ejs', { productos: productos});
		})
		.catch(function(error) {
			next(error);
		});
};


// GET /quizzes/:id
exports.show = function(req, res, next) {

	var answer = req.query.answer || '';

	res.render('productos/show', {producto: req.producto,
								answer: answer});
};










//eliminar

// GET /quizzes/:id/check
exports.comprar = function(req, res, next) {
console.log("ha entrdo al post y tiene esto: " + req.body.producto);



	res.render('productos/carrito', { quiz: req.quiz, 
								   result: result, 
								   answer: answer });
};

exports.indexCompra = function(req, res, next) {
  models.Producto.findAll()
    .then(function(productos) {
      res.render('productos/index.ejs', { productos: productos});
    })
    .catch(function(error) {
      next(error);
    });
};












// GET /quizzes/new
exports.new = function(req, res, next) {
  var producto = models.Producto.build({nombre: "", precio: ""});
  res.render('productos/new', {producto: producto});
  console.log("se ha creado un nuevo producto" + producto);
};



// POST /quizzes/create
exports.create = function(req, res, next) {

  console.log("ha entrdo al post y tiene esto: " + req.body.producto);

  var producto = models.Producto.build({ nombre: req.body.producto.nombre,
                                         precio: req.body.producto.precio} );

  // guarda en DB los campos pregunta y respuesta de quiz
  producto.save({fields: ["nombre", "precio"]})
  	.then(function(producto) {
    	res.redirect('/productos');  // res.redirect: Redirección HTTP a lista de preguntas
    })
    .catch(Sequelize.ValidationError, function(error) {

      req.flash('error', 'Errores en el formulario:');
      for (var i in error.errors) {
          req.flash('error', error.errors[i].value);
      };

      res.render('producto/new', {producto: producto});
    })
    .catch(function(error) {
		req.flash('error', 'Error al crear un Quiz: '+error.message);
		next(error);
	});  
};


// GET /quizzes/:id/edit
exports.edit = function(req, res, next) {
  var producto = req.producto;  // req.quiz: autoload de instancia de quiz
  var nombre = req.producto.nombre;

  res.render('productos/edit', {producto: producto, nombre: nombre});
};


// PUT /quizzes/:id
exports.update = function(req, res, next) {

  req.producto.nombre = req.body.producto.nombre;
  req.producto.precio   = req.body.producto.precio;

  req.producto.save({fields: ["nombre", "precio"]})
    .then(function(producto) {
	  //req.flash('success', 'Producto editado con éxito.');
      res.redirect('/productos'); // Redirección HTTP a lista de preguntas.
    })
    .catch(Sequelize.ValidationError, function(error) {

      req.flash('error', 'Errores en el formulario:');
      for (var i in error.errors) {
          req.flash('error', error.errors[i].value);
      };

      res.render('productos/edit', {producto: req.producto});
    })
    .catch(function(error) {
	  req.flash('error', 'Error al editar el Producto: '+error.message);
      next(error);
    });
};


// DELETE /quizzes/:id
exports.destroy = function(req, res, next) {
  req.producto.destroy()
    .then( function() {
	  //req.flash('success', 'Producto borrado con éxito.');
      res.redirect('/productos');
    })
    .catch(function(error){
	  req.flash('error', 'Error al editar el Producto: '+error.message);
      next(error);
    });
};


