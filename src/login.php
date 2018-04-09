<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>

<div id="formCenter">
	 <form name="loginForm" onsubmit="return validateLoginForm()" method="post">
		 	<p id="errors"></p>
			<input type="text" placeholder="Username" name="username" class="max_input">
			<br>
			<input type="password" placeholder="Password" name="password" class="max_input">
			<br>
			<button class="max_input">login</button>
	 </form>

	<div>
		<br><br>
		<span onclick="window.location.href ='signup.php';">Don't have an account?</span>
		<button class="signUpButton" onclick="window.location.href ='signup.php';">Sign Up</button>
	</div>
</div>

<script src="resources/js/validate.js"></script>

<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>








