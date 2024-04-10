// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen/HomeScreen';
import StudentLogin from './components/StudentLogin/StudentLogin';
import DriverLogin from './components/DriverLogin/DriverLogin';
import AdminLogin from './components/AdminLogin/AdminLogin';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Student" component={StudentLogin} />
        <Stack.Screen name="Driver" component={DriverLogin} />
        <Stack.Screen name="Admin" component={AdminLogin} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
