#include <SPI.h>
#include <GSM.h>
#include <HttpClient.h>
#include <Xively.h>
#include <dht.h>

// Your phone SIM PIN Number
#define PINNUMBER ""
#define DHT22_PIN 5  //Huminidty/Temp

// Your phone APN data
#define GPRS_APN       "eseye.com"  // replace your GPRS APN
#define GPRS_LOGIN     "login"     // replace with your GPRS login
#define GPRS_PASSWORD  "password"  // replace with your GPRS password

// Your Xively key to let you upload data
char xivelyKey[] = "m4FrAG9u09PaF45HV7gurw0BTpxvFGIRtaqHVe0IcSVsxAcf";

// Define the string for the datastream ID you want to retrieve
char temperatureId[] = "infrared";

XivelyDatastream datastreams[] = {
  XivelyDatastream(temperatureId, strlen(temperatureId), DATASTREAM_FLOAT),
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
  
  Serial.println("Reading from Xively example");
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
  
  Serial.println("DHT Test Program");
  Serial.print("LIBRARY VERSION: ");
  Serial.println(DHT_LIB_VERSION);
  Serial.println();
  Serial.println("Type,\tstatus,\tHumidity (%),\tTemperature (C)");
}

void loop() {
  int ret = xivelyclient.get(feed, xivelyKey);
  Serial.print("xivelyclient.get returned ");
  Serial.println(ret);

  if (ret > 0)
  {
    Serial.println("Datastream is...");
    Serial.println(feed[0]);

    Serial.print("Temperature is: ");
    Serial.println(feed[0].getFloat());
  }

  Serial.println();
  
  
  // READ DATA
  Serial.print("DHT22, \t");
  int chk = DHT.read22(DHT22_PIN);
  switch (chk)
   {
        case DHTLIB_OK: 
            Serial.print("OK,\t"); 
            break;
        case DHTLIB_ERROR_CHECKSUM: 
            Serial.print("Checksum error,\t"); 
            break;
        case DHTLIB_ERROR_TIMEOUT: 
            Serial.print("Time out error,\t"); 
            break;
        default: 
            Serial.print("Unknown error,\t"); 
            break;
    }
    // DISPLAY DATA
    Serial.print(DHT.humidity, 1);
    Serial.print(",\t");
    Serial.println(DHT.temperature, 1);
  delay(15000UL);
}

