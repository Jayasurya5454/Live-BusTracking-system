import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

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

const intervalDuration = 5000; // Interval duration in milliseconds
const locations = ['Erode', 'Thindal', 'Perundurai', 'KEC'];

const StudentInfoScreen = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [busPositionIndex, setBusPositionIndex] = useState(0);
  const [isMapVisible, setIsMapVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setBusPositionIndex(prevIndex => (prevIndex + 1) % locations.length);
    }, intervalDuration);

    return () => clearInterval(interval);
  }, []);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  const toggleStudentDataVisibility = () => {
    // Add your logic here for toggling student data visibility
  };

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={toggleStudentDataVisibility}>
          <FontAwesomeIcon icon={faUser} style={styles.navIcon} />
        </TouchableOpacity>
        {/* Button to navigate to BusViewPage */}
        <TouchableOpacity onPress={() => navigation.navigate('BusView')}>
          <FontAwesomeIcon icon={faBus} style={styles.navIcon} />
        </TouchableOpacity>
      </View>

      {/* Rest of the code remains the same */}
      {/* Stepper, Student data etc. */}

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
      <View style={styles.stepper}>
        {locations.map((location, index) => (
          <View key={index} style={[styles.step, index === busPositionIndex ? styles.activeStep : null]}>
            <Text style={styles.stepText}>{location}</Text>
          </View>
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
});

export default StudentInfoScreen;