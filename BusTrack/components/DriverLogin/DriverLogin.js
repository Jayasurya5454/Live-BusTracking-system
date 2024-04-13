import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import styles from './DriverLoginStyles';

const DriverLogin = () => {
  const navigation = useNavigation(); // Initialize navigation
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Implement your login logic here
    console.log('Driver login button pressed');
    console.log('Name:', name);
    console.log('Password:', password);
    // Navigate to BusViewPage
    navigation.navigate('BusView');
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.title}>Driver Login</Text>
        <TextInput 
          placeholder="Enter Name" 
          style={styles.input} 
          onChangeText={text => setName(text)} // Store name input value in state
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
    </View>
  );
};

export default DriverLogin;
