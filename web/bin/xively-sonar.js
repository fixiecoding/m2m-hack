"use strict";

var API_BASE = "https://api.xively.com/";
var API_KEY = "m4FrAG9u09PaF45HV7gurw0BTpxvFGIRtaqHVe0IcSVsxAcf";
var FEED_ID = "1067059460";
var DATASTREAM_ID = "sonar";

var IR_DETECTION_THRESHOLD = 150;

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

// How far in cm it is for when there is no detection
var NO_DETECTION_THRESHOLD = 7.5;

board.on("ready", function() {

  // IR LED
  var led = new five.Led(IR_TRANSMITTER_PIN);
  led.on();

  // Create a new IR receiver hardware instance.
  var irReceiver = new Sensor("A1", board);

  // Boolean to check if it is currently decrementing,
  // so that there are not duplicate calls to the api
  var isDecrementing = false;

  irReceiver.on("read", function(value) {
    console.log("ir value:", value);

    if (!isDecrementing) {
      if (value < IR_DETECTION_THRESHOLD) {
        console.log("DETECTED: out");
        isDecrementing = true;
        needle.get(xivelyGetDataUrl, options, function(err, resp, body){
          var currentVal = body["current_value"];
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
              isDecrementing = false;
            });
          }
        });
      }
    }
  });

  // Create a new `ping` hardware instance.
  // var ping = new five.Ping(SONAR_PIN);

  // ping.on("change", function(err, value) {
  //   console.log(value, this.cm + "cm away");

  //   if (this.cm < NO_DETECTION_THRESHOLD) {
  //     needle.get(xivelyGetDataUrl, options, function(err, resp, body){
  //       var currentVal = body["current_value"];
  //       var currentValNum = parseInt(currentVal, 10);
  //       var newVal = currentValNum + 1;

  //       var data = {
  //         "version":"1.0.0",
  //         "datastreams" : [
  //           {
  //             "id" : DATASTREAM_ID,
  //             "current_value": newVal
  //           }
  //         ]
  //       };

  //       console.log(currentVal, '->', newVal);

  //       needle.put(xivelyAddDataUrl, data, options, function(err, resp, body) {
  //         console.log("put:", data, resp.output);
  //       });
  //     });
  //   }
  // });
});