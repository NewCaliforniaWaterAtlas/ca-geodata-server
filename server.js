var topoJSONEnds = require('./routes/topojson/troutes.js');
var credentials = require('./credentials');
var express = require('express');

var app = express();
app.use(express.bodyParser());
app.use(app.router);
app.conString = "postgres://" + credentials.user + ":" + credentials.passwd + "@ncwageoservice.ccts9i164ms9.us-east-1.rds.amazonaws.com/ncwadb";

var tport = process.env.PORT || 3000;
var gport = process.env.PORT || 8000;

process.on('uncaughtException', function (error) {
  console.log(error.stack);
});

require('./routes/geojson/groutes.js')(app);

app.listen(gport);
console.log("App listening on port " + gport);

topoJSONEnds.server.listen(tport);
console.log("App listening on port " + tport);