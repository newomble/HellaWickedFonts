
function ManageFavorites () {
	'use strict';
	this.init();
}//end function: ManageFavorites

ManageFavorites.prototype.ALL_ICONS = document.getElementsByClassName('favorite');

ManageFavorites.prototype.init = function () {
	'use strict';
	var i, 
		fav_icon_count = this.ALL_ICONS.length, 
		app = this;
	
	
	for (i = 0; i < fav_icon_count; i++) {
		
		this.ALL_ICONS[i].addEventListener("click", function (){
			var fid = this.getAttribute('data-font-id'),
				is_fav = (this.getAttribute('data-is-favorite') == "true") ? false : true;
			
			if (is_fav) {
				this.className = this.className.replace('far', 'fas');
			} else {
				this.className = this.className.replace('fas', 'far');
			} //end else/if: was it set to be a favorite before?
			
			app.handleFavChange(fid, is_fav);
			this.setAttribute('data-is-favorite', String(!!is_fav));
			
		});
	}//end for: go through all fav icons
	
}; //end function: ManageFavorites --> 



ManageFavorites.prototype.handleFavChange = function (id, is_fav) {
	'use strict';
	console.log(id);
	console.log(is_fav);
	
	//make an ajax call to set it
	
}; //end function: ManageFavorites --> handleFavChange


var lm = new ManageFavorites();

