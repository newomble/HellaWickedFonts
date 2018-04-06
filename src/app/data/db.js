const pg = require('pg');
const connectionString ='postgresql://osboxes:student@localhost:5432/';

//returns result of query
function ex(sqlQuery,params,callback){
	pg.connect(connectionString, (err, client, done) => {
		const results = [];
		// Handle connection errors
		if(err) {
		  done();
		  console.log(err);
		  //db log
		  return false;
		}
		
		var postQuery = client.query(sqlQuery,params );
		
		postQuery.on('row', (row) => {
		  results.push(row);
		});
		// After all data is returned, close connection and return results
		postQuery.on('end', () => {
		  done();
		  return res.json(results);
		});
	});
}

module.exports = {
	execute: ex,
}
