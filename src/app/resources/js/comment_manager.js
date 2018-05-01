/************************************************************
* @desc		CommentManager handles comments for fonts
*
*			This class (to be used) requires the following div:
*			<div id="comment_container"></div>
*
*			It will then build everything in that
*			Instantiate this object in the page's object you
*			want to use it in: 
*					this.comments_manager = new CommentManager();
*
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function CommentManager(comments_grab_id) {
	'use strict';
	this.font_id = comments_grab_id;
	this.init();
}//end function CommentManager


/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
CommentManager.prototype = Object.create(HellaWickedFonts.prototype);
CommentManager.prototype.constructor = CommentManager;


CommentManager.prototype.COMMENTS_CONTAINER = document.getElementById('comment_container');

CommentManager.prototype.COMMENTS_LIST = document.createElement('div');
CommentManager.prototype.COMMENTS_CONTROLS = document.createElement('div');


/**
* Initializes the app
*/
CommentManager.prototype.init = function () {
	'use strict';
	this.tmp_comment_id_count = 0;//REMOVE THIS LATER - TESTING ONLY
	this.buildCommentsList();
	this.buildCommentControls();
	this.failed_vote = false;
}; //end function: CommentManager --> init


/** ----------------------------------------------------------- **/
/** ------------------- BUILD OUT COMMENTS -------------------- **/
/** ----------------------------------------------------------- **/

/**
* Builds out all the comments and creates the div container
* which will hold the comments
*/
CommentManager.prototype.buildCommentsList = function () {
	'use strict';
	this.COMMENTS_CONTAINER.appendChild(this.COMMENTS_LIST);
	//make an ajax call to set it
	this.ajaxCall("/api/get/comments", "POST", {font_id: this.font_id}, "handleLoadComments");
}; //end function: CommentManager --> buildCommentsList


CommentManager.prototype.handleLoadComments = function (data, err) {
	'use strict';
	
	if (!err) {
		var i,
			comment_amt = data.length,
			comment;
		if (comment_amt > 0) {
			for (i = 0; i < comment_amt; i++) {
				this.addComment(data[i]);
			} //end for: go through all comments
			return true;
		} //end if: do we have any comments?
	}
	
	this.COMMENTS_LIST.innerHTML = "<p>No comments have been added.</p>";
};




/**
* Gives you back a comment box with the comment, username,
* user icon and other details
* @param user_comment {Object} A JSON object of the comment
* @return comment_wrapper {object} an HTML object for the comment
*/
CommentManager.prototype.commentBox = function (user_comment) {
	'use strict';
	//create all the needed html elements
	var comment_wrapper = document.createElement('div'),
		user_avatar  = document.createElement('div'),
		avatar_img = document.createElement('img'),
		comment  = document.createElement('div'),
		username  = document.createElement('h4'),
		comment_text  = document.createElement('p'),
		comment_votes  = document.createElement('div'),
		up_vote  = document.createElement('span'),
		up_vote_icon  = document.createElement('i'),
		down_vote  = document.createElement('span'),
		down_vote_icon  = document.createElement('i'),
		comment_id = user_comment.comment_id;
	
	//add all the needed classnames (nested for how appended)
	comment_wrapper.className = "user_comment";
		user_avatar.className = "user_avatar";
		comment.className = "comment";
			username.className = "username";
			comment_text.className = "comment_text";
			comment_votes.className = "comment_votes";
				up_vote.className = "up_vote";
				up_vote_icon.className = "far fa-thumbs-up";
				down_vote.className = "down_vote";
				down_vote_icon.className = "far fa-thumbs-down";
	
	//append the elements (nested for how appended)
	comment_wrapper.appendChild(user_avatar);
		user_avatar.appendChild(avatar_img);
	comment_wrapper.appendChild(comment);
		comment.appendChild(username);
		comment.appendChild(comment_text);
		comment.appendChild(comment_votes);
			comment_votes.appendChild(up_vote);
			comment_votes.appendChild(up_vote_icon);
			comment_votes.appendChild(down_vote);
			comment_votes.appendChild(down_vote_icon);
	
	avatar_img.setAttribute('src', user_comment.icon + "?s=60&d=mm&r=g");
	avatar_img.addEventListener("click", function(){window.location = "/user/" + user_comment.user_id});
	username.innerHTML = '<a href="/user/' + user_comment.user_id+ '">'+user_comment.username +'</a>';
	comment_text.innerHTML = user_comment.comment_text;
	
	var up_count = parseInt((user_comment.rating) ? parseFloat(user_comment.rating) * parseInt(user_comment.total_votes) : 0);
	var down_count = parseInt(user_comment.total_votes || 0) - up_count;
	
	up_vote.innerHTML = up_count;
	down_vote.innerHTML = down_count;
	
	up_vote.id = "up_count_" + comment_id;
	down_vote.id = "down_count_" + comment_id;
	
	up_vote_icon.id = "up_" + comment_id;
	down_vote_icon.id = "down_" + comment_id;
	
	up_vote_icon.setAttribute('data-comment_id', comment_id);
	down_vote_icon.setAttribute('data-comment_id', comment_id);
	
	
	if (LOGGED_IN) {
		this.upDownAction(up_vote_icon);
		this.upDownAction(down_vote_icon);
	} else {
		up_vote_icon.style.cursor = "default";
		down_vote_icon.style.cursor = "default";
	} //end if: is the user logged in?
	
	//this.tmp_comment_id_count = comment_id + 1;
	return comment_wrapper;
}; //end function: CommentManager --> commentBox


/**
* Updates the icon to be solid since you have reacted to the comment
* and removes a previous reaction as well as updating the counts
* TODO: add an ajax call to update the up/down vote of a comment
*/
CommentManager.prototype.upDownAction = function (ele) {
	'use strict';
	var app = this;
	ele.addEventListener("click", function () {
		var comment_id = this.getAttribute('data-comment_id'), // "this's" comment id
			is_up_vote = (this.id === "up_" + comment_id), //did they click the "up" icon?
			opposite_vote = (is_up_vote) ? document.getElementById('down_' + comment_id) : document.getElementById('up_' + comment_id), // "that's" icon
			up_count = document.getElementById('up_count_' + comment_id), // up count ele container
			down_count = document.getElementById('down_count_' + comment_id), // down count ele container
			opposite_count = (is_up_vote) ? down_count : up_count, //the element for "that's" count
			this_count =  (is_up_vote) ? up_count : down_count, //the element for "this's" count
			other_total_count = opposite_count.innerText || opposite_count.textContent, //current amt for other
			this_total_count = this_count.innerText || this_count.textContent; //current amt for this
		
		
		app.last_clicked_ele = this;
		
		if (new RegExp('fas').test(opposite_vote.className)) {
			//remove a count from the other vote
			opposite_count.innerHTML = parseInt(other_total_count, 10) - 1;
		} //end if: did they select the other one before?
		
		//add one to this ones vote
		this_count.innerHTML = parseInt(this_total_count, 10) + 1;
		
		if (new RegExp('fas').test(this.className)) { //are they clicking the same one? (unreact)
			this_count.innerHTML = parseInt(this_total_count, 10) - 1; //remove 1 count
			this.className = this.className.replace("fas", "far"); //make outline (not solid)
		} else {
			//this is something you've reacted to now
			this.className = this.className.replace("far", "fas"); //make "this" solid
			//you cant up and down vote, remove the other 
			opposite_vote.className = opposite_vote.className.replace("fas", "far"); //make "that" outline
		}//end if: Are they unreacting or reacting?
		
		
		if (!app.failed_vote) {
			app.ajaxCall("/api/rate", "POST", {comment_id: comment_id, rating:(is_up_vote) ? 1 : 0}, "handleVote");
		} //end if: was there a failed attempt to vote?
		
		app.failed_vote = false;
		
	}); //end addEventListener --> click on up/down votes
	
}; //end function: CommentManager --> upDownAction


CommentManager.prototype.handleVote = function (data, err) {
	'use strict';
	
	if (!err) {
		return true;
	} //end if: was there an error?
	
	this.failed_vote = true;
	this.fireEvent(this.last_clicked_ele, "click");
};


/** ----------------------------------------------------------- **/
/** --------------- BUILD OUT COMMENT CONTROLS ---------------- **/
/** ----------------------------------------------------------- **/

/**
* Builds out the comment controls
*/
CommentManager.prototype.buildCommentControls = function () {
	'use strict';
	var app = this;
	
	this.comment_header = document.createElement("h3");
	this.comment_error = document.createElement("div");
	this.comment_header.innerHTML = "Add A Comment";
	
	if (LOGGED_IN) {
		this.submit_button = document.createElement('button');
		this.comment_text = document.createElement('textarea');
				
		this.submit_button.innerHTML = "post comment";
		this.comment_text.setAttribute("placeholder", "write your comment here");
		this.COMMENTS_CONTROLS.appendChild(this.comment_header);
		this.COMMENTS_CONTROLS.appendChild(this.comment_error);
		this.COMMENTS_CONTROLS.appendChild(this.comment_text);
		this.COMMENTS_CONTROLS.appendChild(this.submit_button);

		this.submit_button.addEventListener("click", function () {
			if (app.validateComment()) {
				app.ajaxCall("/api/comment", "POST", {font_id:app.font_id, comment: app.comment_text.value}, "handleAddComment");
			}//end if: comment input okay?
		}); //end add event listener
		
	} else {
		this.COMMENTS_CONTROLS.appendChild(this.comment_header);
		this.comment_error.innerHTML = "You must be <a href='/login'>logged in</a> to post a comment";
		this.COMMENTS_CONTROLS.appendChild(this.comment_error);
	}//end else/if: are they logged in?
	
	this.COMMENTS_CONTAINER.appendChild(this.COMMENTS_CONTROLS);
	this.COMMENTS_CONTROLS.className = "comment_controls";
	
}; //end function: CommentManager --> buildCommentControls



/**
* Handles adding a new comment to the list of existing comments
*/
CommentManager.prototype.handleAddComment = function (data, err) {
	'use strict';
	
	if (!err) {
		if (data.length > 0) {
			this.comment_error.innerHTML = ""; //reset any previous errors
			//add the comment to the UI (based on feedback from the API)
			this.clearFields(); //no errors? cool, add the comment
			this.addComment(data[0]);
			return true;
		}
		this.setCommentError("Unable to post comment. Please try again.");
		return true;
	} //end if: was there an error?  - below comment handles that
	
	this.setCommentError(err);
}; //end function: CommentManager --> handleAddComment


/**
* Adds a comment to the Comment List
* @param comment {object} json object of a comment
*/
CommentManager.prototype.addComment = function (comment) {
	'use strict';
	var comment_box = this.commentBox(comment);
	this.COMMENTS_LIST.appendChild(comment_box);
}; //end function: CommentManager --> addComment



/** ----------------------------------------------------------- **/
/** ----------------- COMMENT ERROR HANDLING ------------------ **/
/** ----------------------------------------------------------- **/

/**
* Validates the comment field to make sure it is not empty 
* or contains any invalid characters
* @return {boolean} whether or not it is valid
*/
CommentManager.prototype.validateComment = function () {
	'use strict';
	var comment_text = this.comment_text.value,
		clean_comment = (comment_text) ? comment_text.replace(/[^0-9A-Za-z\.\?\-,!'"\s]/g, "") : "";
	
	if (comment_text === "") {
		this.setCommentError("You must first enter a comment.");
		return false;
	} //end if: is it empty?
	
	if (clean_comment !== comment_text) {
		this.setCommentError("Invalid Characters. Allowed: Alphanumeric , . ? ! ' \" - ");
		return false;
	} //end if: invalid character?
	
	return true;
}; //end function: CommentManager --> validateComment

/**
* Sets an error on the comment field
* @param err {string} the error message to display
*/
CommentManager.prototype.setCommentError = function (err) {
	'use strict';
	
	this.comment_error.innerHTML = err;
	this.comment_error.classList.add('error');
	this.comment_text.classList.add('error');
	
}; //end function: CommentManager --> setCommentError

/**
* Clears out all fields in the comment controls
* as well as any errors
*/
CommentManager.prototype.clearFields = function () {
	'use strict';
	this.comment_error.innerHTML = "";
	this.comment_text.value = "";
	this.comment_text.classList.remove('error');
}; //end function: CommentManager --> clearFields











