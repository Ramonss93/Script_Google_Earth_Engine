////////////////////////////////////////////////////////////////////////////////
//This script will plot the US faults (<150year), and calculate the mean elevation
//on each fault or fault section
//Author: Qingkai Kong
//Date: 2015-10-08
////////////////////////////////////////////////////////////////////////////////

//read in elevation
var elevation = ee.Image('srtm90_v4');

//read in faults
var faults = ee.FeatureCollection(
    'ft:1hZHcSqxmaF2-VXtp0e3a7ju3-4B1OHBkLTs-bLGO');

//get the mean elevation of each fault
var faultsElevations = Chart.image.byRegion(
    elevation, faults, null, 200, 'name');

faultsElevations = faultsElevations.setOptions({
  title: 'US Faults mean elevation',
  vAxis: {
    title: 'Elevation (meters)'
  },
  legend: 'none',
  lineWidth: 0,
  pointSize: 3
});

print(faultsElevations);

Map.addLayer(faults, {color: 'FF0000'});
Map.setCenter(-122.4, 37.7, 7);