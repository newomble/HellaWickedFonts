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
	} else {
		loginUser();
	}
	
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




/**
* handles the response from attempting to login
* @param data {JSON} the response from the back-end
* @param err {string|boolean} false if no error, string if there is
*/
function handleLogin (data, err) {
    'use strict';
    removeErrors();
    if  (!err)  {
        //there is no error, data holds your JSON response
       window.location = '/collection';
    } else {
    	var errors = document.getElementById('errors');
    	errors.innerHTML = "Invalid username or password. Please try again."; //there was an error, data will hold the error message
    }//end if: did we have an error?
};//end function: Home --> handlePopularFonts

function removeErrors () {
	'use strict';
	 var errors = document.getElementById('errors');
	errors.innerHTML = "";
	
}

function loginUser () {
	'use strict';
	var hwf = new HellaWickedFonts();
	//make an ajax call to login user
	hwf.ajaxCall("/api/login", "POST", getLoginParams(), "handleLogin", "window");
	
/*	//expected JSON
	var user = [
		{
			username: "";
			password: "";
		}
	]; 
	handleLogin(user, false); */
} //end function: loginUser


function getLoginParams() () {
	'use strict';
	
	var username = document.forms["loginForm"]["username"].value;
	var password = document.forms["loginForm"]["password"].value;
	
	var u = document.getElementById("username").value;
	var p = document.getElementById("password").value;
	
	//expected JSON
	var user = 
		{
			username: u,
			password: p
		}; 
	
	return user;
}




