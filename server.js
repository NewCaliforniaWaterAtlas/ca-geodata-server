var Tilesplash = require('tilesplash');

var app = new Tilesplash('postgres://watermaster:c3ntralva113ypr0j!@ncwageoservice.ccts9i164ms9.us-east-1.rds.amazonaws.com/ncwadb');

var corsMiddleware = function(req, res, tile, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};

app.layer('auall', corsMiddleware, function(tile, render){
  render('SELECT au.au_name, ST_AsGeoJSON(the_geom) as the_geom_geojson FROM analysis_units au');
});

app.layer('countiesall', corsMiddleware, function(tile, render){
  render('SELECT ST_AsGeoJSON(geom) as the_geom_geojson FROM counties_ca;');
});

app.layer('gwlall', corsMiddleware, function(tile, render){
  this.cache(1000 * 60 * 60 * 24); //cache for one day
  render('SELECT m.casgem_station_id, m.rate, m.basin_name, ST_AsGeoJSON(m.the_geom) as the_geom_geojson FROM gwl_rates_merged m');
});

app.layer('gwlfiltered', corsMiddleware, function(tile, render){
  render('SELECT m.casgem_station_id, m.rate, m.basin_name, ST_AsGeoJSON(m.the_geom) as the_geom_geojson FROM gwl_rates_merged m WHERE m.rate >= 1');
});

app.server.listen(3000);


app.layer('slowLayer', function(tile, render){
  this.cache(1000 * 60 * 60 * 24 * 30); //cache for 30 days

  render.queryFile('slowQuery.sql');
});