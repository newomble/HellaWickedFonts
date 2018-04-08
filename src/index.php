<?php
	require_once(__DIR__.'/resources/php/utility.php');
?>




<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>HellaWickedFonts - Welcome</title>
		<link href="https://fonts.googleapis.com/css?family=EB+Garamond|Marck+Script|Roboto" rel="stylesheet">
		<link href="/resources/css/main.css" rel="stylesheet">
	</head>

	<body>
		
		<div id="nav">
			<div id="links">
				<a href="/">home</a>
			</div>
			
			<div id="account_controls">
				<ul>
					<li id="logged_in"> <div id="avatar"><img src="<?php echo get_gravatar('et5392@rit.edu', 45); ?>" alt=></div>
						<ul>
							<li><a href="/">my collection</a></li>
							<li><a href="/">my account</a></li>
							<li><a href="/">logout</a></li>
						</ul>
					</li>
					
					<li id="logged_out"><a href="/">login</a></li>
				</ul>
				
			</div>
		</div>
		
		<!-- header image -->
		<div id="header">
			<div class="content right">
				<h3 class="serif_font">Hella<span  class="script_font">Wicked</span>Fonts</h3>
			</div>
		</div>
		
		
		
		<!-- the content of the app -->
		<div id="app_content">
			<div class="content">
				some text here for now
				
			</div>
			
		</div>
		
		
		
		<!-- the footer for the app --> 
		<footer>
			<b class="serif_font">Hella<span  class="script_font">Wicked</span>Fonts</b>
		</footer>
		
	</body>
</html>