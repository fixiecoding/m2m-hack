"use strict";

var API_BASE = "https://api.xively.com/";
var API_KEY = "wtGfQ1fsCxwawA3MQz8KNwzPseNAjzJCOyYC941MShUzq5ML";
var FEED_ID = "614944872";

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
    console.log(body["current_value"]);
  });
});