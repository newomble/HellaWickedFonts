const conn = require("./db.js");

const getOneQuery = "select * from sample_text where sample_id = $1",
	getAllQuery = "",
	updateQuery = "",
	deleteQuery = "";
function getSample(id){
	return conn.execute(getOneQuery,[id]);
}

module.exports = {
	get: getSample
}