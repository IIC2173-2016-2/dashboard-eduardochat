var express = require("express");
var app = express();
var router = express.Router();

router.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.use("/", router);

// Assets ================================================================
app.use("/vendor", express.static(__dirname + '/vendor'));

app.listen(8081, function() {
    console.log("Live at Port 8081");
});
