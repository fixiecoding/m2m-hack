# m2m-hack

A website built using [generator-starttter](https://github.com/taktran/generator-starttter).

## Development

Install modules

    npm install

Start the server

    grunt

View the site at [http://localhost:7770](http://localhost:7770), or your local (internal) ip address (useful for testing on other devices). You can also run

    grunt open

To run the site on another port, use the `port` flag eg,

    grunt --port=3000

To run the site using a different livereload port (default is `35729`), use the `lrp` flag (prevents this error: `Fatal error: Port 35729 is already in use by another process.`) eg,

    grunt --lrp=35720

## Hardware

### Prerequisites

1. Wire up the arduino. (TODO)
2. Upload firmata sketch onto the arudino (Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata)

### Development

Run the files in `bin`.

eg,

    node bin/bee-counter.js

## Testing

Uses [karma](http://karma-runner.github.io/) and [jasmine](http://pivotal.github.io/jasmine/).

Karma is run automatically when `grunt` is called. To run it manually

    karma start config/karma.conf.js

For continuous integration, run

    grunt ci:test

    # Or,

    npm test
