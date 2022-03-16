import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button,
  FlatList
} from "react-native";
import {
  setItems,
} from "../store/itemActions";

class ItemScreen extends Component {
  render() {
    const { item, panels } = this.props.route.params;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>{item.title_es}</Text>
        <Text>Para este item hay {item.image_set && item.image_set.length} imágenes y {panels && panels.length} paneles</Text>
      </View>
    );
  }
}

//---- Connect to props functions and values -----//


function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
