var path = require('path'),
    basePath = path.dirname(require.main.filename),
    pageRoot =  basePath + "/app/resources/pages",
    controller = require(basePath+"/app/controlla/index.face.js"),
    md5 = require("md5"),
    fs = require('fs'),
    tjs = require("templatesjs");

var usrModel = require(process.env.modelRoot+"user.model.js"),
    collModel = require(process.env.modelRoot+"user_font.model.js"),
    fontModel = require(process.env.modelRoot+"font.model.js");

tjs.dir = basePath+"/app/resources/templates/";

var list = {
    title: "Home",
	
	// the base gravatar url / md5 email / cosmetic (icon size)
    icon: null
} //attributes we want to display



function prefPage(req,res){
    initList(req, "Your Preferences" );
	list.username = req.session.user.username;
	list.email = req.session.user.email;
	list.first_name = req.session.first_name;
	list.last_name = req.session.last_name;
	list.gravatar_base_url = process.env.icon_url;
    list.user_id = req.session.user.user_id;
    
    var data = fs.readFileSync(pageRoot+'/preferences.html');
    renderRequestedPage(data, res); 
}

function userPage(uid,req,res){
    initList(req, "View User" );
    var client = usrModel.get(uid);
    client(function(err,vals){
        if(err){
            onDBError(err,res);
            return;
        }else if(vals.rows[0]){
            aUser = vals.rows[0];
            list.username = aUser.username;
            list.user_prof_icon = makeGravLink(aUser.email);
            list.user_prof_id = aUser.user_id;
        }
        var data = fs.readFileSync(pageRoot+'/user.html');
        console.log(list);
        renderRequestedPage(data, res); 
    });

}

function signup(req,res){
    initList(req, "Signup");
    var data = fs.readFileSync(pageRoot+'/signup.html');
    renderRequestedPage(data, res); 
}

function homePage(req,res){
    initList(req, "Home");
    var data = fs.readFileSync(pageRoot+'/index.html');
    renderRequestedPage(data, res);
}

function loginPage(req,res){
    initList(req, "Login");
    var data = fs.readFileSync(pageRoot+'/login.html');
    renderRequestedPage(data, res); 
}

function fontPage(fid,req,res){
    initList(req, "Font");
    list.font_id = fid;
    var data = fs.readFileSync(pageRoot+'/font.html');
    renderRequestedPage(data, res); 
}

function collectionPage(cid,req,res){
    initList(req, "My Collection");
    var client = collModel.getFromUser(cid);
    client(function(err,vals){
        if(err){
            onDBError(err,res);
            return;
        }else if(vals.rows[0]){
            var theColl = vals.rows[0];
            //TODO: collection in template format
        }
        var data = fs.readFileSync(pageRoot+'/collection.html');
        renderRequestedPage(data, res); 
    })   
}

function searchPage(req,res){
    initList(req,"Search");
    var data = fs.readFileSync(pageRoot+'/search.html');
    renderRequestedPage(data, res); 
}
function test(req,res){
    renderRequestedPage(fs.readFileSync(basePath+"/app/resources/templates/logged_in.html"),res);
}

module.exports = {
    prefPage:prefPage,
    userPage:userPage,
    signup:signup,
    homePage:homePage,
    loginPage:loginPage,
    fontPage:fontPage,
    collectionPage:collectionPage,
    searchPage:searchPage,
    test:test
}



function initList(req,title){
    list.title= title;
    if(req.session.loggedIn){
        list.user_id = req.session.user.user_id;
        list.isLoggedIn = req.session.loggedIn;
        list.icon = req.session.user.icon;
		
		tjs.setSync(fs.readFileSync( basePath+"/app/resources/templates/logged_in.html"));   
    	var output = tjs.renderAllSync(list);
        list.nav = output;
    } else{
        list.isLoggedIn = false;
        list.nav = fs.readFileSync( basePath+"/app/resources/templates/logged_out.html");
    }
}

function makeGravLink(email){
    return process.env.icon_url+"avatar/"+md5((email.trim()).toLowerCase() );
}

function renderRequestedPage(data, res) {
    tjs.setSync(data);   
    console.log(list);
    var output = tjs.renderAllSync(list);  
    res.write(output);  
    res.end(); 
} //end function: renderRequestedPage

function onDBError(err,res){
    console.log(err);
    var data = fs.readFileSync(pageRoot+'/404.html');
    renderRequestedPage(data,res);
}