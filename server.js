var express = require("express");
var app = express();
var router = express.Router();
var exphbs = require('express-handlebars');
var jwt = require('jsonwebtoken');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/", router);

router.get("/", authenticate, function(req, res) {
    res.render('index', {
      user: req.user
    });
});

// Assets ================================================================
app.use("/vendor", express.static(__dirname + '/vendor'));

app.listen(8081, function() {
    console.log("Live at Port 8081");
});

function authenticate(req, res, next) {
  jwt.verify(req.cookies['access-token'], process.env.JWT_SECRET, function(err, decoded) {
    if (decoded) {
      req.user = decoded._doc;      
    }
    if (err) {
      console.log(err);
    }
    return next();
  });
}
