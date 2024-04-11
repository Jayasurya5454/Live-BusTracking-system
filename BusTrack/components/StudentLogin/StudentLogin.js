// StudentLogin.js

import React from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import styles from './StudentLoginStyles';
import { useNavigation } from '@react-navigation/native';
const StudentLogin = () => {
  const navigation = useNavigation();

  // Handle login logic here
  const handleLogin = () => {
    // Implement your login logic here
    console.log('Student login button pressed');
    navigation.navigate('StudentInfoScreen');
  };
  console.log('Rendering StudentLogin');

  return (
    <View style={styles.container}>
      <Text>Student Login</Text>
      <TextInput placeholder="Enter Roll Number" style={styles.input} />
      <TextInput placeholder="Enter Password" secureTextEntry={true} style={styles.input} />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default StudentLogin;