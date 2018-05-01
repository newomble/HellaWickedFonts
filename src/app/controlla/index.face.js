/** 
 * Merges the facades into one object so we can re-organize them as shit grows
 * and not touch the service layer
*/
var gCon = require("./general.face.js"),
    uCon = require("./user.face.js"),
    merger = require("merge-json");
    
module.exports = merger.merge(gCon,uCon);