/************************************************************
* @desc		Handles the My Collection page
*			Requires: 
*				<div id="search_container"></div>
*				<div id="collection_container"></div>
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
* to do --  will need to pass in a user id (yours or another user's)
*/
function Collection(is_my_collection, user_id) {
	'use strict';
	this.user_id = user_id;
	this.search_fonts = true;
	this.search_users = false;
	this.my_collection = is_my_collection;
	this.init();
}//end function Collection

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Collection.prototype = Object.create(Search.prototype);
Collection.prototype.constructor = Collection;

Collection.prototype.MY_FONTS = document.getElementById('collection_container');

/**
*	@override
**/
Collection.prototype.input_placeholder = "search collection";
Collection.prototype.empty_message = "<p>You have not saved any fonts to your collection. Click the <i class='far fa-heart'></i> icons to add some.</p>";

/**
* @override
*/
Collection.prototype.init = function () {
	'use strict';
	
	if (!this.my_collection) {
		this.empty_message = "<p>This user hasn't added any fonts to their collection.</p>";
	} //end if: is this the same user as the one being viewed?
	
	//call parent init function
	Search.prototype.init.call(this);
	
	this.getSearchResults("");
}; //end function: Collection --> init

/**
* @override
* Obtain the search results based on the string in the text input
* @param search_string {string} the string to go off of
*/
Collection.prototype.getSearchResults = function (search_string) {
	'use strict';
	//clear out the old search results
	this.search_results.innerHTML = "";

	//make an ajax call -- URL, method (get/post), Params, callback function name
	var font_type = (this.font_search_fam_chk.checked) ? "family" : "kind";
	//make an ajax call -- URL, method (get/post), Params, callback function name
	this.ajaxCall("/api/search/fonts", "POST", {search_string: search_string, type: font_type, user_id:this.user_id}, "loadMatchingFonts");
}; //end function: Collection --> getSearchResults





/**********************************************************************
* @desc		Updated the collection class to reuse the Search protoype
* @date		4/12 	erika tobias
**********************************************************************/


