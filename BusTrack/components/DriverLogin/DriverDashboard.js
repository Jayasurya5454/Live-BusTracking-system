import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig'; // Import your firebaseConfig file

const DriverDashboard = ({ route }) => {
  const navigation = useNavigation();
  const { busNumber} = route.params;
  const [showDriverData, setShowDriverData] = useState(false);
  const [driverData, setDriverData] = useState(null);

  const handleReportSubmit = () => {
    // Pass busNumber to ReportSubmit screen
    navigation.navigate('ReportSubmit', { busNumber });
  };

  const toggleDriverDataVisibility = async () => {
    if (!driverData) {
      const driversRef = ref(db, 'drivers');
      get(driversRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const driver = Object.values(data).find(driver => driver.bus_no === busNumber );
            if (driver) {
              setDriverData(driver);
              setShowDriverData(true);
            } else {
              console.log('Driver not found');
            }
          } else {
            console.log('No data found at the "drivers" node.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    } else {
      setShowDriverData(!showDriverData);
    }
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
      {showDriverData && driverData && (
        <View style={styles.driverDataContainer}>
          <Text style={styles.driverDataText}>Driver Name: {driverData.driver_name}</Text>
          <Text style={styles.driverDataText}>Bus Number: {driverData.bus_no}</Text>
          {/* Add more details here if needed */}
        </View>
      )}
      <TouchableOpacity style={styles.navButton} onPress={toggleDriverDataVisibility}>
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
  driverDataContainer: {
    position: 'absolute',
    top: 90, // Adjust the top position as needed
    left: 10,
    right: 10,
    backgroundColor: '#FCE5CD', // Light orange background color
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F7965C', // Border color
  },
  driverDataText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#5E2612', // Dark brown text color
  },
});

export default DriverDashboard;
