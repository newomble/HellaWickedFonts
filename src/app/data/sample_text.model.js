const conn = require("./db.js");

const getOneQuery = "select * from sample_text where sample_id = $1",
	getAllQuery = "select * from sample_text",
	updateQuery = "update sample_text set text = $1 where sample_id = $2",
	deleteQuery = "delete from sample_text where sample_id = $1";
function getSample(id){
	return conn.execute(getOneQuery,[id]);
}

module.exports = {
	get: getSample
}