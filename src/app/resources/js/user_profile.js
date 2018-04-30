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
function UserProfile() {
	this.init();
};//end function: UserProfile


UserProfile.prototype.USER_ID = document.getElementById('user_id').value;

/**
* Initialize the app
*/
UserProfile.prototype.init = function () {
	'use strict';
	//go grab this user's details
	//this.ajaxCall("TODO", "GET", {uid: "TODO-User id"}, "loadUser");
	//this.user = this.loadUser();
	
	//build out the view for this user
	//this.buildUserDetails();
	
	//we are viewing a collection for another user - go get it
	this.collection = new Collection(false, this.USER_ID);
	console.log(this.USER_ID);
	
}; //end function: UserProfile --> init


/**
* Initialize the app

UserProfile.prototype.buildUserDetails = function () {
	'use strict';
	
	//set up the headers
	this.USERNAME_HEADER.innerHTML = this.user.username;
	this.COLLECTION_HEADER.innerHTML = this.user.username + "'s font collection";
	
	//set up this user's avatar
	var avatar = document.createElement("img");
	avatar.setAttribute("src", this.user.icon_url);
	avatar.className = "user_avatar";
	
	//append it
	this.DETAIL_CONTAINER.appendChild(avatar);
	
}; //end function: UserProfile --> init

*/




