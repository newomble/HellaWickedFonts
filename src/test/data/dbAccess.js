//Used mocha and chai frameworks for unit testing
var expect = require("chai").expect;
// var db = require("./test-db.js");
var font = require("./test-font.model.js");
var rating = require("./test-rating.model.js");
var user = require("./test-user.model.js");
var sampleText = require("./test-sample_text.model.js");
var comment = require("./test-comment.model.js");
var user_font = require("./test-user_font.model.js");

describe("get()", function(){
	it("should get single font data from database", function(){
		var fontData = font.get("SELECT * FROM font WHERE id = $1");
		expect(fontData).to.deep.equal({ family: "Roboto", source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif" });
	});
	
	it("should get comment rating data from database", function(){
		var ratingData = rating.get("SELECT rating FROM rating WHERE rating_id = $1");
		expect(ratingData).to.deep.equal({ rating: "55"});
	});

	it("should get username and password", function(){
		var userData = user.get("SELECT username, password FROM user WHERE user_id = $1");
		expect(userData).to.deep.equal({username: "bryan21", password: "FHDShdjsh12232$$$"}); 
	});
	
	it("should get sample text for fonts", function(){
		var sample_text = sampleText.get("SELECT text FROM sample_text WHERE sample_id = $1");
		expect(sample_text).to.deep.equal({text: "Lorem Ipsum"});
	});

	it("should get user comment with rating", function(){
		var commentData = comment.get("SELECT text, rating FROM comment WHERE user_id = $1 AND font_id = $1");
		expect(commentData).to.deep.equal({text: "Yo dawg, whoof", rating: "87"});
	});

	it("should get the user font rating", function(){
		var user_fontData = user_font.get("SELECT rating FROM user_font WHERE user_user_id = $1 AND font_font_id = $2");
		expect(user_fontData).to.deep.equal({rating: "100"});
	});
	
}); 
