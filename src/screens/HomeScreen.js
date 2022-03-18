import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import line from '../assets/images/floors/Line.png'
import WindowDimensions  from '../assets/styles/mixins.js';
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
  ImageBackground
} from "react-native";
import {
  setItems,
} from "../store/itemActions";
import { Color, Font } from '../assets/styles/index.js';


class HomeScreen extends Component {
  render() {
    console.log(this.props.items);
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
        <View style={styles.footer}>
          <Text style={styles.text}>Footer</Text>
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
    flex: 6,
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
    flex: 1,
    width: "100%",
    paddingTop: '5%'
  },
  floorLabelsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  floorLabels: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 16,
    color: Color.WHITE,
    textAlign: 'right',
    marginRight: 30
  },
  floorLabels2: {
    fontSize: 12,
    lineHeight: 16,
    color: Color.WHITE,
    textAlign: 'right',
    marginRight: 15
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
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
    alignItems: 'center',
  },
  floors: {
    width: 218,
    height: 122,
  },
  line: {
    width: 79,
    height: 1
  },
  footer: {
    flex: 1,
    backgroundColor: Color.BLACK
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
