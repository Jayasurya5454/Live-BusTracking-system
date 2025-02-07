import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { ref, get } from 'firebase/database';
import { db } from '../../../firebaseConfig';

const CRUDView = () => {
  const mapRef = useRef(null);
  const [busPositions, setBusPositions] = useState([]);
  const [currentStopIndexes, setCurrentStopIndexes] = useState([0, 0]); // One for each bus
  const [isMoving, setIsMoving] = useState(true);

  useEffect(() => {
    fetchBusDetails();
  }, []);

  const fetchBusDetails = async () => {
    try {
      const busRoutesRef = ref(db, 'bus_routes');
      const snapshot = await get(busRoutesRef);
      if (snapshot.exists()) {
        const data = snapshot.val();
        const busRoutesToDisplay = ['27', '74'];
        const positions = busRoutesToDisplay.map(routeID => {
          const busRoute = data[routeID];
          const stops = Object.values(busRoute).map(stopInfo => ({
            latitude: stopInfo.latitude,
            longitude: stopInfo.longitude,
            name: stopInfo.stop
          }));
          return stops;
        });
        setBusPositions(positions);

        // Start bus movement
        startBusMovement();
      } else {
        console.log("No data found for bus routes.");
      }
    } catch (error) {
      console.error('Error fetching bus details:', error);
    }
  };

 const startBusMovement = () => {
  const interval = setInterval(() => {
    if (isMoving) {
      setCurrentStopIndexes(prevIndexes => 
        prevIndexes.map((index, busIndex) => {
          const nextIndex = (index + 1) % (busPositions[busIndex] ? busPositions[busIndex].length : 1);
          return nextIndex;
        })
      );
    }
  }, 3500); // Change this interval as needed

  return () => clearInterval(interval);
};


  const toggleBusMovement = () => {
    setIsMoving(prevState => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Button
          title={isMoving ? 'Pause Movement' : 'Resume Movement'}
          onPress={toggleBusMovement}
        />
      </View>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        ref={mapRef}
      >
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
            {busRoute.length > 0 && (
              <Marker
                title={`Bus ${busIndex + 1}`}
                coordinate={busRoute[currentStopIndexes[busIndex]]}
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

export default CRUDView;