////////////////////////////////////////////////////////////////////////////////
//This script will plot the seismic stations from Berkeley Network and display a 
//20km buffer zone
//First need put the list of station locations in the fusion table, and share it
//Author: Qingkai Kong
//Date: 2015-09-25
////////////////////////////////////////////////////////////////////////////////

//read in stations from my fusion table
var stations = ee.FeatureCollection(
    'ft:16fpOEDCj1o7Tjhu3ep33Cw9hsn32d_y7OZYtKjwb');

//Add a 20km buffer
var stations_buffered = stations.map(function(f) { return f.buffer(20000); });

//Plot out
Map.addLayer(stations_buffered, {color: '800080'});

Map.setCenter(-122.4, 37.7, 11);