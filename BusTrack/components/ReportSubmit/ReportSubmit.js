import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './ReportSubmitStyles';

const ReportSubmit = () => {
  const navigation = useNavigation();
  const [dieselQuantity, setDieselQuantity] = useState('');
  const [startTimeMorning, setStartTimeMorning] = useState('');
  const [endTimeMorning, setEndTimeMorning] = useState('');
  const [startTimeEvening, setStartTimeEvening] = useState('');
  const [endTimeEvening, setEndTimeEvening] = useState('');
  const [issueReport, setIssueReport] = useState('');
  const [startingKm, setStartingKm] = useState('');
  const [endingKm, setEndingKm] = useState('');

  const handleSubmit = () => {
    // Handle form submission
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
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ReportSubmit;