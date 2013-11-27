// Using IR receiver http://www.maplin.co.uk/p/infrared-receiver-ch11m

"use strict";

var five = require("johnny-five"),
    board, led;

board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  led = new five.Led(11);

  // "strobe" the led in 100ms on-off phases
  led.on();

  // Create a new `potentiometer` hardware instance.
  var potentiometer = new five.Sensor({
    pin: "A1",
    freq: 250
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: potentiometer
  });

  // "data" get the current reading from the potentiometer
  potentiometer.on("data", function() {
    console.log( this.value, this.raw );
  });
});