import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, ScrollView, KeyboardAvoidingView } from 'react-native';
import styles from './AddRecordFormStyles'; // Import styles
import * as Animatable from 'react-native-animatable';

const AddRecordForm = ({ navigation }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [parentsName, setParentsName] = useState('');
  const [busNumber, setBusNumber] = useState('');
  const [stopName, setStopName] = useState('');
  const [parentsPhoneNumber, setParentsPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  const handleAddRecord = () => {
    if (!name.trim() || !rollNumber.trim() || !parentsName.trim() || !busNumber.trim() || !stopName.trim() || !parentsPhoneNumber.trim() || !email.trim()) {
      Alert.alert('Error', 'All fields are mandatory');
    } else if (!/^\d{10}$/.test(parentsPhoneNumber.trim())) {
      Alert.alert('Error', 'Please enter a valid 10-digit phone number for Parent\'s Phone Number');
    } else if (!/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert('Error', 'Please enter a valid email address');
    } else {
      const recordData = {
        name,
        rollNumber,
        parentsName,
        busNumber,
        stopName,
        parentsPhoneNumber,
        email,
      };

      // Here you can perform any action with the collected data, such as sending it to a server or storing it locally
      console.log('Record data:', recordData);

      // Display success message and reset form fields
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setName('');
        setRollNumber('');
        setParentsName('');
        setBusNumber('');
        setStopName('');
        setParentsPhoneNumber('');
        setEmail('');
        navigation.goBack();
      }, 3000);
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Animatable.View animation="fadeInUpBig" style={styles.container}>
          <Text style={styles.label}>Name *</Text>
          <TextInput 
            style={styles.input} 
            value={name} 
            onChangeText={setName} 
            placeholder="Enter Name" 
          />

          <Text style={styles.label}>Roll Number *</Text>
          <TextInput 
            style={styles.input} 
            value={rollNumber} 
            onChangeText={setRollNumber} 
            placeholder="Enter Roll Number" 
          />

          <Text style={styles.label}>Parent's Name *</Text>
          <TextInput 
            style={styles.input} 
            value={parentsName} 
            onChangeText={setParentsName} 
            placeholder="Enter Parent's Name" 
          />

          <Text style={styles.label}>Bus Number *</Text>
          <TextInput 
            style={styles.input} 
            value={busNumber} 
            onChangeText={setBusNumber} 
            placeholder="Enter Bus Number" 
          />

          <Text style={styles.label}>Stop Name *</Text>
          <TextInput 
            style={styles.input} 
            value={stopName} 
            onChangeText={setStopName} 
            placeholder="Enter Stop Name" 
          />

          <Text style={styles.label}>Parent's Phone Number *</Text>
          <TextInput 
            style={styles.input} 
            value={parentsPhoneNumber} 
            onChangeText={setParentsPhoneNumber} 
            placeholder="Enter Parent's Phone Number" 
          />

          <Text style={styles.label}>Email *</Text>
          <TextInput 
            style={styles.input} 
            value={email} 
            onChangeText={setEmail} 
            placeholder="Enter Email" 
          />

          <Button title="Add Record" onPress={handleAddRecord} />
          
          {/* Display success message with emojis if submission successful */}
          {isSubmitted && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>Record submitted successfully! 😊✅</Text>
            </View>
          )}
        </Animatable.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AddRecordForm;
