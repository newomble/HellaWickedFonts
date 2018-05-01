var md5 = require("md5"),
bCrypt = require('bcrypt-nodejs');

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

function insertResponse(client,res){
    client( function(err,vals ){
        if(err){
			dberr(err,res);
        }else{
            if( vals && vals.rows && vals.rows[0] ){
                res.send(vals.rows[0]);
            }else{
                res.send(true);
            }
        }
    });
}

function sendRows(client,res){
    client(function(err,vals){
        if(err){
            dberr(err,res);
        }else{
            vals.rows.forEach(element => {
                if(element.email){
                    element.icon = makeGravLink(element.email);
                }
            });
            res.send(vals.rows);
        }
    });
}

function makeGravLink(email){
    return process.env.icon_url+"avatar/"+md5((email.trim()).toLowerCase() );
}

function dberr(err,res){
	//If we were tracking problems properly we'd have a class here that saves logs and stuff
    console.log(err);
    res.send("DB Error.");
}

function stripSensative(res){
    delete res["password"];
    delete res["salt"];
    return res;
}

function noResponse(client){
    client(function(err,vals){
        if(err){
            console.log(err);
        }
    });
}

function createHash(password,salt){
    return bCrypt.hashSync(password,salt, null);
};

module.exports = {
	isNumeric: isNumeric,
	isStringUnder45: isStringUnder45,
	isString: isString,
	isEmail: isEmail,
	insertResponse:insertResponse,
	sendRows:sendRows,
	makeGravLink:makeGravLink,
	dberr:dberr,
	stripSensative:stripSensative,
	noResponse:noResponse,
	createHash:createHash
}