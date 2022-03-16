import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button,
  FlatList
} from "react-native";
import CollectionRow from "../components/atoms/CollectionRow";
import {
  setItems,
} from "../store/itemActions";

class Floor extends Component {
  render() {
    const { params } = this.props.route;
    const floor = this.props.items.find( ({ reference_id }) => reference_id == params.floorId );
    console.log(floor.collection_set)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FlatList
          style={{ width: "100%" }}
          contentContainerStyle={{}}
          data={floor.collection_set}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CollectionRow
              item={item}
              onPress={()=> { this.props.navigation.navigate('Collection', {collection: item}) }}
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

export default connect(mapStateToProps)(Floor);
