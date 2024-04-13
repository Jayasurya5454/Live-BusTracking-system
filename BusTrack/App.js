// App.js

import React from 'react';
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
import FacultyInfoScreen from './components/FacultyLogin/FacultyInfoScreen'

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Home" >
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
