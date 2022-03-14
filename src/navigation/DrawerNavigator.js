import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor,
  Linking
} from "react-native";
import Item from '../components/atoms/MenuItem.js';
import baseFloor from '../assets/images/icons/baseFloor.png';
import firstFloor from '../assets/images/icons/firstFloor.png';
import secondFloor from '../assets/images/icons/secondFloor.png';
import people from '../assets/images/icons/museumFriends.png';
import HomeScreen from '../screens/HomeScreen';
import BaseFloorScreen from '../screens/BaseFloorScreen';
import FirstFloorScreen from '../screens/FirstFloorScreen';
import SecondFloorScreen from '../screens/SecondFloorScreen';
import SplashScreen from '../screens/SplashScreen';
import { Color, Font } from '../assets/styles/index.js';

const Drawer = createDrawerNavigator();

const DrawerMenu = () => {
  // const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent= { (props) => <CustomDrawerContent {...props} /> }
      screenOptions={{
        drawerStyle: {
          width: 304,
          backgroundColor: Color.PRIMARY,
          borderTopRightRadius: 16,
          borderBottomRightRadius: 16,
          overlayColor: 'transparent',
          ...Platform.select({
            ios: {
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50
             },
            android: {
              borderTopRightRadius: 50,
              borderBottomRightRadius: 50

            },
            default: {
              borderTopRightRadius: 16,
              borderBottomRightRadius: 16
            }
          })
        }} }
        >
      <Drawer.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }}/>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Planta Baja" component={BaseFloorScreen} />
      <Drawer.Screen name="Planta 1" component={FirstFloorScreen} />
      <Drawer.Screen name="Planta 2" component={SecondFloorScreen} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menú</Text>
        <Text style={styles.menuSubtitle}>Museo Egipcio Melilla</Text>
      </View>
        <Item
          label = 'Planta Baja'
          onPress = {() => props.navigation.navigate('Planta Baja')}
          image= {baseFloor}
        />
        <Item
          label = 'Planta 1'
          onPress = {() => props.navigation.navigate('Planta 1')}
          image= {firstFloor}
        />
        <Item
          label = 'Planta 2'
          onPress = {() => props.navigation.navigate('Planta 2')}
          image= {secondFloor}
        />
        <Item
          label = 'Amigos del Museo'
          onPress = {() => Linking.openURL('https://fundaciongaselec.es/contacto/')}
          image= {people}
        />
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
  },
  menuTitleContainer: {
    paddingTop: 48,
    padding: 16
  },
  menuTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 24,
    lineHeight: 36
  },
  menuSubtitle: {
    fontFamily: 'Roboto',
    fontSize: Font.FONT_SIZE_12,
    lineHeight: Font.LINE_HEIGHT_16
  }
});

export default DrawerMenu;
