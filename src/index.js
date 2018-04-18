var express = require('express'),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    app = express();



app.use(express.static("public"));
app.use(session({ secret: "hella wikced kimbo jambo" }));
app.use(bodyParser.urlencoded({ extended: false }));

//include the endpoints
require('./app/loadendpoints.js')(app);

app.listen(3000, function () {
  console.log('port 3000');
});