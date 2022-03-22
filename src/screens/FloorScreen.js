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
  Platform
} from "react-native";
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
    const floors = [this.props];
    const floor = this.props.items.find( ({ reference_id }) => reference_id == params.floorId );
    return (
      <View style={styles.showcaseContainer}>
        <Header floors={floors} params={params}/>
        <View style={styles.itemsContainer}>
          <FlatList
            style={styles.showcaseList}
            contentContainerStyle={{}}
            data={floor.collection_set}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CollectionRow
                item={item}
                onPress={()=> { this.props.navigation.navigate('Collection', {collection: item, floorName: params.floorName}) }}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <Text>No hay elementos</Text>
            }
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  showcaseContainer: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
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

export default connect(mapStateToProps)(Floor);
