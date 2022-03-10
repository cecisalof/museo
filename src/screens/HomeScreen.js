import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { FONT_FAMILY_REGULAR, FONT_FAMILY_BOLD, FONT_SIZE_12 } from '../assets/styles/typography'
import logo from '../assets/images/splash.png'
import { Typography, Spacing, Colors, Mixins } from '../assets/styles/index'
// import { PRIMARY, WHITE, BLACK } from '../assets/styles/colors'
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
// {this.props.potato}
console.log(Typography, Spacing, Colors);
class HomeScreen extends Component {
  render() {
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
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_16,
    color: '#FFF',
    textAlign: 'left',
  },
  button: {
    flex: 2,
    justifyContent: 'center',
    backgroundColor: Typography.PRIMARY,
    borderWidth: 5,
    borderColor: Typography.WHITE
  },
  floors: {
    width: 200,
    height: 150
  }

});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
