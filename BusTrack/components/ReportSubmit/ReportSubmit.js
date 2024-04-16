import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { requestForegroundPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import NetInfo from '@react-native-community/netinfo';
import styles from './ReportSubmitStyles';

const ReportSubmit = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { busNumber } = route.params;

  const [dieselQuantity, setDieselQuantity] = useState('');
  const [startTimeMorning, setStartTimeMorning] = useState('');
  const [endTimeMorning, setEndTimeMorning] = useState('');
  const [startTimeEvening, setStartTimeEvening] = useState('');
  const [endTimeEvening, setEndTimeEvening] = useState('');
  const [issueReport, setIssueReport] = useState('');
  const [startingKm, setStartingKm] = useState('');
  const [endingKm, setEndingKm] = useState('');
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [isInternetConnected, setIsInternetConnected] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [locationData, setLocationData] = useState(null);
  const [startButtonDisabled, setStartButtonDisabled] = useState(false);
  const [endButtonDisabled, setEndButtonDisabled] = useState(true);

  useEffect(() => {
    const checkPermissionsAndConnectivity = async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setIsLocationEnabled(true);
      } else {
        setIsLocationEnabled(false);
      }

      const netInfoState = await NetInfo.fetch();
      setIsInternetConnected(netInfoState.isConnected);
    };

    checkPermissionsAndConnectivity();

    const unsubscribe = NetInfo.addEventListener(state => {
      setIsInternetConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const showErrorAlert = (title, message) => {
    Alert.alert(title, message);
  };

  const startTracking = async () => {
    if (isLocationEnabled && isInternetConnected) {
      setIsTracking(true);
      setStartButtonDisabled(true);
      setEndButtonDisabled(false);
      try {
        const location = await getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        console.log(`Bus ${busNumber} Location - Latitude: ${latitude}, Longitude: ${longitude}`);
        const intervalId = setInterval(async () => {
          try {
            const updatedLocation = await getCurrentPositionAsync({});
            const { latitude: updatedLatitude, longitude: updatedLongitude } = updatedLocation.coords;
            console.log(`Bus ${busNumber} Location - Latitude: ${updatedLatitude}, Longitude: ${updatedLongitude}`);
            setLocationData({ latitude: updatedLatitude, longitude: updatedLongitude });
          } catch (error) {
            console.error('Error updating location:', error);
            showErrorAlert('Location Error', 'Failed to update location. Please try again.');
          }
        }, 20000);
        return () => clearInterval(intervalId);
      } catch (error) {
        console.error('Error getting location:', error);
        showErrorAlert('Location Error', 'Failed to fetch location. Please make sure location services are enabled and try again.');
      }
    } else {
      Alert.alert('Location Services or Internet Disconnected', 'Please enable location services and internet to start tracking.');
    }
  };

  const stopTracking = () => {
    setIsTracking(false);
    setLocationData(null);
    setStartButtonDisabled(true);
    setEndButtonDisabled(true);
  };

  const handleSubmitStart = () => {
    if (!validateStartForm()) {
      return;
    }
    console.log('Start Form submitted successfully');
    startTracking();
  };

  const handleSubmitEnd = () => {
    if (!validateEndForm()) {
      return;
    }
    console.log('End Form submitted successfully');
    stopTracking(); // Stop tracking when End Bus is submitted
  };

  const validateStartForm = () => {
    if (
      dieselQuantity === '' ||
      startTimeMorning === '' ||
      endTimeMorning === '' ||
      startTimeEvening === '' ||
      endTimeEvening === '' ||
      startingKm === ''
    ) {
      Alert.alert('Incomplete Form', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  const validateEndForm = () => {
    if (
      endTimeMorning === '' ||
      endTimeEvening === '' ||
      endingKm === ''
    ) {
      Alert.alert('Incomplete Form', 'Please fill out all required fields.');
      return false;
    }
    return true;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Diesel Report</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Diesel Quantity"
          value={dieselQuantity}
          onChangeText={text => setDieselQuantity(text)}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Morning Route</Text>
        <TextInput
          style={styles.input}
          placeholder="Start Time"
          value={startTimeMorning}
          onChangeText={text => setStartTimeMorning(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="End Time"
          value={endTimeMorning}
          onChangeText={text => setEndTimeMorning(text)}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Evening Route</Text>
        <TextInput
          style={styles.input}
          placeholder="Start Time"
          value={startTimeEvening}
          onChangeText={text => setStartTimeEvening(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="End Time"
          value={endTimeEvening}
          onChangeText={text => setEndTimeEvening(text)}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Issue Report</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Issue Report"
          value={issueReport}
          onChangeText={text => setIssueReport(text)}
        />
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Starting and Ending KM</Text>
        <TextInput
          style={styles.input}
          placeholder="Starting KM"
          value={startingKm}
          onChangeText={text => setStartingKm(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Ending KM"
          value={endingKm}
          onChangeText={text => setEndingKm(text)}
        />
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitStart} disabled={startButtonDisabled}>
        <Text style={styles.submitButtonText}>Start Bus</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitEnd} disabled={endButtonDisabled}>
        <Text style={styles.submitButtonText}>End Bus</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportSubmit;
