var express = require('express'),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    app = express(),
	path = require('path');
app.use(express.static("public"));
app.use(session({ secret: "hella wikced kimbo jambo" }));
app.use(bodyParser.urlencoded({ extended: false }));

app.locals.basedir = path.join(__dirname, '/app/views');
app.set('view engine', 'pug');
//include the endpoints
require('./app/loadendpoints.js')(app);

app.listen(3000, function () {
  console.log('port 3000');
});