/************************************************************
* @desc		Handles the Font view page
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Font(font_id) {
	'use strict';
	this.font_id = font_id;
	this.init();
}//end function Font

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Font.prototype = Object.create(HellaWickedFonts.prototype);
Font.prototype.constructor = Font;

Font.prototype.FONT_COMMENTS = document.getElementById('font_comments');
Font.prototype.FONT_TITLE = document.getElementById('font_name');
Font.prototype.FONT_PREVIEW = document.getElementById('font_preview');

/**
* Initializes the app
*/
Font.prototype.init= function () {
	'use strict';
	
	this.FONT_TITLE.innerHTML = "{font name}";
	var font_pre = this.getFontBox(2, true);
	font_pre.classList.add('max_width');
	font_pre.style.minHeight = "initial";
	this.FONT_PREVIEW.appendChild(font_pre);
	
	//create the comment manager to populate comments
	//and create commenting controls
	this.font_comments = new CommentManager(this.font_id);
	this.updateChart();
	//this.FONT_COMMENTS.appendChild(this.getFontBox(6, true));
	//this.FONT_COMMENTS.appendChild(this.getFontBox(7, false));
	//this.loadFont();
}; //end function: Font --> init


/**
* Loads in the fonts in your collection for display
*/
Font.prototype.loadFont = function () {
	'use strict';
	
	///make an ajax call to gather the fonts that are this users favorites.
	
	///no favorites?
	this.FONT_COMMENTS.innerHTML = "<p>No comments have been added.</p>";
	
}; //end function: Font --> init



Font.prototype.updateChart = function () {
	'use strict';
	var ctx = document.getElementById("popular_month");
	var myChart = new Chart(ctx, {
		type: 'line',
		data:{ 
			labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        	datasets: [{
				label: '# of days popular',
            	data: [12, 19, 3, 5, 2, 3, 1, 0]
			}]
		},
		options:{
			responsive: true
		}
	});

}; //end function


var f = new Font();







