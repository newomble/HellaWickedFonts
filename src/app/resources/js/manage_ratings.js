

/**
* @constructor
*/
function ManageRatings () {
	'use strict';
	this.init();
}//end function: ManageRatings

ManageRatings.prototype.ALL_ICONS = document.getElementsByClassName('rated');


/**
* Initializes and sets up the fav icons to fav/unfav
* fonts from your collection
*/
ManageRatings.prototype.init = function () {
	'use strict';
	var i, 
		rating_icon_count = this.ALL_ICONS.length, 
		app = this;
	
	
	for (i = 0; i < rating_icon_count; i++) {
		this.addChangeEvent(this.ALL_ICONS[i]);
	}//end for: go through all rating icons
	
}; //end function: ManageRatings --> init


/**
* Adds the change event for hearts
* @param ele {object} the html element that needs to be clicked
*/
ManageRatings.prototype.addChangeEvent = function (ele) {
	'use strict';
	
	var app = this;
	var count = 0;
	var num;
	
	ele.addEventListener("click", function (){
		var fid = this.getAttribute('data-font-id'),
			is_rated = (this.getAttribute('data-is-rated') == "true") ? false : true;
		
		if (is_rated) {
			this.setAttribute("value", "1");
			//console.log(this.getAttribute("value"));
			
			this.className = this.className.replace('far', 'fas');
			count++;
			
			console.log("here" + count);
			
			
	
		} else {
			this.setAttribute("value", "0");
			this.className = this.className.replace('fas', 'far');
			count--;
		} 

		app.handleRatingChange(fid, is_rated);
		//count all values with number 1
		
			console.log("COUNT IS " +count);
			
		
		//console.log(this.getAttribute("value"
		this.setAttribute('data-is-rated', String(!!is_rated));

	}); //end addEventListener
	
}; //end function: ManageRatings --> addChangeEvent


/**
* Handles the click of a heart icon (favorite/collection)
* And updates the value
*/
ManageRatings.prototype.handleRatingChange = function (id, is_rated) {
	'use strict';
	console.log(id);
	console.log(is_rated);
	
	//make an ajax call to set it
	
}; //end function: ManageRatings --> handleFavChange

//Initialize (Create the ManageRatings Object)
//var manage_ratings = new ManageRatings();

