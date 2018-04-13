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


UserProfile.prototype.USERNAME_HEADER = document.getElementById('username');
UserProfile.prototype.COLLECTION_HEADER = document.getElementById('username_collection');
UserProfile.prototype.DETAIL_CONTAINER = document.getElementById('user_details_container');

/**
* Initialize the app
*/
UserProfile.prototype.init = function () {
	'use strict';
	//go grab this user's details
	this.user = this.loadUser();
	
	//build out the view for this user
	this.buildUserDetails();
	
	//we are viewing a collection for another user - go get it
	this.collection = new Collection(false);
}; //end function: UserProfile --> init


/**
* Initialize the app
*/
UserProfile.prototype.buildUserDetails = function () {
	'use strict';
	
	//set up the headers
	this.USERNAME_HEADER.innerHTML = this.user.username;
	this.COLLECTION_HEADER.innerHTML = this.user.username + "'s collection";
	
	//set up this user's avatar
	var avatar = document.createElement("img");
	avatar.setAttribute("src", this.user.icon_url);
	avatar.className = "user_avatar";
	
	//append it
	this.DETAIL_CONTAINER.appendChild(avatar);
	
}; //end function: UserProfile --> init


/**
* Make an ajax call to grab the user to load them for view.
* @return {object} json representation of the user
*/
UserProfile.prototype.loadUser = function () {
	'use strict';
	return {
		'username' : "memrie",
		'use_id' : 1,
		'first_name' : "enbn",
		'last_name' : 'tnpw',
		'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=150&d=mm&r=g'
	};
}; //end function: UserProfile --> loadUser




