/************************************************************
* @desc		Handles the My Collection page
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Collection() {
	'use strict';
	this.init();
}//end function Collection

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Collection.prototype = Object.create(HellaWickedFonts.prototype);
Collection.prototype.constructor = Collection;

Collection.prototype.MY_FONTS = document.getElementById('my_collection_fonts');

/**
* Initializes the app
*/
Collection.prototype.init= function () {
	'use strict';
	
	this.MY_FONTS.appendChild(this.getFontBox(6, true));
	this.MY_FONTS.appendChild(this.getFontBox(7, false));
	//this.loadCollection();
}; //end function: Collection --> init


/**
* Loads in the fonts in your collection for display
*/
Collection.prototype.loadCollection = function () {
	'use strict';
	
	///make an ajax call to gather the fonts that are this users favorites.
	
	///no favorites?
	this.MY_FONTS.innerHTML = "<p>You have not saved any fonts to your collection. Click the <i class='far fa-heart'></i> icons to add some.</p>";
	
}; //end function: Collection --> init



var c = new Collection();







