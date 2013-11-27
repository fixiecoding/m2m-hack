"use strict";

var five = require("johnny-five");

var board = new five.Board();

board.on("ready", function() {

  // Create a new `ping` hardware instance.
  var ping = new five.Ping(7);

  // Properties

  // ping.microseconds
  //
  // Roundtrip distance in microseconds
  //

  // ping.inches
  //
  // Calculated distance to object in inches
  //

  // ping.cm
  //
  // Calculated distance to object in centimeters
  //


  // Ping Event API

  // "data" get the current reading from the ping
  ping.on("data", function( err, value ) {
    // console.log( "data", value );
  });

  ping.on("change", function( err, value ) {
    console.log( "Object is " + this.cm + "cm away" );
  });
});