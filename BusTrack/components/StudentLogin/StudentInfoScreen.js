import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
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

const intervalDuration = 20000; // Interval duration in milliseconds
const locations = ['Erode', 'Thindal', 'Perundurai', 'KEC'];

const attributeNames = {
  bus_no: 'Bus Number',
  bus_stop: 'Bus Stop',
  mail: 'Email',
  name: 'Name',
  parents_no: 'Parents Phone Number',
  phone_no: 'Phone Number',
  rollno: 'Roll Number'
};

const StudentInfoScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [busPositionIndex, setBusPositionIndex] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(true);
  const [showUserData, setShowUserData] = useState(false);
  const [userData, setUserData] = useState(null);
  const route = useRoute();
  const { rollNumber } = route.params || {};

  const fadeInAnim = useRef(new Animated.Value(0)).current;
  const userDataAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPositionIndex(prevIndex => (prevIndex + 1) % locations.length);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    Animated.timing(fadeInAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeInAnim]);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);

    // If the map is becoming visible, zoom to the bus location
    if (!isMapVisible) {
      const busLocation = busStops[busPositionIndex];
      const region = {
        latitude: busLocation.latitude,
        longitude: busLocation.longitude,
        latitudeDelta: 0.10, // Adjust the zoom level as needed
        longitudeDelta: 0., // Adjust the zoom level as needed
      };
      mapRef.current.animateToRegion(region, 1000); // 1000 milliseconds for animation duration
    }
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

  return (
    <View style={styles.container}>
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleStudentDataVisibility}>
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
    width: '100%',
    aspectRatio: 1,
    height: 350, // Initial height of the map
  },
  stepper: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'bottom',
    position: 'absolute',
    right: 120,
    bottom: 60,
    backgroundColor: 'grey',
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
    top: 90, // Adjust the top position as needed
    left: 10,
    right: 10,
    backgroundColor: '#FCE5CD', // Light orange background color
    padding: 20  ,
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
