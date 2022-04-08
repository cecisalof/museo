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
            {/* Collection Title */}
           <View style={styles.titleContainer}>
             <View style={styles.itemLabel}>
              <Text style={styles.itemName}>{translateFromBackend(item, 'title')}</Text>
             <Image source={require('../../assets/images/icons/white-line.png')} style={styles.itemNameLine}/>
           </View>
             <View style={styles.eyeContainer}>
               <Image source={require('../../assets/images/icons/eye-icon.png')} style={styles.eye}/>
             </View>
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
    flexDirection: 'row',
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
  },
  itemLabel:{
    flex: 3
  },
  eyeContainer:{
    flex: 1,
    flexDirection: 'row'
  },
  eye: {
    width: 24,
    height: 16
  }
});

export default CollectionRow
