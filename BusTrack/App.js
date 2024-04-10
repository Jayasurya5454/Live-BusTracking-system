// HomeScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.card, styles.studentTeacherCard]} onPress={() => navigation.navigate('Student')}>
        <Text style={styles.cardText}>Student & Teacher</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.card, styles.driverCard]} onPress={() => navigation.navigate('Driver')}>
        <Text style={styles.cardText}>Driver</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.card, styles.adminCard]} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.cardText}>Admin</Text>
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
    backgroundColor: 'light', // Set background color to yellow
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
    backgroundColor: '#ffc107', // Set unique color for student & teacher card
  },
  driverCard: {
    backgroundColor: '#4caf50', // Set unique color for driver card
  },
  adminCard: {
    backgroundColor: '#2196f3', // Set unique color for admin card
  },
});

export default HomeScreen;
