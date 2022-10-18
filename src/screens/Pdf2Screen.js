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
import Header3 from '../components/atoms/Header3.js';
import { Color, Font } from '../assets/styles/index.js';
import PDFReader from 'rn-pdf-reader-js'
import translateFromBackend from '../utils/translate';

class Pdf2Screen extends Component {

  render () {
    const { item } =  this.props.route.params;
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
          <View style={styles.mainContainer}>
            <View>
              <Header3 panels={item} item={this.props.route.params.piece}
                routeName={this.props.route.name}
                navigation={this.props.navigation} />
            </View>
            <View style={{flex:1, backgroundColor: '#555'}}>
            <PDFReader
              source={{ uri: translateFromBackend(item, 'document')}}
            />
            </View>
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
    justifyContent: 'flex-start',
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

export default connect(mapStateToProps)(Pdf2Screen);
