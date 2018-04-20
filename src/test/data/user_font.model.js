module.exports = {
	get: function getSampleText(query){
		return {rating: "100"};
	},
	add:function add(uid,fid){
		return true;
	},
	getFromUser:function getFromUser(uid){
		return {family: "Roboto", 
		source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"};
	}
}