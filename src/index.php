<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>
		
		
<div class="content center">
	<h3>Today's Most Popular</h3>
	<ul class='no_list larger_font'>
		<li>roboto</li>
		<li class="serif_font">EB Garamond</li>
		<li class="script_font">Marck Script</li>
	</ul>
</div>



<div class="content center">
	<h3>Fonts</h3>
	<input type="text" id="find_fonts" class="max_input larger_font center" placeholder="find fonts">

	<div>
	
		<div class="box">
			Some font here
			
			<i data-font-id="2" class="fas fa-heart favorite"></i>
		</div>
		
		<div class="box">
			Some font here
			<i data-font-id="3" class="far fa-heart favorite"></i>
		</div>
		
		<div class="box">
			Some font here
			<i data-font-id="4" class="fas fa-heart favorite"></i>
		</div>
		
		<div class="box">
			Some font 
			<i data-font-id="1" class="far fa-heart favorite"></i>
		</div>
	
		<div class="box">
			Some font here
			<i data-font-id="5" class="fas fa-heart favorite"></i>
		</div>
	
		<br><br>
	</div>
	
	
	
</div>
			

<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>