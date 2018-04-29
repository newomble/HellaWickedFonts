/************************************************************
* @desc		Insert font data from API, updates font popularity if font already exists in DB
*
* @author	Bryan Pickering
* @date		4/17/2018
*************************************************************/
var config = require("../../config/config.js").development;

const request = require('request');
const font = require("./font.model.js");
const popularityUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key="+config.apiKey+"=popularity";
//Request API data from API URL
//TODO: add the source location - and save history
request(popularityUrl, { json: true }, (err, res, body) => {
	  if (err) {  console.log(err);return; }
	  		  //Gets all the fonts from the DB
	  		  var client = font.getAll();
	  		  client(function(er,ne){
				  if(er){
					  console.log(er);return;
				  }else{
				  	 //If there are no fonts currently in the DB, insert all of the fonts from the API
				  	 if(ne.rows.length == 0){
				  	 	for(var i = 0; i < body.items.length; i++){
					  	 	var client = font.insert(body.items[i].family, (i+1), body.items[i].category);
					  	 	client(function(er,ne){
								  if(er){
									  console.log(er);return;
								  }else{
								  	  console.log("Added fonts");
								  }
							});
						}
				  	 }else{
				  	 	//If there are fonts currently in the DB, check each font from the API to see if it exists in the DB
				  	 	for(var i = 0; i < body.items.length; i++){
				  	 		var fontFound = false;
					  	 	for(var k = 0; k < ne.rows.length; k++){
					  	 		//Compare an API font with a font from the DB
					  	 		if(body.items[i].family == ne.rows[k].family){
					  	 			var client = font.updatePopularity((i+1),ne.rows[k]);
					  	 			client(function(er,ne){
										  if(er){
											  console.log(er);return;
										  }else{
										  	  console.log("Updated font popularity");
										  }
									});
									//Indicate that a font was found and updated
									fontFound = true;
					  	 		}
						  	}
						  	//If no font was found, add the api font to the DB
						  	if(fontFound == false){
						  		var client = font.insert(body.items[i].family, (i+1), body.items[i].category);
						  	 	client(function(er,ne){
									  if(er){
										  console.log(er);return;
									  }else{
									  	  console.log("Successfully inserted new font");
									  }
								});
						  	}
					  	}
				  	 }
				  }
			  });
	   	
});