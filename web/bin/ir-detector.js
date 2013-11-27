// Using IR receiver http://www.maplin.co.uk/p/infrared-receiver-ch11m

"use strict";

// Ambient ifrared values
var IR_DETECTION_THRESHOLD = 150;

var five = require("johnny-five");
var Sensor = require("./lib/Sensor");

var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  var led = new five.Led(11);

  // "strobe" the led in 100ms on-off phases
  led.on();

  // Create a new IR receiver hardware instance.
  var irReceiver = new Sensor("A1", board);

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: irReceiver
  });

  // "data" get the current reading from the irReceiver
  irReceiver.on("read", function(value) {
    console.log("ir value:", value);

    if (value < IR_DETECTION_THRESHOLD) {
      console.log("DETECTED!");
    }
  });
});