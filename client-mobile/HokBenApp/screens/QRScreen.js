import { StyleSheet, Text, View } from "react-native";

function QRScreen(){
  return (
    <View style={styles.container}>
      <Text>There's a QR code here. It's gone now</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default QRScreen