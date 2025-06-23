#include <ArduinoBLE.h>
#include <TinyGPSPlus.h>

TinyGPSPlus gps;

// Create a BLE service and characteristic
BLEService gpsService("180C");  // Random custom UUID
BLEStringCharacteristic gpsCharacteristic("2A56", BLERead | BLENotify, 50);  // Max 50 chars

void setup() {
  Serial.begin(9600);         // Serial Monitor
  Serial1.begin(9600);        // GPS module on Serial1

  // Start BLE
  if (!BLE.begin()) {
    Serial.println("BLE initialization failed!");
    while (1);
  }

  BLE.setLocalName("SafeWay-GPS"); // Name shown on phone
  BLE.setAdvertisedService(gpsService);
  Serial.print("LALA");
  gpsService.addCharacteristic(gpsCharacteristic);
  BLE.addService(gpsService);

  BLE.advertise();
  Serial.println("BLE GPS peripheral ready");
}

void loop() {
  BLEDevice central = BLE.central();

  if (central) {
    Serial.print("Connected to: ");
    Serial.println(central.address());

    while (central.connected()) {
      while (Serial1.available()) {
        Serial.write(Serial1.read());
        gps.encode(Serial1.read());

        if (gps.location.isUpdated()) {
          // Format GPS as "lat,lon"
          String gpsData = String(gps.location.lat(), 6) + "," + String(gps.location.lng(), 6);
          Serial.println("Sending: " + gpsData);  // Debugging line to check if GPS data is being sent
          gpsCharacteristic.writeValue(gpsData);  // Send the data over BLE
        }

      }
    }

    Serial.println("Disconnected");
  }
}
