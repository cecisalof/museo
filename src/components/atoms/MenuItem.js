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
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  },
  drawerItem: {
    ...Platform.select({
      ios: {
        width: 150,
        color: '#0E1F12',
        paddingLeft: 12
       },
      android: {
        width: 150,
        color: '#0E1F12',
        paddingLeft: 12
      },
      default: {
        color: '#0E1F12',
        paddingLeft: 12
      }
    })
  },
  floorIcon: {
    resizeMode: 'contain',
    width: 19,
    height: 24
  },
  specialIcon: {
    ...Platform.select({
      ios: {
       },
      android: {
      },
      default: {
        width: 24,
        height: 17.45
      }
    })
  },
  tabContainerSelected: {
    borderColor: Color.SECONDARY,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 12,
    paddingBottom: 12,
  }
});
export default Item;
