/************************************************************
* @desc		Handles the Font view page
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Font() {
	'use strict';
	this.init();
}//end function Font

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Font.prototype = Object.create(HellaWickedFonts.prototype);
Font.prototype.constructor = Font;

Font.prototype.FONT_COMMENTS = document.getElementById('font_comments');
Font.prototype.MY_FONTS = document.getElementById('my_collection_fonts');

/**
* Initializes the app
*/
Font.prototype.init= function () {
	'use strict';
	
	this.MY_FONTS.appendChild(this.getFontBox(6, true));
	this.MY_FONTS.appendChild(this.getFontBox(7, false));
	//this.loadFont();
}; //end function: Font --> init


/**
* Loads in the fonts in your collection for display
*/
Font.prototype.loadFont = function () {
	'use strict';
	
	///make an ajax call to gather the fonts that are this users favorites.
	
	///no favorites?
	this.MY_FONTS.innerHTML = "<p>You have not saved any fonts to your collection. Click the <i class='far fa-heart'></i> icons to add some.</p>";
	
}; //end function: Font --> init



var f = new Font();







