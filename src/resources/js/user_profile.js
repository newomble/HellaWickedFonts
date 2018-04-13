/************************************************************
* @desc		Handles a Search of any kind (font/user)
*			To use, initialize this class, and create a div:
*			<div id="search_container"></div>
*			
*			It will then build out the input field and
*			items needed to make the search results appear
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/12/2018
*************************************************************/


/**
* @constructor
*/
function UserProfile() {
	this.init();
};


UserProfile.prototype.DETAIL_CONTAINER = document.getElementById('user_details_container');


UserProfile.prototype.init = function () {
	'use strict';
	this.collection = new Collection(false);
}; //end function: UserProfile --> init





