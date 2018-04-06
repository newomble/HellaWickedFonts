const conn = require("./db.js");

const getOneQuery = "select * from sample_text where user_id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "";
function getUser(id){
	return conn.ex(getOneQuery,[id]);
}

module.exports = {
	get: getUser
}