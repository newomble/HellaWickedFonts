/************************************************************
* @desc		Handles the rating update
*			
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/28/2018
*************************************************************/


/**
* @constructor
*/
function ManageRatings () {
	'use strict';
	this.error_update = false;
}//end function: ManageRatings

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
ManageRatings.prototype = Object.create(HellaWickedFonts.prototype);
ManageRatings.prototype.constructor = ManageRatings;

ManageRatings.prototype.ALL_ICONS = document.getElementsByClassName('rated');
ManageRatings.prototype.MAX_RATING = 5;

ManageRatings.prototype.star_full_icon = "fas fa-star";
ManageRatings.prototype.star_empty_icon = "far fa-star";
ManageRatings.prototype.half_star_icon = "fas fa-star-half";


/**
* Creates the starts and determines which ones need to be displayed
* based on the rating given.
* @param rating {int} the rating
* @param font_id {int} id for the font that is being rated
*/
ManageRatings.prototype.getRatingStars = function (rating, font_id) {
	this.font_current_rating = rating;
	this.ratingStars = [];
	//grab anything that would make it part of a star
	var not_whole = rating%1;
	var empty_heart_extra = 0;
	//find out how many TOTAL FULL stars we need
	this.totalFull = rating/1 - not_whole;
	this.addStars(this.star_full_icon, this.totalFull);

	//totalEmpty should be total allowed - total full stars
	this.totalEmpty = (this.MAX_RATING - this.totalFull);

	if(not_whole > 0.49){//if it's more than half, show half
		this.half = true;
		this.ratingStars.push({"type": this.half_star_icon});
		this.totalEmpty --;//since we are adding one, remove 1 from empty
	}//end if: do we wanna add a half star?

	//add the empty stars
	this.addStars(this.star_empty_icon, this.totalEmpty);
	
	return this.buildStars(font_id);
}; //end function: ManageRatings --> getRatingStars


/**
* Add stars needed to the stars rating array
* @param star {string} the type of star
* @param amt {number} amount of of this star to add
*/
ManageRatings.prototype.addStars = function (star, amt){
	for(var i = 0; i < amt; i++){
		this.ratingStars.push({"type": star});
	}//end for: go through as many as we need
}//end function: ManageRatings --> addStars

/**
* Builds the stars based on the getStars function
* to display them as needed and add the events
* @param font_id {int} the font id it belongs to
*/
ManageRatings.prototype.buildStars = function (font_id) {
	var i,
		ratingIcon,
		rate_container = document.createElement('span');
	
	rate_container.classList.add("rating");
	rate_container.id = "rating_" + font_id;
	rate_container.setAttribute('title', "rating: " + parseFloat(this.font_current_rating).toFixed(2));
	rate_container.setAttribute("data-original-rating", JSON.stringify(this.ratingStars));
	rate_container.setAttribute("data-font-id", font_id);
	
	for (i = 0; i < this.MAX_RATING; i++) {
		ratingIcon = document.createElement('i');
		ratingIcon.className = this.ratingStars[i].type;
		ratingIcon.setAttribute("data-font-id", font_id);
		ratingIcon.setAttribute("data-star-rank", i+1);
		
		
		if (LOGGED_IN) {
			this.addChangeEvent(ratingIcon);
		}
		rate_container.appendChild(ratingIcon);
	} //end for: go through and add stars
	
	if (LOGGED_IN) {
		this.addMouseoutEvent(rate_container);
	}
	return rate_container;
}; //end function: ManageRatings --> buildStars



/**
* Adds the change event for stars
* @param ele {object} the html element that needs to be clicked
* @param container {object} the html element which holds the stars
*/
ManageRatings.prototype.addChangeEvent = function (ele, container) {
	'use strict';
	
	var app = this;
	var count = 0;
	var num;
	
	ele.addEventListener("click", function (){
		var fid = this.getAttribute('data-font-id'),
			is_rated = (this.getAttribute('data-star-rank'));
		
		if (!app.error_update) {
			app.ajaxCall("/api/rate", "POST", {font_id: fid, rating: is_rated}, "handleRatingChange");
		} //end if: was this triggered by a failed collection update?
		app.error_update = false;
	}); //end addEventListener
	
	
	ele.addEventListener("mouseover", function (){
		var fid = this.getAttribute('data-font-id'),
			is_rated = (this.getAttribute('data-star-rank')),
			rate_container = document.getElementById("rating_" + fid),
			all_stars = rate_container.childNodes,
			full_star = true;

		for (var i = 0; i < all_stars.length; i++) {
			var star = all_stars[i];
			var rank = star.getAttribute('data-star-rank');

			if (rank === is_rated || rank < is_rated) {
				star.className = app.star_full_icon;
			} else if (rank > is_rated) {
				star.className = app.star_empty_icon;
			}
		}
	}); //end addEventListener
	
}; //end function: ManageRatings --> addChangeEvent


/**
* Adds the mouse out event to reset it to original rating
* @param ele {object} the html element that needs to be clicked
*/
ManageRatings.prototype.addMouseoutEvent = function (ele) {
	ele.addEventListener("mouseout", function (){
		var fid = this.getAttribute('data-font-id'),
			is_rated = JSON.parse(this.getAttribute('data-original-rating')),
			all_stars = this.childNodes,
			full_star = true;
		
		for (var i = 0; i < all_stars.length; i++) {
			var star = all_stars[i];
			star.className = is_rated[i].type;
		}
	}); //end addEventListener	
}; //end function: ManageRatings --> addMouseoutEvent



/**
* Handles the click of a heart icon (favorite/collection)
* And updates the value
*/
ManageRatings.prototype.handleRatingChange = function (data, err) {
	'use strict';
	
	if (!err) {
		var font = data[0];
		if (font) {
			var font_id = font.font_id;
			var font_pre = document.getElementById("rating_" + font_id);
			var font_pre_parent = font_pre.parentNode;
			var new_rating = font.rating || 0;
			var new_rate_total = font.rating_total || 0;
			
			font_pre_parent.removeChild(font_pre);//kill previous rating
			font_pre_parent.appendChild(this.getRatingStars(new_rating, font_id));//update rating
			
			
			var rating_list = document.getElementsByClassName('font_rating_value');
			var rating_total_list = document.getElementsByClassName('font_rating_total');
			
			for (var i = 0; i < rating_list.length; i++) {
				if (rating_list[i]) {
					rating_list[i].innerHTML = parseFloat(new_rating).toFixed(2);
				}
				
				if (rating_total_list[i]) {
					rating_total_list[i].innerHTML = "total ratings: " + new_rate_total;
				}	
			}
			
			return true;
		} //end if: was there a font
	} //end if: was there an error:
	
	this.error_update = true;
}; //end function: ManageRatings --> handleFavChange



//Initialize (Create the ManageRatings Object)
var manage_ratings = new ManageRatings();

