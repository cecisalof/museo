import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Platform
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Color, Font } from '../../assets/styles/index.js';

class CollectionRow extends React.Component {
  render() {
    const {item} = this.props;
    // console.log( 'items', item);
    return (
      <View>
       <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
         <Image
             style={styles.collectionImage}
             source={{uri: item.image}}
           />
           <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0, 0, 0, 0.4)', 'transparent']}
            end={{ x: 1, y: 0 }}
            locations={[0.0, 0.2, 1]}
            style={styles.gradient}
            />
         {/* Showcase Title */}
         <Text style={styles.itemName}>{item.title_es}</Text>
         <Image source={require('../../assets/images/icons/white-line.png')} style={styles.itemNameLine}/>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collectionImage: {
    flex: 1,
    resizeMode: 'cover',
    height: responsiveHeight(23),
    width: responsiveWidth(100)
  },
  gradient: {
    position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     height: '100%'
  },
  itemName: {
    position: 'absolute',
    left: responsiveWidth(5),
    color: Color.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: responsiveFontSize(1.8)
  },
  itemNameLine:{
    position: 'absolute',
    left: responsiveWidth(5),
    top: responsiveHeight(13),
    height: responsiveHeight(0.2),
    ...Platform.select({
      ios: {
        width: responsiveWidth(25),
        left: responsiveWidth(5),
        top: responsiveHeight(13),
        height: responsiveHeight(0.2)
       },
      android: {
        width: responsiveWidth(25),
        left: responsiveWidth(5),
        top: responsiveHeight(13),
        height: responsiveHeight(0.2)
      },
      default: {
        width: 95,
        left: responsiveWidth(5),
        top: responsiveHeight(14),
        height: 2
      }
    })
  }
});

export default CollectionRow
