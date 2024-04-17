// BusViewPage.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import styles from './BusViewPageStyles';

const BusViewPage = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [busNumbers, setBusNumbers] = useState([...Array(60).keys()].map(i => i + 1));
  const [animation] = useState(new Animated.Value(0));
  const [selectedBusNumber, setSelectedBusNumber] = useState(null); // Track selected bus number

  const filteredBusNumbers = busNumbers.filter(busNumber => busNumber.toString().includes(searchQuery));

  const handleBusCardPress = (busNumber) => {
    setSelectedBusNumber(busNumber); // Set selected bus number
    // Navigate to the map view or perform any other action
    navigation.navigate('BusDetails', { busNumber }); // Navigate to MapView with the selected bus number
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Bus Number"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />

        <View style={styles.busCardsContainer}>
          {filteredBusNumbers.map(busNumber => (
            <TouchableOpacity key={busNumber} style={styles.busCard} onPress={() => handleBusCardPress(busNumber)}>
              <Text style={styles.busCardText}>Bus {busNumber}</Text>
            </TouchableOpacity>
          ))}
          {/* Add some extra space at the bottom to ensure scrollability */}
          <View style={{ height: 100 }}></View>
        </View>
      </View>

      <Animated.View style={[styles.animatedView, { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] }]}>
        {/* Add any extra feature component here */}
      </Animated.View>
    </ScrollView>
  );
};

export default BusViewPage;
