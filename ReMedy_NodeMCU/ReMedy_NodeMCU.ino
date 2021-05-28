#include<Servo.h>

Servo slot1;
Servo slot2;

void setup() {
  slot1.attach(2);
  slot1.write(0);
  slot2.attach(4);
  slot2.write(0);
}

void loop() {
  slot1.write(90);
  delay(1000);
  slot1.write(0);
  delay(1000);
  slot2.write(90);
  delay(1000);
  slot2.write(0);
  delay(1000);
}
