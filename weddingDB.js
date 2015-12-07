var mysql      = require('mysql');
var config     = require('./config/db.config.json');
var connection = mysql.createConnection({
  host     : config.host,
  user     : config.user,
  password : config.password,
  database : config.database
});

module.exports = {
  getGuest: function(token, callback) {
    connection.connect(function(err) {
      console.log(err.code); // 'ECONNREFUSED'
      console.log(err.fatal); // true
    });
    connection.query('SELECT * FROM invitations WHERE token=?', [token], function(err, rows, fields) {
      if (err) throw err;
      if(rows.length === 0) throw {name: "NoToken", message: "Token doesn't exist"};
      callback(rows[0]);
      console.log('Token exists: ', rows[0].token);
    });
    connection.end(); 
  },
  updateInvitation: function(token, confirmation, callback) {
    connection.connect();
    connection.query('UPDATE invitations SET rsvp=?, adults=?, kids=? WHERE token=?', 
      [confirmation.rsvp, confirmation.adults, confirmation.kids, token], function(err, result) {
      if (err) throw err;
      callback()
      console.log('Rows Updated: ', result.changedRows);
    });
    connection.end();
  }
}