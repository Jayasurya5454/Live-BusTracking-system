// DriverLogin.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './DriverLoginStyles';

const DriverLogin = () => {
  // Handle login logic here
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Driver login button pressed');
  };

  return (
    <View style={styles.container}>
       <View style={styles.inputContainer}>
        <Text style={styles.title}>Driver Login</Text>
        <TextInput placeholder="Enter Name" style={styles.input} />
        <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DriverLogin;
