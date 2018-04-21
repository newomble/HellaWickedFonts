var express = require('express'),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    config = require("./config/config.js").development,
    app = express();
app.use(express.static("public"));
app.use(session({ secret: "hella wikced kimbo jambo" }));
app.use(bodyParser.urlencoded({ extended: false }));

//include the endpoints
require('./app/loadendpoints.js')(app);
process.env.modelRoot = config.paths.data;

app.listen(config.port, function () {
  console.log('port '+config.port);
});