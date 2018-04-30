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
Home.prototype = Object.create(HellaWickedFonts.prototype);
Home.prototype.constructor = Home;

Home.prototype.POP_FONTS = document.getElementById('popular');
Home.prototype.TREND_FONTS = document.getElementById('trending');

Home.prototype.MY_FONTS = document.getElementById('font_search_results');
Home.prototype.FIND_FONTS = document.getElementById('find_fonts');

/**
* Initializes the app
*/
Home.prototype.init = function () {
	'use strict';
	
	this.initPopularFonts();
	this.initTrendingFonts();
	
	//@see Search - yes to fonts always
	//				yes to users if logged in (update later)
	this.search = new Search(true, false); //the "find fonts"
}; //end function: Home --> init


/**
* Grabs the top 5 "popular" fonts
*/
Home.prototype.initPopularFonts = function () {
	'use strict';
	
	//Load up all the popular fonts
	this.ajaxCall("/api/popular/fonts", "POST", "", "handlePopularFonts");
}; //end function: Home --> initPopularFonts

/**
* handles the response from attempting to grab the popular fonts
* @param data {JSON} the response from the back-end
* @param err {string|boolean} false if no error, string if there is
*/
Home.prototype.handlePopularFonts = function (data, err) {
	'use strict';
	var i,
		font_amt = data.length;
	
	if (!err) {
		for (i = 0; i < font_amt; i++) {
			this.loadTopFont(this.POP_FONTS, data[i]);
		}//end for: go through all popular fonts
	} //end if: did we have an error?
	
}; //end function: Home --> handlePopularFonts

/**
* Grabs the top 5 "trending" fonts
*/
Home.prototype.initTrendingFonts = function () {
	'use strict';
	//go grab the trending fonts
	this.ajaxCall("/api/trending/fonts", "POST", "", "handleTrendingFonts");
}; //end function: Home --> initTrendingFonts


/**
* handles the response from attempting to grab the trending fonts
* @param data {JSON} the response from the back-end
* @param err {string|boolean} false if no error, string if there is
*/
Home.prototype.handleTrendingFonts = function (data, err) {
	'use strict';
	var i,
		font_amt = data.length;
	
	if (!err) {
		for (i = 0; i < font_amt; i++) {
			this.loadTopFont(this.TREND_FONTS, data[i]);
		}//end for: go through all popular fonts
	} //end if: did we have an error?
	
}; //end function: Home --> handlePopularFonts


/**
* Append a font to their respective list
* @param font_list {UL} the UL html element to append to
* @param font_name {String} the name of the font (css)
*/
Home.prototype.loadTopFont = function (font_list, font_details) {
	'use strict';
	var font_li = document.createElement("li"),
		font_name = font_details.family;
	
	//@see HellaWickedFonts: include the font file to display it
	this.includeFontFamily(font_name);
	
	//set the font family to this font, and arial if google is down
	font_li.style.fontFamily = font_name + ", arial";
	font_li.innerHTML = "<a href='/font/"+font_details.font_id+"'>" + font_name + "</a>";
	
	font_list.appendChild(font_li);
	
}; //end function: Home --> loadTopFont

var h = new Home();

