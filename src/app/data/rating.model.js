const conn = require("./db.js");

const getOneQuery = "select * from rating where rating_id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "";
function getRating(id){
	return conn.execute(getOneQuery,[id]);
}

module.exports = {
	get: getRating
}