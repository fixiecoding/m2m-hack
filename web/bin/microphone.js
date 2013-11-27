var five = require("johnny-five");
var Microphone = require("./lib/Microphone");

var MICROPHONE_PIN = "A1";
var LIGHT_PIN = 11;

var AMBIENT_SOUND_VALUE = 345;

var board;

board = new five.Board();

board.on("ready", function() {
  "use strict";

  // Microphone
  var microphone = new Microphone(MICROPHONE_PIN, board);
  var light = new five.Led(LIGHT_PIN);

  microphone.on("read", function(value) {
    var soundVal = value - AMBIENT_SOUND_VALUE;

    console.log(soundVal);

    if (soundVal > 0) {
      console.log(soundVal);
      light.brightness(soundVal);
    } else {
      light.brightness(0);
    }
  });

});