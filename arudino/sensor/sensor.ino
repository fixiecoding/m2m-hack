#include <SPI.h>
#include <GSM.h>
#include <HttpClient.h>
#include <Xively.h>

// Your phone SIM PIN Number
#define PINNUMBER ""

// Your phone APN data
#define GPRS_APN       "eseye.com" // replace your GPRS APN
#define GPRS_LOGIN     ""    // replace with your GPRS login
#define GPRS_PASSWORD  "" // replace with your GPRS password

// The amount the pressure sensor has to go down by before it is sent to xively
#define PRESSURE_SENSOR_THRESHOLD 100


// Your Xively key to let you upload data
char xivelyKey[] = "m4FrAG9u09PaF45HV7gurw0BTpxvFGIRtaqHVe0IcSVsxAcf";

// Analog pin which we're monitoring
int sensorPin = A0;

// Define the strings for our datastream IDs
char sensorId[] = "pressure";
XivelyDatastream datastreams[] = {
  XivelyDatastream(sensorId, strlen(sensorId), DATASTREAM_FLOAT),
};
// Finally, wrap the datastreams into a feed
XivelyFeed feed(1067059460, datastreams, 1 /* number of datastreams */);

// initialize the library instance
GSM gsmAccess;     // include a 'true' parameter to enable debugging
GPRS gprs;
GSMClient client;
XivelyClient xivelyclient(client);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
  while (!Serial) {
    ; // wait for serial port to connect. Needed for Leonardo only
  }

  Serial.println("Starting single datastream upload to Xively...");
  Serial.println();

  // connection state
  boolean notConnected = true;
  // After starting the modem with GSM.begin()
  // attach the shield to the GPRS network with the APN, login and password
  while(notConnected)
  {
    if((gsmAccess.begin(PINNUMBER)==GSM_READY) &
      (gprs.attachGPRS(GPRS_APN, GPRS_LOGIN, GPRS_PASSWORD)==GPRS_READY))
      notConnected = false;
    else
    {
      Serial.println("Not connected");
      delay(1000);
    }
  }
}

void loop() {
  int sensorValue = analogRead(sensorPin);
  datastreams[0].setFloat(sensorValue);

  Serial.print("Read sensor value ");
  Serial.println(datastreams[0].getFloat());

  if (sensorValue < PRESSURE_SENSOR_THRESHOLD) {
    Serial.println("Uploading it to Xively");
    int ret = xivelyclient.put(feed, xivelyKey);
    Serial.print("xivelyclient.put returned ");
    Serial.println(ret);
  }

  delay(500);
}
