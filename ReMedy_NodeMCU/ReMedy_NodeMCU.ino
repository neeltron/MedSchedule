#include<Servo.h>
#include<ESP8266WiFi.h>
#include<ESP8266HTTPClient.h>

Servo slot1;
Servo slot2;

const char* ssid = "**********";
const char* pass = "**********";

void setup() {
  slot1.attach(2);
  slot1.write(0);
  slot2.attach(4);
  slot2.write(0);
  Serial.begin(9600);
  WiFi.begin(ssid, pass);
  while(WiFi.status() != WL_CONNECTED) {
    Serial.print("searching for connection");
    delay(500);
  }
}

void loop() {
  if(WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin("http://ratificate.us/ReMedy/sendPing.php");
    int code = http.GET();
    if(code > 0) {
      String ret = http.getString();
      Serial.println(ret);
      if(ret == "0") {
        slot1.write(0);
        slot2.write(0);
      }
      else if(ret == "1") {
        slot1.write(90);
        slot2.write(0);
      }
      else if(ret == "2") {
        slot1.write(0);
        slot2.write(90);
      }
    }
    http.end();
  }
  delay(1000);
}
