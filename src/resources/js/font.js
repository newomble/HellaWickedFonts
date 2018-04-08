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
//Font.prototype.MY_FONTS = document.getElementById('');

/**
* Initializes the app
*/
Font.prototype.init= function () {
	'use strict';
	
	this.font_comments = new CommentManager(this.font_id);
	
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






var f = new Font();







