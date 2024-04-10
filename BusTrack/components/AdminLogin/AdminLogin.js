// AdminLogin.js

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './AdminLoginStyles';

const AdminLogin = () => {
  // Handle login logic here
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Admin login button pressed');
  };

  return (
    <View style={styles.container}>
      <Text>Admin Login</Text>
      <TextInput placeholder="Enter Name" style={styles.input} />
      <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default AdminLogin;
