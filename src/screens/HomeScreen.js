import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import logo from '../assets/images/splash.png'
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import {
  setItems,
} from "../store/itemActions";


class HomeScreen extends Component {
  render() {
    console.log(this.props.items);
    return (
      <View style={styles.mainContainer}>
        <Text style={styles.text}>
          Bienvenidos
            <Text style={styles.text}> al Museo Egipcio de Melilla</Text>
        </Text>
          <TouchableOpacity  style={styles.button}><Image source={logo} style={styles.floors} /></TouchableOpacity>
          <TouchableOpacity  style={styles.button}><Image source={logo} style={styles.floors} /></TouchableOpacity>
          <TouchableOpacity  style={styles.button}><Image source={logo} style={styles.floors} /></TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 50,
    fontColor: '#FFF',
    backgroundColor: '#000',
  },
  text: {
    flex: 1,
    // fontFamily: FONT_FAMILY_BOLD,
    fontSize: 16,
    color: '#FFF',
    textAlign: 'left',
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    // backgroundColor: PRIMARY,
    borderWidth: 5,
    // borderColor: WHITE,
  },
  floors: {
    width: 200,
    height: 150,
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
