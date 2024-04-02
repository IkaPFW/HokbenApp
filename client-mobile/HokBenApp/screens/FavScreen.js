import { StyleSheet, Text, View } from "react-native";

function FavScreen(){
  return (
    <View style={styles.container}>
      <Text>My favorite menus uwu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default FavScreen