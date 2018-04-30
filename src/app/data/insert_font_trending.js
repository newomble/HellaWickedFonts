var config = require("../../config/config.js").development;
process.env.modelRoot = config.paths.data;
process.env.apikey = config.apiKey;
process.env.icon_url = config.icon_url;
process.env.DBuser = config.dbInfo.user;
process.env.DBpass= config.dbInfo.pass;
process.env.DBloc = config.dbInfo.loc;

const request = require('request');
const font = require("./font.model.js");

const trendingUrl = "https://www.googleapis.com/webfonts/v1/webfonts?key="+config.apiKey+"=trending";

request(trendingUrl, { json: true }, (err, res, body) => {
    var client = font.getAll();
    client(function(err,results){
        if(err){console.log(err);return;}
        if(results.rows.length != 0){
        for(var i = 0; i < body.items.length; i++){
            for(var k = 0; k < results.rows.length; k++){
                //Compare an API font with a font from the DB
                if(body.items[i].family == results.rows[k].family){
                    var insertClient = font.updateTrending((i+1),results.rows[k]);
                    insertClient(function(er,insertResults){
                       if(er){
                           console.log(er);return;
                       }else{
                             console.log("Updated font Trending");
                       }
                    });
                }
           }
        }
        }else{
            console.log("No Fonts in DB");
            return;
        }

    });
});