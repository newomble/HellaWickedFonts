<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>
		
		
<div class="content center">
	<div id="search_container"></div>
	<br><br>
</div>



<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>


<script src="./resources/js/search.js"></script>
<script>
	var s = new Search(true, true);	
</script>
