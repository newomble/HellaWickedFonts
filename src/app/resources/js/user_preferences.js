/************************************************************
* @desc		Handles a the user preferences page
*
* @author	Niharika Nakka (nn6889@rit.edu)
*			erika tobias (et5392@rit.edu)
*			
* @date		4/12/2018
*************************************************************/


/**
* @constructor
*/
function UserPreferences() {
	this.init();
}; //end function: UserPreferences

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
UserPreferences.prototype = Object.create(HellaWickedFonts.prototype);
UserPreferences.prototype.constructor = UserPreferences;


//generic items we need to grab
UserPreferences.prototype.ERRORS = document.getElementById('errors');
UserPreferences.prototype.USERNAME = document.getElementById('uname');
UserPreferences.prototype.FIRST_NAME = document.getElementById('fname');
UserPreferences.prototype.LAST_NAME = document.getElementById('lname');
UserPreferences.prototype.EMAIL = document.getElementById('email');
UserPreferences.prototype.CURRENT_PWD = document.getElementById('cpassword');
UserPreferences.prototype.NEW_PWD = document.getElementById('npassword');
UserPreferences.prototype.NEW_AGAIN_PWD = document.getElementById('repassword');

//this user's id (the one logged in)
UserPreferences.prototype.USER_ID = document.getElementById('user_id').value;


/**
* Initializes this object
*/
UserPreferences.prototype.init = function () {
	'use strict';
	
	//go and get this user (add ajax call once back-end is completed)
	//this.getUser();
}; //end function: UserPreferences --> init


/**
* Function called on button click
*/
UserPreferences.prototype.validateFields = function () {
	'use strict';
	var no_errors = true;
	this.clearErrors();
	
	if (this.FIRST_NAME.value === "") {
		this.ERRORS.innerHTML = "You must enter a first name.<br>";
		this.FIRST_NAME.classList.add("error");
		no_errors = false;
	} //end if: do we have a first name?
	
	if (this.LAST_NAME.value === "") {
		this.ERRORS.innerHTML += "You must enter a last name.<br>";
		this.LAST_NAME.classList.add("error");
		no_errors = false;
	} //end if: do we have a first name?
	
	
	if (this.EMAIL.value === "") {
		this.ERRORS.innerHTML += "You must enter a valid email.<br>";
		this.EMAIL.classList.add("error");
		no_errors = false;
	} //end if: do we have a first name?
	
	
	if (this.CURRENT_PWD.value === "") {
		this.ERRORS.innerHTML += "You must enter your current password.<br>";
		this.CURRENT_PWD.classList.add("error");
		no_errors = false;
	} //end if: do we have a first name?
	
	var a_pwd = this.NEW_AGAIN_PWD.value,
		n_pwd = this.NEW_PWD.value;
	
	if(a_pwd !== "" || n_pwd !== "") {
		if (a_pwd !== n_pwd) {
			this.ERRORS.innerHTML += "Your your passwords do not match.";
			this.NEW_AGAIN_PWD.classList.add('error');
			this.NEW_PWD.classList.add('error');
			no_errors = false;
		} //end if: are they the same?
	} //end else/if
	
	if (!no_errors) {
		window.scrollTo(0,0);
	} else {
		this.updateUser();
	} //end if: did we have any errors?
	
	return no_errors;
}; //end function: UserPreferences --> init

/**
* Resets any existing errors in the form
*/
UserPreferences.prototype.clearErrors = function () {
	'use strict';
	this.ERRORS.innerHTML = "";
	
	this.FIRST_NAME.classList.remove("error");
	this.LAST_NAME.classList.remove("error");
	this.CURRENT_PWD.classList.remove("error");
	this.NEW_AGAIN_PWD.classList.remove('error');
	this.NEW_PWD.classList.remove('error');
}; //end function: UserPreferences --> validateFields



/**
* Make an ajax call to grab the user to load them for view.

UserPreferences.prototype.getUser = function () {
	'use strict';
	this.user = {
		'username' : "memrie",
		'use_id' : 1,
		'first_name' : "enbn",
		'last_name' : 'tnpw',
		'email' : 'et5392@rit.edu',
		'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=150&d=mm&r=g'
	};
	
	this.loadUser();
}; //end function: UserPreferences --> getUser
*/

UserPreferences.prototype.updateUser = function () {
	'use strict';
	//make an ajax call to update this user
	this.ajaxCall("TODO - API URL", "POST", this.getParams(), "handleUpdateUser");
}; //end function: UserPreferences --> updateUser


UserPreferences.prototype.handleUpdateUser = function (data, err) {
	'use strict';
	this.clearErrors(); //clear any errors
	if (!err) {
		this.user = data;
		this.loadUser(); //load up the new data
	} else {
		this.ERRORS.innerHTML = err;
	} //end else/if: did we get an error?
	
	window.scrollTo(0,0);
}; //end function: UserPreferences --> handleUpdateUser


/**
* Load up this user's current preferences into their respective fields
* Also clear out any password fields
*/
UserPreferences.prototype.loadUser =  function () {
	'use strict';
	
	this.USERNAME.value = this.user.username;
	this.FIRST_NAME.value = this.user.first_name;
	this.LAST_NAME.value = this.user.last_name;
	this.EMAIL.value = this.user.email;
	
	this.CURRENT_PWD.value = "";
	this.NEW_PWD.value = "";
	this.NEW_AGAIN_PWD.value = "";
}; //end function: UserPreferences --> loadUser


/**
* obtain the user details as a json object
* @return {object} the JSON representation of the user object
*/
UserPreferences.prototype.getParams = function () {
	'use strict';
	return {
		'user_id' : this.USER_ID, //obviously update later.
		'first_name' : this.LAST_NAME.value || "",
		'last_name' : this.FIRST_NAME.value || "",
		'email' : this.EMAIL.value || "",
		'new_pwd' : this.NEW_PWD.value || "",
		'new_again_pwd' : this.NEW_AGAIN_PWD.value || "",
		'cur_pwd' : this.CURRENT_PWD.value || "",
	};
}; //end function: UserPreferences --> getParams


//initalize this object
var up = new UserPreferences();

