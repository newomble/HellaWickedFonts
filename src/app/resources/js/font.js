/************************************************************
* @desc		Handles the Font view page
*
* @author	erika tobias (et5392@rit.edu)
* @date		4/8/2018
*************************************************************/


/**
* @constructor
*/
function Font() {
	'use strict';
	this.init();
}//end function Font

/** ----------------------------------------------------------- **/
/** --------------------- INHERIT CLASSES --------------------- **/
/** ----------------------------------------------------------- **/
Font.prototype = Object.create(HellaWickedFonts.prototype);
Font.prototype.constructor = Font;

Font.prototype.FONT_ID = document.getElementById('font_id').value;

Font.prototype.FONT_COMMENTS = document.getElementById('font_comments');
Font.prototype.FONT_TITLE = document.getElementById('font_name');
Font.prototype.FONT_PREVIEW = document.getElementById('font_preview');

Font.prototype.POP_RANK = document.getElementById('pop_rank');
Font.prototype.TREND_RANK = document.getElementById('trend_rank');
Font.prototype.FONT_TYPE = document.getElementById('font_type');
Font.prototype.FONT_FAM = document.getElementById('font_family');
Font.prototype.FONT_CODE = document.getElementById('font_use');



/**
* Initializes the app
*/
Font.prototype.init = function () {
	'use strict';
	this.loadFont();
	//create the comment manager to populate comments
	//and create commenting controls
	this.font_comments = new CommentManager(this.FONT_ID);
	//this.updateChart();
}; //end function: Font --> init


/**
* Loads in the fonts in your collection for display
*/
Font.prototype.loadFont = function () {
	'use strict';
	
	///make an ajax call to gather the fonts that are this users favorites.
	this.ajaxCall("/api/font", "POST", {id:this.FONT_ID}, "handleFontLoad");
	
	this.ajaxCall("/api/font/history", "POST", {font_id:this.FONT_ID}, "handleFontHistory");
}; //end function: Font --> init

/**
* handles the response from attempting to login
* @param data {JSON} the response from the back-end
* @param err {string|boolean} false if no error, string if there is
*/
Font.prototype.handleFontHistory = function (data, err) {
	
	if (!err) {
		
		this.day_pop_hist = [
			130,244,567,432,234,567
		];
		
		this.day_trend_hist = [
			345,123,543,765,456,346
		];
		
		this.week_day = [
			"tues","wed","thur","fri","sat","sun"
		];
		
		this.updateChart();
	}
	
};


Font.prototype.updateChart = function () {
	'use strict';
	
	var ctx = document.getElementById("popular_month");
	var myChart = new Chart(ctx, {
		type: 'line',
		data:{ 
			labels: [
				this.week_day[0],
				this.week_day[1],
				this.week_day[2],
				this.week_day[3],
				this.week_day[4],
				this.week_day[5],
				"today"],
        	datasets: [{
				label: 'popularity rank',
				borderColor: "#B975BD",
				backgroundColor: "#B975BD",
				fill: false,
            	data: [
					this.day_pop_hist[0], 
					this.day_pop_hist[1], 
					this.day_pop_hist[2],
					this.day_pop_hist[3], 
					this.day_pop_hist[4], 
					this.day_pop_hist[5], 
					parseInt(this.font_details.popularity)]
			},{
				label: 'trending rank',
				borderColor:"#75BDB9",
				backgroundColor: "#75BDB9",
				fill: false,
            	data: [
					this.day_trend_hist[0], 
					this.day_trend_hist[1], 
					this.day_trend_hist[2],
					this.day_trend_hist[3], 
					this.day_trend_hist[4], 
					this.day_trend_hist[5],
					parseInt(this.font_details.trending_rank)]
			}]
		},
		options:{
			responsive: true
		}
	});

}; //end function


/**
* handles the response from attempting to login
* @param data {JSON} the response from the back-end
* @param err {string|boolean} false if no error, string if there is
*/
Font.prototype.handleFontLoad = function (data, err) {
    'use strict';
    if  (!err)  {
		if (data.length > 0) {
			this.font_details = data[0];
			
			var font_family = this.font_details.family ;
			this.FONT_TITLE.innerHTML = "<span style='font-family:\""+font_family+"\", arial;'>" + font_family + "</span>";
			var is_fav = (parseInt(this.font_details.favorite, 10) === 1) ? true : false;
			var font_pre = this.getFontBox(this.font_details, false, false);
			
			
			font_pre.classList.add('max_width');
			font_pre.style.minHeight = "initial";
			this.FONT_PREVIEW.appendChild(font_pre);
			
			this.POP_RANK.innerHTML = this.font_details.popularity;
			this.TREND_RANK.innerHTML = this.font_details.trending_rank;
			this.FONT_TYPE.innerHTML = this.font_details.kind; 
			this.FONT_FAM.innerHTML = font_family;
			
			
			var suggested_backup = "serif";
			
			switch (this.font_details.kind) {
				case "monospace" :
					suggested_backup = "monospace";
					break;
				case "sans-serif":
					suggested_backup = "sans-serif";
					break;
				case "handwriting":
					suggested_backup = "cursive";
					break;
				case "display":
					suggested_backup = "cursive";
					break;
			} //end switch
				
			
			this.FONT_CODE.innerHTML = '&lt;link href="'+ this.API_URL 
										+ this.cssFontName(font_family)
										+'" rel="stylesheet"&gt;'
										+ '<br><br><b>CSS:</b><br>' 
										+ 'font-family:"' + font_family + '", ' + suggested_backup + ';'; 
			
		} //end if: do we have font_details?
        
		
		
		
    } else {
		
		this.FONT_TITLE.innerHTML = "{Unknown Font}";
        //there was an error, err will hold the error message
    }//end if: did we have an error?
};//end function: Font --> handleFontLoad







var f = new Font();







