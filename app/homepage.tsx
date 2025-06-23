import React, { useEffect, useState } from 'react';
import { Button, PermissionsAndroid, Platform, StyleSheet, Text, View } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';
import MapView, { Marker } from 'react-native-maps';

const HomePage = () => {
  const [manager] = useState(new BleManager());
  const [device, setDevice] = useState<Device | null>(null);
  const [gpsData, setGpsData] = useState<{ latitude: number | null; longitude: number | null }>({
    latitude: null,
    longitude: null,
  });

  useEffect(() => {
    requestPermissions();
    return () => {
      manager.destroy();
    };
  }, []);

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
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
          setDevice(connectedDevice);
          readGPSData(connectedDevice);
        } catch (err) {
          console.error('Connection failed:', err);
        }
      }
    });
  };

  const readGPSData = async (connectedDevice: Device) => {
    try {
      const services = await connectedDevice.services();
      for (const service of services) {
        const characteristics = await service.characteristics();
        for (const char of characteristics) {
          if (char.uuid.includes('2a57')) {
            const latValue = await char.read();
            const lat = parseFloat(Buffer.from(latValue.value ?? '', 'base64').toString('utf8'));
            setGpsData((prev) => ({ ...prev, latitude: lat }));
          }
          if (char.uuid.includes('2a58')) {
            const lonValue = await char.read();
            const lon = parseFloat(Buffer.from(lonValue.value ?? '', 'base64').toString('utf8'));
            setGpsData((prev) => ({ ...prev, longitude: lon }));
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
        <MapView
          style={styles.map}
          region={{
            latitude: gpsData.latitude,
            longitude: gpsData.longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
        >
          <Marker
            coordinate={{ latitude: gpsData.latitude, longitude: gpsData.longitude }}
            title="Arduino GPS Location"
          />
        </MapView>
      ) : (
        <Text style={{ marginTop: 20 }}>Waiting for GPS location...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
  },
  map: {
    marginTop: 20,
    flex: 1,
  },
});

export default HomePage;
