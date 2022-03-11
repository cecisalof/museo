import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from '../../screens/HomeScreen';
import DetailsScreen from '../../screens/DetailsScreen';
import ShopScreen from '../../screens/ShopScreen';

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} options={{ title: 'Home' }}/>
      <Drawer.Screen name="Details" component={DetailsScreen} options={{ title: 'Details' }}/>
      <Drawer.Screen name="Shop" component={ShopScreen}  options={{ title: 'Shop' }} />
    </Drawer.Navigator>
  );
}
