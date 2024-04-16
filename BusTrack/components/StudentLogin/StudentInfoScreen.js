import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../firebaseConfig';
import { encode as base64Encode } from 'base-64';

const attributeNames = {
  bus_no: 'Bus Number',
  bus_stop: 'Bus Stop',
  mail: 'Email',
  name: 'Name',
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
    fetchBusRouteForBusNumber(busNumber);
  }, []);

  const fetchBusRouteForBusNumber = async (busNumber) => {
    try {
      const busRoutesRef = ref(db, `bus_routes/${busNumber}`);
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
        setBusPosition(stops[0]);
        if (mapRef.current) {
          mapRef.current.animateToRegion({
            latitude: stops[0].latitude,
            longitude: stops[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
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
    setShowUserData(false);
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
              const processedUserData = {};
              Object.entries(user).forEach(([key, value]) => {
                const processedKey = attributeNames[key] || key;
                processedUserData[processedKey] = value;
              });
              setUserData(processedUserData);

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

  const isFinalDestination = () => {
    return busPositionIndex === locations.length - 1;
  };

  useEffect(() => {
    if (isFinalDestination()) {
      const sendSMS = async (body, to) => {
        const accountSid = "AC4db63a134931c172c24d0ed88a86704b";
        const authToken = "1673181c12e58465d6c0170c76c8759e";
        const twilioPhoneNumber = "+12513195271";
        const url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      
        const formData = new FormData();
        formData.append('From', twilioPhoneNumber);
        formData.append('To', to);
        formData.append('Body', body);
      
        const credentials = `${accountSid}:${authToken}`;
        const base64Credentials = base64Encode(credentials); // Encode credentials using base64Encode from 'base-64'
      
        try {
          const response = await fetch(url, {
            method: 'POST',
            headers: {
              Authorization: `Basic ${base64Credentials}`,
            },
            body: formData,
          });
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.error('Error sending SMS:', error);
        }
      };
      
      // Sending SMS to the specified phone number with a message
      sendSMS("Your child has reached the school.", "+919043720850"); // Replace with actual phone number
    }
  }, [busPositionIndex]); 

  useEffect(() => {
    if (busStops.length > 0) {
      const interval = setInterval(() => {
        if (busPositionIndex === busStops.length - 1) {
          clearInterval(interval);
          return;
        }

        const nextStopIndex = busPositionIndex + 1;
        const distance = calculateDistance(
          busStops[busPositionIndex].latitude,
          busStops[busPositionIndex].longitude,
          busStops[nextStopIndex].latitude,
          busStops[nextStopIndex].longitude
        );
        const numSteps = Math.ceil(distance / 100);
        const stepLat = (busStops[nextStopIndex].latitude - busStops[busPositionIndex].latitude) / numSteps;
        const stepLng = (busStops[nextStopIndex].longitude - busStops[busPositionIndex].longitude) / numSteps;

        let i = 0;
        const animationInterval = setInterval(() => {
          const newPosition = {
            latitude: busStops[busPositionIndex].latitude + i * stepLat,
            longitude: busStops[busPositionIndex].longitude + i * stepLng
          };

          setBusPosition(newPosition);
          i++;

          if (i > numSteps) {
            setBusPositionIndex(nextStopIndex);
            clearInterval(animationInterval);
            setTimeout(() => {
              setBusPositionIndex(nextStopIndex);
            }, 3000);
          }
        }, 30);

      }, 15000);

      return () => clearInterval(interval);
    }
  }, [busPositionIndex, busStops]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c;
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
  },
  stepper: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginBottom: 10, 
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

export default StudentInfoScreen;
