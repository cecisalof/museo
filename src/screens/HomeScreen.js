import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from '../assets/images/splash.png'
// import { FONT_FAMILY_BOLD, FONT_FAMILY_REGULAR, LINE_HEIGHT_19, FONT_SIZE_16  } from '../assets/styles/typography'
import {
  useFonts,
  Roboto_100Thin,
  Roboto_100Thin_Italic,
  Roboto_300Light,
  Roboto_300Light_Italic,
  Roboto_400Regular,
  Roboto_400Regular_Italic,
  Roboto_500Medium,
  Roboto_500Medium_Italic,
  Roboto_700Bold,
  Roboto_700Bold_Italic,
  Roboto_900Black,
  Roboto_900Black_Italic
} from '@expo-google-fonts/roboto'
// import { PRIMARY, WHITE, BLACK } from '../assets/styles/colors'
// import  {Typography, Colors, Mixins} from '../assets/styles/index'
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor
} from "react-native";
import {
  setItems,
} from "../store/itemActions";

class HomeScreen extends Component {
  render() {
    console.log(this.props.items);
    return (
      <View style={styles.mainContainer}>
        <View style={styles.menu}>
          <Text style={styles.textHeader}>Header</Text>
        </View>
        <View styles={styles.titleContainer}>
          <Text style={styles.textBold}>
            Bienvenidos
          </Text>
          <Text style={styles.text}> al Museo Egipcio de Melilla</Text>
        </View>
        <View style={styles.touchableContainer}>
          <TouchableOpacity  style={styles.button}><Image source={logo} style={styles.floors} /></TouchableOpacity>
          <TouchableOpacity  style={styles.button}><Image source={logo} style={styles.floors} /></TouchableOpacity>
          <TouchableOpacity  style={styles.button}><Image source={logo} style={styles.floors} /></TouchableOpacity>
        </View>
        <View style={styles.menu}>
          <Text style={styles.textHeader}>Footer with icons</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    color: '#FFF',
    backgroundColor: '#000',
    ...Platform.select({
      ios: {
        color: '#fff',
        backgroundColor: '000'
       },
      android: {
        backgroundColor: 'black'
      },
      default: {
        color: 'black'
      }
    })
  },
  menu: {
    flex: 0.5,
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 3,
    marginLeft: 19,
    marginBottom: 35,
    backgroundColor: '#F00'
  },
  touchableContainer: {
    flex: 3,
    alignItems: 'center',
    paddingTop: 35
  },
  text: {
    // fontSize: FONT_SIZE_16,
    color: '#FFF',
    textAlign: 'left',
  },
  textBold: {
    // fontFamily: Roboto_900Black,
    // fontSize: FONT_SIZE_16,
    // lineHeight: LINE_HEIGHT_19,
    color: '#FFF',
    textAlign: 'left',
  },
  textHeader: {
    justifyContent: 'center',
    color: '#FFF'
  },
  button: {
    flex: 2,
    justifyContent: 'space-between',
    borderWidth: 5,
  },
  floors: {
    width: 200,
    height: 150,
  },
  footer: {
    flex: 0.5
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
