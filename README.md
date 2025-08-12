# SafeWay

SafeWay is a **personal safety solution** that combines a small wearable device with a mobile app to track your location and send quick SOS alerts.
## Overview

SafeWay integrates:
- **Arduino Nano 33 BLE Sense Lite** with GPS, accelerometer, and gyroscope for accurate location tracking.
- **React Native mobile app** for visualizing location, storing danger zones locally, and handling SOS alerts.
- **Twilio integration** for sending emergency SMS messages instantly when the user triggers the emergency button.

**Ideal for:**
- Crime-prone neighborhoods  
- Travelling alone  
- Remote outdoor activities  

**Key features:**
1. Real-time GPS tracking via BLE
2. Pedestrian Dead Reckoning (PDR) for no-signal support
3. Secure communication and data handling
4. Low energy consumption for prolonged use
5. One-touch SOS alert with GPS coordinates

---

## Technical Details

**Hardware:**
- Arduino Nano 33 BLE Sense Lite
- NEO-6M GPS Module
- Accelerometer & Gyroscope
- Physical emergency button

**Software:**
- **Mobile app:** React Native (Expo), TypeScript, CSS
- **Backend & services:** Firebase, SQLite, Twilio
- **Libraries:**  
  - `ArduinoBLE`, `react-native-ble-plx` (BLE communication)  
  - `TinyGPSPlus` (GPS parsing)  
  - `Arduino_LSM9DS1` (sensor data)  
  - `react-native-maps` (Google Maps provider)

---

## Security Measures

- **Authentication:** JSON Web Tokens with 1-hour expiration
- **Data encryption:** SSL/TLS for all communication, Firebase encryption at rest
- **Password security:** bcrypt hashing + salting, minimum length requirement
- **Database protection:** Parameterized queries to prevent SQL injection, sanitized inputs
- **BLE safety:** Validated characteristics and secure bonding

---

## How It Works

1. The Arduino device collects **GPS coordinates** and sensor data in real time.  
2. This data is sent via **Bluetooth Low Energy (BLE)** to the SAFEWAY mobile app.  
3. The mobile app **continuously tracks the user’s location** and checks if it overlaps with stored dangerous zones.  
   - These zones are **clearly displayed in red** on the in-app map, allowing the user to easily identify unsafe areas.  
4. When the user enters a dangerous zone, the Arduino immediately **vibrates and triggers a buzzer** to alert them, ensuring they are notified even without looking at their phone.  
5. If the user feels unsafe, they can **hold the emergency button for more than 3 seconds**, and an SMS alert is automatically sent via **Twilio** to a pre-defined contact or authorities.  
   - The alert **includes the user’s live coordinates**, enabling quick and accurate response.  

---

## Demo

- [Demo Video 1](https://drive.google.com/file/d/1CajXVjrLZc-yt_qjxCDyLHiR_LI4UT6B/view?usp=sharing)  
- [Demo Video 2](https://drive.google.com/file/d/1vR7zmAg481yBzlS1BVRzS9axlXVGkMlY/view?usp=sharing)

---

## Testing and Analysis

- **Functional testing:** BLE & GPS responsiveness, SOS trigger accuracy
- **Non-functional testing:** Map update speed, no-signal performance
- **User testing:** Walking into predefined danger zones, real SOS scenario trials
- Feedback: Positive on usability, perceived safety, and responsiveness

---

## Future Improvements

- Add a physical buzzer alert
- Miniaturize hardware for more discreet use
- Suggest alternative safe routes in real time
- Extend alert options to additional contacts

---

## Contributors

- Mara Teodorescu  
- Tania Mincu  
- Natasa Tudorache  

---

## Installation and Setup

**Mobile app:**
```bash
# Clone the repository
git clone https://github.com/marateodorescu11/SafeWay.git
cd SafeWay

# Install dependencies
npm install

# Run on Expo
npx expo start
```

**Arduino device:**
1. Open the `arduino/` folder in the Arduino IDE.
2. Install required libraries: ArduinoBLE, TinyGPSPlus, Arduino_LSM9DS1.
3. Connect Arduino Nano 33 BLE Sense Lite and upload the code.
