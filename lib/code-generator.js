var handlebars = require('handlebars');
var swag       = require('swag');
var fs         = require('fs');
//test firebase json
var test       = require('../firebase.json').apps["watch-coffee"];
swag.registerHelpers(handlebars);

var persitantDataSize = 0;

handlebars.registerHelper('cvarname', function(items, options){
  return cvarname(items);
});

handlebars.registerHelper('appKeysAccessor', function(items, options){
  return appKeysAccessor(test, items);
});

handlebars.registerHelper('addToPersistant', function(items, options){
  console.log(items);
  return addToPersistant(items);
});

function firebaseToHeader(input) {
  var headerTemplate = fs.readFileSync('./autoconfig.h');
  var headerBars = handlebars.compile(cleanUpWhiteSpace(removeComments(headerTemplate.toString())));
  return headerBars(input);
}

function cvarname(input) {
  if(!input) {
    console.log("input was undefined! input: " + input);
    return "problem"
  } else {
    return input.replace(/\s[^\w]+|\s|[^\w]\s+|[^\w]+/g, '_');
  }

}

function addToPersistant(bytes) {
  persistantDataSize += bytes;
  if(bytes > 4000){
    console.log("ERROR: The size of all persisted values cannot exceed 4KB but your parameters require "+persistantDataSize+"B");
  }
}

function appKeysAccessor(input, selectorId) {
  return input.configuration.appKeys[selectorId];
}

function removeComments(input) {
  //removes: /*jhdjhdf""*/
  input = input.replace(/\/\*.+?\*\//g, '');
  //console.log(input);
  return input;
}

function cleanUpWhiteSpace(input) {
  input = input.replace(/^ {1,2}/gm, '');
  //console.log(input);
  return input;
}

console.log(firebaseToHeader(test.configuration));

module.exports = {
  cvarname: cvarname,
  firebaseToHeader: firebaseToHeader,
  appKeysAccessor: appKeysAccessor
};
