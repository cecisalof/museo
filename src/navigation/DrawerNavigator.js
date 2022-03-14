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
  PlatformColor
} from "react-native";
import line from '../assets/images/floors/Line.png';
import baseFloor from '../assets/images/icons/baseFloor.png';
import HomeScreen from '../screens/HomeScreen';
import BaseFloorScreen from '../screens/BaseFloorScreen';
import FirstFloorScreen from '../screens/FirstFloorScreen';
import SecondFloorScreen from '../screens/SecondFloorScreen';
import SplashScreen from '../screens/SplashScreen';
import { Color, Font } from '../assets/styles/index.js'

const Drawer = createDrawerNavigator();

export default function DrawerMenu() {
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

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} style={styles.container}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menú</Text>
        <Text style={styles.menuSubtitle}>Museo Egipcio Melilla</Text>
      </View>
      <View style={styles.tabContainer}>
        <Image source={baseFloor} style={styles.floorIcon}/><DrawerItem style={styles.drawerItem}label="Planta Baja" onPress={() => alert('Link to help')} />
      </View>
      <DrawerItem label="Planta1" onPress={() => alert('Link to help')} />
      <DrawerItem label="Planta2" onPress={() => alert('Link to help')} />
    </DrawerContentScrollView>
  );
}

// const MenuItems = ({ navigation}) => {
//   return (
//     <DrawerContentScrollView>
//   )
// }
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
  },
  floorIcon: {
    width: 19,
    height: 24
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16
  },
  drawerItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  }
});
