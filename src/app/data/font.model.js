const conn = require("./db.js");

const getOneQuery = "select * from font where id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "";
function getFont(id){
	return conn.ex(getOneQuery,[id]);
}

function myTest(){
	return conn.execute("select * from font;");
}

module.exports = {
	get: getFont,
	test: myTest
}
