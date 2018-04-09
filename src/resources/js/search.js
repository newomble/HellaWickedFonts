/************************************************************
* @desc		Handles a Search of any kind (font/user)
*			To use, initialize this class, and create a div:
*			<div id="search_container"></div>
*			
*			It will then build out the input field and
*			items needed to make the search results appear
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Search(search_fonts, search_users) {
	'use strict';
	this.search_fonts = search_fonts;
	this.search_users = search_users;
	this.init();
}//end function Home

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Search.prototype = Object.create(HellaWickedFonts.prototype);
Search.prototype.constructor = Search;

//the main place where it is needed
Search.prototype.SEARCH_CONTAINER = document.getElementById('search_container');

/**
* Initialize the app
*/
Search.prototype.init = function () {
	'use strict';
	this.buildSearchControls();
	this.buildSearchResults();
}; //end function: Search --> init


/**
* Builds out the Search controls including the search string input
* and additionally checkboxes (user/font) if they are allowed
* to search for both a user/fonts
*/
Search.prototype.buildSearchControls = function () {
	'use strict';
	var app = this;
	this.search_input = document.createElement('input');
	
	this.search_input.type = 'text';
	this.search_input.className = "max_input larger_font center";
	this.search_input.setAttribute("placeholder", "find fonts");
	
	this.search_input.addEventListener("keyup", function () {
		app.getSearchResults(this.value); //go get the search criteria
	}); //end addEventListener --> onKeyUp (search input)
	
	
	
	if (this.search_fonts && this.search_users) {
		this.font_search_chk = document.createElement("input");
		this.user_search_chk = document.createElement("input");
		
		this.font_search_chk.type = "checkbox";
		this.user_search_chk.type = "checkbox";
	}//end if: are they allowed to search for both fonts/users here?
	
	this.SEARCH_CONTAINER.appendChild(this.search_input);
}; //end function: Search --> buildSearchControls



/**
* Builds the area for the search results. Additionally
* It will add an empty search (which returns pretty much everything)
*/
Search.prototype.buildSearchResults = function () {
	'use strict';
	this.search_results = document.createElement("div");
	this.SEARCH_CONTAINER.appendChild(this.search_results);
	
	//obtain just anything 
	this.getSearchResults("");
	
}; //end function: Search --> buildSearchResults


/**
* Obtain the search results based on the string in the text input
* @param search_string {string} the string to go off of
*/
Search.prototype.getSearchResults = function (search_string) {
	'use strict';
	//make an ajax call
	//load any matching fonts
	if (this.search_fonts) {
		this.loadMatchingFonts();
	} //end if: can they search for fonts?
	
	
	
	//load any matching users
	if (this.search_users) {
		this.loadMatchingUsers();
	} //end if: can they search for fonts?
}; //end function: Search --> getSearchResults



/**
* Loads any matching fonts into the search results
*/
Search.prototype.loadMatchingFonts = function () {
	'use strict';
	this.search_results.innerHTML = "";
	this.search_results.appendChild(this.getFontBox(6, true));
	this.search_results.appendChild(this.getFontBox(7, false));
	this.search_results.appendChild(this.getFontBox(4, false));
	this.search_results.appendChild(this.getFontBox(8, true));
	
}; //end function: Search --> loadMatchingFonts

/**
* Loads any matching users into the search results
*/
Search.prototype.loadMatchingUsers = function () {
	
	
}; //end function: Search --> loadMatchingUsers




