import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';

//Navigator
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';

// Fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faMinus, faHome, faCode, faBars, faGear } from '@fortawesome/free-solid-svg-icons';

//Telas
import HomeScreen  from '../Screens/HomeScreen';
import EquipeScreen  from '../Screens/EquipeScreen';
import MenuScreen  from '../Screens/MenuScreen';
import MenuLateral from '../Screens/MenuLateral';

export default function Menu() {

  const Drawer = createDrawerNavigator();

  const Tab = createBottomTabNavigator();

  const BottomTab = () => {
    <NavigationContainer>
      <Tab.Navigator 
        initialRouteName="Feed"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faHome} />
              )
          }}
          />

        <Tab.Screen 
          name="Equipe" 
          component={EquipeScreen}
          options={{
            tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faCode} />
              )
          }}
          />

        <Tab.Screen 
          name="Menu" 
          component={MenuScreen}
          options={{
            tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faBars} />
              )
          }}
          />

      </Tab.Navigator>
    </NavigationContainer>
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Menu" component={MenuLateral} />
        <Drawer.Screen name="Home" component={BottomTab} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}
