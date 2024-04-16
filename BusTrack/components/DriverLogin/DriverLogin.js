import React, { useState, useEffect, useRef } from 'react';
import { AppRegistry } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, Animated, Alert } from 'react-native';
import styles from './DriverLoginStyles';
import { useNavigation } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { PermissionsAndroid } from 'react-native';
import Geolocation from '@react-native-community/geolocation';


const DriverLogin = () => {
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

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message: 'App needs access to your location',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location permission granted');
        Geolocation.getCurrentPosition(
          position => {
            handleLogin(position.coords.latitude, position.coords.longitude);
          },
          error => {
            console.error('Error getting location:', error);
            Alert.alert('Error', 'Error getting location. Please try again.', [{ text: 'OK' }]);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
      } else {
        console.log('Location permission denied');
        Alert.alert('Permission Denied', 'Location permission denied. Please enable it to login.', [{ text: 'OK' }]);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleLogin = (latitude, longitude) => {
    const driversRef = ref(db, 'drivers');

    get(driversRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filteredDrivers = Object.values(data).filter(driver => driver.driver_name === name && driver.bus_no === busNumber);
          if (filteredDrivers.length > 0) {
            console.log('Valid credentials. Proceeding to next page.');
            navigation.navigate('DriverDashboard', { busNumber });
          } else {
            console.log('Invalid credentials. Please try again.');
            Alert.alert('Invalid Credentials', 'Please enter valid name and bus number.', [{ text: 'OK' }]);
          }
        } else {
          console.log('No data found at the "drivers" node.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  const handleLoginButtonPress = async () => {
    if (Platform.OS === 'android') {
      await requestLocationPermission();
    } else {
      Geolocation.getCurrentPosition(
        position => {
          handleLogin(position.coords.latitude, position.coords.longitude);
        },
        error => {
          console.error('Error getting location:', error);
          Alert.alert('Error', 'Error getting location. Please try again.', [{ text: 'OK' }]);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }
  };

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Driver Login</Text>
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
          <TouchableOpacity style={styles.button} onPress={handleLoginButtonPress}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default DriverLogin;
