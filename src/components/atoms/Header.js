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
  responsiveHeight,
} from "react-native-responsive-dimensions";
import {
  setItems,
} from "../../store/itemActions";
import { Color, Font } from '../../assets/styles/index.js';

class Header extends Component{
    render () {
      const { headerName, floorId, navigation } = this.props
      return (
      <View style={styles.floorButtonsContainer}>
        <View style={styles.floorButtonSelectedContainer}>
          <TouchableOpacity style={styles.floorButtonSelected} onPress={()=>navigation.navigate('Floor', {floorId: floorId, floorName: headerName})}>
            <Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.floorButtonSelectedText}>{headerName}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.smallButtonContainer}>
          {floorId != 'floor-0' &&<TouchableOpacity style={styles.floorButton} onPress={()=>navigation.navigate('Floor', {floorId: 'floor-0', floorName: 'Planta Baja'})}><Text style={styles.floorButtonsText}>Planta Baja</Text></TouchableOpacity>}
          {floorId != 'floor-1' &&<TouchableOpacity style={styles.floorButton} onPress={()=>navigation.navigate('Floor', {floorId: 'floor-1', floorName: 'Planta 1'})}><Text style={styles.floorButtonsText}>Planta 1</Text></TouchableOpacity>}
          {floorId != 'floor-2' &&<TouchableOpacity style={styles.floorButton} onPress={()=>navigation.navigate('Floor', {floorId: 'floor-2', floorName: 'Planta 2'})}><Text style={styles.floorButtonsText}>Planta 2</Text></TouchableOpacity>}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    floorButtonsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: Color.BLACK,
      height: responsiveHeight(10),
      ...Platform.select({
        ios: {
          paddingRight: '3%'
         },
        android: {
          paddingRight: '5%'
        },
        default: {
          paddingRight: '5%'
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
