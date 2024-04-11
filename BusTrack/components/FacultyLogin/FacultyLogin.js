

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './FacultyLoginStyles';

const FacultyLogin = () => {
  
  const handleLogin = () => {
    console.log('Faculty login button pressed');
  };

  return (
    <View style={styles.container}>
      <Text>Faculty Login</Text>
      <TextInput placeholder="Enter Email ID" style={styles.input} />
      <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default FacultyLogin;
