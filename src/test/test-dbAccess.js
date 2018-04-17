//Used mocha and chai frameworks for unit testing
var expect = require("chai").expect;
var db = require("./test-db.js");

describe("ex()", function(){
	it("should get single font data from database", function(){
		var font = db.ex("SELECT * FROM font WHERE id = $1");
		expect(font).to.deep.equal({ family: "Roboto", source:"https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity", popularity: "23", kind: "sans-serif" });
	});
	
	it("should get comment rating data from database", function(){
		var rating = db.ex("SELECT * FROM rating WHERE rating_id = $1");
		expect(rating).to.deep.equal({ rating: "55"});
	});

	it("should get username and password", function(){
		var user = db.ex("SELECT username, password FROM user WHERE user_id = $1");
		expect(user).to.deep.equal({username: "bryan21", password: "FHDShdjsh12232$$$"}); 
	});
	
	it("should get sample text for fonts", function(){
		var sample_text = db.ex("SELECT * FROM sample_text WHERE sample_id = $1");
		expect(sample_text).to.deep.equal({text: "Lorem Ipsum"});
	});
	
}); 
