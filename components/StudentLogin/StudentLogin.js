import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, Alert } from 'react-native';
import styles from './StudentLoginStyles';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';

const StudentLogin = () => {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [rollNumber, setRollNumber] = useState('');
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
    const studentsRef = ref(db, 'students');

    get(studentsRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filteredStudents = Object.values(data).filter(student => student.rollno === rollNumber && student.bus_no === busNumber);
          if (filteredStudents.length > 0) {
            console.log('Valid credentials. Proceeding to next page.');
            navigation.navigate('StudentInfoScreen', { rollNumber, busNumber }); // Pass roll number to StudentInfoScreen
            navigation.navigate('StudentInfoScreen', { rollNumber,busNumber }); // Pass roll number to StudentInfoScreen
          } else {
            console.log('Invalid credentials. Please try again.');
            Alert.alert('Invalid Credentials', 'Please enter valid roll number and bus number.', [{ text: 'OK' }]);
          }
        } else {
          console.log('No data found at the "students" node.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Student Login</Text>
        <TextInput 
          placeholder="Enter Roll Number" 
          style={styles.input} 
          onChangeText={text => setRollNumber(text)} 
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

export default StudentLogin;