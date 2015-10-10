//Example show how to get the properties from the feature collection

//read in earthquakes from fusion table
var earthquakes_aboveM4 = ee.FeatureCollection(
    'ft:1CLRIUEI1tVKD-EIsknfisDgCDGoa7YyfoqqWSMaZ');    

//this is showing it is a feature collection
print(earthquakes_aboveM4);

//let's get the properties, note getInfo method will limit the 
//parallelization of the computing, it is better to use others
//Get the third feature
var test = earthquakes_aboveM4.getInfo().features[2].properties;
print(test);
print(test['description'])

//A better way is to convert the properties to list, the following
//is to convert from 333 feature and the next 5 to list
var test = earthquakes_aboveM4.toList(5,333);
print(test);
//or can do this
var test = ee.FeatureCollection(test).aggregate_array('name')
print(test);

//use aggregate_array
var test = earthquakes_aboveM4.aggregate_array('description')
print(test);
