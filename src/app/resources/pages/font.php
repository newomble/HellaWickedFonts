<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>

<div class="content center">
	<h3 id="font_name">{font name}</h3>
	<div id="font_preview"></div>
	
	
	<h3>Font Stats</h3>
	<div id="font_stats">
		<div class="chart-container">
			<canvas id="popular_month"></canvas>
		</div>
	
	
	</div>
	
	
	<h3>Comments</h3>
	<div id="comment_container"></div>
	
		
</div>
<br><br>
	



<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>

<script src="./resources/js/comment_manager.js"></script>
<script src="./resources/js/font.js"></script>


