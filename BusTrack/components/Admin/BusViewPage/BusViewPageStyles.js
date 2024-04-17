// BusViewPageStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50, // Adjust paddingTop to provide space for the navigation button
  },
  scrollViewContainer: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  navButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 1,
  },
  navIcon: {
    fontSize: 24,
    color: '#007BFF',
  },
  searchBar: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  busCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  busCard: {
    width: '48%', // Adjust the width to show only two cards per row
    height: 100,
    backgroundColor: '#2596be', // Change the background color to orange
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  busCardText: {
    color: '#000',
    fontSize: 16,
  },
  animatedView: {
    backgroundColor: 'yellow',
    alignItems: 'center',
    padding: 20,
  },
  extraFeatureCard: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFC107',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  extraFeatureCardText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default styles;
