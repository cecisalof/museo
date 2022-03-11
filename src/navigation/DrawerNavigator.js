import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../screens/HomeScreen';
import BaseFloorScreen from '../screens/BaseFloorScreen';
import FirstFloorScreen from '../screens/FirstFloorScreen';
import SecondFloorScreen from '../screens/SecondFloorScreen';
import SplashScreen from '../screens/SplashScreen';

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/> 
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Planta Baja" component={BaseFloorScreen} />
      <Drawer.Screen name="Planta 1" component={FirstFloorScreen} />
      <Drawer.Screen name="Planta 2" component={SecondFloorScreen} />
    </Drawer.Navigator>
  );
}
