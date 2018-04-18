const conn = require("./db.js");

const getOneQuery = "select * from font where id = $1",
	getAllQuery = "",
	updateQuery = "",
	insertQuery = "insert into font (family, popularity, kind) values ($1, $2, $3)",
	deleteQuery = "";

function getFont(id){
	return conn.execute(getOneQuery,[id]);
}

function insertFonts(id1, id2, id3){
	return conn.execute(insertQuery, [id1, id2, id3])
}

module.exports = {
	get: getFont,
	insert: insertFonts
}
