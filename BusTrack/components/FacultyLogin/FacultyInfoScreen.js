// FacultyInfoScreen.js
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';

const INITIAL_REGION = {
  latitude: 11.341036,
  longitude: 77.717163,
  latitudeDelta: 2,
  longitudeDelta: 2
};

const busStops = [
  { name: 'Erode', latitude: 11.341036, longitude: 77.717163 },
  { name: 'Thindal', latitude: 11.317164, longitude: 77.676392 },
  { name: 'Perundurai', latitude: 11.27564, longitude: 77.58794 },
  { name: 'KEC', latitude: 11.2742, longitude: 77.6070 }
];

const intervalDuration = 5000;
const locations = ['Erode', 'Thindal', 'Perundurai', 'KEC'];

const FacultyInfoScreen = () => {
  const navigation = useNavigation();
  const route = useRoute(); // Use useRoute to get route params
  const { name } = route.params; // Get the name from route params
  const mapRef = useRef(null);
  const [busPositionIndex, setBusPositionIndex] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [showUserData, setShowUserData] = useState(false);
  const [userData, setUserData] = useState(null);
  const userDataAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPositionIndex(prevIndex => (prevIndex + 1) % locations.length);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };
  
  const toggleStaffDataVisibility = async () => {
    // Check if userData is already fetched
    if (!userData) {
      // If not fetched, get a reference to the 'staff' node in the database
      const staffRef = ref(db, 'staff');
      
      // Fetch data from the database
      get(staffRef)
        .then(snapshot => {
          // Check if data exists at the 'staff' node
          if (snapshot.exists()) {
            // Convert snapshot to JSON format
            const data = snapshot.val();
            
            // Filter staff members whose name matches the input name
            const staffMembers = Object.values(data).filter(member => member.name === name);
            
            // Check if any staff member is found
            if (staffMembers.length > 0) {
              // Select the first staff member (assuming unique names)
              const staffMember = staffMembers[0];
              
              // Process user data (if needed)
              const processedUserData = {};
              Object.entries(staffMember).forEach(([key, value]) => {
                processedUserData[key] = value;
              });
              
              // Set user data
              setUserData(processedUserData);
  
              // Animate the user data (if needed)
              Animated.timing(userDataAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start();
            } else {
              // If no staff member found with the given name, log a message
              console.log('Staff member not found');
            }
          } else {
            // If no data found at the 'staff' node, log a message
            console.log('No data found at the "staff" node.');
          }
        })
        .catch(error => {
          // Log any errors that occur during data fetching
          console.error('Error fetching data:', error);
        });
    }
  
    // Toggle the visibility of user data
    setShowUserData(!showUserData);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleStaffDataVisibility}>
          <FontAwesomeIcon icon={faUser} style={styles.navIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('BusView')}>
          <FontAwesomeIcon icon={faBus} style={styles.navIcon} />
        </TouchableOpacity>
      </View>

      <Button
        title={isMapVisible ? 'Hide Map' : 'View Map'}
        onPress={toggleMapVisibility}
      />
      {isMapVisible && (
        <MapView
          style={styles.map}
          initialRegion={INITIAL_REGION}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
        >
          {busStops.map((stop, index) => (
            <Marker key={index} title={stop.name} coordinate={stop} pinColor={index === 0 ? 'blue' : 'red'} />
          ))}
          <Marker
            title="Bus"
            coordinate={busStops[busPositionIndex]}
          >
            <FontAwesome5 name="bus" size={30} color="blue" />
          </Marker>
        </MapView>
      )}
      {showUserData && userData && (
        <Animated.View style={[styles.userDataContainer, { opacity: userDataAnim }]}>
          {Object.entries(userData).map(([key, value]) => (
            <Text key={key} style={styles.userDataText}>{key}: {value}</Text>
          ))}
        </Animated.View>
      )}
      {isMapVisible && (
        <View style={styles.stepper}>
          {locations.map((location, index) => (
            <View key={index} style={[styles.step, index === busPositionIndex ? styles.activeStep : null]}>
              <Text style={styles.stepText}>{location}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  navIcon: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 10,
  },
  map: {
    flex: 1,
    width: '100%',
    aspectRatio: 1,
  },
  stepper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'bottom',
    position: 'absolute',
    right: 120,
    bottom: 70,
    backgroundColor: 'blue',
    padding: 10,
  },
  step: {
    padding: 5,
    borderRadius: 5,
    marginVertical: 5,
  },
  activeStep: {
    backgroundColor: 'white',
  },
  stepText: {
    color: 'black',
  },
  userDataContainer: {
    position: 'absolute',
    top: 90,
    left: 10,
    right: 10,
    backgroundColor: '#FCE5CD',
    padding: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#F7965C',
  },
  userDataText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#5E2612',
  },
});

export default FacultyInfoScreen;
