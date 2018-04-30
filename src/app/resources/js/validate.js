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

		console.log("Data: "+ JSON.stringify(data) );
		
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
	console.log("helo");
	if (!err) { //no back-end error
		if (data) {
			window.location = "/collection";
			return true;
		}
	}
	
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
	
	if(fullName == "" || userName == "" || password == "" || repassword == ""){
		errors.innerHTML = "All fields must be filled out";
		errors.classList.add("error");
		window.scrollTop = 0; //make sure they see that there are errors
		return false;
	} //end if: did they fill out all the fields?

	if(password != repassword){
		errors.innerHTML += "Passwords do not match";
		errors.classList.add("error");
		window.scrollTop = 0;
		return false;
	} //end if: does the first password match the second?
	var names = fullName.split(" ");
	if(!names[0] || !names[1]){
		errors.innerHTML += "First and last name required."
		errors.classList.add("error");
		window.scrollTop = 0;
		return false;
	}
	data.username = userName;
	data.password = password;
	data.repassword = repassword;
	data.first_name = names[0];
	data.last_name = names[1];
	data.email = email;
	hwf.ajaxCall("/api/signup", "POST",data, "");
} //end function: validateSignUpForm


/**********************************************************************
* @desc		Updated some comments and added an error field
* @date		4/8		erika tobias
**********************************************************************/


function cancel(){
	alert("No changes made. You will be proceeded back to the home page");
	//window.location.href = "index.php";
}
		
function validateEmail(mail) 
{
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return true;
  }
    return false;
}
		
		
function validatePreferencesForm () {
	
	var email = document.forms["preferencesForm"]["email"].value;
	var firstname = document.forms["preferencesForm"]["firstname"].value;
	var lastname = document.forms["preferencesForm"]["lastname"].value;
	var username = document.forms["preferencesForm"]["username"].value;
	var cpassword = document.forms["preferencesForm"]["cpassword"].value;
	var npassword = document.forms["preferencesForm"]["npassword"].value;
	var repassword = document.forms["preferencesForm"]["repassword"].value;
	
	var errors = document.getElementById('errors');
	errors.innerHTML = "";
		
	if(validateEmail(email) == false){
		 errors.innerHTML += "You have entered an invalid email address!";
		 errors.classList.add("error");
		 window.scrollTop = 0;
	}
	
	if(cpassword == "" && npassword != "" && repassword !="" ){
		errors.innerHTML += "Please enter current password in order to change passwords";
		errors.classList.add("error");
		window.scrollTop = 0;
	} //end if: does the first password match the second?



	if(npassword != repassword ){
		errors.innerHTML += "Passwords do not match";
		errors.classList.add("error");
		window.scrollTop = 0;
	} //end if: does new password match the re-entered password?
	
	return false;
} 