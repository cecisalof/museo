import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { WebView } from 'react-native-webview';
import {
  Text,
  View,
  Image,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Linking,
  ImageBackground
} from "react-native";
import PanelRow from "../components/atoms/PanelRow";
import { Color, Font } from '../assets/styles/index.js';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import {
  setItems,
} from "../store/itemActions";
import { CommonActions } from '@react-navigation/native';
import Header2 from '../components/atoms/Header2.js';



class PanelScreen extends Component {
  render() {
    const { params } = this.props.route;
    console.log('aquí panel View', params);
    const panels = params.panels;
    const item = params.item;
    const collection = params.collection;
    return (
      <View style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
          <Header2 panels={panels} item={item} collection={this.props.route.params.collection}
            routeName= {this.props.route.name}
            navigation={this.props.navigation}
            floorName= {params.floorName}
            floorId={params.floorId}/>
        <View style={styles.itemsContainer}>
          <FlatList
            numColumns={1}
            data={params.panels}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) =>
              (
              <PanelRow
                item={item}
                collection={collection}
                onPress={()=> {
                this.props.navigation.navigate('Pdf', {
                  floorName: this.props.route.params.floorName,
                  floorId: this.props.route.params.floorId,
                  routeName: this.props.route.name,
                  piece: this.props.route.params.item,
                  item: item,
                  collection: this.props.route.params.collection})
                }}

              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text>No hay elementos</Text>
            }
          />
        </View>
        </View>
        </ImageBackground>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    maxWidth: 800,
  },
  headerContainer:{
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    ...Platform.select({
      ios: {
        marginRight: '3%'
       },
      android: {
        marginRight: '5%'
      },
      default: {
        marginRight: '5%'
      }
    }),
    backgroundColor: Color.BLACK,
    width: '100%'
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  navigationButton:{
    marginHorizontal: '10%'
  },
  navigationButtonText: {
    fontFamily: 'Roboto',
    color: Color.WHITE,
    fontSize: responsiveWidth(100) >= 820 ? 14 : responsiveFontSize(1.5),
    justifyContent: 'flex-end',
  },
  text: {
    fontFamily: 'Roboto',
    color: Color.WHITE
  },
  headerContent: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%'
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1
  },
  headerTitleText: {
    fontSize: responsiveWidth(100) >= 820 ? 20 : responsiveFontSize(1.8),
    flexWrap: 'nowrap',
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: '3%',
  },
  avatar: {
    marginRight: '1%',
    width: responsiveWidth(100) >= 820 ? 30 : 24,
    height: responsiveHeight(100) >= 800 ? 35 : 24
  },
  showcaseList: {
    width: "100%"
  },
  itemsContainer: {
    flex: 3
  }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(PanelScreen);
