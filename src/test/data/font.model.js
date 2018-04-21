
module.exports = {
	get: function getFont(query){
		return {family: "Roboto", font_id:1,
			source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"};
	},
	getByName: function getByName(name){
		return {family: "Roboto", font_id:1,
		source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"};
	},
	getAll: function getAll(name){
		return [{family: "Roboto", 
		source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"}];
	},
	getHistory: function getHistory(fid){
		return [1,2,3];
	},
	getPopular: function getPopular(name){
		return [{family: "Roboto", font_id:1,
		source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"}];
	}
}