

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './FacultyLoginStyles';

const FacultyLogin = () => {
  
  const handleLogin = () => {
    console.log('Faculty login button pressed');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
      <Text style={styles.title}>Faculty Login</Text>
      <TextInput placeholder="Enter Email ID" style={styles.input} />
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

export default FacultyLogin;
