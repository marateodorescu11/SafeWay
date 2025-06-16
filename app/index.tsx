import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DesignIndex() {
  return (
    <View style={styles.container}>
      {/* Top background design image */}
      <Image
        source={require('../assets/images/designIndex.png')}
        style={styles.designImage}
      />

      {/* Foreground content */}
      <View style={styles.content}>
        {/* Logo */}
        <Image
          source={require('../assets/images/logo.jpg')}
          style={styles.logo}
        />

        {/* Tagline */}
        <Text style={styles.text}>
          Stay safe, stay aware — your personal safety companion is always with you.
        </Text>

        {/* Yellow indicator dot */}
        <View style={styles.dotWrapper}>
          <View style={styles.dot} />
        </View>

        {/* Button */}
        <TouchableOpacity style={styles.button}>
          <Link href="/auth" style={styles.buttonText}>Begin Journey ➔</Link>
        </TouchableOpacity>

      </View>
    </View>
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
    width: 414,     // Figma exact width
    height: 345,    // Figma exact height    // Push image behind content

  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: -40, // slightly overlaps design image
  },
  logo: {
    width: 188,
    height: 182,
    marginTop: 250, 
    marginBottom: 16,
  },
  text: {
    fontSize: 14,
    color: '#000',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: 300,
  },
  dotWrapper: {
    marginBottom: 30,
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
    borderRadius: 28,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  overlayContent: {
    flex: 1,
    justifyContent: 'flex-start', // ⬅ Align content to top
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 100, // ⬅ Push everything down
  },
  
});