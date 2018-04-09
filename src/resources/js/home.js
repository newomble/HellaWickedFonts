/************************************************************
* @desc		Handles the My Home page
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Home() {
	'use strict';
	this.init();
}//end function Home

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
//Home.prototype = Object.create(HellaWickedFonts.prototype);
//Home.prototype.constructor = Home;

Home.prototype.MY_FONTS = document.getElementById('font_search_results');

Home.prototype.FIND_FONTS = document.getElementById('find_fonts');

/**
* Initializes the app
*/
Home.prototype.init= function () {
	'use strict';
	
	this.initPopularFonts();
	this.initTrendingFonts();
	
	//@see Search - yes to fonts always
	//				yes to users if logged in (update later)
	this.search = new Search(true, true); //the "find fonts"
}; //end function: Home --> init

Home.prototype.initPopularFonts = function () {
	'use strict';
	
	
}; //end function: Home --> initPopularFonts



Home.prototype.initTrendingFonts = function () {
	'use strict';
	
	
}; //end function: Home --> initTrendingFonts





var h = new Home();

