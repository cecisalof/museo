import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { FONT_REGULAR, FONT_BOLD } from '../assets/styles/typography'
import {
  Text,
  View,
  Button,
  StyleSheet
} from "react-native";
import {
  setItems,
} from "../store/itemActions";

class SecondFloor extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text >Planta 2</Text>
        <Button
          title="Volver a la home"
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

export default connect(mapStateToProps)(SecondFloor);
