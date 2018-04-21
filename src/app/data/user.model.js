const conn = require("./db.js");

const getOneQuery = "select * from sample_text where user_id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "",
	getCredsQuery = "Select username,passwrod from user where username = $1";
function getUser(id){
	return conn.execute(getOneQuery,[id]);
}

function getCredentials(uName){
	return conn.execute(getCredsQuery,[uName]);
}

module.exports = {
	get: getUser
}