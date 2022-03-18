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
    return (
      <View>
       <TouchableOpacity onPress={this.props.onPress} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', }}>
         <Image
             style={{ flex: 1, height: 250, width: '100%'}}
             source={{uri: item.image}}
           />
           <LinearGradient
            colors={['rgba(0,0,0,0.4)', 'rgba(0, 0, 0, 0.3)', 'transparent']}
            end={{ x: 1, y: 0 }}
            locations={[0.0, 0.2, 0.9]}
            style={styles.gradient}
            />
         {/* Showcase Title */}
         <Text>{item.title_es}</Text>
       </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  gradient: {
    position: 'absolute',
     left: 0,
     right: 0,
     top: 0,
     height: '100%'
  }
});

export default CollectionRow
