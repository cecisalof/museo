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
  ImageBackground,
  SafeAreaView,
  Linking
} from "react-native";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import CollectionRow from "../components/atoms/CollectionRow";
import {
  setItems,
} from "../store/itemActions";
import { LinearGradient } from 'expo-linear-gradient';
import { Color, Font } from '../assets/styles/index.js';
import Header from '../components/atoms/Header.js';

class Floor extends Component {
  render() {
    const { params } = this.props.route; //Param inherit in Home SreenView from floor´s touchable opacity
    const floor = this.props.items.find( ({ reference_id }) => reference_id == params.floorId );
    return (
    <SafeAreaView style={styles.blackBackground}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
          <Header headerName={params.floorName} floorId={params.floorId} navigation={this.props.navigation}/>
          <View style={styles.itemsContainer}>
            <FlatList
              data={floor.collection_set}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <CollectionRow
                  item={item}
                  onPress={()=> { this.props.navigation.navigate('Collection', {collection: item, floorName: params.floorName, floorId: params.floorId}) }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <Text>No hay elementos</Text>
              }
              ListFooterComponent={
                <View>
                  {params.floorId == 'floor-0' && <View style={styles.footerContainer}>
                     <ImageBackground
                       style={styles.collectionImage}
                       source={require('../assets/images/floors/ShopBanner.jpg')}
                     />
                     <View style={styles.footerBtnContainer}>
                       <TouchableOpacity style={styles.footerBtn} onPress = {() => Linking.openURL('https://fundaciongaselec.es/tienda/')}>
                          <Text style={styles.footerBtnText}>Visitar tienda</Text>
                       </TouchableOpacity>
                     </View>
                  </View>}
                </View>
              }
            />
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
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
    maxWidth: 800
  },
  showcaseList: {
    width: "100%"
  },
  itemsContainer: {
    flex: 1
  },
  collectionImage: {
    flex: 1,
    resizeMode: 'cover',
    height: responsiveHeight(23),
    width: responsiveWidth(100)
  },
  // Footer
  footerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  footerBtnContainer: {
    position:'absolute',
    top:0,
    left:0,
    alignItems: 'center',
    justifyContent: 'center',
    height: responsiveHeight(23),
    width: '100%'
  },
  footerBtn: {
    backgroundColor: Color.BLACK,
    paddingVertical: 8,
    paddingHorizontal: 25
  },
  footerBtnText: {
    color: Color.PRIMARY
  }
})
//---- Connect to props functions and values -----//


function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(Floor);
