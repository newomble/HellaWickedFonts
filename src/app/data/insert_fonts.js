/************************************************************
* @desc		Insert font data from API
*
* @author	Bryan Pickering
* @date		4/17/2018
*************************************************************/

const request = require('request');
const font = require("./font.model.js");
const apiURL = "https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyBV6W1Ip2noHGQHBbtAZnObsaXq4w9hZKA&sort=popularity";

//Request API data from API URL
//TODO: add the source location - and save history
request(apiURL, { json: true }, (err, res, body) => {
	  if (err) {  console.log(err);return; }
	  for(var i = 0; i < body.items.length; i++){
	  		//Insert into database using font insert method
			  var client = font.insert(body.items[i].family, (i+1), body.items[i].category);
			  client(function(er,ne){
				  if(er){
					  console.log(er);return;
				  }else{
					  console.log("Added item");
				  }
			  })
	  } 	
});