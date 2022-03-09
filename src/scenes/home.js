function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontFamily: 'Roboto_400Regular', fontSize: 16 }}>Home Screen</Text>
      <Button
        title="Go to Details"
        /* we call navigate function on navigation prop with the name of the route to move the user to*/
        onPress={() => navigation.navigate('Details', {
            itemId: 86,
            otherParam: 'anything you want here',
          })
          }
      />
    </View>
  );
}
