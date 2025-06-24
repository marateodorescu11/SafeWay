#include <ArduinoBLE.h>
#include <TinyGPSPlus.h>

TinyGPSPlus gps;

// BLE Service and Characteristic
BLEService gpsService("180C");  // Custom UUID
BLEStringCharacteristic gpsCharacteristic("2A56", BLERead | BLENotify, 50);  // 50 chars max

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);  // GPS connected here

  // Start BLE
  if (!BLE.begin()) {
    Serial.println("BLE init failed");
    while (1);
  }

  BLE.setLocalName("SafeWay-GPS");
  BLE.setAdvertisedService(gpsService);
  gpsService.addCharacteristic(gpsCharacteristic);
  BLE.addService(gpsService);

  BLE.advertise();
  Serial.println("BLE ready and advertising");
}

void loop() {
  BLE.poll(); 

  while (Serial1.available()) {
    char c = Serial1.read();
    gps.encode(c);

    if (gps.location.isUpdated() && BLE.connected()) {
      String gpsData = String(gps.location.lat(), 6) + "," + String(gps.location.lng(), 6);
      Serial.println("Sending: " + gpsData);
      gpsCharacteristic.writeValue(gpsData); 
    }
  }
}
