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

  const filteredBusNumbers = busNumbers.filter(busNumber => busNumber.toString().includes(searchQuery));

  const animate = () => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        <TouchableOpacity style={styles.navButton} onPress={() => navigation.navigate('AdminDetails')}>
          <FontAwesomeIcon icon={faUser} style={styles.navIcon} />
        </TouchableOpacity>

        <TextInput
          style={styles.searchBar}
          placeholder="Search Bus Number"
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />

        <View style={styles.busCardsContainer}>
          {filteredBusNumbers.map(busNumber => (
            <TouchableOpacity key={busNumber} style={styles.busCard}>
              <Text style={styles.busCardText}>Bus {busNumber}</Text>
            </TouchableOpacity>
          ))}
          {/* Add some extra space at the bottom to ensure scrollability */}
          <View style={{ height: 100 }}></View>
        </View>
      </View>

      <Animated.View style={[styles.animatedView, { transform: [{ translateY: animation.interpolate({ inputRange: [0, 1], outputRange: [100, 0] }) }] }]}>
        <TouchableOpacity style={styles.extraFeatureCard} onPress={animate}>
          {/* Remove the Text component if you want to remove the "Extra Feature" text */}
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default BusViewPage;
