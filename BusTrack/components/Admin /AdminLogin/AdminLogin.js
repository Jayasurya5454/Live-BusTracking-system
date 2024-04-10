// AdminLogin.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './AdminLoginStyles';

const AdminLogin = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // Handle login logic here
  const handleLogin = () => {
    if (name.trim() === '' || password.trim() === '') {
      Alert.alert('Error', 'Please enter both name and password');
    } else {
      // Implement your login logic here
      console.log('Admin login button pressed');
      // If login is successful, navigate to AdminDashboard
      navigation.navigate('AdminDashboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Admin Login</Text>
      <TextInput 
        placeholder="Enter Name" 
        style={styles.input} 
        value={name}
        onChangeText={setName}
      />
      <TextInput 
        placeholder="Enter Password" 
        secureTextEntry={true} 
        style={styles.input} 
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default AdminLogin;
