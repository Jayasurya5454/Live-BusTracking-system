// StudentLogin.js

import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './StudentLoginStyles';
import { useNavigation } from '@react-navigation/native';
const StudentLogin = () => {
  const navigation = useNavigation();

  
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Student login button pressed');
    navigation.navigate('StudentInfoScreen');
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Student Login</Text>
        <TextInput placeholder="Enter Roll Number" style={styles.input} />
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

export default StudentLogin;