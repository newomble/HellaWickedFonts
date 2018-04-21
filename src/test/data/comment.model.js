module.exports = {
	get: function getSampleText(query){
		return {text: "Yo dawg, whoof", rating: "87"};
	},
	getFromUserName: function getFromUserName(uName){
		return [{comment_text:"gosdofjbn",rating:"99"}];
	},
	getFromFontId: function getFromFontId(id){
		return [{comment_text:"gosdofjbn",rating:"99"}];
	},
	insertComment: function insertComment(uid,type,Text){
		return true;
	}
	
}