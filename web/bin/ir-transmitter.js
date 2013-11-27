// Using IR transmitter http://www.maplin.co.uk/p/infrared-transmitter-ch10l

"use strict";

var five = require("johnny-five"),
    board, led;

board = new five.Board();

board.on("ready", function() {

  // Create a standard `led` hardware instance
  led = new five.Led(11);

  // "strobe" the led in 100ms on-off phases
  led.strobe( 100 );
});