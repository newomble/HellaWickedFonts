var mysql = require('mysql');
var myhost = "localhost",
myuser="root",
mypassword="",
mydatabase="hellawickedfonts";
//returns result of query
module.exports = function(sqlQuery,callback){
	var conn = mysql.createConnection({
		host: myhost,
		user: myuser,
		password: mypassword,
		database: mydatabase
	});
	res = new Array();
    query = conn.query(sqlQuery);
	query.on('error',function (err) {
		console.log('A database error occurred:');
		console.log(err);
		res = false;
	});
	
	query.on('result',function (result) {
		res.push(result);
	});

  query.on('end',function (result) {
    conn.end();
    callback(res);
  });
	
}