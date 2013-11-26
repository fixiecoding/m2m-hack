const int pinMic = A1; //analog input connected to mic AUD

const int pinLED0 = 5; //10; //digital output connected to LED 10

//baseline level for my mic in a fairly quiet room
//determined by watching serial monitor on first run
const int valBaseline = 350;

void setup() {
    Serial.begin(115200);

    pinMode(pinLED0, OUTPUT);
}

void loop() {
    int valMic = analogRead(pinMic);

    Serial.println(valMic);

    if (valMic > valBaseline + 15) {
      digitalWrite(pinLED0, HIGH);
    } else {
      digitalWrite(pinLED0, LOW);
    }
}

