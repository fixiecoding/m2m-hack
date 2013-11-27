"use strict";

var API_BASE = "https://api.xively.com/";
var API_KEY = "wtGfQ1fsCxwawA3MQz8KNwzPseNAjzJCOyYC941MShUzq5ML";
var FEED_ID = "614944872";
var DATASTREAM_ID = "counter";

var IR_DETECTION_THRESHOLD = 150;

// How far in cm it is for when there is no detection
var SONAR_NO_DETECTION_THRESHOLD = 7.5;
// Min value for sonar detection
var SONAR_NO_DETECTION_MIN = 1;

var IR_TRANSMITTER_PIN = 11;
var SONAR_PIN = 7;

var needle = require('needle');
var five = require("johnny-five");
var Sensor = require("./lib/Sensor");

var xivelyAddDataUrl = API_BASE + "/v2/feeds/" + FEED_ID + ".json";
var xivelyGetDataUrl = API_BASE + "/v2/feeds/" + FEED_ID + "/datastreams/" + DATASTREAM_ID;

var headers = {
  "X-ApiKey": API_KEY
};

var options = {
  "headers": headers,
  "json": true
};

// Johnny five
var board = new five.Board();

board.on("ready", function() {

  // IR LED
  var led = new five.Led(IR_TRANSMITTER_PIN);
  led.on();

  // Create a new IR receiver hardware instance.
  var irReceiver = new Sensor("A1", board);

  // Boolean to check if it is currently decrementing,
  // so that there are not duplicate calls to the api
  var irIsDecrementing = false;

  irReceiver.on("read", function(value) {
    console.log("ir value:", value);

    if (!irIsDecrementing) {
      if (value < IR_DETECTION_THRESHOLD) {
        console.log("DETECTED: out");
        irIsDecrementing = true;
        needle.get(xivelyGetDataUrl, options, function(err, resp, body){
          var currentVal = body["current_value"] || 0;
          console.log("ir get", body);

          if (currentVal) {
            var currentValNum = parseInt(currentVal, 10);

            // Subtract value
            var newVal = currentValNum - 1;

            var data = {
              "version":"1.0.0",
              "datastreams" : [
                {
                  "id" : DATASTREAM_ID,
                  "current_value": newVal
                }
              ]
            };

            console.log(currentVal, '->', newVal);

            needle.put(xivelyAddDataUrl, data, options, function(err, resp, body) {
              console.log("put:", data, resp.output);
              irIsDecrementing = false;
            });
          }
        });
      }
    }
  });

  // Create a new `ping` hardware instance.
  var ping = new five.Ping(SONAR_PIN);

  ping.on("change", function(err, value) {
    if (this.cm < SONAR_NO_DETECTION_THRESHOLD &&
        this.cm > SONAR_NO_DETECTION_MIN) {
      console.log("DETECTED: in", value, this.cm + "cm away");
      needle.get(xivelyGetDataUrl, options, function(err, resp, body){
        var currentVal = body["current_value"] || 0;
        console.log("sonar get", body);
        if (currentVal) {
          var currentValNum = parseInt(currentVal, 10);
          var newVal = currentValNum + 1;

          var data = {
            "version":"1.0.0",
            "datastreams" : [
              {
                "id" : DATASTREAM_ID,
                "current_value": newVal
              }
            ]
          };

          console.log(currentVal, '->', newVal);

          needle.put(xivelyAddDataUrl, data, options, function(err, resp, body) {
            console.log("put:", data, resp.output);
          });
        }
      });
    }
  });
});