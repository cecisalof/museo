import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Color, Font } from '../assets/styles/index.js';
import {
  Text,
  View,
  Button,
  FlatList,
  StyleSheet
} from "react-native";
import {
  setItems,
} from "../store/itemActions";
import Header from '../components/atoms/Header.js';

class ItemScreen extends Component {
  render() {
    const { item, panels } = this.props.route.params;
    console.log({item});
    console.log({panels});
    {/* DETALLE DE PIEZA*/}
    return (
      <View style={styles.mainContainer}>
        {/*<Header params={this.props.params}/>*/}
        <View style={styles.sliderContainer}>
          <Text>Carrusel</Text>
        </View>
        <View style={styles.detailsContainer}>
          <View>
            <Text style={styles.itemTitle}>{item.title_es}</Text>
          </View>
          <Text>Para este item hay {item.image_set && item.image_set.length} imágenes y {panels && panels.length} paneles</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: Color.PRIMARY,
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  sliderContainer: {
    flex: 2,
    width: '100%',
    backgroundColor: Color.BLACK
  },
  detailsContainer: {
    flex: 2,
    marginHorizontal: '4%',
    marginVertical: '5%'
  }
})

//---- Connect to props functions and values -----//
function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(ItemScreen);
