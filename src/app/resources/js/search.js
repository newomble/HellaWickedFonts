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
	this.limit_start = 0;
	this.limit_end = 24;
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
		app.limit_start = 0;
		app.limit_end = 24;
		app.getSearchResults(this.value); //go get the search criteria
	}); //end addEventListener --> onKeyUp (search input)
	
	//append the search input to the page
	this.SEARCH_CONTAINER.appendChild(this.search_input);
	var search_obj = document.createElement('div');
	
	this.font_search_opt = document.createElement('div');
	this.font_search_opt.id = "font_search_options";
	
	if (this.search_fonts && this.search_users) {
		this.buildSearchOptions();
		
		//append the search controls to the page
		search_obj.appendChild(this.search_obj_options);
		search_obj.appendChild(this.font_search_chk);
		search_obj.appendChild(this.font_search_lbl);
		search_obj.appendChild(this.user_search_chk);
		search_obj.appendChild(this.user_search_lbl);
		
	}//end if: are they allowed to search for both fonts/users here?
	
	if (this.search_fonts) {
		this.buildFontSearchOpts();
		search_obj.appendChild(this.font_search_opt);
	} //end if: are they able to search fonts?
	
	this.SEARCH_CONTAINER.appendChild(search_obj);
}; //end function: Search --> buildSearchControls

/**
* Builds general search options such as font/user
*/
Search.prototype.buildSearchOptions = function () {
	'use strict';
	var app = this;
	this.search_obj_options = document.createElement("span");
	this.font_search_chk = document.createElement("input");
	this.font_search_lbl = document.createElement("span");
	this.user_search_chk = document.createElement("input");
	this.user_search_lbl = document.createElement("span");

	this.search_obj_options.innerHTML = "Search for: ";

	this.font_search_lbl.innerHTML = "fonts";
	this.font_search_chk.type = "radio";
	this.font_search_chk.checked = true;
	this.font_search_chk.setAttribute("name", "user_font");
	this.font_search_opt.style.display = "block";

	this.font_search_chk.addEventListener("click", function(){
		if (this.checked) {
			app.font_search_opt.style.display = "block";
			app.search_input.setAttribute("placeholder", "search fonts");
		} //end if: is this checked?
	});

	this.user_search_lbl.innerHTML = "users";
	this.user_search_chk.type = "radio";
	this.user_search_chk.setAttribute("name", "user_font");

	this.user_search_chk.addEventListener("click", function(){
		if (this.checked) {
			app.font_search_opt.style.display = "none";
			app.search_input.setAttribute("placeholder", "search users");
		} //end if: is this checked?
	}); //end eventListener
	
};  //end function: Search --> buildSearchOptions

/**
* Builds search options specific to chosing to search for a font
* Not utilized by user search
*/
Search.prototype.buildFontSearchOpts = function () {
	'use strict';
	var app = this;
	this.search_options = document.createElement("span");
	this.font_search_fam_chk = document.createElement("input");
	this.font_search_fam_lbl = document.createElement("span");
	this.user_search_kind_chk = document.createElement("input");
	this.user_search_kind_lbl = document.createElement("span");

	this.search_options.innerHTML = "Search Fonts by:";

	this.font_search_fam_chk.type = "radio";
	this.font_search_fam_chk.checked = true;
	this.font_search_fam_chk.setAttribute("name", "font_search_type");
	this.font_search_fam_lbl.innerHTML = "family (font name)";
	
	this.font_search_fam_chk.addEventListener("click", function(){
		app.search_input.disabled = false;
		app.kind_container.style.display = "none";
	});

	this.user_search_kind_lbl.innerHTML = "kind";
	this.user_search_kind_chk.type = "radio";
	this.user_search_kind_chk.setAttribute("name", "font_search_type");
	
	this.user_search_kind_chk.addEventListener("click", function(){
		app.search_input.disabled = true;
		app.kind_container.style.display = "block";
	});

	this.font_search_opt.appendChild(this.search_options);
	this.font_search_opt.appendChild(this.font_search_fam_chk);
	this.font_search_opt.appendChild(this.font_search_fam_lbl);
	this.font_search_opt.appendChild(this.user_search_kind_chk);
	this.font_search_opt.appendChild(this.user_search_kind_lbl);
	
	this.buildKindSearch();
	this.font_search_opt.appendChild(this.kind_container);
}; //end function: Search --> buildFontSearchOpts


/**
* Builds the search options for searching on kind
*/
Search.prototype.buildKindSearch = function () {
	this.kind_container = document.createElement("div");
	this.kind_value = document.createElement("input");
	this.kind_value.type = "hidden";
	
	var kinds = ["monospace","sans-serif","serif","handwriting","display"],
		kinds_amt = kinds.length,
		i;
	
	for (i = 0; i < kinds_amt; i++) {
		var ele = document.createElement("input"),
			lbl = document.createElement("span");
		
		ele.type = "radio";
		ele.value = kinds[i];
		ele.setAttribute("name", "font_kind");
		lbl.innerHTML = kinds[i];
		
		this.addEventKindSearch(ele);
		this.kind_container.appendChild(ele);
		this.kind_container.appendChild(lbl);
	} //end for: go through all font kinds
	this.kind_container.style.display = "none";
}; //end function: Search --> 

/**
* Handles adding the search event on click of a "font kind" search
* @param ele {HTMLnode} the element to add the click event to
*/
Search.prototype.addEventKindSearch = function (ele) {
	var app = this;
	ele.addEventListener("click", function(){
		app.limit_start = 0;
		app.limit_end = 24;
		app.search_input.value = this.value;
		app.getSearchResults(this.value);
	});
}; //end function: Search --> addEventKindSearch



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
	if (this.limit_start === 0) {
		this.search_results.innerHTML = "";
	} else {
		this.search_results.removeChild(this.search_results.getElementsByTagName('button')[0]);
	}
	var searching_fonts = true;
	var searching_users = false;
	var app = this;
	
	if (this.search_fonts && this.search_users) {
		searching_fonts = this.font_search_chk.checked;
		searching_users = this.user_search_chk.checked;
	}
	
	this.results_length = 0;
	//load any matching fonts - check for if there are any returned
	if (this.search_fonts && searching_fonts) {
		var font_type = (this.font_search_fam_chk.checked) ? "family" : "kind";
		//make an ajax call -- URL, method (get/post), Params, callback function name
		this.ajaxCall("/api/search/fonts", 
					  "POST", 
					  {search_string: search_string, 
					   type: font_type,
					   limit_start: this.limit_start,
					   limit_end: this.limit_end					   
					  }, 
					  "loadMatchingFonts");
	} //end if: can they search for fonts?
	
	//load any matching users - check for if there are any returned
	if (this.search_users && searching_users) {
		//make an ajax call -- URL, method (get/post), Params, callback function name
		this.ajaxCall("/api/search/users", 
					  "POST", 
					  {search_string: search_string,
					   limit_start: this.limit_start,
					   limit_end: this.limit_end
					  }, 
					  "loadMatchingUsers");
	} //end if: can they search for fonts?
	
}; //end function: Search --> getSearchResults

/**
* Displays an empty message if there are no results
* note: a child class can overwrite this via this.empty_message
*/
Search.prototype.noResultsMessage = function () {
	this.search_results.innerHTML = (this.search_input.value == "") ? this.empty_message : "No Results";
}; //end function: Search --> noResultsMessage


/**
* Loads any matching fonts into the search results
* @param font_list {JSON} the list of fonts, false if error
* @param err {string} boolean false if there isn't an error
*/
Search.prototype.loadMatchingFonts = function (font_list, err) {
	'use strict';

	if (!err) {
		var font_amt = font_list.length;
		this.results_length = font_amt;
		if(font_amt > 0) {
			var i, font_detail;
			
			for (i = 0; i < font_amt; i++) {
				font_detail = font_list[i];
				this.search_results.appendChild(this.getFontBox(
					font_detail,
					true,
					true
				)); //end append font box
			} //end for: go through all matching fonts
			this.loadMoreButton();
			return true;
		} //end if: did we get any results?
	} //end if: was there an error?
	
	this.noResultsMessage();
}; //end function: Search --> loadMatchingFonts




/**
* Loads any matching users into the search results
* @param user_list {JSON} the list of fonts, false if error
* @param err {string} boolean false if there isn't an error
*/
Search.prototype.loadMatchingUsers = function (user_list, err) {
	'use strict';
	if (!err) {
		var i,
		user_amt = user_list.length;
		this.results_length = user_amt;
		if (user_amt > 0) {
			for (i = 0; i < user_amt; i++) {
				this.addUser(user_list[i]);
			} //end for: go through all the users in the list
			this.loadMoreButton();
			return true;
		} //end if: do we have results?
		
	} //end if: do we have an error?
	
	this.noResultsMessage();
}; //end function: Search --> loadMatchingUsers


/**
* Creates a "load more" button for searchs where the results
* count is 24, meaning there could be more
*/
Search.prototype.loadMoreButton = function () {
	var app = this;
	if (this.results_length === 24) {
		var load_more = document.createElement("button");
		var fonts_checked = this.font_search_chk;
		var obj_search = "fonts";
		
		if (fonts_checked) {
			obj_search = (this.font_search_chk.checked) ? "fonts" : "users";
		}
		
		load_more.innerHTML = "load more " + obj_search;
		this.limit_start += 24;
		this.limit_end = 24;
		load_more.addEventListener("click", function () {
			app.getSearchResults(app.search_input.value);
		});
		this.search_results.appendChild(load_more);
	}
};

/**
* grabs a user box and appends it to the search results
* @param user {JSON} the json rep of the user obj
*/
Search.prototype.addUser = function (user) {
	'use strict';
	var user_box = this.getUserBox(user);
	this.search_results.appendChild(user_box);
}; //end function: Search --> addUser


/**
* Creates a user search box
* @param user {JSON} the json rep of the user obj
* @return box {HTMLnode} the user as an html element box (div)
*/
Search.prototype.getUserBox = function (user) {
	'use strict';
	var box = document.createElement("div"),
		username = document.createElement('a'),
		user_icon = document.createElement('img');
	
	box.classList.add('box');
	
	username.innerHTML = user.username;
	username.classList.add("font_name");
	username.setAttribute("href", "/user/" + user.user_id); //user profile?
	
	user_icon.setAttribute("src", user.user_icon + "?s=80&d=mm&r=g");
	user_icon.className = "user_avatar";
	user_icon.style.cursor = "pointer";
	user_icon.addEventListener("click", function(){
		window.location = "/user/" + user.user_id;
	});
	
	box.appendChild(username);
	box.appendChild(user_icon);
	return box;
}; //end function: Search --> getUserBox


