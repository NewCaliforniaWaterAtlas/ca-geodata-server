var Tilesplash = require('tilesplash');
var credentials = require('../../credentials');

var topoJSONStubs = new Tilesplash("postgres://" + credentials.user + ":" + credentials.passwd + "@ncwageoservice.ccts9i164ms9.us-east-1.rds.amazonaws.com/ncwadb");

var port = process.env.PORT || 3000;

var corsMiddleware = function(req, res, tile, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
};

topoJSONStubs.layer('auall', corsMiddleware, function(tile, render){
  this.cache(1000 * 60 * 60 * 24); //cache for one day
  render('SELECT au.au_name, ST_AsGeoJSON(the_geom) as the_geom_geojson FROM analysis_units au');
});

topoJSONStubs.layer('countiesall', corsMiddleware, function(tile, render){
  this.cache(1000 * 60 * 60 * 24); //cache for one day
  render('SELECT ST_AsGeoJSON(geom) as the_geom_geojson FROM counties_ca;');
});

topoJSONStubs.layer('gwlall', corsMiddleware, function(tile, render){
  this.cache(1000 * 60 * 60 * 24); //cache for one day
  render('SELECT m.casgem_station_id, m.rate, m.basin_name, ST_AsGeoJSON(m.the_geom) as the_geom_geojson FROM gwl_rates_merged m');
});

topoJSONStubs.layer('gwlfiltered', corsMiddleware, function(tile, render){
	this.cache(1000 * 60 * 60 * 24); //cache for one day
  render('SELECT m.casgem_station_id, m.rate, m.basin_name, ST_AsGeoJSON(m.the_geom) as the_geom_geojson FROM gwl_rates_merged m WHERE m.rate >= 1.0');
});

module.exports = topoJSONStubs;

