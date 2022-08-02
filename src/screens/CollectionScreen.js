import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView
} from "react-native";
import ItemPreview from "../components/atoms/ItemPreview";
import {
  setItems,
} from "../store/itemActions";
import Header2 from '../components/atoms/Header2.js';
import { Color, Font } from '../assets/styles/index.js';
import i18n from 'i18n-js';

class CollectionScreen extends Component {
  render() {
    const { params } = this.props.route;
    // console.log(params);
    const { collection, floorName } = params;
    return (
    <SafeAreaView style={styles.blackBackground}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
          <Header2 routeName={this.props.route.name} collection={collection}
            headerName={params.floorName} floorId={params.floorId} navigation={this.props.navigation}
            />
          <View style={styles.itemsContainer}>
            <FlatList
              numColumns={2}
              data={collection.item_set}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ItemPreview
                  item={item}
                  isFullWidth={collection.item_set.length%2!=0 && index == (collection.item_set.length-1)}
                  onPress={()=>{ this.props.navigation.navigate('Item', {
                    item,
                    panels: collection.panel_set,
                    floorId:this.props.route.params.floorId,
                    floorName: this.props.route.params.floorName,
                    collection: this.props.route.params.collection,
                    routeName: this.props.route.name}) }}
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={
                <Text>{i18n.t('store.warning')}</Text>
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
    justifyContent: 'center',
    maxWidth: 800
  },
  itemsContainer: {
    flex: 1
  }
})
//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(CollectionScreen);
