import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  FlatList,
  Image,
  StyleSheet
} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

class CollectionRow extends React.Component {
  render() {
    const {item} = this.props;
    console.log(item);
    return (
      <View>
       <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
         <Image
             style={styles.collectionImage}
             source={{uri: item.image}}
           />
           <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'rgba(0, 0, 0, 0.4)', 'transparent']}
            end={{ x: 1, y: 0 }}
            locations={[0.0, 0.2, 1]}
            style={styles.gradient}
            />
         {/* Showcase Title */}

       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  collectionImage: {
    flex: 1,
    height: 150,
    width: '100%'
  },
  gradient: {
    position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     height: '100%'
  }
});

export default CollectionRow
