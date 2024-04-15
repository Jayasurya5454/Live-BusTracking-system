import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import styles from './StudentLoginStyles';
import { useNavigation } from '@react-navigation/native';
import { checkRollNumber } from '../../backend/studentAuth';
import { Alert } from 'react-native';

const StudentLogin = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000, // Animation duration in milliseconds
        useNativeDriver: true, // Enable native driver for performance
      }
    ).start();
  }, [fadeAnim]);

  const handleLogin = () => {
    // Implement your login logic here
    if (checkRollNumber(rollNumber)) {
      // If valid, navigate to the next screen
      console.log('Student login button pressed');
      console.log('Roll Number:', rollNumber);
      console.log('Password:', password);
      navigation.navigate('StudentInfoScreen');
    } else {
      // If invalid, show an error message or take appropriate action
      console.log('Invalid roll number. Please try again.');
      Alert.alert('Invalid Roll Number', 'Please enter a valid roll number.', [{ text: 'OK' }]);
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Student Login</Text>
        <TextInput 
          placeholder="Enter Roll Number" 
          style={styles.input} 
          onChangeText={text => setRollNumber(text)} // Store roll number input value in state
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

    </Animated.View>
  );
};

export default StudentLogin;
