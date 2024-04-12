// StudentInfoScreen.js

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUser, faBus } from '@fortawesome/free-solid-svg-icons'; // Importing the bus icon
import { useNavigation } from '@react-navigation/native'; // Importing navigation hook

const StudentInfoScreen = () => {
  const [studentData, setStudentData] = useState(null);
  const [showStudentData, setShowStudentData] = useState(false);
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const navigation = useNavigation(); // Initialize navigation

  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleComplete = () => {
    setComplete(true);
  };

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navBar}>
        <TouchableOpacity onPress={() => setShowStudentData(!showStudentData)}>
          <FontAwesomeIcon icon={faUser} style={styles.navIcon} />
        </TouchableOpacity>
        {/* Button to navigate to BusViewPage */}
        <TouchableOpacity onPress={() => navigation.navigate('BusView')}>
          <FontAwesomeIcon icon={faBus} style={styles.navIcon} />
        </TouchableOpacity>
      </View>

      {/* Rest of the code remains the same */}
      {/* Stepper, Student data etc. */}

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
  navText: {
    fontSize: 20,
  },
  navIcon: {
    fontSize: 16,
    color: '#007BFF',
    marginLeft: 10, // Add some margin between icons
  },
  stepperContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepCircle: {
    backgroundColor: '#374151',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  active: {
    backgroundColor: '#60A5FA',
  },
  complete: {
    opacity: 0.6,
  },
  stepLabel: {
    marginTop: 5,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlButton: {
    fontSize: 16,
    fontWeight: 'bold',
    padding: 10,
    borderRadius: 5,
  },
  prevButton: {
    backgroundColor: '#ccc',
  },
  nextButton: {
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  studentDataContainer: {
    padding: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  studentDataTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default StudentInfoScreen;
