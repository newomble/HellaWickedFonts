const conn = require("./db.js");

const getOneQuery = "select * from font where id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "";
function getFont(id){
	return conn.ex(getOneQuery,[id]);
}

module.exports = {
	get: getFont
}
