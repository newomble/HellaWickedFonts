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
        

        if(username == "" || password == "" ){
            alert("All fields must be filled out");
        }
        return false;
}

/**
* Validates sign up form 
*/
function validateSignUpForm(){
		 var fullName = document.forms["signUpForm"]["fullname"].value;
		 var userName = document.forms["signUpForm"]["username"].value;
		 var password = document.forms["signUpForm"]["password"].value;
		 var repassword = document.forms["signUpForm"]["repassword"].value;
		  if(fullName == "" || userName == "" || password == "" || repassword == ""){
            alert("All fields must be filled out");
          }
          
          if(password != repassword){
          	alert("Passwords do not match");
          }
        return false;
        
}