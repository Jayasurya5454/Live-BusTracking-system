// FacultyLogin.js

import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import styles from './FacultyLoginStyles';
import { useNavigation } from '@react-navigation/native';

const FacultyLogin = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Faculty login button pressed');
    console.log('Email:', email);
    console.log('Password:', password);
    navigation.navigate('FacultyInfo'); // Navigate to FacultyInfoScreen
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Faculty Login</Text>
        <TextInput 
          placeholder="Enter Email ID" 
          style={styles.input} 
          onChangeText={text => setEmail(text)} 
        />
        <TextInput 
          placeholder="Enter Password" 
          secureTextEntry={true} 
          style={styles.input} 
          onChangeText={text => setPassword(text)} 
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default FacultyLogin;
