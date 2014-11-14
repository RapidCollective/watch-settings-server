var should = require('should');
var codeGenerator = require('../lib/code-generator');

var input = {
  "configuration": {
      "color": "ef4121",
      "appKeys": {
        "starbucks": "0",
        "showAds": "1",
        "firstName": "2",
        "age": "3",
        "color": "4"
      },
      "landing": {
          "copy": "We need you to log into your Starbucks account so we can display your barcode.",
          "image": "images/combo-lock.svg",
          "buttonName": "starbucks",
          "lastSaved": "timestamp"
      },
      "oauth": {
          "serviceName": "Starbucks",
          "serviceUrl": "http://service.url/oauth",
          "id": "starbucks",
          "lastSaved": "timestamp"
      },
      "settings": {
          "lastSaved": "timestamp",
          "settingsList": [
              {
                  "type": "title",
                  "data": {
                      "text": "Settings"
                  }
              },
              {
                  "type": "text",
                  "data": {
                      "text": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
                  }
              },
              {
                  "type": "toggle",
                  "data": {
                      "text": "Show Ads",
                      "id": "showAds",
                      "value": "true"
                  }
              },
              {
                  "type": "input",
                  "data": {
                      "placeholder": "First Name",
                      "id": "firstName",
                      "value": "Chris"
                  }
              },
              {
                  "type": "input",
                  "data": {
                      "placeholder": "Age",
                      "id": "age",
                      "value": "13"
                  }
              },
              {
                  "type": "radio",
                  "data": {
                      "text": "Pick A Color",
                      "id": "color",
                      "buttons": {
                        "RED": "Red",
                        "BLUE": "Blue",
                        "GREEN": "Green",
                        "YELLOW": "Yellow"
                      },
                      "selected": "RED"
                  }
              }
          ]
      }
  }
};

describe("cvarname", function(){
  it("should convert a string to a valid c variable name (remove space,commas,slashes/...). ", function(){
    var input = "Dirty, none C / name YUCK";

    var output = "Dirty_none_C_name_YUCK";

    codeGenerator.cvarname(input).should.eql(output);
  });
});

describe("appKeysAccessor", function() {
  it("should return configuartion.appKeys[input]", function(){
    var selectorID = "showAds";

    var output = "1";

    codeGenerator.appKeysAccessor(input, selectorID).should.eql(output);
  });
});

describe("code-generator", function(){
  it("Should generate Header file from firebase JSON", function() {

    var output = "#ifndef watchsettings_h\n\
#define watchsettings_h\n\
\n\
#include <pebble.h>\n\
\n\
#define STARBUCKS_PKEY 0\n\
char* getStarbucksToken()\;\n\
\n\
#define SHOWADS_PKEY 1\n\
bool getShowAds()\;\n\
\n\
#define FIRSTNAME_PKEY 2\n\
char* getFirstName()\;\n\
\n\
#define AGE_PKEY 3\n\
char* getAge()\;\n\
\n\
#define COLOR_PKEY 4\n\
char* getColor()\;\n\
\n\
void autoconfig_in_received_handler(DictionaryIterator *iter, void *context)\;\n\
\n\
void autoconfig_init()\;\n\
\n\
void autoconfig_deinit()\;\n\
\n\
#endif\n";

    codeGenerator.firebaseToHeader(input.configuration).should.eql(output);
  });

  it("Should generate C file from firebase JSON", function() {

    var output = {

    }

    codeGenerator.firebaseToC(input).should.eql(output);
  });
  //
  // it("Should generatre JS PebbleKit file from firebase JSON", function() {
  //
  //   var output = {
  //
  //   }
  //
  //   codeGenerator.firebaseToPebbleKit(input).should.eql(output);
  // });
});
