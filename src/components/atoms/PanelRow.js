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
import translateFromBackend from '../../utils/translate';

class PanelRow extends React.Component {
  render() {
    const {item, collection} = this.props;
    console.log(this.props);
    return (
      <View>
        <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
          <Image
              style={styles.collectionImage}
              source={{uri: collection.image}}
            />
            <LinearGradient
             colors={['rgba(0,0,0,0.6)', 'rgba(0, 0, 0, 0.4)', 'transparent']}
             end={{ x: 1, y: 0 }}
             locations={[0.0, 0.2, 1]}
             style={styles.gradient}
             />
           {/* Collection Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.itemName}>{translateFromBackend(item, 'title')}</Text>
         </View>
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
  titleContainer: {
    position: 'absolute',
    bottom: '15%',
    left: '10%',
    width: '100%'
  },
  itemName: {
    color: Color.WHITE,
    fontFamily: 'Roboto-Bold',
    fontSize: responsiveFontSize(3.8),
    opacity: 0.5,
    textAlign: 'left',
    textTransform: 'uppercase',
    marginBottom: 10
  },
  itemNameLine:{
    width: '40%',
    ...Platform.select({
      ios: {
       },
      android: {
      },
      default: {
        height: 2
      }
    })
  }
});

export default PanelRow
