import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { View, StyleSheet, Image, Button } from 'react-native';

interface StudentInfoScreenProps {
  busPosition: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

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

const StudentInfoScreen: React.FC<StudentInfoScreenProps> = ({ busPosition }) => {
  const mapRef = useRef<MapView>(null);
  const [isMapVisible, setIsMapVisible] = useState(true);

  const toggleMapVisibility = () => {
    setIsMapVisible(!isMapVisible);
  };

  useEffect(() => {
    // Your useEffect logic here
  }, []); // Empty dependency array to run only once on mount

  return (
    <View style={styles.container}>
      <Button
        title={isMapVisible ? 'Hide Map' : 'Show Map'}
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
            coordinate={busPosition}
          >
            <Image
              source={require('../../mapApp/assets/images/bus.png')}
              style={{ width: 30, height: 30 }} // Adjust the width and height as needed
            />
          </Marker>
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '80%',  // Adjust the width as needed
    aspectRatio: 1,
  },
});

export default StudentInfoScreen;
