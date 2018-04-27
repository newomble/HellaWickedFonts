const conn = require("./db.js");

const getOneQuery = "select * from public.user where user_id = $1;",
	getAllQuery = "select * from user",
	updateQuery = "",
	deleteQuery = "delete from user where user_id = $1",
	getCredsQuery = "Select username,passwrod from user where username = $1";
	insertUserQuery = "Insert into public.user (username,first_name,last_name, password) values($1,$2,$3,$4)";
function getUser(id,res){
	return conn.execute(getOneQuery,[id]) ;		
}

function getCredentials(uName){
	return conn.execute(getCredsQuery,[uName]);
}

function addNewUser(uName,pWord,fname,lname){
	return conn.execute(insertUserQuery,[uName,fname,lname,pWord]);
}

module.exports = {
	get: getUser,
	addNewUser:addNewUser
}