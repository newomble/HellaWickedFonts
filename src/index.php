<?php
	require_once(__DIR__.'/resources/php/utility.php');
?>

<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>HellaWickedFonts - Welcome</title>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<link href="https://fonts.googleapis.com/css?family=EB+Garamond|Marck+Script|Roboto" rel="stylesheet">
		<link href="/resources/css/main.css" rel="stylesheet">
		<link href="/resources/css/fontawesome-all.min.css" rel="stylesheet">
	</head>

	<body>
		
		<div id="nav">
			<div id="links">
				<a href="/"><i class="fas fa-home"></i> home</a>
			</div>
			
			<div id="account_controls">
				<ul>
					<!-- later just add a check for if they are logged in --> 
					<li id="logged_out">
						<a href="/">login <i class="fas fa-sign-in-alt"></i></a>	
					</li>
					<li id="logged_in"> 
						<div id="avatar">
							<div id="avatar_wrapper">
								<div class="middle_cell">
									<img src="<?php echo get_gravatar('et5392@rit.edu', 45); ?>" alt=''>
								</div>
								<div class="middle_cell">
									<i class="fas fa-chevron-circle-down"></i>
								</div>
							</div>
							
						</div>
						<ul id="account_links">
							<li><a href="/"><i class="fas fa-heart"></i> my collection</a></li>
							<li><a href="/"><i class="fas fa-cog"></i> my account</a></li>
							<li><a href="/"><i class="fas fa-sign-out-alt"></i> logout</a></li>
						</ul>
					</li>
				</ul>
				
			</div>
		</div>
		
		<br>
		<!-- header image -->
		<div id="header">
				<span class="serif_font">Hella<span  class="script_font">Wicked</span>Fonts</span>
		</div>
		
		
		<!-- the content of the app -->
		<div id="app_content">
			<div class="content">
				some text here for now
				
			</div>
			
		</div>
		
		
		
		<!-- the footer for the app --> 
		<footer id="footer">
			<span class="serif_font">Hella<span  class="script_font">Wicked</span>Fonts</span> &copy; 2018
		</footer>
		
		
		
		<script>
			/**
			* Layout Manager Helps to keep the elements of the layout how they should be
			* primarily handling the footer
			* @author erika tobias
			*/
			var layout_manager = {
				init: function () {
					var app = this;
					this.handleFooter();
					window.addEventListener("resize", function (){
						app.handleFooter();
					});
				},
				/**
				* Makes sure that the footer always remains at the bottom of the page
				* based on the elements which are always on the page
				*/
				handleFooter: function () {
					'use strict';
					var w_height = window.innerHeight,
						nav_height = this.getFullHeight('nav'),
						header_height = this.getFullHeight('header'),
						content_div = document.getElementById('app_content'),
						footer_height = this.getFullHeight('footer'),
						min_height = w_height - (header_height + nav_height + (16*3.45) + footer_height);
					
					content_div.style.minHeight = min_height + "px";
				},//end function: handleFooter

				/**
				* https://stackoverflow.com/questions/10787782/full-height-of-a-html-element-div-including-border-padding-and-margin
				* Modified (removed unit)
				* @param elmID {String} the id of the element you want the complete verticle height of
				* @return {int} the full height (measurement removed)
				*/
				getFullHeight: function (elmID) {
					var elmHeight, elmMargin, elm = document.getElementById(elmID);
					if(document.all) {// IE
						elmHeight = elm.currentStyle.height;
						elmMargin = parseInt(elm.currentStyle.marginTop, 10) + parseInt(elm.currentStyle.marginBottom, 10);
					} else {// Mozilla
						elmHeight = document.defaultView.getComputedStyle(elm, '').getPropertyValue('height');
						elmMargin = parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-top')) + parseInt(document.defaultView.getComputedStyle(elm, '').getPropertyValue('margin-bottom'));
					} //end else/if: can we do this?
					return (parseInt(elmHeight.replace("px", ""))+elmMargin);
				}//end function: getFullHeight
				
			}; //end layout_manager
			
			//lets init the layout manager
			layout_manager.init();
		</script>
	</body>
</html>