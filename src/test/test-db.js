module.exports = {
	ex(query) {
		if(query==="SELECT * FROM font WHERE id = $1"){	
			return {family: "Roboto", 
				source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif"};
		}
		if(query=="SELECT * FROM rating WHERE rating_id = $1"){
			return {rating: "55"};
		}
		if(query=="SELECT username, password FROM user WHERE user_id = $1"){
			return {username: "bryan21", password: "FHDShdjsh12232$$$"};
		}
		if(query="SELECT * FROM sample_text WHERE sample_id = $1"){
			return {text: "Lorem Ipsum"};
		}
	}
}
