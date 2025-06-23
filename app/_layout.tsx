import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
const initDB = require('../assets/utils/database').initDB;

const App = () => {
  useEffect(() => {
    // Initialize the database when the app starts
    initDB();
  }, []);

  return (
    <View>
      <Text>Welcome to SafeWay!</Text>
    </View>
  );
};

export default App;
