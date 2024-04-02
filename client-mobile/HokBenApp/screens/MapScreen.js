import { StyleSheet, Text, View } from "react-native";

function MapScreen(){
  return (
    <View style={styles.container}>
      <Text>Outlets around you</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default MapScreen