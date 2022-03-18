import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import ItemPreview from "../components/atoms/ItemPreview";
import {
  setItems,
} from "../store/itemActions";
import { Color, Font } from '../assets/styles/index.js';

class CollectionScreen extends Component {
  render() {
    const { collection } = this.props.route.params;
    console.log(collection);
    return (
      <View style={styles.mainContainer}>
        {/*PIEZAS*/}
        <FlatList
          style={styles.collectionList}
          contentContainerStyle={styles.collectionContainer}
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
    );
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Color.BLACK,
  },
  collectionContainer: {
    flex: 2,
    borderBottomColor: Color.SECONDARY
  },
  collectionList: {
    width: "100%"
  }
})
//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(CollectionScreen);
