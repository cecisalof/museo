import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BaseFloorScreen from '../screens/BaseFloorScreen';
import FirstFloorScreen from '../screens/FirstFloorScreen';
import SecondFloorScreen from '../screens/SecondFloorScreen';
import AppNavigator from '../navigation/AppNavigator';

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen}/>
      <Drawer.Screen name="BaseFloor" component={BaseFloorScreen} options={{ title: 'Planta Baja' }} />
      <Drawer.Screen name="FirstFloor" component={FirstFloorScreen} options={{ title: 'Planta 1' }} />
      <Drawer.Screen name="SecondFloor" component={SecondFloorScreen} options={{ title: 'Planta 2' }} />
    </Drawer.Navigator>
  );
}
