<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>


<div id="formCenter">
	<form name="signUpForm" onsubmit="return validateSignUpForm();" method="post">
		<p id="errors"></p>
		<input type="text" placeholder="Full Name" name="fullname" class="max_input">
		<br>
		<input type="text" placeholder="Username" name="username" class="max_input">
		<br>
		<input type="password" placeholder="Password" name="password" class="max_input">
		<br>
		<input type="password" placeholder="Re-enter password" name="repassword" class="max_input">
		<br>
		<button class="max_input">Sign Up</button>
	</form>

	<div>
		<br><br>
		<span onclick="window.location.href ='./login.php';">Have an account?</span>
		<span class="signInLink"><a href="./login.php">Login</a></span>
	</div>
	
</div>

		
<script src="./resources/js/validate.js"></script>

<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>

