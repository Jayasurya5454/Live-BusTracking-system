import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const SubstituteDriver = () => {
  const [driverName, setDriverName] = useState('');
  const [busNumber, setBusNumber] = useState('');

  const handleSave = () => {
    // Here you can handle saving the data
    console.log('Driver Name:', driverName);
    console.log('Bus Number:', busNumber);
    // Add your logic to save the data
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Substitute Driver Page</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Enter Driver Name"
          value={driverName}
          onChangeText={text => setDriverName(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Bus Number"
          value={busNumber}
          onChangeText={text => setBusNumber(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Changed background color to white
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333', // Changed text color to a darker shade
  },
  form: {
    width: '80%',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9', // Changed input background color
    fontSize: 16, // Increased font size
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SubstituteDriver;
