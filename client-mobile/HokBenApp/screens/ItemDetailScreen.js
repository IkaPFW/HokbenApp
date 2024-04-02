import { Image, StyleSheet, Text, View } from "react-native";

function ItemDetailScreen({route}){
  const item = route.params.item
  
  return (
    <View style={[styles.container]}>
      <View style={{flex: 5, justifyContent: "center", flexDirection: "row"}}>
        <Image source={{uri:item.imgUrl}} style={[styles.image]} />
      </View>
      <View style={{flex: 7, marginHorizontal: 10}}>
        <Text style={[styles.title]}>{item.name}</Text>
        <Text style={[styles.subtitle]}>Price: Rp. {item.price}</Text>
        <Text>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // flexDirection: 'row',
    justifyContent: 'center'
  },
  image: {
    width: 250,
    height: 250,
    marginTop: 10
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#9f9f9f",
    marginBottom: 5
  }
});

export default ItemDetailScreen