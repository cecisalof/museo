import React from 'react';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
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
  Linking
} from "react-native";
import Item from '../components/atoms/MenuItem.js';
import firstFloor from '../assets/images/icons/firstFloor.png';
import baseFloor from '../assets/images/icons/baseFloor.png';
import secondFloor from '../assets/images/icons/secondFloor.png';
import people from '../assets/images/icons/museumFriends.png';
import HomeScreen from '../screens/HomeScreen';
import FloorScreen from '../screens/FloorScreen';
import CollectionScreen from '../screens/CollectionScreen';
import PanelsScreen from '../screens/PanelsScreen';
import PdfScreen from '../screens/PdfScreen';
import ContactScreen from '../screens/ContactScreen';
import ItemScreen from '../screens/ItemScreen';
import SplashScreen from '../screens/SplashScreen';
import SearchResults from '../screens/SearchScreen';
import { Color, Font } from '../assets/styles/index.js';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import i18n from 'i18n-js';

const Drawer = createDrawerNavigator();

function Logo(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigationRef.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Home'}],
        })
      )}
    >
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}
      />
    </TouchableOpacity>
  );
}

function Search(props) {
  return (
    <TouchableOpacity
      onPress={() => props.navigationRef.dispatch(
        CommonActions.reset({
            index: 0,
            routes: [{ name: 'Search'}],
        })
      )}
    >
      <Image source={require('../assets/images/icons/search.png')} style={styles.search} />
    </TouchableOpacity>
  );
}

const DrawerMenu = (props) => {
  const navigationRef = props.navigationRef
  return (
    <Drawer.Navigator
      navigationRef={navigationRef}
      drawerContent= { (props) => <CustomDrawerContent {...props} /> }
      screenOptions={{
        headerTitle: (props) => <Logo {...props} navigationRef={navigationRef}  />,
        headerRight: () => <Search {...props} navigationRef={navigationRef}  />,
        headerTintColor: '#FFFFFF',
        headerBackButtonMenuEnabled: false,
        headerStyle: {
          backgroundColor: Color.BLACK,
          borderBottomColor: Color.SECONDARY,
          borderWidth: 2
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
      <Drawer.Screen name="Splash" component={SplashScreen} options={{ headerTitleAlign: "center" }} />
      <Drawer.Screen name="Home" component={HomeScreen} options={{ headerTitleAlign: "center" }} />
      <Drawer.Screen name="Search" component={SearchResults} options={{ headerTitleAlign: "center" }} />
      <Drawer.Screen name="Floor" component={FloorScreen} options={{ headerTitleAlign: "center" }}/>
      <Drawer.Screen name="Collection" component={CollectionScreen} options={{ headerTitleAlign: "center"}}/>
      <Drawer.Screen name="Item" component={ItemScreen} options={{ headerTitleAlign: "center" }}/>
      <Drawer.Screen name="Panel" component={PanelsScreen} options={{ headerTitleAlign: "center"}}/>
      <Drawer.Screen name="Pdf" component={PdfScreen} options={{ headerTitleAlign: "center" }}/>
      <Drawer.Screen name="Contact" component={ContactScreen} options={{ headerTitleAlign: "center" }}/>
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer} contentContainerStyle={styles.drawerContent}>
      <View style={styles.mainContainer}>
        <View style={styles.menuTitleContainer}>
          <Text style={styles.menuTitle}>{i18n.t('drawerMenu.title')}</Text>
          <Text style={styles.menuSubtitle}>{i18n.t('drawerMenu.museumTitle')}</Text>
        </View>
        <View style={styles.itemContainer}>
          <Item
            label = {i18n.t('drawerMenu.menuItems.base')}
            onPress = {() => {
                props.navigation.dispatch(
                  CommonActions.reset({
                      index: 0,
                      routes: [{ name: 'Floor', params: {
                      floorName: 'Planta B',
                      floorId: 'floor-0'}
                    }],
                  })
                );
              }}
            image= {baseFloor}
          />
          <Item
            label = {i18n.t('drawerMenu.menuItems.first')}
            onPress = {() => {
              props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Floor', params: {
                    floorName: 'Planta 1',
                    floorId: 'floor-1'}
                  }],
                })
            );
          }}
          image= {firstFloor}
          />
          <Item
            label = {i18n.t('drawerMenu.menuItems.second')}
            onPress = {() => {
              props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'Floor', params: {
                    floorName: 'Planta 2',
                    floorId: 'floor-2'}
                  }],
                })
            );
          }}
            image= {secondFloor}
          />
          <Item
            label = {i18n.t('drawerMenu.menuItems.museumFriends')}
            onPress = {() => Linking.openURL('https://fundaciongaselec.es/club/')}
            image= {people}
          />
        </View>
      </View>
      <View style={styles.iconContainer}>
        <View style={styles.socialMedia}>
            <TouchableOpacity onPress = {() => Linking.openURL('https://www.instagram.com/fundaciongaselec/?hl=en')}><Image source={require('../assets/images/icons/instagram.png')} style={[styles.icons, styles.iconInstagram]} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => Linking.openURL('https://www.facebook.com/FundacionGaselec/')}><Image source={require('../assets/images/icons/facebook.png')} style={[styles.icons, styles.iconInstagram]} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => Linking.openURL('https://twitter.com/fundaciogaselec')}><Image source={require('../assets/images/icons/twitter.png')} style={styles.icons} /></TouchableOpacity>
            <TouchableOpacity onPress = {() => Linking.openURL('https://www.youtube.com/c/fundaciongaselec')}><Image source={require('../assets/images/icons/youTube.png')} style={styles.icons} /></TouchableOpacity>
          </View>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    justifyContent: 'space-around',
    flex: 1,
    minHeight: 400
  },
  mainContainer: {
    flex: 1
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  menuTitleContainer: {
    flex: responsiveHeight(100) >= 768 ? 1 : 2,
    paddingVertical: responsiveHeight(100) >= 768 ? 48 : 24,
    padding: 16
  },
  itemContainer: {
    flex: 8,
    paddingBottom: 16
  },
  menuTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: 25,
    lineHeight: 36
  },
  menuSubtitle: {
    fontFamily: 'Roboto',
    fontSize: responsiveWidth(100) >= 768 ? responsiveFontSize(1.2) : 12,
    lineHeight: Font.LINE_HEIGHT_16
  },
  icons: {
    resizeMode: 'contain',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        width: responsiveWidth(100) >= 768 ? 50 : 30,
        height: responsiveWidth(100) >= 768 ? 50 : 30,
       },
      android: {
        width: responsiveWidth(100) >= 768 ? 50 : 30,
        height: responsiveWidth(100) >= 768 ? 50 : 30,
      },
      default: {
        width: 20,
        height: 20
      }
    })
  },
  iconInstagram: {
    ...Platform.select({
      ios: {
        width: responsiveWidth(100) >= 768 ? 48 : 20,
        height: responsiveWidth(100) >= 768 ? 48 : 20
       },
      android: {
        width: responsiveWidth(100) >= 768 ? 48 : 20,
        height: responsiveWidth(100) >= 768 ? 48 : 20,
      },
      default: {
        width: 17,
        height: 17
      }
    })
  },
  iconContainer: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  socialMedia: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginVertical: 20,
  },
  logo: {
    height: 33,
    width: 83
  },
  search: {
    marginRight: '10%',
    ...Platform.select({
      ios: {
        width: 24,
        height: 24,
        marginRight: '10%'
       },
      android: {
        width: 24,
        height: 24,
        marginRight: 16
      },
      default: {
        width: 24,
        height: 24,
        marginRight: 16
      }
    })
  }
});

export default DrawerMenu;
