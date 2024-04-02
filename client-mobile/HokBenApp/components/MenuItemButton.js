import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Item = ({item, onPress, backgroundColor, textColor}) => {
  return (<TouchableOpacity onPress={onPress} style={[styles.item, {backgroundColor, flexDirection: 'row'}]}>
    <Image source={{uri: item.imgUrl}} style={{width: 100, height: 100, marginEnd: 15}} />
    <View>
      <Text style={[styles.title, {color: textColor, fontWeight: 'bold'}]}>{item.name}</Text>
      <Text style={{color: "#9f9f9f"}}>Rp. {item.price}</Text>
    </View>
    <View>
      {/* <Ionicons name="heart" size={25} color={'#c7c7c7'} style={{position: "absolute", bottom: 0, left: 0}}/> */}
      {/* <Button title="Add +"></Button> */}
    </View>
  </TouchableOpacity>)
}

function MenuItemButton({item, navigation}){
    return (
            <Item
                item={item}
                // onPress={() => path="nested"}
                // onPress={() => {console.log(item.name)}}
                onPress={() => {navigation.navigate("Menu Detail", {
                    item: item
                })}}
                backgroundColor="white"
                textColor="black"
            />
    )
}

const styles = StyleSheet.create({
    item: {
        paddingVertical: 25,
        marginVertical: 8,
        // borderTopColor: '#e2e2e2',
        // borderTopWidth: 1,
        borderBottomColor: '#e2e2e2',
        borderBottomWidth: 1,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 16,
    }
})

export default MenuItemButton