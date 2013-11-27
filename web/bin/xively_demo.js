"use strict";

var API_BASE = "https://api.xively.com/";
var API_KEY = "m4FrAG9u09PaF45HV7gurw0BTpxvFGIRtaqHVe0IcSVsxAcf";
var FEED_ID = "1067059460";

var needle = require('needle');


var datastreamId = "test";
var xivelyAddDataUrl = API_BASE + "/v2/feeds/" + FEED_ID + ".json";
var xivelyGetDataUrl = API_BASE + "/v2/feeds/" + FEED_ID + "/datastreams/" + datastreamId;

var headers = {
  "X-ApiKey": API_KEY
};

var options = {
  "headers": headers,
  "json": true
};

var data = {
  "version":"1.0.0",
  "datastreams" : [
    {
      "id" : datastreamId,
      "current_value" : "55"
    }
  ]
};

needle.put(xivelyAddDataUrl, data, options, function(err, resp, body){
  console.log("put:", resp.output);

  needle.get(xivelyGetDataUrl, options, function(err, resp, body){
    console.log(body);
  });
});