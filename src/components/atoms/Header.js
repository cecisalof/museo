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
  responsiveFontSize,
  responsiveWidth
} from "react-native-responsive-dimensions";
import {
  setItems,
} from "../../store/itemActions";
import { Color, Font } from '../../assets/styles/index.js';
import i18n from 'i18n-js';

class Header extends Component{
    render () {
      const { headerName, floorId, navigation } = this.props

      return (
      <View style={styles.floorButtonsContainer}>
        <View style={styles.floorButtonSelectedContainer}>
          <TouchableOpacity style={styles.floorButtonSelected} onPress={()=>navigation.navigate('Floor', {floorId: floorId, floorName: headerName})}>
            <Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/>
              { headerName == 'Planta B' && <Text style={styles.floorButtonSelectedText}>{i18n.t('home.floorLabel.base')}</Text>}
              { headerName == 'Planta 1' && <Text style={styles.floorButtonSelectedText}>{i18n.t('home.floorLabel.first')}</Text>}
              { headerName == 'Planta 2' && <Text style={styles.floorButtonSelectedText}>{i18n.t('home.floorLabel.second')}</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.smallButtonContainer}>
          {floorId != 'floor-0' &&<TouchableOpacity style={styles.floorButton} onPress={()=>navigation.navigate('Floor', {floorId: 'floor-0', floorName: 'Planta B'})}><Text style={styles.floorButtonsText}>{i18n.t('home.floorLabel.base')}</Text></TouchableOpacity>}
          {floorId != 'floor-1' &&<TouchableOpacity style={styles.floorButton} onPress={()=>navigation.navigate('Floor', {floorId: 'floor-1', floorName: 'Planta 1'})}><Text style={styles.floorButtonsText}>{i18n.t('home.floorLabel.first')}</Text></TouchableOpacity>}
          {floorId != 'floor-2' &&<TouchableOpacity style={styles.floorButton} onPress={()=>navigation.navigate('Floor', {floorId: 'floor-2', floorName: 'Planta 2'})}><Text style={styles.floorButtonsText}>{i18n.t('home.floorLabel.second')}</Text></TouchableOpacity>}
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
      height: responsiveHeight(10)
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
      fontSize: responsiveFontSize(1.5),
      justifyContent: 'flex-end',
      borderWidth: 1,
      borderColor: Color.SECONDARY,
      paddingVertical: 5,
      paddingHorizontal: 8,
      borderRadius: 5
    },
    floorButtonSelectedContainer: {
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: '5%'
    },
    floorButtonSelected: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    floorButtonSelectedText: {
      fontSize: responsiveFontSize(1.8),
      fontFamily: 'Roboto',
      color: Color.WHITE,
      marginLeft: 7,
    },
    avatar: {
      width: responsiveWidth(100) >= 768 ? 40 : 21,
      height: responsiveWidth(100) >= 768 ? 40 : 21,
    }
  })


  function mapStateToProps({items}) {
    return {items}
  }

  export default connect(mapStateToProps)(Header);
