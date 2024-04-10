// AdminDashboardStyles.js

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgray',
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffc107', // Adjust colors as needed
  },
  cardText: {
    fontSize: 20,
  },
});

export default styles;
