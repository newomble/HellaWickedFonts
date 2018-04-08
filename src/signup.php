<!DOCTYPE html>
<html>
	<head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=EB+Garamond|Marck+Script|Roboto" rel="stylesheet">
		<link href="resources/css/main.css" rel="stylesheet">
		<script src="resources/js/validate.js"></script>
		
		<title>Sign Up</title>
	</head>

	<body>

		<h1>Hella<span class="heading_font">Wicked</span>Fonts&trade;</h1>
		<div id="formCenter">
			<form name="signUpForm" onsubmit="return validateSignUpForm()" method="post">
 					<input type="text" placeholder="Full Name" name="fullname">
  					<br>
  					<input type="text" placeholder="Username" name="username">
  					<br>
  					<input type="password" placeholder="Password" name="password">
  					<br>
  					<input type="password" placeholder="Re-enter password" name="repassword">
  					<br>
  					<button class="signUpButton_signUp">Sign Up</button>
			</form>

			<h4 class="haveAccount">Have an account?</h4>
			<p class="signInLink"><a href="login.php">SIGN IN</a></p>
	</div>

<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>

