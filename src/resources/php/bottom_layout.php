
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
						min_height = w_height - (header_height + nav_height + (16*3.3) + footer_height);
					
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


	<script src="/resources/js/manage_favorites.js"></script>
	<script src="/resources/js/hella_wicked_fonts.js"></script>

	</body>
</html>