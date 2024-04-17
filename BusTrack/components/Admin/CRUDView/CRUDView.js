import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button, Animated } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';

const CRUDView = () => {
  const navigation = useNavigation();
  const mapRef = useRef(null);
  const [busPositions, setBusPositions] = useState([]); // State to store bus positions
  const [busStops, setBusStops] = useState([]);
  const [locations, setLocations] = useState([]);
  const route = useRoute();

  useEffect(() => {
    // Fetch details of all buses
    fetchBusDetails();
  }, []);
  // const darkStyle = [
  //   {
  //     elementType: 'geometry',
  //     stylers: [
  //       {
  //         color: '#242f3e',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.text.fill',
  //     stylers: [
  //       {
  //         color: '#746855',
  //       },
  //     ],
  //   },
  //   {
  //     elementType: 'labels.text.stroke',
  //     stylers: [
  //       {
  //         color: '#242f3e',
  //       },
  //     ],
  //   },
  //   // Add more styling elements as needed...
  // ];
  

  const fetchBusDetails = async () => {
    try {
      const busRoutesRef = ref(db, 'bus_routes'); // Reference to bus routes
      const snapshot = await get(busRoutesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const positions = Object.values(data).map(busRoute => {
          const stops = Object.values(busRoute).map(stopInfo => ({
            latitude: stopInfo.latitude,
            longitude: stopInfo.longitude,
            name: stopInfo.stop
          }));
          return stops;
        });
        setBusPositions(positions); // Set bus positions in state
        // Set initial bus stops and locations (assuming all buses have the same stops)
        const firstBusStops = positions[0] || [];
        const firstBusLocations = firstBusStops.map(stop => stop.name);
        setBusStops(firstBusStops);
        setLocations(firstBusLocations);
        if (mapRef.current && firstBusStops.length > 0) {
          // Set initial region centered around the first bus stop of the first bus
          mapRef.current.animateToRegion({
            latitude: firstBusStops[0].latitude,
            longitude: firstBusStops[0].longitude,
            latitudeDelta: 0.05, // Adjust this value to change the zoom level
            longitudeDelta: 0.05 // Adjust this value to change the zoom level
          });
        }
      } else {
        console.log("No data found for bus routes.");
      }
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Button
          title={'View Map'}
          onPress={() => {}} // Handle map visibility toggle if needed
        />
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
        // customMapStyle={darkStyle}
      >
        {/* Iterate over busPositions state to display markers for each bus */}
        {busPositions.map((busRoute, busIndex) => (
          <React.Fragment key={busIndex}>
            <Polyline
              coordinates={busRoute.map(stop => ({ latitude: stop.latitude, longitude: stop.longitude }))}
              strokeWidth={2}
              strokeColor="grey"
            />
            {busRoute.map((stop, stopIndex) => (
              <Marker key={`${busIndex}-${stopIndex}`} title={stop.name} coordinate={stop} pinColor={stopIndex === 0 ? 'blue' : 'red'} />
            ))}
            {/* Display bus marker at the current bus position */}
            {busRoute.length > 0 && (
              <Marker
              title={`Bus ${busIndex + 1}`}
              coordinate={busRoute[0]}
            >
              <FontAwesome5 name="bus" size={30} color="blue" />
            </Marker>
            )}
          </React.Fragment>
        ))}
      </MapView>
      {/* Stepper and other components can be added here if needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  mapContainer: {
    marginBottom: 10,
  },
  map: {
    flex: 1,
  },
});

export default CRUDView;