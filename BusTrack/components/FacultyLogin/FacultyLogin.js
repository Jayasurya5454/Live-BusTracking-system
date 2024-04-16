// FacultyLogin.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Alert } from 'react-native';
import styles from './FacultyLoginStyles';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';

const FacultyLogin = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [name, setName] = useState('');
  const [busNumber, setBusNumber] = useState('');

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
    const facultiesRef = ref(db, 'staff');

    get(facultiesRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filteredFaculties = Object.values(data).filter(faculty => faculty.name === name && faculty.bus_no === busNumber);
          if (filteredFaculties.length > 0) {
            // If a matching faculty is found, navigate to FacultyInfoScreen and pass the name
            console.log('Valid credentials. Proceeding to next page.');
            navigation.navigate('FacultyInfo', { name,busNumber }); // Pass the name to FacultyInfoScreen
          } else {
            // No matching faculty found, display error alert
            console.log('Invalid credentials. Please try again.');
            Alert.alert('Invalid Credentials', 'Please enter valid name and bus number.', [{ text: 'OK' }]);
          }
        } else {
          console.log('No data found at the "faculties" node.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Faculty Login</Text>
        <TextInput 
          placeholder="Enter Name" 
          style={styles.input} 
          onChangeText={text => setName(text)} 
        />
        <TextInput 
          placeholder="Enter Bus Number" 
          style={styles.input} 
          onChangeText={text => setBusNumber(text)} 
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

export default FacultyLogin;
