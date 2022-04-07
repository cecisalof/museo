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

class Header2 extends Component{
    render () {
      const { floorName, floorId, item, collection, panels } = this.props
      // console.log(this.props);
      return (
        <View style={styles.floorButtonsContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              { this.props.routeName == 'Collection' &&
              <View style={styles.headerTitle}><Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText}>{collection.title_es}</Text></View>
              }
              { this.props.routeName == 'Item' &&
              <View style={styles.headerTitle}><Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText}>{item.title_es}</Text></View>
              }
              { this.props.routeName == 'Panel' &&
              <View style={styles.headerTitle}><Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText2}>{i18n.t("header.panelLabel")}</Text>
              <Text style={styles.headerTitleText2}>{item.title_es}</Text>
              </View>
              }
              { this.props.routeName == 'Pdf' &&
              <View style={styles.headerTitle}><Image source={require('../../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText}>{panels.title_es}</Text></View>
              }
            </View>
            <View style={styles.buttonContainer}>
              { this.props.routeName == 'Collection' &&
                <TouchableOpacity TouchableOpacity style={styles.navigationButton} onPress={() => {
                    this.props.navigation.navigate('Floor', {
                          floorName: this.props.headerName,
                          floorId: this.props.floorId,
                          collection: this.props.collection
                        },
                    );
                  }} >
                  <Text style={styles.navigationButtonText}>{i18n.t('header.backButton')}</Text></TouchableOpacity>
                }
            { this.props.routeName == 'Item' &&
              <TouchableOpacity TouchableOpacity style={styles.navigationButton} onPress={() => {
                  this.props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Collection', params: {
                        collection: this.props.collection,
                        floorName: this.props.floorName,
                        floorId: this.props.floorId}
                      }],
                    })
                  );
                }} >
                <Text style={styles.navigationButtonText}>{i18n.t('header.backButton')}</Text></TouchableOpacity>
              }
              { this.props.routeName == 'Panel' &&
              <TouchableOpacity style={styles.navigationButton} onPress={() => {
                this.props.navigation.navigate('Item', {
                    item: this.props.item,
                    panels: this.props.collection.panel_set,
                    collection: this.props.collection,
                    floorId: this.props.floorId,
                    floorName: this.props.floorName
                    },
                  );
                }} >
              <Text style={styles.navigationButtonText}>{i18n.t('header.backButton')}</Text></TouchableOpacity>
              }
              { this.props.routeName == 'Pdf' &&
              <TouchableOpacity style={styles.navigationButton} onPress={() => {
                  this.props.navigation.navigate('Panel', {
                          item,
                          panels: this.props.collection.panel_set,
                          floorId: this.props.floorId,
                          floorName: this.props.floorName,
                          collection: this.props.collection
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
    headerContainer:{
      flex: 2,
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
      }),
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
      fontSize: responsiveWidth(100) >= 820 ? 14 : 12,
      justifyContent: 'flex-end',
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
      fontSize: responsiveWidth(100) >= 820 ? 20 : 16,
      flexWrap: 'nowrap',
      fontFamily: 'Roboto',
      color: Color.WHITE,
      marginLeft: '3%',
    },
    headerTitleText2: {
      fontSize: responsiveWidth(100) >= 820 ? 20 : 14,
      flexWrap: 'nowrap',
      fontFamily: 'Roboto',
      color: Color.WHITE,
      marginLeft: '3%',
    },
    avatar: {
      marginRight: '1%',
      width: responsiveWidth(100) >= 820 ? 30 : 24,
      height: responsiveHeight(100) >= 800 ? 35 : 24
    }
  })


  function mapStateToProps({items}) {
    return {items}
  }

  export default connect(mapStateToProps)(Header2);
