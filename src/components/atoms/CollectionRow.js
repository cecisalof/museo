import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image
} from "react-native";

class CollectionRow extends React.Component {
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
        <Image
            style={{ flex: 1, height: 250, width: '100%'}}
            source={{uri: item.image}}
          />
        <Text>{item.title_es}</Text>
      </TouchableOpacity>
    );
  }
}

export default CollectionRow
