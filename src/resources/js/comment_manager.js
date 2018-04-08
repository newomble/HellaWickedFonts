/************************************************************
* @desc		CommentManager handles comments for fonts
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function CommentManager(comments_grab_id) {
	'use strict';
	this.init();
}//end function CommentManager

CommentManager.prototype.COMMENTS_CONTAINER = document.getElementById('comment_container');

CommentManager.prototype.COMMENTS_LIST = document.createElement('div');
CommentManager.prototype.COMMENTS_CONTROLS = document.createElement('div');


/**
* Initializes the app
*/
CommentManager.prototype.init= function () {
	'use strict';
	
	this.buildCommentsList();
	this.buildCommentControls();
	
}; //end function: CommentManager --> init


CommentManager.prototype.buildCommentsList = function () {
	'use strict';
	this.COMMENTS_CONTAINER.appendChild(this.COMMENTS_LIST);
	
	//Later make res be an ajax call and it will be the data response
	var res = [
		{
			'text' : 'I said some things about this font. You better like it!',
			'username' : 'memrie',
			'up_count' : 40,
			'down_count' : 1,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		},
		{
			'text' : 'I said some things about this font. You better like it!',
			'username' : 'memrie',
			'up_count' : 15,
			'down_count' : 7,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		},
		{
			'text' : 'I said some things about this font. You better like it!',
			'username' : 'memrie',
			'up_count' : 3,
			'down_count' : 0,
			'icon_url' : 'https://www.gravatar.com/avatar/fd675280dec9225f301bd5c90dc2bf1b?s=60&d=mm&r=g'
		}
	]; //end response var
	
	if (res) {
		if (res.length > 0) {
			this.loadComments(res);
			return true;
		} //end if: do we have any comments?
	} //end if: did we get back a response?
	
	this.COMMENTS_LIST.innerHTML = "<p>No comments have been added.</p>";
	
}; //end function: CommentManager --> buildCommentsList

CommentManager.prototype.buildCommentControls = function () {
	'use strict';
	this.COMMENTS_CONTAINER.appendChild(this.COMMENTS_LIST);
}; //end function: CommentManager --> buildCommentControls


/**
* Loads in all the comments for this page/font
*/
CommentManager.prototype.loadComments = function (comment_list) {
	'use strict';
	var i,
		comment_amt = comment_list.length,
		comment;
	
	
	for (i = 0; i < comment_amt; i++) {
		comment = this.commentBox(comment_list[i]);
		this.COMMENTS_LIST.appendChild(comment);
	} //end for: go through all comments
	
}; //end function: CommentManager --> loadComments



/**
* Gives you back a comment box with the comment, username,
* user icon and other details
*/
CommentManager.prototype.commentBox = function (user_comment) {
	'use strict';
	
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
		down_vote_icon  = document.createElement('i');
	
	
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
	
	avatar_img.setAttribute('src', user_comment.icon_url);
	username.innerHTML = user_comment.username;
	comment_text.innerHTML = user_comment.text;
	
	up_vote.innerHTML = user_comment.up_count;
	down_vote.innerHTML = user_comment.down_count;
	
	return comment_wrapper;
}; //end function: CommentManager --> commentBox








