import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import line from '../assets/images/floors/Line.png'
import {
  Text,
  View,
  Button,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  PlatformColor,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import {
  setItems,
} from "../store/itemActions";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { Color, Font, Mixins } from '../assets/styles/index.js';


class HomeScreen extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaContainer}>
        <View style={styles.mainContainer}>
          <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
            <View styles={styles.titleContainer}>
              <Text style={styles.textBold}>
                Bienvenidos
              </Text>
              <Text style={styles.text}> al Museo Egipcio de Melilla</Text>
            </View>
            <View style={styles.touchableContainer}>
              <TouchableOpacity  style={styles.button}
                onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-2', floorName: 'Planta 2'})} ><Image source={require('../assets/images/floors/App-Planta-2.png')} style={styles.floors} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-2', floorName: 'Planta 2'})}><Text style={styles.floorLabels}>Planta 2</Text><Image source={line} style={styles.line}></Image></TouchableOpacity>
              <TouchableOpacity  style={styles.button}
                onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-1', floorName: 'Planta 1'})} ><Image source={require('../assets/images/floors/App-Planta-1.png')} style={styles.floors} /></TouchableOpacity>
              <TouchableOpacity style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-1', floorName: 'Planta 1'})}><Text style={styles.floorLabels}>Planta 1</Text><Image source={line} style={styles.line}></Image></TouchableOpacity>
              <TouchableOpacity  style={styles.button}
                onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-0', floorName: 'Planta B'})} ><Image source={require('../assets/images/floors/App-Planta-Baja.png')} style={styles.floors} /></TouchableOpacity>
              <TouchableOpacity style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-0', floorName: 'Planta B'})}><Text style={styles.floorLabels2}>Planta Baja</Text><Image source={line} style={styles.line}></Image></TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#000'
  },
  mainContainer: {
    flex: 4,
    color: Color.WHITE,
    backgroundColor: '#000',
    fontFamily: 'Roboto',
    ...Platform.select({
      ios: {
        color: Color.WHITE,
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
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: '30%'
  },
  touchableContainer: {
    flex: 3,
    paddingTop: '5%'
  },
  floorLabelsContainer: {
    flex: 0.5,
    alignItems: 'flex-end',
    justifyContent: 'flex-start'
  },
  floorLabels: {
    fontFamily: 'Roboto',
    fontSize: responsiveFontSize(1.9),
    lineHeight: responsiveFontSize(2.5),
    color: Color.WHITE,
    textAlign: 'right',
    marginRight: 30
  },
  floorLabels2: {
    fontSize: responsiveFontSize(1.9),
    lineHeight: responsiveFontSize(2.5),
    color: Color.WHITE,
    textAlign: 'right',
    marginRight: responsiveWidth(3)
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: responsiveFontSize(1.9),
    lineHeight: 19,
    color: Color.WHITE,
    textAlign: 'left',
    marginHorizontal: '4%'
  },
  textBold: {
    ...Platform.select({
      ios: {
        paddingTop: '8%',
       },
      android: {
        paddingTop: '8%',
      },
      default: {
        paddingTop: '3%',
      }
    }),
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 19,
    color: Color.WHITE,
    textAlign: 'left',
    marginHorizontal: '4%'
  },
  textHeader: {
    fontFamily: 'Roboto',
    justifyContent: 'center',
    color: Color.WHITE
  },
  button: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  floors: {
    ...Platform.select({
      ios: {
        width: '60%',
        height: '100%'
       },
      android: {
        width: '60%',
        height: '100%'
      },
      default: {
        width: 218,
        height: 126
      }
    }),
  },
  line: {
    width: responsiveWidth(25),
    height: responsiveHeight(0.2)
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
