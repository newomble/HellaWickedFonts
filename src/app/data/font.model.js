const conn = require("./db.js");
var USER_ID = null;
const ratingJoin = " left join public.rating using(font_id) ",
	getBase = "Select font_id, family,source_json,popularity, trending_rank,kind, AVG(rating) as \"rating\", coalesce((select user_font.user_font_id  from user_font where font_font_id = font.font_id and user_user_id = $1 limit 1),0) as \"favorite\" from public.font ",
	getOneQuery = getBase + ratingJoin + " where public.font.font_id = $2 GROUP BY public.font.font_id",
	getAllQuery = getBase + ratingJoin + "GROUP BY public.font.font_id" ,
	updateQuery = "",
	insertQuery = "insert into font (family, popularity, kind) values ($1, $2, $3)",
	insertWithSourceQuery = "insert into public.font (family, popularity, kind,source_json) values ($1, $2, $3, $4)",
	deleteQuery = "delete from public.font where font_id = $1",
	getByNameQuery = "select family from font where family = $1",
	getPopularQuery = "select * from public.font order by popularity asc limit 5",
	getHistoryQuery = "select trending_rank,rank,time from font_history where font_id = $1 order by time desc",
	updatePopQuery = "update public.font set popularity = $1 where font_id = $2;",
	updateTrendQuery = "UPDATE font set trending_rank = $1 where font_id = $2;",
	recordPopQuery = "insert into public.font_history (font_id,rank) values ($1,$2)",
	saveTrendingQuery = "update font_history set trending_rank = $1 where font_id = $2 AND time = CURRENT_DATE ",
	savePopularityQuery = "insert into font_history (font_id,rank) VALUES ($1,$2)",

	getTrendingQuery = getBase+ratingJoin+" group by font_id order by trending_rank asc limit 5",
	suggQuery =  "("+getBase+ratingJoin + " where kind = 'sans-serif' group by font_id limit 1) UNION "+
		"("+getBase+ratingJoin + " where kind = 'handwriting'  group by font_id limit 1) UNION"+
		"("+getBase+ratingJoin + " where kind = 'serif' group by font_id limit 1)",
	searchQueryFamily = getBase+ratingJoin+" where family like concat('%',$2::varchar,'%')  group by font_id limit $3 OFFSET $4",
	searchQueryKind = getBase+ratingJoin+" where kind like concat('%',$2::varchar,'%')  group by font_id limit $3 OFFSET $4",
	searchInCollQueryFamily = getBase+ratingJoin+" join user_font ON user_font.font_font_id = font.font_id"+
		" where user_font.user_user_id = $2 AND "+
		" family like concat('%',$3::varchar,'%')"+
		" group by font.font_id limit $4 OFFSET $5",
	searchInCollQueryKind = getBase+ratingJoin+" join user_font ON user_font.font_font_id = font.font_id"+
		" where user_font.user_user_id = $2 AND "+
		" kind like concat('%',$3::varchar,'%') "+
		" group by font.font_id limit $4 OFFSET $5";

var SearchBase = "   "
function getFont(id,uid){
	return conn.execute(getOneQuery,[uid,id]);
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

function getAll(uid){
	return conn.execute(getAllQuery,[uid]);
}

function getHistory(fid){
	return conn.execute(getHistoryQuery,[fid]);
}
function getMostPopular(uid){
	return conn.execute(getPopularQuery,null);
}
function updatePopularity(newVal,fontJson){
	var client = conn.execute(savePopularityQuery,[fontJson.font_id,fontJson.popularity]);
	client(function(err,res){//add history
		if(err){console.log(err);}else{console.log("Added History")}
	})
	return conn.execute(updatePopQuery,[newVal,fontJson.font_id]);
}
function updateTrending(newVal,fontJson){
	var client = conn.execute(saveTrendingQuery, [fontJson.trending_rank,fontJson.font_id]);
	client(function(err,res){//update history
		if(err){ console.log(err);}else{
			console.log("Added history");
		}
	});
	return conn.execute(updateTrendQuery,[newVal,fontJson.font_id]);
}
function getTrending(uid){
	return conn.execute(getTrendingQuery,[uid]);
}
function recordPopValye(oldVal,fid){
	return conn.execute(recordPopQuery,[fid,oldVal]);
}
function getSuggestion(){
	return conn.execute(suggQuery,null);
}
function search(type,txt,end,start,uid){
	var qq = searchQueryFamily;
	if(type == "kind"){
		qq=searchQueryKind;
	}
	return conn.execute(qq,[uid,txt,start,end]);
}
function searchInColl(uid,type,txt,end,start,currUid){
	var qq = searchInCollQueryFamily;
	if(type == "kind"){
		qq=searchInCollQueryKind;
	}
	return conn.execute(qq,[currUid,uid,txt,start,end]);
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
	search:search,
	searchInColl:searchInColl,
	getMostPopular:getMostPopular,
	updateTrending:updateTrending,
	getTrending:getTrending
}
