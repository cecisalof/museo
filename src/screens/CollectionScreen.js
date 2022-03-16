import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button,
  FlatList
} from "react-native";
import ItemPreview from "../components/atoms/ItemPreview";
import {
  setItems,
} from "../store/itemActions";

class CollectionScreen extends Component {
  render() {
    const { collection } = this.props.route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{}}
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

//---- Connect to props functions and values -----//


function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(CollectionScreen);
