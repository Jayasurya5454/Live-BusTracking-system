import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBus } from '@fortawesome/free-solid-svg-icons';

const DriverDashboard = ({ route }) => {
  const navigation = useNavigation();
  const { busNumber, driverName } = route.params;

  const handleReportSubmit = () => {
    // Pass busNumber to ReportSubmit screen
    navigation.navigate('ReportSubmit', { busNumber });
  };

  const handleDriverDetails = () => {
    // Navigate to the driver details page
    navigation.navigate('DriverDetails', { driverName });
  };

  const handleBusView = () => {
    // Navigate to the bus view page
    navigation.navigate('BusView');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleReportSubmit}>
        <Text style={styles.cardText}>Report Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.card} onPress={handleBusView}>
        <Text style={styles.cardText}>Bus View</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navButton} onPress={handleDriverDetails}>
        <FontAwesomeIcon icon={faUser} style={styles.navIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#007BFF',
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  navButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#FF6347',
    padding: 20,
    borderRadius: 10,
  },
  navIcon: {
    color: 'white',
    fontSize: 18,
  },
  busDataContainer: {
    marginBottom: 20,
  },
});

export default DriverDashboard;
