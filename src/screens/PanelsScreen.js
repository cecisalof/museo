import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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



class PanelScreen extends Component {
  navigateBack = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
          index: 0,
          routes: [{ name: 'Item', params: {
            item: this.props.route.params.item,
            panels: this.props.route.params.collection.panel_set,
            floorId: this.props.route.params.floorId,
            floorName: this.props.route.params.floorName,
            collection: this.props.route.params.collection
        }}],
      })
    );
  }

  render() {
    const { params } = this.props.route;
    const panels = params.panels;
    const item = params.item;
    const collection = params.collection;
    return (
      <View style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View style={styles.headerTitle}><Image source={require('../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.headerTitleText}>Paneles de {item.title_es}</Text></View>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.navigationButton} onPress={this.navigateBack} ><Text style={styles.navigationButtonText}>Volver</Text></TouchableOpacity>
          </View>
        </View>
        <View style={styles.itemsContainer}>
          <FlatList
            numColumns={1}
            data={params.panels}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <PanelRow
                item={item}
                collection={collection}
                onPress={()=> { this.props.navigation.navigate('Collection', {collection: item, floorName: params.floorName, floorId: params.floorId}) }}
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
    flex: 2,
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
    flex: 2,
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
  },
  rowContainer: {
    flexDirection: 'row',
    marginHorizontal: '5%',
    flex: 1,
    alignItems: 'center'
  },
  rowHeader: {
    flex: 1
  },
  mapContainer: {
    flexDirection: 'row',
    flex: 2,
  },
  mapItem: {
    height: '100%',
    width: '100%',
  },
  itemText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: 7,
    paddingRight: 10
  },
  textSmall: {
    fontSize: 12,
  },
  avatar: {
    width: 30,
    height: 30,
    resizeMode: "cover",
    marginRight: 5
  },
  avatarPhone: {
    width: 24,
    height: 24,
    margin: 3,
    marginRight: 8
  },
  buttonContainer: {
    alignItems: "center",
    flexDirection: 'column',
  },
  itemButton: {
    backgroundColor: Color.PRIMARY,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10
  }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(PanelScreen);
