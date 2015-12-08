var app = require('express')();
var bodyParser = require('body-parser');
var wdb = require('./weddingDB');

var bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
	res.send("I'm alive! Staus OK!");
});


app.put('/rsvp', function(req, res, next) {
	try {
		wdb.checkToken(req.query.token, function(guest){
			wdb.updateInvitation(req.query.token, req.body, function(guest) {
				res.status(200).json({
					guest: guest,
					message: "success!"
				});
			});
		});	
	} catch(e) {
		res.status(500).json({error: e});
	}
	
});

app.listen(4000);