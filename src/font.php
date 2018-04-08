<?php
	require_once(__DIR__.'/resources/php/utility.php');
	require_once(__DIR__.'/resources/php/top_layout.php');
?>

<div class="content center">
	<h3 id="font_name">{font name}</h3>
	
	
	
	<h3 id="font_name">Font Trends</h3>
	
	
	
	<h3 id="font_name">Comments</h3>
	<div id="font_comments">
	
		<div class="user_comment">
			<div class="user_avatar">
				<img src="<?php echo get_gravatar('et5392@rit.edu', 45); ?>" alt="{user_name}">
			</div>
			
			<div class="comment">
				<h4 class="username">{username here}</h4>
				<p class="comment_text">I said some things about this font. You better like it!</p>
				
				<div class="comment_votes">
					<span class="up_vote">(0)</span><i class="far fa-thumbs-up"></i>
					<span class="down_vote">(0)</span><i class="far fa-thumbs-down"></i>
				</div>
			</div>
			
			
		</div>
	
		
	</div>
	
	<br><br>
	
</div>



<?php
	require_once(__DIR__.'/resources/php/bottom_layout.php');
?>

<script src="/resources/js/font.js"></script>


