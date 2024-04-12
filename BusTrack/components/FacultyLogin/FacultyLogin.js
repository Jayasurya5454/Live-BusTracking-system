import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './FacultyLoginStyles';

const FacultyLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Faculty login button pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    // Add navigation logic if needed
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Faculty Login</Text>
        <TextInput 
          placeholder="Enter Email ID" 
          style={styles.input} 
          onChangeText={text => setEmail(text)} // Store email input value in state
        />
        <TextInput 
          placeholder="Enter Password" 
          secureTextEntry={true} 
          style={styles.input} 
          onChangeText={text => setPassword(text)} // Store password input value in state
        />
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
