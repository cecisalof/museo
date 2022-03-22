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
  Platform
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  useResponsiveHeight,
  useResponsiveWidth,
} from "react-native-responsive-dimensions";

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
        <Text style={styles.itemText}>{item.title_es}</Text>
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
    ...Platform.select({
      ios: {
        height: responsiveHeight(30),
        width: responsiveWidth(100)
       },
      android: {
        height: responsiveHeight(60),
        width: responsiveWidth(100)
      },
      default: {
        height: responsiveHeight(30),
        width: responsiveWidth(100)
      }
    })
  },
  itemText:{
    color: Color.WHITE
  }
})

export default ItemPreview
