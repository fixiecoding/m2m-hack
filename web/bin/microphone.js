var five = require("johnny-five");
var Sensor = require("./lib/Sensor");

var MICROPHONE_PIN = "A1";

var board;

board = new five.Board();

board.on("ready", function() {
  "use strict";

  // Microphone
  var microphone = new Sensor(MICROPHONE_PIN, board);


  microphone.on("read", function(value) {
    console.log(value);
  });

});