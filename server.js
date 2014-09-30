var Tilesplash = require('tilesplash');

var app = new Tilesplash('postgres://watermaster:c3ntralva113ypr0j!@ncwageoservice.ccts9i164ms9.us-east-1.rds.amazonaws.com/ncwadb');

app.layer('simple', function(tile, render){
  // render('SELECT au.au_name, ST_AsGeoJSON(au.geom) as the_geom_geojson FROM analysis_units au');
  render('SELECT m.casgem_station_id, m.rate, m.basin_name, ST_AsGeoJSON(m.the_geom) as the_geom_geojson FROM gwl_rates_merged m WHERE m.rate >= 1');
});


app.server.listen(3000);
