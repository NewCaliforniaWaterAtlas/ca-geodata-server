topoJSONStubs = require('./routes/topojson/stubs.js');

var port = process.env.PORT || 3000;

topoJSONStubs.server.listen(port);
console.log("App listening on port " + port);