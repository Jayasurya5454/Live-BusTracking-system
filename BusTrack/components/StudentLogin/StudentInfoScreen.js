<<<<<<< HEAD
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stepper = () => {
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = React.useState(1);
  const [complete, setComplete] = React.useState(false);
=======
import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/database';
>>>>>>> 6a73adb (added a nav)

const Stepper = ({ steps, currentStep, complete }) => {
  const handleNext = () => {
    
  };

  return (
    <View style={styles.stepperContainer}>
      {steps.map((step, index) => (
        <View key={index} style={[styles.stepItem, currentStep > index + 1 && styles.complete]}>
          <View style={[styles.stepCircle, currentStep === index + 1 && styles.active]}>
            {currentStep > index + 1 || complete ? (
              <Text style={styles.stepText}>✓</Text>
            ) : (
              <Text style={styles.stepText}>{index + 1}</Text>
            )}
          </View>
          <Text style={styles.stepLabel}>{step}</Text>
        </View>
      ))}
      {!complete && (
        <Button title={currentStep === steps.length ? "Finish" : "Next"} onPress={handleNext} />
      )}
    </View>
  );
};

const StudentInfoScreen = ({ navigation }) => {
  const [studentData, setStudentData] = useState(null);
  const [showStudentData, setShowStudentData] = useState(false);
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Fetch data from Firebase
    const fetchData = async () => {
      try {
        const snapshot = await firebase.database().ref('students').once('value');
        const data = snapshot.val();
        setStudentData(data);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navBar}>
        <Text style={styles.navText}>Navigation Bar</Text>
        <TouchableOpacity onPress={() => setShowStudentData(!showStudentData)}>
          <Text style={styles.navIcon}>Show Student Data</Text>
        </TouchableOpacity>
      </View>

      {/* Stepper */}
<<<<<<< HEAD
      <Stepper />
=======
      <Stepper steps={steps} currentStep={currentStep} complete={complete} />

      {/* Student data */}
      {showStudentData && (
        <View style={styles.studentDataContainer}>
          <Text style={styles.studentDataTitle}>Student Data</Text>
          {studentData ? (
            <View>
              <Text>Name: {studentData.name}</Text>
              <Text>Email: {studentData.email}</Text>
              {/* Add more fields as needed */}
            </View>
          ) : (
            <Text>Loading student data...</Text>
          )}
        </View>
      )}
>>>>>>> 6a73adb (added a nav)
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
  },
  stepperContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepItem: {
    flexDirection: '',
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
<<<<<<< HEAD
=======
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
>>>>>>> 6a73adb (added a nav)
});

export default StudentInfoScreen;
