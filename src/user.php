<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>

<div class="content center">
	<h3>My Collection</h3>
	<div id="user_details_container"></div>
	<div id="search_container"></div>
	<div id="collection_container"></div>
	
	<br><br>
	
</div>



<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>

<script src="/resources/js/search.js"></script>
<script src="/resources/js/collection.js"></script>

<script>
	var up = new UserProfile();	
</script>