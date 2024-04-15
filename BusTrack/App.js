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
import { checkMultipleRollNumbers } from './studentutil' ; // Import the function to check multiple roll numbers
import { app } from './firebaseConfig'; // Import Firebase configuration

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    console.log("Firebase initialized successfully:", app);
  }, []);

  useEffect(() => {
    const rollNumbers = [
      "22ALR004",
      "22ALR010",
      "22ALR017",
      "22ALR020",
      "22ALR021",
      "22ALR026",
      "22ALR031",
      "22ALR036",
      "22ALR037",
      "22ALR043",
      "22ALR045",
      "22ALR050",
      "22ALR052",
      "22ALR053",
      "22ALR080",
      "22ALR083",
      "22ALR112"
    ];

    const checkRollNumbers = async () => {
      const results = await checkMultipleRollNumbers(rollNumbers);
      console.log("Results:", results);
    };

    checkRollNumbers();
  }, []);

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

export default App;
