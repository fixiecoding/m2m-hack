// Using IR receiver http://www.maplin.co.uk/p/infrared-receiver-ch11m

"use strict";

// Ambient ifrared values
var AMBIENT_IR = 20;
var IR_DETECTION_THRESHOLD = 100;

var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  var led = new five.Led(11);

  // "strobe" the led in 100ms on-off phases
  led.on();

  // Create a new IR receiver hardware instance.
  var irReceiver = new five.Sensor({
    pin: "A1",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: irReceiver
  });

  // "data" get the current reading from the irReceiver
  irReceiver.on("data", function() {
    console.log("ir value:", this.value);

    if (this.value < IR_DETECTION_THRESHOLD) {
      console.log("DETECTED!");
    }
  });
});