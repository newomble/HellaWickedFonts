var config = require("./config/config.js").development;
process.env.modelRoot = config.paths.data;
process.env.apikey = config.apiKey;
process.env.icon_url = config.icon_url;

var express = require('express'),
    session = require("express-session"),
    app = express();



app.use(express.static("public"));
app.use(session({ secret: "hella wikced kimbo jambo" }));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json()); 
app.use(express.urlencoded());

//include the endpoints
require('./app/loadendpoints.js')(app);

app.listen(config.port, function () {
  console.log('port '+config.port);
});