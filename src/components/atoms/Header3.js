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
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { CommonActions } from '@react-navigation/native';
import i18n from 'i18n-js';
import translateFromBackend from '../../utils/translate';

class Header3 extends Component{
    render () {
      const { item, panels } = this.props
      return (
        <View style={styles.floorButtonsContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <View style={styles.headerTitle}><Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/>
              { this.props.routeName == 'Item2' && <Text style={styles.headerTitleText}>{translateFromBackend(item, 'title')}</Text>}
              { this.props.routeName == 'Panel2' && <Text style={styles.headerTitleText}>{i18n.t("header.panelLabel")}</Text>}
              { this.props.routeName == 'Pdf2' && <Text style={styles.headerTitleText}>{translateFromBackend(panels, 'title')}</Text>}
              </View>
            </View>
            <View style={styles.buttonContainer}>
            { this.props.routeName == 'Item2' &&
              <TouchableOpacity TouchableOpacity style={styles.navigationButton} onPress={() => this.props.navigation.navigate('Search')} >
                <Text style={styles.navigationButtonText}>{i18n.t('header.backButton')}</Text></TouchableOpacity>
              }
              { this.props.routeName == 'Panel2' &&
              <TouchableOpacity style={styles.navigationButton} onPress={() => {
                this.props.navigation.navigate('Item2', {
                    item: this.props.item,
                    panels: this.props.panels,
                    routeName: this.props.route
                    },
                  );
                }} >
              <Text style={styles.navigationButtonText}>{i18n.t('header.backButton')}</Text></TouchableOpacity>
              }
              { this.props.routeName == 'Pdf2' &&
              <TouchableOpacity style={styles.navigationButton} onPress={() => {
                  this.props.navigation.navigate('Panel2', {
                          item,
                          panels,
                          routeName: this.props.route
                      },
                  );
                }} >
              <Text style={styles.navigationButtonText}>{i18n.t('header.backButton')}</Text></TouchableOpacity>
              }
            </View>
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
    headerContainer:{
      flex: 2,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginRight: '4%',
      backgroundColor: Color.BLACK,
      width: '100%'
    },
    buttonContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end'
    },
    navigationButtonText: {
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
    headerContent: {
      flex: 3,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginHorizontal: '5%'
    },
    headerTitle: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 2
    },
    headerTitleText: {
      fontSize: responsiveFontSize(1.8),
      flexWrap: 'nowrap',
      fontFamily: 'Roboto',
      color: Color.WHITE,
      marginLeft: '5%',
    },
    avatar: {
      width: responsiveWidth(100) >= 768 ? 40 : 21,
      height: responsiveWidth(100) >= 768 ? 40 : 21,
    }
  })


  function mapStateToProps({items}) {
    return {items}
  }

  export default connect(mapStateToProps)(Header3);
