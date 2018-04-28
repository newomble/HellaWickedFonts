/************************************************************
* @desc		Handles generic functionality used throughout the app
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function HellaWickedFonts() {
	'use strict';	
}

/**
* Returns the font box with some text and a heart icon
* with the appropriate event
* @param font_id {int} the font id
* @param is_favorite {boolean} true if it is
* @param font {string} the font family
* @param txt {string} the text to have the font be
* @return box {object} the html object with all needed elements for a font box
*/
HellaWickedFonts.prototype.getFontBox = function (font_id, is_favorite, is_rated, font, txt) {
	'use strict';
	
	var box = document.createElement('div'),
		font_name = document.createElement('a'),
		font_txt = document.createElement('div'),
		icon = document.createElement('i');
		
	
	box.classList.add('box');
	
	if (font) {
		font_txt.style.fontFamily = font;
	} //end if: do we have a font family to set?
	
	
	font_txt.innerHTML = txt || "The sky is clear; the stars are twinkling.";
	font_txt.contentEditable = true; //let them type in it
	
	var i, ratingIcon;
	
	icon.classList.add('fa-heart');
	icon.classList.add((is_favorite) ? 'fas' : 'far');
	icon.classList.add('favorite');
	icon.setAttribute('data-font-id', font_id);
	icon.setAttribute('data-is-favorite', String(is_favorite));
	
	/// @see /resources/js/manage_favorites.js
	manage_favorites.addChangeEvent(icon);
	font_name.innerHTML = "{font name}";
	font_name.classList.add("font_name");
	font_name.setAttribute("href", "/font.php");
	
	box.appendChild(font_name);
	box.appendChild(font_txt);
	box.appendChild(icon);
	
	for(i=0; i <5; i++){
	ratingIcon = document.createElement('i');
	ratingIcon.classList.add('fa-star');
	ratingIcon.classList.add((is_rated)? 'fas' : 'far');
	ratingIcon.classList.add('rated');
	ratingIcon.setAttribute('data-is-rated', String(is_rated));
	 manage_ratings.addChangeEvent(ratingIcon);
	box.appendChild(ratingIcon);
	}
	return box;
}; //end function: HellaWickedFonts --> getFontBox



/**
* Allows you to make a ajax call via post with given params and
*		on completion will fire off the callback provided
*
*	--- if no app_obj param passed in ---
*		Operates under the assumption you have inherited this object
*			somewhere in your prototype chain
* @param method_name {string} api method to call
* @param params {JSON} {item: "", ...}
* @param callback {string} the function name to call when finished
* @param app_obj {Object} [optional] the object the callback belongs to
*/
HellaWickedFonts.prototype.ajaxCall = function (url, method, params, callback, app_obj) {
	'use strict';
	var app = app_obj || this;
	$.ajax({
		type: method,
		async: true,
		cache: false,
		url: url,
		data: params,
		dataType: "json"
	}).done(function (json_data) {
		if (json_data) {
			var code = parseInt(json_data.code, 10),
				res,
				err;
			if (code === -1) {
				window.location = "/logout/";
			} else {
				res = (code === 0) ? false : json_data.result;
				err = json_data.desc || "An unknown error has occured.";
				app[callback](res, err);
			}//end else/if: did we get anything back?
		} //end if: did we get a response?
	}); //end done
}; //end function: HellaWickedFonts --> ajaxPOST












