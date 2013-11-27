"use strict";

var API_BASE = "https://api.xively.com/";
var API_KEY = "m4FrAG9u09PaF45HV7gurw0BTpxvFGIRtaqHVe0IcSVsxAcf";
var FEED_ID = "1067059460";

var SONAR_PIN = 7;

var needle = require('needle');
var five = require("johnny-five");


var datastreamId = "sonar";
var xivelyAddDataUrl = API_BASE + "/v2/feeds/" + FEED_ID + ".json";

var headers = {
  "X-ApiKey": API_KEY
};

var options = {
  "headers": headers,
  "json": true
};

// Johnny five
var board = new five.Board();

// How far in cm it is for when there is no detection
var NO_DETECTION_THRESHOLD = 7.5;

board.on("ready", function() {

  // Create a new `ping` hardware instance.
  var ping = new five.Ping(SONAR_PIN);

  ping.on("change", function(err, value) {
    var detectionValue = 0;

    if (this.cm < NO_DETECTION_THRESHOLD) {
      detectionValue = 1;
    }

    var data = {
      "version":"1.0.0",
      "datastreams" : [
        {
          "id" : datastreamId,
          "current_value": detectionValue
        }
      ]
    };

    console.log(value, this.cm + "cm away (" + detectionValue + ")");

    needle.put(xivelyAddDataUrl, data, options, function(err, resp, body) {
      console.log("put:", data, resp.output);
    });
  });
});