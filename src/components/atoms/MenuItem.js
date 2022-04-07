import * as React from 'react';
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor,
} from "react-native";
import {
  DrawerItem
} from '@react-navigation/drawer';
import { Color } from '../../assets/styles/index.js';
import {
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

const Item = ({ label, onPress, image, style }) => {
  // const dimensions = useWindowDimensions();
  return (
    <TouchableOpacity onPress={ onPress } style={[styles.tabContainer, style]} >
      <Image source={image} style={styles.floorIcon}/>
      <Text style={styles.drawerItem}>{ label }</Text>
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  tabContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 16
  },
  drawerItem: {
    fontSize: responsiveWidth(100) >= 768 ? responsiveFontSize(1.3) : responsiveFontSize(1.8),
    fontFamily: 'Roboto',
    ...Platform.select({
      ios: {
        width: 150,
        color: '#0E1F12',
        paddingLeft: '5%'
       },
      android: {
        width: 150,
        color: '#0E1F12',
        paddingLeft: '5%'
      },
      default: {
        color: '#0E1F12',
        paddingLeft: '5%'
      }
    })
  },
  floorIcon: {
    resizeMode: 'contain',
    width: responsiveWidth(100) >= 768 ? 40 : 19,
    height: responsiveWidth(100) >= 768 ? 45 : 24
  }
});
export default Item;
