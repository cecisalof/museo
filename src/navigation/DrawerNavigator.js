import {React, useState } from 'react';
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
import facebook from '../assets/images/icons/facebook.png';
import instagram from '../assets/images/icons/instagram.png';
import twitter from '../assets/images/icons/twitter.png';
import youtube from '../assets/images/icons/youtube.png';
import logo from '../assets/images/logo.png'

const Drawer = createDrawerNavigator();

function Logo() {
  return (
    <Image
      source={logo}
      style={styles.logo}
    />
  );
}

const DrawerMenu = () => {
  // const dimensions = useWindowDimensions();
  return (
    <Drawer.Navigator
      drawerContent= { (props) => <CustomDrawerContent {...props} /> }
      screenOptions={{
        headerTitle: (props) => <Logo {...props} />,
        headerTintColor: '#FFFFFF',
        headerBackButtonMenuEnabled: false,
        headerStyle: {
          backgroundColor: Color.BLACK,
          borderBottomColor: Color.SECONDARY,
          borderWidth: 2,
        },
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
      <Drawer.Screen name="Splash" component={SplashScreen} />
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="BaseFloor" component={BaseFloorScreen} />
      <Drawer.Screen name="FirstFloor" component={FirstFloorScreen}  />
      <Drawer.Screen name="SecondFloor" component={SecondFloorScreen} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props) => {
  const [activeButton, SetActiveButton] = useState(false);

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.menuTitleContainer}>
        <Text style={styles.menuTitle}>Menú</Text>
        <Text style={styles.menuSubtitle}>Museo Egipcio Melilla</Text>
      </View>
      <View style={styles.itemContainer}>
        <Item
          label = 'Planta Baja'
          onPress = {() => {
            SetActiveButton(true);
            console.log(activeButton);
            props.navigation.navigate('Planta Baja')
            }
          }
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
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.socialMedia}>
            <TouchableOpacity><Image source={instagram} style={styles.icons} /></TouchableOpacity>
            <TouchableOpacity><Image source={facebook} style={styles.icons} /></TouchableOpacity>
            <TouchableOpacity><Image source={twitter} style={styles.icons} /></TouchableOpacity>
            <TouchableOpacity><Image source={youtube} style={styles.icons} /></TouchableOpacity>
          </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  menuTitleContainer: {
    flex: 2,
    paddingTop: 48,
    padding: 16
  },
  itemContainer: {
    flex: 4,
    paddingBottom: 16
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
  icons: {
    width: 20,
    height: 20
  },
  iconContainer: {
      flex: 1,
  },
  socialMedia: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  logo: {
    height: 33,
    width: 83,
    alignSelf: 'center'
  }
});

export default DrawerMenu;
