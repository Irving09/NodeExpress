//TODO npm install express3-handlebars --save
var express  	= require('express');
var handlebars  = require('express3-handlebars').create({ defaultLayout : 'main'});
var fortune 	= require('./libs/fortune.js');
var app 	 	= express();
var fortunes 	= [
			        'Conquer your fears or they will conquer you.',
			        'Rivers need springs.',
			        'Do not fear what you know.',
			        'You will have a pleasant surprise.',
			        'Whenever possible, keep it simple.'
			   	];

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

/*
express.static middleware allows you
to designate one or more directories as 
containing static resources that are simply 
to be delivered to the client without 
any special handling
*/
app.use(express.static(__dirname + '/public'));

//Routes
app.get('/', function (req, res) {
    res.render('home');
});

app.get('/about', function (req, res) {
    res.render('about', { fortune : fortune.getFortune() });
});

app.use(function(req, res, next) {
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

app.listen(3000);