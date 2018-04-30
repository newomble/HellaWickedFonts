var gCon = require("./general.face.js"),
    uCon = require("./user.face.js"),
    merger = require("merge-json");
    
module.exports = merger.merge(gCon,uCon);