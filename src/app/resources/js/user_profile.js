/************************************************************
* @desc		Handles a Profile for a user you have clicked on
*			To use, initialize this class, and create a div:
*			<div id="search_container"></div>
*			
*			It will then build out the input field and
*			items needed to make the search results appear
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/12/2018
*************************************************************/


/**
* @constructor
*/
function UserProfile(user_id) {
	this.viewer_id = user_id; //person looking at it
	this.init();
};//end function: UserProfile

//store the profile's user id
UserProfile.prototype.USER_ID = document.getElementById('user_id').value;

/**
* Initialize the app
*/
UserProfile.prototype.init = function () {
	'use strict';
	
	console.log(parseInt(this.USER_ID));
	console.log(this.viewer_id);
	console.log(parseInt(this.viewer_id));
	
	if(((parseInt(this.USER_ID) === parseInt(this.viewer_id)))) {
		this.collection = new Collection(true, this.USER_ID);
		document.getElementById("username").innerHTML += " {You}";
		document.getElementById("username_collection").innerHTML = "Your Collection";
	} else {
		//we are viewing a collection for another user - go get it
		this.collection = new Collection(false, this.USER_ID);
	} //end else/if: is this user looking at themselves?
	
}; //end function: UserProfile --> init





