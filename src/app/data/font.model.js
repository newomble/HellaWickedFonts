const conn = require("./db.js");

const ratingJoin = " join public.rating using(font_id) ",
	getBase = "Select font_id, family,source_json,popularity,kind, AVG(rating) as \"rating\" from public.font ",
	getOneQuery = getBase + ratingJoin + " where public.font.font_id = $1 GROUP BY public.font.font_id",
	getAllQuery = getBase + ratingJoin + "GROUP BY public.font.font_id" ,
	updateQuery = "",
	insertQuery = "insert into font (family, popularity, kind) values ($1, $2, $3)",
	insertWithSourceQuery = "insert into public.font (family, popularity, kind,source_json) values ($1, $2, $3, $4)",
	deleteQuery = "delete from public.font where font_id = $1",
	getByNameQuery = "select family from font where family = $1",
	getPopularQuery = "select * from public.font order by popularity asc",
	getHistoryQuery = "select rank,time from public.font_history where font_id = $1",
	updatePopQuery = "update public.font set popularity = $1 where font_id = $2;",
	recordPopQuery = "insert into public.font_history (font_id,rank) values ($1,$2)",
	
	suggQuery =  "("+getBase+ratingJoin + " where kind = 'sans-serif' group by font_id limit 1) UNION "+
		"("+getBase+ratingJoin + " where kind = 'handwriting'  group by font_id limit 1) UNION"+
		"("+getBase+ratingJoin + " where kind = 'serif' group by font_id limit 1)",
	searchQuery = getBase+ratingJoin+" where $1 like concat('%',$2,'%')",
	searchInCollQuery = getBase+ratingJoin+" join user_font ON user_font.font_font_id = font.font_id"+
		" where user_font.user_user_id = $1 AND "+
		" $2 like concat('%',$3,'%')"+
		" group by font.font_id";

function getFont(id){
	return conn.execute(getOneQuery,[id]);
}

function insertFonts(family, popularity, kind){
	return conn.execute(insertQuery, [family, popularity, kind]);
}

function insertWithSource(family, popularity,kind, sourceUrl){
	return conn.execute(insertWithSourceQuery, [family, popularity, kind,sourceUrl])	;
}

function getByName(name){
	return conn.execute(getByNameQuery,[name]);
}

function getAll(){
	return conn.execute(getAllQuery,null);
}

function getHistory(fid){
	return conn.execute(getHistoryQuery,[fid]);
}
function getMostPopular(){
	return conn.execute(getPopularQuery,null);
}
function updatePopularity(newVal,fid){
	return conn.execute(updatePopQuery,[newVal,fid]);
}
function recordPopValye(oldVal,fid){
	return conn.execute(recordPopQuery,[fid,oldVal]);
}
function getSuggestion(){
	return conn.execute(suggQuery,null);
}
function search(type,txt){
	return conn.execute(searchQuery,[type,txt]);
}
function searchInColl(uid,type,txt){
	return conn.execute(searchInCollQuery,[uid,type,txt]);
}
module.exports = {
	get: getFont,
	getByName:getByName,
	getAll:getAll,
	insert: insertFonts,
	insertWithSource:insertWithSource,
	getHistory:getHistory,
	updatePopularity:updatePopularity,
	getSuggestion:getSuggestion,
	searchInColl:searchInColl
}
