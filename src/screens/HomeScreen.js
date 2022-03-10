import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { FONT_REGULAR, FONT_BOLD } from '../assets/styles/typography'
import {
  Text,
  View,
  Button
} from "react-native";
import {
  setItems,
} from "../store/itemActions";

class HomeScreen extends Component {
  render() {
    console.log(this.props.items);
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={[FONT_REGULAR, { fontSize: 16 }]}>Home Screen</Text>
        <Button
          title="Go to Details!"
          /* we call navigate function on navigation prop with the name of the route to move the user to*/
          onPress={() => this.props.navigation.navigate('Details', {
              itemId: 86,
              otherParam: 'anything you want here',
            })
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

export default connect(mapStateToProps)(HomeScreen);
