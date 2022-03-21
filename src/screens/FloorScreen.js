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

class Floor extends Component {
  render() {
    const { params } = this.props.route; //Param inherit in Home SreenView from floor´s touchable opacity
    console.log(params);
    const floors = [this.props]; // TO DO: EXTRACT floorId that matches with the view
    console.log(floors);
    const floor = this.props.items.find( ({ reference_id }) => reference_id == params.floorId );
    console.log(floor.collection_set)
    return (
      <View style={styles.showcaseContainer}>
        <View style={styles.floorButtonsContainer}>
          <View style={styles.floorButtonSelectedContainer}>
            <View style={styles.floorButtonSelected}><Image  source={require('../assets/images/personPin.png')} style={styles.avatar}/><Text style={styles.floorButtonSelectedText}>{ params.floorName }</Text></View>
          </View>
          <View style={styles.smallButtonContainer}>
            <TouchableOpacity style={styles.floorButton}><Text style={styles.floorButtonsText}>{ params.floorName }</Text></TouchableOpacity>
            <TouchableOpacity style={styles.floorButton}><Text style={styles.floorButtonsText}>{ params.floorName }</Text></TouchableOpacity>
          </View>
        </View>
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
                onPress={()=> { this.props.navigation.navigate('Collection', {collection: item}) }}
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
  },
  floorButtonsContainer: {
    flex: 0.5,
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
    })
  },
  smallButtonContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  floorButton:{
    marginHorizontal: '7%'
  },
  floorButtonsText: {
    fontFamily: 'Roboto',
    color: Color.WHITE,
    fontSize: 12,
    justifyContent: 'flex-end',
  },
  floorButtonSelectedContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginHorizontal: '5%'
  },
  floorButtonSelected: {
    flexDirection: 'row'
  },
  floorButtonSelectedText: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: Color.WHITE,
    marginLeft: 7
  },
  avatar: {
    ...Platform.select({
      ios: {

       },
      android: {
        width: 21,
        height: 21
      },
      default: {
        width: 21,
        height: 21
      }
    })

  }
})
//---- Connect to props functions and values -----//


function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(Floor);
