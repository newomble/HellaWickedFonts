const pg = require('pg');
var connectionString ='postgresql://'+process.env.DBuser+':'+process.env.DBpass+'@'+process.env.DBloc;
var _ = require('underscore');
var connectWithConnectionString =  _.bind(_.partial(pg.connect, connectionString), pg);

//returns result of query
function ex(sqlQuery,params){
	return function(onQueryReturn) {
    connectWithConnectionString(function(err, client, done) {
      if (err) {
        return onQueryReturn(new Error(['Database connection failed-', err.toString()].join(' ')));
      } else {
        client.query(sqlQuery,params, function(err, results) {
          done(err);
          onQueryReturn(err, results);
        });
      }
    });
  }
}

module.exports = {
	execute: ex,
}
