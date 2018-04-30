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
function Search(search_fonts, search_users, default_search_placeholder) {
	'use strict';
	this.search_fonts = search_fonts;
	this.search_users = search_users;
	this.input_placeholder = default_search_placeholder;
	this.empty_message = "<p>No results</p>";
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
	this.search_input.setAttribute("placeholder", this.input_placeholder || "find fonts");
	
	this.search_input.addEventListener("keyup", function () {
		app.getSearchResults(this.value); //go get the search criteria
	}); //end addEventListener --> onKeyUp (search input)
	
	//append the search input to the page
	this.SEARCH_CONTAINER.appendChild(this.search_input);
	
	var search_obj = document.createElement('div');
	if (this.search_fonts) {
		this.font_search_opt = document.createElement('div');
		this.font_search_opt.id = "font_search_options";
		
		this.search_options = document.createElement("span");
		this.font_search_fam_chk = document.createElement("input");
		this.font_search_fam_lbl = document.createElement("span");
		this.user_search_kind_chk = document.createElement("input");
		this.user_search_kind_lbl = document.createElement("span");
		
		this.search_options.innerHTML = "Search Fonts by:";
		
		this.font_search_fam_chk.type = "radio";
		this.font_search_fam_chk.checked = true;
		this.font_search_fam_chk.setAttribute("name", "type");
		this.font_search_fam_lbl.innerHTML = "family (font name)";
		
		this.user_search_kind_lbl.innerHTML = "kind";
		this.user_search_kind_chk.type = "radio";
		this.user_search_kind_chk.setAttribute("name", "type");
		
		
		
		this.font_search_opt.appendChild(this.search_options);
		this.font_search_opt.appendChild(this.font_search_fam_chk);
		this.font_search_opt.appendChild(this.font_search_fam_lbl);
		this.font_search_opt.appendChild(this.user_search_kind_chk);
		this.font_search_opt.appendChild(this.user_search_kind_lbl);
		search_obj.appendChild(this.font_search_opt);
		
	} //end if: are they able to search fonts?
	
	
	if (this.search_fonts && this.search_users) {
		
		this.font_search_chk = document.createElement("input");
		this.font_search_lbl = document.createElement("label");
		this.user_search_chk = document.createElement("input");
		this.user_search_lbl = document.createElement("label");
		
		this.font_search_chk.type = "radio";
		this.font_search_lbl.innerHTML = "fonts";
		this.user_search_chk.type = "radio";
		this.user_search_lbl.innerHTML = "users";
		
		//append the search controls to the page
		search_obj.appendChild(this.font_search_chk);
		search_obj.appendChild(this.font_search_lbl);
		search_obj.appendChild(this.user_search_chk);
		search_obj.appendChild(this.user_search_lbl);
		
	}//end if: are they allowed to search for both fonts/users here?
	
	this.SEARCH_CONTAINER.appendChild(search_obj);
}; //end function: Search --> buildSearchControls



/**
* Builds the area for the search results. Additionally
* It will add an empty search (which returns pretty much everything)
*/
Search.prototype.buildSearchResults = function () {
	'use strict';
	var app = this;
	this.search_results = document.createElement("div");
	this.SEARCH_CONTAINER.appendChild(this.search_results);
	
	
}; //end function: Search --> buildSearchResults


/**
* Obtain the search results based on the string in the text input
* @param search_string {string} the string to go off of
*/
Search.prototype.getSearchResults = function (search_string) {
	'use strict';
	//clear out the old search results
	this.search_results.innerHTML = "";
	
	//TESTING ONLY - REMOVE LATER
/*	var user_list = [
		{
			'username' : "memrie",
			'use_id' : 1,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		},
		{
			'username' : "someone",
			'use_id' : 2,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		}
	];
*/
	//make an ajax call
	//which can then filter into the below functions (matching fonts/users)
	
	//load any matching fonts - check for if there are any returned
	if (this.search_fonts) {
		var font_type = (this.font_search_fam_chk.checked) ? "family" : "kind";
		//make an ajax call -- URL, method (get/post), Params, callback function name
		this.ajaxCall("/api/search/fonts", "POST", {search_string: search_string, type: font_type}, "loadMatchingFonts");
	} //end if: can they search for fonts?
	
	//load any matching users - check for if there are any returned
	if (this.search_users) {
		
		//make an ajax call -- URL, method (get/post), Params, callback function name
		this.ajaxCall("/api/search/users", "POST", {search_string: search_string}, "loadMatchingUsers");
		//this.loadMatchingUsers(user_list);
	} //end if: can they search for fonts?

}; //end function: Search --> getSearchResults


Search.prototype.noResultsMessage = function () {
	this.search_results.innerHTML = this.empty_message;
}; //end function: Search --> noResultsMessage


/**
* Loads any matching fonts into the search results
*/
Search.prototype.loadMatchingFonts = function (font_list, err) {
	'use strict';
	
	//clear any previous matches
	this.search_results.innerHTML = "";
	
	if (!err) {
		var font_amt = font_list.length;
		if(font_amt > 0) {
			var i, font_detail;
			
			for (i = 0; i < font_amt; i++) {
				font_detail = font_list[i];
				this.search_results.appendChild(this.getFontBox(
					font_detail.font_id, 
					true,
					true,
					font_detail.family,
					true,
					true
				)); //end append font box
			} //end for: go through all matching fonts
			return true;
		} //end if: did we get any results?
	} //end if: was there an error?
	
	this.noResultsMessage();
}; //end function: Search --> loadMatchingFonts




/**
* Loads any matching users into the search results
*/
Search.prototype.loadMatchingUsers = function (user_list, err) {
	'use strict';
	
	//clear any previous matches
	this.search_results.innerHTML = "";
	
	if (!err) {
		var i,
		user_amt = user_list.length;
		
		if (user_amt > 0) {
			for (i = 0; i < user_amt; i++) {
				this.addUser(user_list[i]);
			} //end for: go through all the users in the list
			return true;
		} //end if: do we have results?
		
	} //end if: do we have an error?
	
	this.noResultsMessage();
}; //end function: Search --> loadMatchingUsers



Search.prototype.addUser = function (user) {
	'use strict';
	var user_box = this.getUserBox(user);
	this.search_results.appendChild(user_box);
}; //end function: Search --> addUser



Search.prototype.getUserBox = function (user) {
	'use strict';
	var box = document.createElement("div"),
		username = document.createElement('a'),
		user_icon = document.createElement('img');
	
	box.classList.add('box');
	
	username.innerHTML = user.username;
	username.classList.add("font_name");
	username.setAttribute("href", "/user.php"); //user profile?
	
	user_icon.setAttribute("src", user.icon_url);
	user_icon.className = "user_avatar";
	
	box.appendChild(username);
	box.appendChild(user_icon);
	return box;
}; //end function: Search --> 


