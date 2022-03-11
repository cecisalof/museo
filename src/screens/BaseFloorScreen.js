import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  Button
} from "react-native";
import {
  setItems,
} from "../store/itemActions";

class BaseFloor extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text >Planta Baja</Text>
        <Button
          title="Volver a la Home"
          /* we call navigate function on navigation prop with the name of the route to move the user to*/
          onPress={() => this.props.navigation.navigate('Home')}
        />
      </View>
    );
  }
}

//---- Connect to props functions and values -----//


function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(BaseFloor);
