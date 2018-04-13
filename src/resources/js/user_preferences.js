


/**
* @constructor
*/
function UserPreferences() {
	this.init();
}; //end function: UserPreferences





UserPreferences.prototype.init = function () {
	'use strict';
	
	this.loadUser();
}; //end function: UserPreferences --> init




/**
* Make an ajax call to grab the user to load them for view.
* @return {object} json representation of the user
*/
UserPreferences.prototype.loadUser = function () {
	'use strict';
	return {
		'username' : "memrie",
		'use_id' : 1,
		'first_name' : "enbn",
		'last_name' : 'tnpw',
		'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=150&d=mm&r=g'
	};
}; //end function: UserPreferences --> loadUser




var up = new UserPreferences();

