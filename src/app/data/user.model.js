const conn = require("./db.js");

const getOneQuery = "select * from public.user where user_id = $1;",
	getAllQuery = "select * from public.user",
	updateQuery = "",
	deleteQuery = "delete from public.user where user_id = $1",
	getCredsQuery = "Select * from public.user where username = $1";
	insertUserQuery = "Insert into public.user (username,first_name,last_name, password, salt) values($1,$2,$3,$4,$5)";
function getUser(id,res){
	return conn.execute(getOneQuery,[id]) ;		
}

function getCredentials(uName){
	return conn.execute(getCredsQuery,[uName]);
}

function addNewUser(uName,pWord,fname,lname,salt){
	return conn.execute(insertUserQuery,[uName,fname,lname,pWord,salt]);
}

module.exports = {
	get: getUser,
	addNewUser:addNewUser,
	getCredentials:getCredentials
}