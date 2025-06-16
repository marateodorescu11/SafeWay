import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function DesignIndex() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top background design image */}
      <Image
        source={require('../assets/images/designIndex.png')}
        style={styles.designImage}
        contentFit="cover"
      />

      {/* Foreground content */}
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.logo}
          contentFit="contain"
        />

        <View style={styles.lowerContent}>
            {/* Tagline */}
            <Text style={styles.text}>
              Stay safe, stay aware — your personal safety companion is always with you.
            </Text>

            {/* Yellow dot */}
            <View style={styles.dotWrapper}>
              <View style={styles.dot} />
            </View>

            {/* Button */}
            <TouchableOpacity style={styles.button}>
              <Link href="/login" style={styles.buttonText}>
                Begin Journey ➔
              </Link>
            </TouchableOpacity>
         </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  designImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height * 0.45,
    zIndex: -1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
      
  },
  logo: {
    width: width * 0.42,
    height: width * 0.40,
    marginBottom: 20,
    marginTop: 60
  },
  lowerContent: {
    marginTop: 25, 
    alignItems: 'center',
  },
  text: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    maxWidth: width * 0.8,
    marginBottom: 40,
  },
  dotWrapper: {
    marginBottom: 40,
  },
  dot: {
    width: 40,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFB800',
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
