import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const Stepper = () => {
  const steps = ["Customer Info", "Shipping Info", "Payment", "Step 4"];
  const [currentStep, setCurrentStep] = React.useState(1);
  const [complete, setComplete] = React.useState(false);

  const handleNext = () => {
    if (currentStep === steps.length) {
      setComplete(true);
    } else {
      setCurrentStep(prevStep => prevStep + 1);
    }
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
  return (
    <View style={styles.container}>
      {/* Navigation bar */}
      <View style={styles.navBar}>
        <Text style={styles.navText}>Navigation Bar</Text>
        <Button title="Back" onPress={() => navigation.goBack()} />
      </View>

      {/* Stepper */}
      <Stepper />

      {/* Form */}
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Form</Text>
        {/* Add your form components here */}
        <TextInput placeholder="Name" style={styles.input} />
        <TextInput placeholder="Email" style={styles.input} />
        <Button title="Submit" onPress={() => console.log('Form submitted')} />
      </View>
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
  stepperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepItem: {
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
  formContainer: {
    padding: 20,
  },
  formTitle: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
  },
});

export default StudentInfoScreen;
