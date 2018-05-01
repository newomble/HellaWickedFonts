const conn = require("./db.js");

const getOneQuery = "select * from public.user where user_id = $1;",
	getAllQuery = "select * from public.user",
	updateQuery = "",
	deleteQuery = "delete from public.user where user_id = $1",
	getCredsQuery = "Select * from public.user where username = $1",
	insertUserQuery = "Insert into public.user (username,first_name,last_name, password, salt,email) values($1,$2,$3,$4,$5,$6)",
	searchQuery = "Select username,first_name,last_name,email,user_id from public.user where username like concat('%',$1::varchar,'%') OR email like concat('%',$2::varchar,'%')",
	updatePass = "update public.user set password = $1 where username = $2",
	updateUNameQ = "update public.user set username = $1 where user_id = $2",
	updateNameQ = "update public.user set first_name = $1, last_name = $2 where user_id = $3",
	updateEmailQ = "update public.user set email = $1::varchar where user_id = $2";


function getUser(id,res){
	return conn.execute(getOneQuery,[id]) ;		
}

function getCredentials(uName){
	return conn.execute(getCredsQuery,[uName]);
}

function addNewUser(uName,pWord,fname,lname,salt,email){
	return conn.execute(insertUserQuery,[uName,fname,lname,pWord,salt,email]);
}

function resetPass(newPword, uName){
	return conn.execute(updatePass, [newPword, uName]);
}

function search(txt){
	return conn.execute(searchQuery,[txt,txt]);
}
function updateUsername(newUsername,uid){
	return conn.execute(updateUNameQ,[newUsername,uid]);
}
function updateName(first_name,last_name,uid){
	return conn.execute(updateNameQ,[first_name,last_name,uid]);
}
function updateEmail(email,uid){
	return conn.execute(updateEmailQ,[email,uid]);
}

module.exports = {
	get: getUser,
	addNewUser:addNewUser,
	getCredentials:getCredentials,
	resetPass: resetPass,
	search:search,
	updateName:updateName,
	updateUsername:updateUsername,
	updateEmail:updateEmail
}