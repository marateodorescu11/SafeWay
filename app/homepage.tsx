import { Buffer } from 'buffer';
import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import {
  createTable,
  getZones,
  insertZone,
  isUserInDangerZone
} from '../databaseservice'; // Adjust path if needed

const HomePage = () => {
  const [manager] = useState(new BleManager());
  const [gpsData, setGpsData] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    
    const init = async () => {
      await requestPermissions();
      try {
      await createTable();
      console.log("✅ Table created");

      await insertZone(52.374, 4.895, 100, 'Amsterdam danger zone');
      console.log("✅ Zone 1 inserted");

      await insertZone(52.520, 13.405, 150, 'Berlin danger zone');
      console.log("✅ Zone 2 inserted");

      const zones = await getZones();
      console.log("✅ Fetched zones:", zones);
      } catch (err) {
        console.error("❌ Error in DB operations:", err);
      }
    };
    init();

    return () => {
      manager.destroy();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
      ]);
    }
  };

  const scanAndConnect = () => {
    manager.startDeviceScan(null, null, async (error, scannedDevice) => {
      if (error) {
        console.warn('Scan error:', error);
        return;
      }

      if (scannedDevice?.name === 'SafeWay-GPS') {
        console.log('Found GPS device!');
        manager.stopDeviceScan();

        try {
          const connectedDevice = await scannedDevice.connect();
          await connectedDevice.discoverAllServicesAndCharacteristics();
          readGPSData(connectedDevice);
        } catch (err) {
          console.error('Connection failed:', err);
        }
      }
    });
  };

  const readGPSData = async (device: Device) => {
    try {
      const services = await device.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const char of characteristics) {
          if (char.uuid.toLowerCase().includes('2a56')) {
            const value = await char.read();
            const decoded = Buffer.from(value.value ?? '', 'base64').toString('utf8');
            console.log('Received:', decoded);

            const [latStr, lonStr] = decoded.split(',');
            const lat = parseFloat(latStr);
            const lon = parseFloat(lonStr);

            if (!isNaN(lat) && !isNaN(lon)) {
              setGpsData({ latitude: lat, longitude: lon });

              // Check danger zone
              const inZone = await isUserInDangerZone(lat, lon);
              console.log(inZone ? '🚨 User is in a danger zone!' : '✅ Safe area');
            }
          }
        }
      }
    } catch (error) {
      console.error('GPS Read error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Connect to Arduino GPS" onPress={scanAndConnect} />
      {gpsData.latitude !== null && gpsData.longitude !== null ? (
        <View>
          <Text style={styles.text}>
            Latitude: {gpsData.latitude}
            {'\n'}
            Longitude: {gpsData.longitude}
          </Text>

          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            region={{
              latitude: gpsData.latitude,
              longitude: gpsData.longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <Marker
              coordinate={{
                latitude: gpsData.latitude,
                longitude: gpsData.longitude,
              }}
              title="You are here"
              pinColor="red"
            />
          </MapView>
        </View>
      ) : (
        <Text style={styles.text}>Waiting for GPS location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.45,
    marginTop: 20,
    borderRadius: 10,
  },
});

export default HomePage;
