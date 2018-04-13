<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>

		<div id="preferencesDiv">
				<h4><span class="edit_icon"></span> Edit Preferences</h4>
		
			<div id="edit">	
				<form name="preferencesForm" action="">
						<p id="errors"></p>
    				<div class="row">
      					<div class="col-25">
        					<label for="email">Email</label>
     					</div>
      					<div class="col-75">
        					<input class="text" type="text" id="email" name="email" placeholder="johndoe@gmail.com">
      					</div>
    				</div>
    		
    				<div class="row">
      					<div class="col-25">
        					<label for="fname">First Name</label>
     					</div>
      					<div class="col-75">
        					<input class="text" type="text" id="fname" name="firstname" placeholder="First Name">
      					</div>
    				</div>
   					<div class="row">
      					<div class="col-25">
       				 		<label for="lname">Last Name</label>
     					</div>
      					<div class="col-75">
        					<input class="text" type="text" id="lname" name="lastname" placeholder="Last Name">
      					</div>
    				</div>
   		  	
   		  			<hr>
    		
    				<div class="row">
      					<div class="col-25">
        					<label for="uname">Username</label>
     					</div>
      					<div class="col-75">
        					<input class="text" type="text" id="uname" name="username" placeholder="Username" readonly>
      					</div>
    				</div>
   		  	 		<div class="row">
      					<div class="col-25">
        					<label for="cpassword">Current password</label>
     					</div>
      					<div class="col-75">
        					<input class="text" type="password" id="cpassword" name="cpassword" placeholder="Current Password">
      					</div>
    				</div>
    		 		<div class="row">
      					<div class="col-25">
        					<label for="npassword">New password</label>
     					</div>
      					<div class="col-75">
        					<input class="pswrd" type="password" id="npassword" name="npassword" placeholder="New Password">
      					</div>
    				</div>
    		 		<div class="row">
      					<div class="col-25">
        					<label for="repassword">Re-enter new password</label>
     					</div>
      					<div class="col-75">
        					<input class="pswrd" type="password" id="repassword" name="repassword" placeholder="Re-enter New Password">
      					</div>
    				</div>
    	  		</form>
    	   	 		<br/>
    	
  				<div class="row">
      				<input class="edit_buttons" type="submit" onclick= "return validatePreferencesForm()" value="Save">
      				<input class="edit_buttons" type="submit" onclick="cancel()" value="Cancel">
 	   			</div>
			</div>
		</div>
		
<script src="resources/js/validate.js"></script>

<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>



