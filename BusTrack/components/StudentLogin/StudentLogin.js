// StudentLogin.js

import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated } from 'react-native';
import styles from './StudentLoginStyles';
import { useNavigation } from '@react-navigation/native';

const StudentLogin = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;

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
    console.log('Student login button pressed');
    navigation.navigate('StudentInfoScreen');
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Student Login</Text>
        <TextInput placeholder="Enter Roll Number" style={styles.input} />
        <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Additional custom UI */}
      <View style={styles.additionalUIContainer}>
        <Text style={styles.additionalUIText}>Don't have an account?</Text>
        <TouchableOpacity style={styles.signupButton}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default StudentLogin;
