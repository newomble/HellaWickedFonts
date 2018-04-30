/************************************************************
* @desc		Handles the favorites (your collection) update
*			Will go through the page and add the fav event
*			then firing the ajax call to go update your collection
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function ManageFavorites () {
	'use strict';
	this.init();
	this.error_update = false;
}//end function: ManageFavorites

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
ManageFavorites.prototype = Object.create(HellaWickedFonts.prototype);
ManageFavorites.prototype.constructor = ManageFavorites;


ManageFavorites.prototype.ALL_ICONS = document.getElementsByClassName('favorite');


/**
* Initializes and sets up the fav icons to fav/unfav
* fonts from your collection
*/
ManageFavorites.prototype.init = function () {
	'use strict';
	var i, 
		fav_icon_count = this.ALL_ICONS.length, 
		app = this;
	
	
	for (i = 0; i < fav_icon_count; i++) {
		this.addChangeEvent(this.ALL_ICONS[i]);
	}//end for: go through all fav icons
	
}; //end function: ManageFavorites --> init


/**
* Adds the change event for hearts
* @param ele {object} the html element that needs to be clicked
*/
ManageFavorites.prototype.addChangeEvent = function (ele) {
	'use strict';
	
	var app = this;
	
	ele.addEventListener("click", function (){
		console.log("hey");
		app.clicked_ele = this;
		var fid = this.getAttribute('data-font-id'),
			is_fav = (this.getAttribute('data-is-favorite') == "true") ? false : true;
		
		if (is_fav) {
			this.className = this.className.replace('far', 'fas');
		} else {
			this.className = this.className.replace('fas', 'far');
		} //end else/if: was it set to be a favorite before?
		
		this.setAttribute('data-is-favorite', String(!!is_fav));
		
		if (!app.error_update) {
			app.handleFavChange(fid, is_fav);
		} //end if: was this triggered by a failed collection update?
		app.error_update = false;

	}); //end addEventListener
	
}; //end function: ManageFavorites --> addChangeEvent


/**
* Handles the click of a heart icon (favorite/collection)
* And updates the value
*/
ManageFavorites.prototype.handleFavChange = function (id, is_fav) {
	'use strict';
	
	//make an ajax call to set it
	this.ajaxCall("/api/user/edit/collection", "POST", {font_id: id, is_fav: is_fav}, "handleFavResponse");
}; //end function: ManageFavorites --> handleFavChange

ManageFavorites.prototype.handleFavResponse = function (data, err) {
	'use strict';

	if (!err) {
		if (data) {
			return true;
		}
	}
	
	this.error_update = true;
	this.fireEvent(this.clicked_ele, "click");
};


//Initialize (Create the ManageFavorites Object)
var manage_favorites = new ManageFavorites();

