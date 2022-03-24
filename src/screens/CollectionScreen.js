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
  ImageBackground
} from "react-native";
import ItemPreview from "../components/atoms/ItemPreview";
import {
  setItems,
} from "../store/itemActions";
import Header from '../components/atoms/Header.js';
import { Color, Font } from '../assets/styles/index.js';

class CollectionScreen extends Component {
  render() {
    const { params } = this.props.route;
    const { collection } = this.props.route.params;
    console.log('Collection', collection);
    return (
    <View style={styles.blackBackground}>
      <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
        <View style={styles.mainContainer}>
          <Header headerName={params.floorName} floorId={params.floorId} navigation={this.props.navigation}/>
          <View style={styles.itemsContainer}>
            <FlatList
              numColumns={2}
              data={collection.item_set}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <ItemPreview
                  item={item}
                  onPress={()=>{ this.props.navigation.navigate('Item', {item, panels: collection.panel_set}) }}
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
