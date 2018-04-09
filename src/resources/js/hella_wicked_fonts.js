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
HellaWickedFonts.prototype.getFontBox = function (font_id, is_favorite, font, txt) {
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
	
	icon.classList.add('fa-heart');
	icon.classList.add((is_favorite) ? 'fas' : 'far');
	icon.classList.add('favorite');
	icon.setAttribute('data-font-id', font_id);
	icon.setAttribute('data-is-favorite', String(is_favorite));
	
	/// @see /resources/js/manage_favorites.js
	manage_favorites.addChangeEvent(icon);
	
	font_name.innerHTML = "{font name}";
	font_name.setAttribute("href", "/font.php");
	
	box.appendChild(font_name);
	box.appendChild(font_txt);
	box.appendChild(icon);
	return box;
}; //end function: HellaWickedFonts --> getFontBox




