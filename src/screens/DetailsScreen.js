import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { FONT_REGULAR, FONT_BOLD } from '../assets/styles/typography'
import {
  Text,
  View,
  Button
} from "react-native";
import {
  setItems,
} from "../store/itemActions";

class DetailsScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text >Details Screen</Text>
        <Button
          title="Go to Shop!"
          /* we call navigate function on navigation prop with the name of the route to move the user to*/
          onPress={() => this.props.navigation.navigate('Shop', {
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

export default connect(mapStateToProps)(DetailsScreen);
