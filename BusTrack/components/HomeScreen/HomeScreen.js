// HomeScreen.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image  } from 'react-native';

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Container for "Track Live Bus" */}
      <TouchableOpacity style={styles.liveBusContainer} onPress={() => navigation.navigate('TrackBusLive')}>
        {/* <Image source={require('../../../assets/location.png')} style={styles.icon} /> */}
        <Text style={styles.liveBusText}>Track Live Bus</Text>
      </TouchableOpacity>

      {/* Cards for different user types */}
      <TouchableOpacity style={[styles.card, styles.studentTeacherCard]} onPress={() => navigation.navigate('Student')}>
        <Text style={styles.cardText}>Student</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.card, styles.driverCard]} onPress={() => navigation.navigate('Driver')}>
        <Text style={styles.cardText}>Driver</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.card, styles.adminCard]} onPress={() => navigation.navigate('Admin')}>
        <Text style={styles.cardText}>Admin</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.facultyCard]} onPress={() => navigation.navigate('Faculty')}>
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
    position: 'relative', // To allow absolute positioning
  },
  liveBusContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10,
  },
  liveBusText: {
    fontSize: 16,
    fontWeight: 'bold',
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
  facultyCard: {
    backgroundColor: '#219640',
  },
});

export default HomeScreen;
