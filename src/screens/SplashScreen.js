import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button
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
      const items = await axios.get('https://mb9jo4pgqa.execute-api.eu-west-1.amazonaws.com/pro/api/items/all?limit=1000')
      this.props.setItems(items.data.results)
    }catch(e){
      items = []
      try {
        items = await AsyncStorage.getItem('@items')
        items = JSON.parse(items)
      } catch(e) {}
      if (items && items != [] && items.length > 1){
        // it's ok, we have items from other attempt... we can go and try in another moment again
      }else{
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
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, fontSize: 16 }}>Cargando...</Text>
      </View>
    );
  }
}

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

const mapDispatchToProps = (dispatch) => bindActionCreators({setItems}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
