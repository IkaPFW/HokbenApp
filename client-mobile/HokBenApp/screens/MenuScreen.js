import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { gql, useQuery } from '@apollo/client'
// import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import Category from "react-native-category"
import Ionicons from 'react-native-vector-icons/Ionicons';
import MenuItemButton from "../components/MenuItemButton";
import ItemDetailScreen from "./ItemDetailScreen";

const Stack = createNativeStackNavigator()
const GET_MENU = gql`
  query FetchAllMenu {
  fetchAllMenu {
    id
    name
    japaneseName
    description
    price
    imgUrl
    authorId
    categoryId
    UserMongoId
    User {
      _id
      username
      email
      password
      role
      phoneNumber
      address
    }
  }
}
`
const GET_CATEGORIES = gql`
  query FetchAllCategories {
    fetchAllCategories{
      id
      name
    }
  }
`
// const menu = [
//         {
//             "id": 1,
//             "name": "HOKA HEMAT 1",
//             "japaneseName": "お得なセット",
//             "description": "HokBen special rice, salad, Ekkado and 3 Egg Chicken Roll *Salad for dine in only.",
//             "price": 27500,
//             "imgUrl": "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/f0b9d580d9386a60506086a819fd1de4-1660019294911",
//             "authorId": 1,
//             "categoryId": 1
//         },
//         {
//             "id": 2,
//             "name": "Premium Set Seafood",
//             "japaneseName": "プレミアムセットシーフー",
//             "description": "Rice, Beef Teriyaki / Yakiniku, Ebi Furai 2pcs, Shrimp Roll (Tori Ball), Ekaddo (Ebi Furai), Clear Soup, Salad dan Ocha/Aqua *Salad & Soup for dine in only.",
//             "price": 64000,
//             "imgUrl": "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/a1b51c7a2dbd0c47279f3228ddaa215e-1660018909657",
//             "authorId": 1,
//             "categoryId": 1
//         },
//         {
//             "id": 3,
//             "name": "Ogura",
//             "japaneseName": "小倉アイス",
//             "description": "Special dessert made of red beans served with simple syrup, coconut milk and shaved ice.",
//             "price": 14000,
//             "imgUrl": "https://hokben-images.s3.ap-southeast-3.amazonaws.com/menu/ad89d4f03722bd1adb15e6a6e2d044b5-1660030681385",
//             "authorId": 1,
//             "categoryId": 5
//         }
//     ]

const CategoryList = ({categoryFetch}) => {
  const {loading: categoryLoading, error: categoryError, data: categories} = useQuery(GET_CATEGORIES, {
    variables: {categoryFetch}
  })

  // console.log(categoryError);
  if(categoryLoading) return <Text>Loading Categories...</Text>
  if(categoryError) return <Text>Error found...</Text>
  console.log(categories);

  return(
    // <Text>Categories</Text>
    <FlatList
      horizontal={true}
        data={categories.fetchAllCategories}
        renderItem={(
          { item }
        ) => <Text style={styles.categoryItems}>{item.name}</Text>}
        keyExtractor={item => item.id}
        // extraData={menuId}
    />
    // <Category
    //   data={categories.fetchAllCategories}
    //   itemSelected={(item) => console.log(item)}
    //   itemText={'name'}
    // />
  )
}

const ListItem = ({navigation, menuFetch, categoryFetch}) => {
  const { loading: menuLoading, error: menuError, data: menu } = useQuery(GET_MENU, {
    variables: {menuFetch}
  })

  if (menuLoading) return <Text>Loading Menu Items...</Text>
  if (menuError) return <Text>Error found...</Text>

  // const menu = data
  console.log(menu);
  // console.log(categories);
  
  return (
    <View>
      <CategoryList />
      <FlatList
        data={menu.fetchAllMenu}
        renderItem={(
          { item }
        ) => <MenuItemButton item={item} navigation={navigation} />}
        keyExtractor={item => item.id}
        // extraData={menuId}
      />
    </View>
  )
}

function MenuScreen(){
    const [menuId, setMenuId] = useState()

    useEffect(() => {
        // fetch('http://localhost:3000').then((data) => {
        //     return data.json()
        // }).then((res) => {
        //     // dispatch(dispatchMenuSuccess(res))
        //     console.log(res, '!!!!!!!!!!!!!!!');
        //     setMenu(res)
        // }).catch((err) => {
        //     console.log(err);
        // })
    }, [])

    return (
        <View style={styles.container}>
        {/* <Text>FOOD! \OwO/</Text> */}
          <Stack.Navigator>
            <Stack.Screen
              name="flatList"
              component={ListItem}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Menu Detail"
              component={ItemDetailScreen}
              options={{headerStyle: {backgroundColor: "#ff5829"}, headerTintColor: "white", headerTitleAlign: "center" }}
            />
          </Stack.Navigator>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  item: {
    paddingVertical: 25,
    marginVertical: 8,
    // borderTopColor: '#e2e2e2',
    // borderTopWidth: 1,
    borderBottomColor: '#e2e2e2',
    borderBottomWidth: 1,
    marginHorizontal: 16,
  },
  categoryItems: {
    width: "auto",
    backgroundColor: "#fcd177",
    margin: 10,
    padding: 5,
    fontSize: 14,
    borderRadius: 13,
    height: 30
  },
  title: {
    fontSize: 16,
  }
});

export default MenuScreen