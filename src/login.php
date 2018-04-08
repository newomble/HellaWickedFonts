
<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=EB+Garamond|Marck+Script|Roboto" rel="stylesheet">
		<link href="resources/css/main.css" rel="stylesheet">
		<script src="resources/js/validate.js"></script>
		
		<title>Login</title>
	</head>
	
	<body>

	<div id="formCenter">
   		 <h1>Hella<span class="heading_font">Wicked</span>Fonts&trade;</h1>

   		 <form name="loginForm" onsubmit="return validateLoginForm()" method="post">
        		<input type="text" placeholder="Username" name="username">
        		<br>
        		<input type="password" placeholder="Password" name="password">
        		<br>
        		<button class="signInButton">Sign In</button>
   		 </form>

    		<h4 class="account">Don't have an account?</h4>
   			<button class="signUpButton" onclick="window.location.href ='signup.php';">Sign Up</button>
	</div>


<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>








