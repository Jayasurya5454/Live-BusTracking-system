import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';

const BusDetails = () => {
  const mapRef = useRef(null);
  const [busPositions, setBusPositions] = useState([]);
  const [busStops, setBusStops] = useState([]);
  const route = useRoute();
  const { busNumber } = route.params || {};

  useEffect(() => {
    fetchBusDetails();
  }, []);

  const fetchBusDetails = async () => {
    try {
      const busRouteRef = ref(db, `bus_routes/${busNumber}`); // Reference to the specific bus route
      const snapshot = await get(busRouteRef);
      if (snapshot.exists()) {
        const busRouteData = snapshot.val();
        const positions = Object.values(busRouteData).map(stopInfo => ({
          latitude: stopInfo.latitude,
          longitude: stopInfo.longitude,
          name: stopInfo.stop
        }));
        setBusPositions([positions]); // Store bus positions as an array of arrays
        setBusStops(positions);
        if (mapRef.current && positions.length > 0) {
          // Center the map around the first bus stop of the specified bus route
          mapRef.current.animateToRegion({
            latitude: positions[0].latitude,
            longitude: positions[0].longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05
          });
        }
      } else {
        console.log(`No data found for bus route ${busNumber}.`);
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
        initialRegion={{
          latitude: busStops.length > 0 ? busStops[0].latitude : 0,
          longitude: busStops.length > 0 ? busStops[0].longitude : 0,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        {busPositions.map((busRoute, busIndex) => (
          <React.Fragment key={busIndex}>
            <Polyline
              coordinates={busRoute}
              strokeWidth={2}
              strokeColor="grey"
            />
            {busRoute.map((stop, stopIndex) => (
              <Marker key={`${busIndex}-${stopIndex}`} title={stop.name} coordinate={stop} pinColor={stopIndex === 0 ? 'blue' : 'red'} />
            ))}
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

export default BusDetails;
