var config = require("../../config/config.js").development;
process.env.modelRoot = config.paths.data;
process.env.apikey = config.apiKey;
process.env.icon_url = config.icon_url;
process.env.DBuser = config.dbInfo.user;
process.env.DBpass= config.dbInfo.pass;
process.env.DBloc = config.dbInfo.loc;

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
