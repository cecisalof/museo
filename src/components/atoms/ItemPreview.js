import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Platform,
  View
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  useResponsiveHeight,
  useResponsiveWidth,
} from "react-native-responsive-dimensions";
import { LinearGradient } from 'expo-linear-gradient';
import { Color, Font } from '../../assets/styles/index.js';

class ItemPreview extends Component {
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress} style={styles.itemButton}>
        <Image
            style={styles.itemImage}
            source={{uri: item.image}}
          />
          <LinearGradient
           colors={['rgba(0,0,0,0.6)', 'rgba(0, 0, 0, 0.4)', 'transparent']}
           end={{ x: 1, y: 0 }}
           locations={[0.0, 0.2, 1]}
           style={styles.gradient}
           />
          {/* Showcase Title */}
          <View style={styles.titleContainer}>
            <Text style={styles.itemName}>{item.title_es}</Text>
            <Image source={require('../../assets/images/icons/white-line.png')} style={styles.itemNameLine}/>
          </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  itemButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemImage: {
    resizeMode: 'cover',
    maxWidth: '100%',
    ...Platform.select({
      ios: {
        height: responsiveHeight(25),
        width: responsiveWidth(50)
       },
      android: {
        height: responsiveHeight(25),
        width: responsiveWidth(50)
      },
      default: {
        height: responsiveHeight(25),
        width: responsiveWidth(50)
      }
    })
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
    fontSize: responsiveFontSize(1.8),
    marginBottom: 10
  },
  itemNameLine:{
    width: '75%',
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
})

export default ItemPreview
