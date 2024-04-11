// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.card, styles.studentTeacherCard]} onPress={() => navigation.navigate('Student')}>
        <Text style={styles.cardText}>Student</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.card, styles.driverCard]} onPress={() => navigation.navigate('Driver')}>
        <Text style={styles.cardText}>Driver</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.card, styles.adminCard]} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.cardText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.FacultyCard]} onPress={() => navigation.navigate('Faculty')}>
        <Text style={styles.cardText}>Faculty</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 20,
  },
  studentTeacherCard: {
    backgroundColor: '#ffc107',
  },
  driverCard: {
    backgroundColor: '#4caf50',
  },
  adminCard: {
    backgroundColor: '#2196f3',
  },
  FacultyCard: {
    backgroundColor: '#219640',
  },
});

export default HomeScreen;
