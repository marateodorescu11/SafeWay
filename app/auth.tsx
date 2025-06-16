import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import {
  Alert,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { auth } from '../firebaseConfig';

const { width, height } = Dimensions.get('window');

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Success', 'Account created successfully!');
      // router.replace('/home');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Background design */}
      <Image
        source={require('../assets/images/designIndex.png')}
        style={styles.designImage}
      />

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.heading}>Register</Text>
        <Text style={styles.sub_heading}>Create your new account</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          autoCapitalize="none"
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up ➔</Text>
        </TouchableOpacity>

        <Text style={styles.footerText}>
          Already have an account?{' '}
          <Text onPress={() => router.push('/login')} style={styles.linkText}>
            Login
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  designImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: height * 0.45, // Dynamic height based on screen height
  },
  content: {
    marginTop: height * 0.3, // Adjust based on screen height
    paddingHorizontal: 24,
    width: '100%',
  },
  heading: {
    fontSize: width * 0.065, // Font size based on screen width
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
    textAlign: 'center',
  },
  sub_heading: {
    fontSize: width * 0.045, // Font size based on screen width
    marginBottom: 24,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    backgroundColor: '#f8f8f8',
    fontSize: width * 0.04, // Font size based on screen width
  },
  button: {
    backgroundColor: '#FF3B30',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 28,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: width * 0.04, // Font size based on screen width
  },
  separator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    marginTop: 20,
    fontSize: width * 0.035, // Font size based on screen width
    color: '#555',
    textAlign: 'center',
  },
  linkText: {
    color: '#f79515',
    fontWeight: '600',
  },
});
