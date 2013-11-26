const int pinMic = A1; //analog input connected to mic AUD

const int pinLED0 = 9; //digital output connected to LED 0
const int pinLED1 = 10; //digital output connected to LED 1
const int pinLED2 = 11; //digital output connected to LED 2

//baseline level for my mic in a fairly quiet room
//determined by watching serial monitor on first run
const int valBaseline = 350;

void setup() {
    Serial.begin(115200);

    pinMode(pinLED0, OUTPUT);
    pinMode(pinLED1, OUTPUT);
    pinMode(pinLED2, OUTPUT);
}

void loop() {
    int valMic = analogRead(pinMic);

    Serial.println(valMic);

    if (valMic > valBaseline + 10) digitalWrite(pinLED0, HIGH);
    else digitalWrite(pinLED0, LOW);

    if (valMic > valBaseline + 15) digitalWrite(pinLED1, HIGH);
    else digitalWrite(pinLED1, LOW);

    if (valMic > valBaseline + 25) digitalWrite(pinLED2, HIGH);
    else digitalWrite(pinLED2, LOW);
}
