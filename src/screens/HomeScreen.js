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
  Animated,
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
  state = {
    opacity: new Animated.Value(1),
  }
  // fadeAnim will be used as the value for opacity. Initial Value: 0



  fade = (howManyTimesLeft) => {
   //Will change fadeAnim value to 0 in 5 seconds
   Animated.timing(this.state.opacity, {
     toValue: 0,
     duration: 3000,
     useNativeDriver: true
   }).start(({ finished }) => {
     if (finished) {
        // Will change fadeAnim value to 1 in 3 seconds
       Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 5000,
        useNativeDriver: true
      }).start(({ finished }) => {
        if (howManyTimesLeft > 0) this.fade(howManyTimesLeft -1)
        });
       }
     });
   };

   componentDidMount() {
      this.fade(2)
    }

  render() {
    const animIn = this.state.opacity
    console.log(animIn);
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
          <View style={styles.mainContainer}>
            <View styles={styles.titleContainer}>
              <Text style={styles.textBold}>
                Bienvenidos
              </Text>
              <Text style={styles.text}> al Museo Egipcio de Melilla</Text>
            </View>
            <View style={styles.iconContainer}>
              <Animated.View
                style={[  styles.fadingContainer,
                   {opacity: this.state.opacity }]}>
                <View style={styles.iconContainer}>
                  <Image source={require('../assets/images/touch-icon.png')} style={styles.touchIcon}/><Text style={styles.touch}>Haz clic sobre la planta que deseas visitar</Text>
                </View>
              </Animated.View>
            </View>
            <View style={styles.touchableContainer}>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-2', floorName: 'Planta 2'})} >
                <Image source={require('../assets/images/floors/App-Planta-2.png')} style={styles.floors} />
                <View style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-2', floorName: 'Planta 2'})}>
                  <Text style={styles.floorLabels}>Planta 2</Text>
                  <Image source={line} style={styles.line}></Image>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-1', floorName: 'Planta 1'})} >
                <Image source={require('../assets/images/floors/App-Planta-1.png')} style={styles.floors} />
                <View style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-1', floorName: 'Planta 1'})}>
                  <Text style={styles.floorLabels}>Planta 1</Text>
                  <Image source={line} style={styles.line}></Image>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-0', floorName: 'Planta B'})} >
                <Image source={require('../assets/images/floors/App-Planta-Baja.png')} style={styles.floors} />
                <View style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('Floor', {floorId: 'floor-0', floorName: 'Planta B'})}>
                  <Text style={styles.floorLabels}>Planta Baja</Text>
                  <Image source={line} style={styles.line}></Image>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  mainContainer: {
    flex: 1,
    // backgroundColor: Color.BLACK,
    justifyContent: 'center',
    maxWidth: 800,
    fontFamily: 'Roboto',
    color: Color.WHITE
  },
  titleContainer: {
    flex: 1,
    marginHorizontal: '30%'
  },
  touchableContainer: {
    flex: 3,
    paddingBottom: '5%',
    position: 'relative',
  },
  floorLabelsContainer: {
    position: 'absolute',
    right: 0,
    bottom: 20,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems:'flex-start',
    ...Platform.select({
      ios: {
       },
      android: {
      },
      default: {
        maxWidth: 200,
      }
    }),
  },
  floorLabels: {
    fontFamily: 'Roboto',
    fontSize: responsiveFontSize(1.5),
    lineHeight: responsiveFontSize(2.5),
    color: Color.WHITE,
    marginRight: 5,
    marginBottom: 5,
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
    paddingTop: responsiveWidth(100) >= 768 ? '2%' : '8%',
    fontFamily: 'Roboto-Bold',
    fontSize: responsiveWidth(100) >= 768 ? responsiveFontSize(1.5) : 16,
    lineHeight: responsiveWidth(100) >= 768 ? responsiveHeight(5) : 19,
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
    justifyContent: 'center',
  },
  floors: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  line: {
    width: responsiveWidth(25),
    height: responsiveHeight(0.2)
  },
  iconContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    marginHorizontal: '5%',
  },
  touchIcon: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: responsiveWidth(100) >= 768 ? 16 : 12,
    height: responsiveWidth(100) >= 768 ? 22 : 16,
    marginRight: 10
  },
  touch: {
    width: 90,
    flexWrap: 'nowrap',
    color: Color.PRIMARY,
    fontFamily: 'Roboto-Bold',
    fontSize: 10,
    lineHeight: 12
  },
  fadingContainer:{
    marginVertical: '2%'
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
