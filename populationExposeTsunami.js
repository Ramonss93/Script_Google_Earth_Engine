///////////////////////////////////////////////////////////
//This script will calculate the total population expose to Tsunami hazards. 
//It is calculate people below 30m elevation and within 20km distance from subduction zone
//Author: Qingkai Kong
//Date: 2015-09-25
///////////////////////////////////////////////////////////


//Import world population
var pop = ee.ImageCollection("WorldPop/POP");

//Import elevation
var elev = ee.Image('srtm90_v4');

//Get subduction zone, this is my private data, so you may need to add yours to fusion 
//table
var subduction_zone = ee.FeatureCollection('ft:1pKsfyQDzvDHksHjes3Agm9TzKcLgjlrBofvz8eGu')

//Subduction_zone buffer 20km
var subduction_zone_buf = subduction_zone.map(function(f) { return f.buffer(20000); });
Map.addLayer(subduction_zone_buf);
Map.addLayer(subduction_zone, {palette: '00AA00'});
print(subduction_zone)

//Here by taking mean, it seems some of the countries becomes masked, e.g. US, etc. 
//Need find a better way to get the whole world population
var popMean = pop.mean();

//Now only select the population below elevation 30m
var blank = ee.Image(0);
var output = blank.where(elev.lte(30), 1);
// Output contains 0s and 1s.  Mask it with itself to get rid of the 0s.
var popBelow30 = popMean.mask(output);

//Resample the region that satisfy our requirement, note that scale is a parameter that
//sample pixels in the region at 500 meters, and you need specify maxPixels, otherwise, 
//the default is only 1000000 pixels. 
var popExpose = popBelow30.reduceRegion(
  {
  reducer: ee.Reducer.sum(),
  geometry: subduction_zone_buf,
  scale: 500,
  maxPixels: 1e9
});

print(popExpose)