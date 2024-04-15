import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Import FontAwesome icons


const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>

      {/* Cards for different user types */}
      <TouchableOpacity style={[styles.card, styles.adminCard]} onPress={() => navigation.navigate('Admin')}>
      <Text><Icon name="user-cog" size={50} color="#fff" style={styles.cardIcon} /> {/* Admin Icon */}</Text>
        <Text style={styles.cardText}>Admin</Text>
      </TouchableOpacity>

       <TouchableOpacity style={[styles.card, styles.facultyCard]} onPress={() => navigation.navigate('Faculty')}>
      <Text><Icon name="user-graduate" size={50} color="#fff" style={styles.cardIcon} /> {/* Faculty Icon */}</Text>
        <Text style={styles.cardText}>Faculty</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={[styles.card, styles.studentTeacherCard]} onPress={() => navigation.navigate('Student')}>
        <Text><Icon name="graduation-cap" size={50} color="#fff" style={styles.cardIcon} /> {/* Student Icon */}</Text>
        <Text style={styles.cardText}>Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.card, styles.driverCard]} onPress={() => navigation.navigate('Driver')}>
      <Text><Icon name="bus" size={50} color="#fff" style={styles.cardIcon} /> {/* Driver Icon */}</Text>
        <Text style={styles.cardText}>Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    position: 'relative',
  },
  liveBusContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  liveBusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    width: 340,
    height: 130,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingRight: 80,
  },
  cardIcon: {
    marginRight: 20,
  },
  cardText: {
    fontSize: 25,
    color: '#fff',
  },
  studentTeacherCard: {
    backgroundColor: '#26A69A',
  },
  driverCard: {
    backgroundColor: '#E57373',
  },
  adminCard: {
    backgroundColor: '#2596be',
  },
  facultyCard: {
    backgroundColor: '#6d8b8f',

  },
});

export default HomeScreen;
