import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';

const attributeNames = {
  name: 'Name',
  rollno: 'Roll Number',
  bus_no: 'Bus Number',
  bus_stop: 'Bus Stop',
  driver_name: 'Driver Name',
  mail: 'Email',
  parents_no: 'Parents Phone Number',
  phone_no: 'Phone Number',
};

const StudentInfoScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [busPositionIndex, setBusPositionIndex] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [showUserData, setShowUserData] = useState(false);
  const [userData, setUserData] = useState(null);
  const [busPosition, setBusPosition] = useState(null);
  const [busStops, setBusStops] = useState([]);
  const [locations, setLocations] = useState([]);
  const route = useRoute();
  const { rollNumber, busNumber } = route.params || {};

  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const userDataAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  useEffect(() => {
    // Fetch bus route based on the passed busNumber
    fetchBusRouteForBusNumber(busNumber); // Use the busNumber passed from navigation params
  }, []);

  const fetchBusRouteForBusNumber = async (busNumber) => {
    try {
      const busRoutesRef = ref(db, `bus_routes/${busNumber}`); // Use template literals to include the dynamic busNumber
      const snapshot = await get(busRoutesRef);
      if (snapshot.exists()) {
        const routeData = snapshot.val();
        const stops = [];
        const locs = [];
        Object.keys(routeData).forEach(stopIndex => {
          const stopInfo = routeData[stopIndex];
          const stop = {
            latitude: stopInfo.latitude,
            longitude: stopInfo.longitude,
            name: stopInfo.stop
          };
          stops.push(stop);
          locs.push(stopInfo.stop);
        });

        setBusStops(stops);
        setLocations(locs);
        setBusPosition(stops[0]); // Set initial bus position
        if (mapRef.current) {
          // Set initial region centered around the first bus stop
          mapRef.current.animateToRegion({
            latitude: stops[0].latitude,
            longitude: stops[0].longitude,
            latitudeDelta: 0.05, // Adjust this value to change the zoom level
            longitudeDelta: 0.05 // Adjust this value to change the zoom level
          });
        }
      } else {
        console.log("No data found for bus ");
      }
    } catch (error) {
      console.error('Error fetching bus route:', error);
    }
  };

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
    setShowUserData(false); // Hide user data when map is toggled
  };

  const toggleStudentDataVisibility = async () => {
    if (!userData) {
      const studentRef = ref(db, 'students');
      get(studentRef)
        .then(snapshot => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const user = Object.values(data).find(student => student.rollno === rollNumber);
            if (user) {
              // Preprocess user data attribute names
              const processedUserData = {};
              Object.entries(user).forEach(([key, value]) => {
                const processedKey = attributeNames[key] || key;
                processedUserData[processedKey] = value;
              });
              setUserData(processedUserData);

              // Animate user data view
              Animated.timing(userDataAnim, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
              }).start();
            } else {
              console.log('User not found');
            }
          } else {
            console.log('No data found at the "students" node.');
          }
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    setShowUserData(!showUserData);
  };

  // Continuous movement of the bus
  useEffect(() => {
    if (busStops.length > 0) {
      const interval = setInterval(() => {
        // Check if the bus is at the final destination
        if (busPositionIndex === busStops.length - 1) {
          clearInterval(interval); // Stop the interval
          return;
        }

        // Calculate the next stop index
        const nextStopIndex = busPositionIndex + 1;

        // Calculate the distance between current and next stop
        const distance = calculateDistance(
          busStops[busPositionIndex].latitude,
          busStops[busPositionIndex].longitude,
          busStops[nextStopIndex].latitude,
          busStops[nextStopIndex].longitude
        );

        // Calculate the number of steps based on distance
        const numSteps = Math.ceil(distance / 100); // Adjust the step size as needed

        // Calculate the step size for latitude and longitude
        const stepLat = (busStops[nextStopIndex].latitude - busStops[busPositionIndex].latitude) / numSteps;
        const stepLng = (busStops[nextStopIndex].longitude - busStops[busPositionIndex].longitude) / numSteps;

        // Animate the bus marker to move along the polyline
        let i = 0;
        const animationInterval = setInterval(() => {
          // Calculate the new position
          const newPosition = {
            latitude: busStops[busPositionIndex].latitude + i * stepLat,
            longitude: busStops[busPositionIndex].longitude + i * stepLng
          };

          // Update the position of the bus marker
          setBusPosition(newPosition);

          // Increment the step counter
          i++;

          // Check if reached the next stop
          if (i > numSteps) {
            // Move to the next stop
            setBusPositionIndex(nextStopIndex);

            // Stop the animation
            clearInterval(animationInterval);

            // Call useEffect again to start animation for the next segment
            setTimeout(() => {
              setBusPositionIndex(nextStopIndex);
            }, 3000); // Delay before moving to the next stop (in milliseconds)
          }
        }, 30); // Interval for smooth animation (in milliseconds)
      }, 15000); // Interval for moving to the next stop (in milliseconds) including the wait time at each stop

      return () => clearInterval(interval);
    }
  }, [busPositionIndex, busStops]);

  // Function to calculate the distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180; // Latitude of point 1 in radians
    const φ2 = (lat2 * Math.PI) / 180; // Latitude of point 2 in radians
    const Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitudes
    const Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitudes

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in meters
    return distance;
  };

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleStudentDataVisibility}>
          <FontAwesomeIcon icon={faUser} style={styles.navIcon} />
        </TouchableOpacity>
      </View>
      <View style={styles.mapContainer}>
        <Button
          title={isMapVisible ? 'Hide Map' : 'View Map'}
          onPress={toggleMapVisibility}
        />
      </View>
      {isMapVisible && (
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          ref={mapRef}
        >
          <Polyline
            coordinates={busStops.map(stop => ({ latitude: stop.latitude, longitude: stop.longitude }))}
            strokeWidth={5}
            strokeColor="blue"
          />
          {busStops.map((stop, index) => (
            <Marker key={index} title={stop.name} coordinate={stop} pinColor={index === 0 ? 'blue' : 'red'} />
          ))}
          {/* Display bus marker at the current bus position */}
          {busPosition && (
            <Marker
              title="Bus"
              coordinate={busPosition}
            >
              <FontAwesome5 name="bus" size={30} color="blue" />
            </Marker>
          )}
        </MapView>
      )}
      {showUserData && userData && (
        <Animated.View style={[styles.userDataContainer, { opacity: userDataAnim }]}>
          {Object.entries(userData).map(([key, value]) => (
            <Text key={key} style={styles.userDataText}>{key}: {value}</Text>
          ))}
        </Animated.View>
      )}
      <View style={styles.stepper}>
        {locations.map((location, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.step, index === busPositionIndex ? styles.activeStep : null]}
            onPress={() => setBusPositionIndex(index)}
          >
            <Text style={styles.stepText}>{location}</Text>
          </TouchableOpacity>
        ))}
      </View>
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
  mapContainer: {
    marginBottom: 10,
  },
  map: {
    width: '100%',
    aspectRatio: 1,
    height: 340,
    // Adjust the height as needed
  },
  stepper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    display: flex,
    marginBottom: 10, 
    overflow: 'scroll',
  },
  step: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: 'grey',
    alignItems: 'center',
  },
  activeStep: {
    backgroundColor: 'black',
  },
  stepText: {
    color: 'white',
    textAlign: 'center',
  },
  userDataContainer: {
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
  userDataText: {
    marginBottom: 10,
    fontSize: 16,
    color: '#5E2612', // Dark brown text color
  },
});

export default StudentInfoScreen;