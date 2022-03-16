import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import floors from '../assets/images/floors/Planta1.png'
import line from '../assets/images/floors/Line.png'
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
        <View styles={styles.titleContainer}>
          <Text style={styles.textBold}>
            Bienvenidos
          </Text>
          <Text style={styles.text}> al Museo Egipcio de Melilla</Text>
        </View>
        <View style={styles.touchableContainer}>
          <TouchableOpacity  style={styles.button}
            onPress={() => this.props.navigation.navigate('SecondFloor')} ><Image source={floors} style={styles.floors} />
          </TouchableOpacity>
           <TouchableOpacity style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('SecondFloor')}><Text style={styles.floorLabels}>Planta 2</Text><Image source={line} style={styles.line}></Image></TouchableOpacity>
          <TouchableOpacity  style={styles.button}
            onPress={() => this.props.navigation.navigate('FirstFloor')} ><Image source={floors} style={styles.floors} /></TouchableOpacity>
          <TouchableOpacity style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('FirstFloor')}><Text style={styles.floorLabels}>Planta 1</Text><Image source={line} style={styles.line}></Image></TouchableOpacity>
          <TouchableOpacity  style={styles.button}
            onPress={() => this.props.navigation.navigate('BaseFloor')} ><Image source={floors} style={styles.floors} /></TouchableOpacity>
          <TouchableOpacity style={styles.floorLabelsContainer} onPress={() => this.props.navigation.navigate('BaseFloor')}><Text style={styles.floorLabels2}>Planta Baja</Text><Image source={line} style={styles.line}></Image></TouchableOpacity>
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
    flex: 0.2,
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 2,
    marginHorizontal: 300,
    backgroundColor: '#F00',
  },
  touchableContainer: {
    flex: 1,
    paddingTop: 20,
    marginLeft: 28,
    marginRight: 40
  },
  floorLabelsContainer: {
    flex: 0.2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  floorLabels: {
    fontFamily: 'Roboto',
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFFDE',
    textAlign: 'right',
    marginRight: 30
  },
  floorLabels2: {
    fontSize: 12,
    lineHeight: 16,
    color: '#FFFFFFDE',
    textAlign: 'right',
    marginRight: 15
  },
  text: {
    fontFamily: 'Roboto',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFFDE',
    textAlign: 'left',
    marginHorizontal: 19
  },
  textBold: {
    paddingTop: 24,
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
    lineHeight: 19,
    color: '#FFFFFFDE',
    textAlign: 'left',
    marginHorizontal: 19
  },
  textHeader: {
    fontFamily: 'Roboto',
    justifyContent: 'center',
    color: '#FFFFFFDE'
  },
  button: {
    flex: 0.2,
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 5,
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
    flex: 1.5
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(HomeScreen);
