import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './AdminDashboardStyles';

const AdminDashboard = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('BusView')}>
        <Text style={styles.cardText}>Bus View</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('AddRecord')}>
        <Text style={styles.cardText}>Add Record</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('CROWDView')}>
        <Text style={styles.cardText}>CROWD View</Text>
      </TouchableOpacity>

      {/* New Card for Temporary Driver */}
      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('SubstituteDriver')}>
        <Text style={styles.cardText}>Substitute Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AdminDashboard;
