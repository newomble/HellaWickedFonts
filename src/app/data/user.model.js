const conn = require("./db.js");

const getOneQuery = "select * from user where user_id = $1",
	getAllQuery = "select * from user",
	updateQuery = "",
	deleteQuery = "delete from user where user_id = $1",
	getCredsQuery = "Select username,passwrod from user where username = $1";
	insertUserQuery = "Insert into user (username, password) values($1, $2)";
function getUser(id){
	return conn.execute(getOneQuery,[id]);
}

function getCredentials(uName){
	return conn.execute(getCredsQuery,[uName]);
}

function addNewUser(uName,pWord){
	return conn.execute(insertUserQuery,[uName, pWord]);
}

module.exports = {
	get: getUser
}