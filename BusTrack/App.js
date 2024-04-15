// App.js

import React, { useEffect  } from 'react';
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
import firebase from 'firebase/app';
import 'firebase/database'; 


const Stack = createStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDg3Jnx_UarEYP_iHNBMNJObRWxiFeIQVk",
  authDomain: "my-project-1f5d8.firebaseapp.com",
  databaseURL: "https://my-project-1f5d8-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "my-project-1f5d8",
  storageBucket: "my-project-1f5d8.appspot.com",
  messagingSenderId: "654136579877",
  appId: "1:654136579877:web:06874258a82a391826eccc"
};


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App = () => {


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
