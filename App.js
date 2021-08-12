
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';


import LoginScreen from './screens/LoginScreen'
import ChatScreen from './screens/ChatScreen'
import SignupScreen from './screens/Signup'
import ListChatting from './screens/ListChatting';
const Stack = createStackNavigator();


export default function App({navigation}) {
  return (
    <NavigationContainer >
      <Stack.Navigator 
        
      >
        <Stack.Screen name="Login" options={{ headerShown: false}} component={LoginScreen} />
        <Stack.Screen name="Signup" options={{ headerShown: false}} component={SignupScreen}/> 
        <Stack.Screen name="List" options={{ title: ''}} component={ListChatting}/>     
        <Stack.Screen name="Chat" options={{ title: ''}} component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
