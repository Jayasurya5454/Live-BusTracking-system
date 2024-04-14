// App.js

import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import StudentLogin from './components/StudentLogin/StudentLogin';
import DriverLogin from './components/DriverLogin/DriverLogin';
import AdminLogin from './components/Admin/AdminLogin/AdminLogin';
import AdminDashboard from './components/Admin/AdminDashboard/AdminDashboard';
import AddRecordForm from './components/Admin/AddRecordForm/AddRecordForm';
import FacultyLogin from './components/FacultyLogin/FacultyLogin';
import StudentInfoScreen from './components/StudentLogin/StudentInfoScreen';
import BusViewPage from './components/Admin/BusViewPage/BusViewPage';
import FacultyInfoScreen from './components/FacultyLogin/FacultyInfoScreen';

// Import Firebase configuration
import { app } from './firebaseConfig';

// Create a stack navigator
const Stack = createStackNavigator();

// App component
const App = () => {
  
  // Initialize Firebase when the component mounts
  useEffect(() => {
    // Log Firebase app object to console for verification
    console.log("Firebase initialized successfully:", app);
  }, []);

  // Return the navigation container with stack navigator
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        {/* Define screens */}
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Student" component={StudentLogin} />
        <Stack.Screen name="Driver" component={DriverLogin} />
        <Stack.Screen name="Admin" component={AdminLogin} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} /> 
        <Stack.Screen name="AddRecord" component={AddRecordForm} />
        <Stack.Screen name="Faculty" component={FacultyLogin} />
        <Stack.Screen name="StudentInfoScreen" component={StudentInfoScreen} />
        <Stack.Screen name="BusView" component={BusViewPage} />
        <Stack.Screen name="FacultyInfo" component={FacultyInfoScreen} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// Export the App component as default
export default App;
