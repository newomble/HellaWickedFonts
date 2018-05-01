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
Font.prototype.FONT_RATE = document.getElementById('font_rate');
Font.prototype.RATE_TOTAL = document.getElementById('rate_total');
Font.prototype.FONT_CODE = document.getElementById('font_use');
Font.prototype.FONT_CODE_CSS = document.getElementById('font_use_css');



/**
* Initializes the app
*/
Font.prototype.init = function () {
	'use strict';
	this.loadFont();
	//create the comment manager to populate comments & create commenting controls
	this.font_comments = new CommentManager(this.FONT_ID);
}; //end function: Font --> init


/**
* Loads in the fonts in your collection for display
*/
Font.prototype.loadFont = function () {
	'use strict';
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
		var days_array = ["sun", "mon", "tues", "wed", "thurs", "fri", "sat"],
			today = new Date(),
			todays_day = today.getDay(),
			i = 0,
			array_position = todays_day + 1,
			n;
		
		this.week_day = [];
		
		// build out the days backwards by weekday from today
		while (i < 6) {
			if (array_position === todays_day) { //its today, get out
				break;
			} else if(array_position == 7) { //6 is max, set it back to beginning
				array_position = 0;
			}
			
			this.week_day[i] = days_array[array_position];
			
			//if it is less than 7, add 1
			if (array_position < 7) {
				array_position++;
			}
			
			i++;
		} //end while: set up the week day abrevs
		
		
		this.day_pop_hist = [];
		this.day_trend_hist = [];
		
		for (n = 0; n < 6; n++) {
			var font_hist = data[n];
			
			if (font_hist) {
				this.day_pop_hist[n] = font_hist.rank;
				this.day_trend_hist[n] = font_hist.trending_rank;
			} else {
				this.day_pop_hist[n] = 0;
				this.day_trend_hist[n] = 0;
			}
			
		} //end for: go through all this font's history
		
		this.updateChart();
	} //end if: was there an error?
	
}; //end function: Font --> handleFontHistory



/**
* Builds the font stats popularity vs. trending stats line graph
*/
Font.prototype.updateChart = function () {
	'use strict';
	
	var ctx = document.getElementById("popular_month"),
		font = this.font_details;
	
	if (font) {
		this.day_pop_hist[6] = parseInt(font.popularity || 0);
		this.day_trend_hist[6] = parseInt(font.trending_rank || 0);
	}
	
	
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
					this.day_pop_hist[6]
				]
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
					this.day_trend_hist[6]
				]
			}]
		},
		options:{
			responsive: true,
			scales: {
				yAxes: [{
					ticks: {
						reverse: true,
					}
				}]
			}
		}
	});

}; //end function Font: --> updateChart


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
			
			this.FONT_RATE.innerHTML = parseFloat(this.font_details.rating || 0).toFixed(2) || "No Ratings";
			this.RATE_TOTAL.innerHTML = "total ratings: " + this.font_details.rating_total || 0;
			
			
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
				
			
			this.FONT_CODE.value = '<link href="'+ this.API_URL 
										+ this.cssFontName(font_family)
										+'" rel="stylesheet">'
			
			this.FONT_CODE_CSS.value = 'font-family:"' + font_family + '", ' + suggested_backup + ';';
										
			
		} else {
			window.history.back();
		}//end if: do we have font_details?
		
    } else {
		window.history.back();
    }//end if: did we have an error?
};//end function: Font --> handleFontLoad


var f = new Font();

