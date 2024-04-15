import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';

const DriverDashboard = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [busData, setBusData] = useState(null);
  const { busNumber } = route.params;

  useEffect(() => {
    // Fetch bus data when component mounts
    const busRef = ref(db, `buses/${busNumber}`);
    get(busRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          setBusData(snapshot.val());
        } else {
          console.log('No data found for this bus.');
        }
      })
      .catch(error => {
        console.error('Error fetching bus data:', error);
      });
  }, [busNumber]);

  const handleReportSubmit = () => {
    // Navigate to the report submit page
    navigation.navigate('ReportSubmit');
  };

  const handleBusView = () => {
    // Navigate to the bus view page
    navigation.navigate('BusView');
  };

  const handleDriverDetails = () => {
    // Fetch driver details based on the bus number
    const driversRef = ref(db, 'drivers');

    get(driversRef)
      .then(snapshot => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const filteredDrivers = Object.values(data).filter(driver => driver.bus_no === busNumber);
          if (filteredDrivers.length > 0) {
            // If driver found, navigate to DriverDetails and pass driver data
            navigation.navigate('DriverDetails', { driverData: filteredDrivers[0] });
          } else {
            console.log('No driver found for this bus number.');
          }
        } else {
          console.log('No data found at the "drivers" node.');
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  };

  return (
    <View style={styles.container}>
      {busData && (
        <View style={styles.busDataContainer}>
          <Text>Bus Number: {busData.bus_no}</Text>
          <Text>Driver Name: {busData.driver_name}</Text>
          {/* Add more data as needed */}
        </View>
      )}
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
