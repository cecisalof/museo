import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  Image,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from "react-native";
import {
  setItems,
} from "../../store/itemActions";
import { Color, Font } from '../../assets/styles/index.js';

class Header extends Component{
    render () {
      const { showOtherFloors, headerName } = this.props
      return (
      <View style={styles.floorButtonsContainer}>
        <View style={styles.floorButtonSelectedContainer}>
          <View style={styles.floorButtonSelected}><Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.floorButtonSelectedText}>{headerName}</Text></View>
        </View>
        { showOtherFloors && <View style={styles.smallButtonContainer}>
          <TouchableOpacity style={styles.floorButton}><Text style={styles.floorButtonsText}>1</Text></TouchableOpacity>
          <TouchableOpacity style={styles.floorButton}><Text style={styles.floorButtonsText}>2</Text></TouchableOpacity>
        </View> }
      </View>
    );
  }
}

const styles = StyleSheet.create({
    floorButtonsContainer: {
      flex: 0.5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      ...Platform.select({
        ios: {
          marginRight: '3%'
         },
        android: {
          marginRight: '5%'
        },
        default: {
          marginRight: '5%'
        }
      })
    },
    smallButtonContainer: {
      flex: 2,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    floorButton:{
      marginHorizontal: '7%'
    },
    floorButtonsText: {
      fontFamily: 'Roboto',
      color: Color.WHITE,
      fontSize: 12,
      justifyContent: 'flex-end',
    },
    floorButtonSelectedContainer: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: '5%'
    },
    floorButtonSelected: {
      flexDirection: 'row'
    },
    floorButtonSelectedText: {
      fontSize: 16,
      fontFamily: 'Roboto',
      color: Color.WHITE,
      marginLeft: 7
    },
    avatar: {
      ...Platform.select({
        ios: {
          width: 21,
          height: 21
         },
        android: {
          width: 21,
          height: 21
        },
        default: {
          width: 21,
          height: 21
        }
      })
    }
  })


  function mapStateToProps({items}) {
    return {items}
  }

  export default connect(mapStateToProps)(Header);
