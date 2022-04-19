import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import {
  responsiveFontSize
} from "react-native-responsive-dimensions";
import {
  setItems,
} from "../store/itemActions";
import { SearchBar } from 'react-native-elements';
import ItemPreview from "../components/atoms/ItemPreview";
import { Color, Font } from '../assets/styles/index.js';
import i18n from 'i18n-js';


class SearchResults extends Component {
    //setting default state
    state = {
      isLoading: true,
      search: '',
      arrayholder: []
    };

  componentDidMount() {
    return fetch('https://b0dd-2a02-2e02-adb0-ab00-dcf1-3862-2793-62d.eu.ngrok.io/api/items/search/5')
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            dataSource: responseJson,
          },
          function() {
            this.arrayholder = responseJson;
          }
        );
      })
      .catch(error => {
        console.error(error);
      });
  }

  search = text => {
    console.log(text);
  };

  clear = () => {
    this.searchclear();
  };

  searchFilterFunction(text) {
    console.log('búsqueda', text);
    //passing the inserted text in textinput
    const newData = this.arrayholder.filter(function(itemfromBackend) {
      //applying filter for the inserted text in search bar
      console.log('item', itemfromBackend.title_es);
      const itemData = itemfromBackend.title_es ? itemfromBackend.title_es.toUpperCase() : ''.toUpperCase();
      const textInputData = text.toUpperCase();
      // if the search element is in the array of newData
      return itemData.indexOf(textInputData) > -1;
    });

    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      dataSource: newData,
      search: text,
    });
  }

  ListViewItemSeparator = () => {
    //Item separator view
    return (
      <View
        style={{
          width: '100%',
        }}
      />
    );
  };

  render() {
    // if (this.state.isLoading) {
    //   // Loading View while data is loading
    //   return (
    //     <View style={styles.spinner}>
    //       <ActivityIndicator
    //         color="#D99578"
    //         size="large"  />
    //     </View>
    //   );
    // }
    return (
      <SafeAreaView style={styles.blackBackground}>
        <ImageBackground source={require('../assets/images/background.png')} style={styles.bg}>
          <View style={styles.mainContainer}>
            <View style={styles.viewStyle}>
              <SearchBar
                containerStyle={styles.searchBar}
                inputStyle={{fontFamily: 'Roboto', fontSize: responsiveFontSize(2) }}
                searchIcon={{ size: 24 }}
                onChangeText={text => this.SearchFilterFunction(text)}
                onClear={text => this.SearchFilterFunction('')}
                containerStyle={styles.searchBar}
                inputStyle={{fontFamily: 'Roboto', fontSize: responsiveFontSize(2) }}
                searchIcon={{ size: 24 }}
                placeholder={i18n.t('searchScreen.searchLabel')}
                value={this.state.search}
              />
              <FlatList
                data={this.state.dataSource}
                ItemSeparatorComponent={this.ListViewItemSeparator}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                 renderItem={({ item }) => (
                   /* Elements that will render in the screen based on the users´s search*/
                   <ItemPreview
                     item={item}
                     isFullWidth={true}
                     onPress={()=>{ this.props.navigation.navigate('Item', {item,
                       panels: collection.panel_set,
                       floorId:this.props.route.params.floorId,
                       floorName: this.props.route.params.floorName,
                       collection: this.props.route.params.collection,
                       routeName: this.props.route.name}) }}
                       />
                  )}
                  enableEmptySections={true}
                  keyExtractor={(item, index) => {
                    console.log(index, item);
                    index.toString()}}
                  ListEmptyComponent={
                    <Text style={styles.warningLabel}>{i18n.t('store.warning')}</Text>
                  }
                />

            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  blackBackground: {
    flex: 1,
    backgroundColor: Color.BLACK,
    justifyContent: 'center',
    flexDirection: 'row'
  },
  bg: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    maxWidth: 800
  },
  viewStyle: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: Color.BLACK
  },
  searchBar: {
    backgroundColor: 'transparent',
    paddingHorizontal: 1
  },
  warningLabel: {
    fontFamily: 'Roboto',
    fontSize: responsiveFontSize(2),
    color: Color.WHITE,
    padding: 5
  }
});

//---- Connect to props functions and values -----//

function mapStateToProps({items}) {
  return {items}
}

export default connect(mapStateToProps)(SearchResults);
