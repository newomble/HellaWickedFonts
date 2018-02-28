var express = require('express'),
    passport = require('passport'),
    session = require("express-session"),
    bodyParser = require("body-parser"),
    app = express();
app.use(express.static("public"));
app.use(session({ secret: "cats" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

app.get('/', function (req, res) {
  res.send('Hello World!');
});


app.listen(3000, function () {
  console.log('port 3000');
});