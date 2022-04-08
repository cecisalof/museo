import React, { Component } from "react";
import { WebView } from 'react-native-webview';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Platform
} from "react-native";
import Header2 from '../components/atoms/Header2.js';
import { Color, Font } from '../assets/styles/index.js';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import {
  setItems,
} from "../store/itemActions";


class PdfScreen extends Component {

  render () {
    const { item } =  this.props.route.params;
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
          <View style={styles.mainContainer}>
            <View>
              <Header2 panels={item} item={this.props.route.params.piece} collection={this.props.route.params.collection}
                floorName={this.props.route.params.floorName}
                floorId={this.props.route.params.floorId}
                routeName= {this.props.route.name}
                navigation={this.props.navigation}/>
            </View>
            { Platform.OS == 'ios' &&
              <WebView
                source={{ uri: item.document }}
              />
            }
            { Platform.OS == 'android' &&
              <WebView
                source={{ uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=` + item.document }}
              />
            }
          </View>
        </ImageBackground>
      </SafeAreaView>
    )
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    maxWidth: 800,
    overflow: 'hidden'
  },
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
  }
});


//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(PdfScreen);
