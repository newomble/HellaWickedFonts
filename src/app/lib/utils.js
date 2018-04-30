function isNumeric(val){
	if(doesExist(val)){
		if(isNaN(val)){
			return false;
		}else{
			return true;
		}
	}else{
		return false;
	}
}

function isStringUnder45(val){
	if(doesExist(val)){
		if(val.length < 45){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function isString(val){
	if(doesExist(val)){
		if(typeof val == "string"){
			return true;
		}else{
			return false;
		}
	}else{
		return false;
	}
}

function isEmail(val){
	if(doesExist(val)){
		var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		if(re.test(val)){
  			return true;
  		}else{
  			return false;
  		}
	}else{
		return false;
	}
}

function doesExist(val){
	if (val) {
    	return true;
	}else{
		return false;
	}
}

module.exports = {
	isNumeric: isNumeric,
	isStringUnder45: isStringUnder45,
	isString: isString,
	isEmail: isEmail
}