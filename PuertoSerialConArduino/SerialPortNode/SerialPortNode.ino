
int counter = 0;

void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
}

void loop() {
  Serial.println(++counter, DEC);
  delay(500);
}
