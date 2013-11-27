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

// Your Xively key to let you upload data
char xivelyKey[] = "m4FrAG9u09PaF45HV7gurw0BTpxvFGIRtaqHVe0IcSVsxAcf";

// Define the strings for our datastream IDs
char sensorId[] = "microphone";
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

// -----

const int pinMic = A1; //analog input connected to mic AUD

const int pinLED0 = 5; //10; //digital output connected to LED 10

//baseline level for my mic in a fairly quiet room
//determined by watching serial monitor on first run
const int valBaseline = 350;

void setup() {
    pinMode(pinLED0, OUTPUT);
    
    // put your setup code here, to run once:
//    Serial.begin(9600);
    Serial.begin(115200);

    while (!Serial) {
      ; // wait for serial port to connect. Needed for Leonardo only
    }
  
    Serial.println("Starting single datastream upload to Xively...");
//    Serial.println();
//  
//    // connection state
//    boolean notConnected = true;
//    // After starting the modem with GSM.begin()
//    // attach the shield to the GPRS network with the APN, login and password
//    while(notConnected)
//    {
//      if((gsmAccess.begin(PINNUMBER)==GSM_READY) &
//        (gprs.attachGPRS(GPRS_APN, GPRS_LOGIN, GPRS_PASSWORD)==GPRS_READY))
//        notConnected = false;
//      else
//      {
//        Serial.println("Not connected");
//        delay(1000);
//      }
//    }
}

void loop() {
    int valMic = analogRead(pinMic);
    datastreams[0].setFloat(valMic);

    Serial.println(valMic);

    if (valMic > valBaseline + 15) {
      digitalWrite(pinLED0, HIGH);
      
//      Serial.println("Uploading it to Xively");
//      int ret = xivelyclient.put(feed, xivelyKey);
//      Serial.print("xivelyclient.put returned ");
//      Serial.println(ret);
    } else {
      digitalWrite(pinLED0, LOW);
    }
    
    delay(500);
}

