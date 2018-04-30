/************************************************************
* @desc		Validates login and sign up form
*
* @author	niharika nakka (nn6889@rit.edu)
* @date		4/8/2018
*************************************************************/
var hwf = new HellaWickedFonts();

/**
* Validates login form 
*/
function validateLoginForm(){
	data = {};

	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;
	var errors = document.getElementById('errors');
	errors.innerHTML = "";
	
	if(username === "" || password === "" ){
		errors.innerHTML = "All fields must be filled out";
		errors.classList.add("error");
		window.scrollTop = 0; //make sure they see that there are errors
	} else {
		data.username = username;
		data.password = password;
		
		//@this --> the window object
		hwf.ajaxCall("/api/login", "POST", data, "handleLogin", this);
	} //end if: did they fill out all the fields?
	
	
	return false;
} //end function: validateLoginForm

/**
* Handles a login attempt
* @param data {boolean/JSON} false if there is an error, the JSON response if successful
* @param err {boolean/string} false if no error, string if there is
*/
function handleLogin (data, err) {
	if (!err) { //no back-end error
		if (data) {
			window.location = "/collection";
			return true;
		} //end if: did we get back "true"?
	} //end if: no error?
	
	errors.innerHTML = "Invalid Login. Please check your credentials.";
	errors.classList.add("error");
} //end function: handleLogin







/**
* Validates sign up form 
*/
function validateSignUpForm () {
	var data = {};
	var fullName = document.forms["signUpForm"]["fullname"].value;
	var userName = document.forms["signUpForm"]["username"].value;
	var password = document.forms["signUpForm"]["password"].value;
	var repassword = document.forms["signUpForm"]["repassword"].value;
	var email = document.forms["signUpForm"]["email"].value;
	var errors = document.getElementById('errors');
	errors.innerHTML = "";
	
	 if(fullName == "" || userName == "" || password == "" || repassword == "" || email == ""){
	 	errors.innerHTML = "All fields must be filled out.<br>";
	 } //end if: did they fill out all the fields?

	 if(password != repassword){
	 	errors.innerHTML += "Passwords do not match.<br>";
	 } //end if: does the first password match the second?
	
	var names = fullName.split(" ");
	if(!names[0] || !names[1]){
		errors.innerHTML += "First and last name required."
		
	} //end if: full name given?
	
	if (errors.innerHTML !== "") {
		errors.classList.add("error");
		window.scrollTop = 0; //make sure they see that there are errors
		return false
	}//end if: were there any errors?
	
	//we made it this far - must be good, try to signup
	data.username = userName;
	data.password = password;
	data.repassword = repassword;
	data.first_name = names[0];
	data.last_name = names[1];
	data.email = email;
	
	//@this --> the window object
	hwf.ajaxCall("/api/signup", "POST", data, "handleSignup", this);
	
	return false;
} //end function: validateSignUpForm


/**
* Handles a signup attempt
* @param data {boolean/JSON} false if there is an error, the JSON response if successful
* @param err {boolean/string} false if no error, string if there is
*/
function handleSignup(data,err){
	if(!err){
		if(data){
			window.location = "/collection";
			return true;
		} //end if: did we get back "true"?
	} //end if: do we have an error?
	
	var display_error = (err) ? err : "An unknown error has occured";
	
	errors.innerHTML = display_error;
	errors.classList.add("error");
} //end function: handleSignup




function validateResetPasswordForm(){

	
	var username = document.forms["resetPasswordForm"]["username"].value;
	var npassword = document.forms["resetPasswordForm"]["newpassword"].value;
	var repassword = document.forms["resetPasswordForm"]["repassword"].value;
	
	var errors = document.getElementById('errors');
	errors.innerHTML = "";
	
	if(username == "" || npassword == "" || repassword == ""){
		errors.innerHTML += "All fields must be filled out";
		errors.classList.add("error");
		window.scrollTop = 0;
	}
	
	//does username exist in database?
	
	
	if(npassword != repassword ){
		errors.innerHTML += "Passwords do not match";
		errors.classList.add("error");
		window.scrollTop = 0;
	} //end if: does new password match the re-entered password?
	
	return false;
	

}

/**********************************************************************
* @desc		Login/Signup API hook & code cleanup
* @date		4/29	Nick Womble & Erika Tobias
***********************************************************************
* @desc		Updated some comments and added an error field
* @date		4/8		erika tobias
**********************************************************************/
