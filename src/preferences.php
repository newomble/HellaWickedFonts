<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>

		<div class="content center" id="user_prefs">
			<h3><i class="fas fa-pencil-alt"></i> Update Your Preferences</h3>

			<form name="preferencesForm" action="">
				<p id="errors" class="error"></p>

				<label for="email">Email</label>
				<input class="text" type="text" id="email" name="email" placeholder="johndoe@gmail.com"><br>
				<label> </label><i class="info">HellaWickedFonts uses <a href='https://gravatar.com/' target='_blank'>Gravatar</a> for icons. Consider using your <a href='https://gravatar.com/' target='_blank'>gravatar</a> email address.</i><br><br>

				<label for="fname">First Name</label>
				<input class="text" type="text" id="fname" name="firstname" placeholder="First Name"><br>

				<label for="lname">Last Name</label>
				<input class="text" type="text" id="lname" name="lastname" placeholder="Last Name"><br>

				<hr>

				<label for="uname">Username</label>
				<input class="text" type="text" id="uname" name="username" placeholder="Username" readonly><br>

				<label for="cpassword">Current password</label>
				<input class="text" type="password" id="cpassword" name="cpassword" placeholder="Current Password"><br>

				<label for="npassword">New password</label>
				<input class="pswrd" type="password" id="npassword" name="npassword" placeholder="New Password"><br>

				<label for="repassword">Re-enter new password</label>
				<input class="pswrd" type="password" id="repassword" name="repassword" placeholder="Re-enter New Password"><br>
			</form>
			<br/>

			<div class="right">
				<input class="edit_buttons" type="submit" onclick= "return up.validateFields()" value="Save">
				<input class="edit_buttons" type="submit" onclick="cancel()" value="Cancel">
			
			</div>
			
			
		</div>

<br><br>
		
<script src="resources/js/user_preferences.js"></script>

<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>



