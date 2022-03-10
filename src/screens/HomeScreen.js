import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from '../assets/images/splash.png'
// import { PRIMARY, WHITE, BLACK } from '../assets/styles/colors'
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
    fontFamily: 'Roboto',
    ...Platform.select({
      ios: {
        color: '#fff',
        backgroundColor: '#000',
       },
      android: {
        backgroundColor: '#000',

      },
      default: {
        color: '#000',
      }
    })
  },
  menu: {
    flex: 0.5,
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 3,
    marginHorizontal: 300,
    backgroundColor: '#F00',
  },
  touchableContainer: {
    flex: 3,
    alignItems: 'center',
    paddingTop: 35
  },
  text: {
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
    textAlign: 'left',
    marginHorizontal: 19
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFF',
    textAlign: 'left',
    marginHorizontal: 19
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
