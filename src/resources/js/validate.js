/************************************************************
* @desc		Validates login and sign up form
*
* @author	niharika nakka (nn6889@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* Validates login form 
*/
function validateLoginForm(){
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;
	var errors = document.getElementById('errors');
	errors.innerHTML = "";
	
	if(username === "" || password === "" ){
		errors.innerHTML = "All fields must be filled out";
		errors.classList.add("error");
		window.scrollTop = 0; //make sure they see that there are errors
	} //end if: did they fill out all the fields?
	
	return false;
} //end function: validateLoginForm



/**
* Validates sign up form 
*/
function validateSignUpForm () {
	var fullName = document.forms["signUpForm"]["fullname"].value;
	var userName = document.forms["signUpForm"]["username"].value;
	var password = document.forms["signUpForm"]["password"].value;
	var repassword = document.forms["signUpForm"]["repassword"].value;
	var errors = document.getElementById('errors');
	errors.innerHTML = "";
	
	if(fullName == "" || userName == "" || password == "" || repassword == ""){
		errors.innerHTML = "All fields must be filled out";
		errors.classList.add("error");
		window.scrollTop = 0; //make sure they see that there are errors
	} //end if: did they fill out all the fields?

	if(password != repassword){
		errors.innerHTML += "Passwords do not match";
		errors.classList.add("error");
		window.scrollTop = 0;
	} //end if: does the first password match the second?
	
	return false;
} //end function: validateSignUpForm


/**********************************************************************
* @desc		Updated some comments and added an error field
* @date		4/8		erika tobias
**********************************************************************/
