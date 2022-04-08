import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Color, Font } from '../assets/styles/index.js';
import {
  Text,
  View,
  Button,
  StyleSheet,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import {Typography} from '../assets/styles/index.js'
import {
  setItems,
} from "../store/itemActions";
import axios from 'axios';
import i18n from 'i18n-js';

class SplashScreen extends Component {

  async componentDidMount() {
    try{
      const items = await axios.get('https://fundaciongaselec.codepremium.es/api/items/all?limit=1000')
      this.props.setItems(items.data.results)
    } catch(e) {
      items = []
      try {
        items = await AsyncStorage.getItem('@items')
        items = JSON.parse(items)
      } catch(e) {}
      if (items && items != [] && items.length > 1){
        // it's ok, we have items from other attempt... we can go and try in another moment again
      } else {
        alert(i18n.t('errors.loading'))
      }
    }

    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  }

  render() {
    return (
      <View style={styles.splash}>
        <Text style={styles.splashText}>{i18n.t('splashScreen.loadingLabel')}</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
splash: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: Color.BLACK,
  color: Color.WHITE
},
splashText: {
  fontFamily: 'Roboto',
  fontSize: Font.FONT_SIZE_14,
  lineHeight: Font.LINE_HEIGHT_16,
  color: Color.WHITE
}
//---- Connect to props functions and values -----//
})
function mapStateToProps({items}) {
  return {items}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({setItems}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
