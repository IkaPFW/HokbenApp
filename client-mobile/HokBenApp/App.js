// import 'react-native-gesture-handler'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { Provider } from 'react-redux';
import { store } from './redux/store/store';
import FavScreen from './screens/FavScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import MenuScreen from './screens/MenuScreen';
import QRScreen from './screens/QRScreen';

const client = new ApolloClient({
  uri: "https://ikapfw.ikapfw-hokben-mobile-app.cloud",
  cache: new InMemoryCache()
})

const Tab = createBottomTabNavigator()
const myTheme = {
  colors: {
    primary: '#729c56'
  }
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <View style={[styles.container, {
          flexDirection: 'column'
        }]}>
        <View style={{flex: 2, backgroundColor: "#ff5829"}}>
              {/* <Text>Test</Text> */}
        </View>
            {/* <View style={{flex: 26}}>
              <ScrollView>

              <Text>Test 2</Text>
              </ScrollView>
            </View> */}
        <View style={{flex: 26, backgroundColor: "#729c56", flexDirection: "row", justifyContent: "space-around"}}>
          <NavigationContainer theme={myTheme}>
            <Tab.Navigator
              screenOptions={({route}) => ({
                tabBarIcon: ({focused, color, size}) => {
                  let iconName;
                      
                  if(route.name === "Home"){
                    iconName = focused ? 'home' : 'home-outline'
                        // iconName = "https://www.pinclipart.com/picdir/big/178-1785162_white-home-icon-png-vector-royalty-free-download.png"
                  } else if(route.name === "QR"){
                    iconName = focused ? 'qr-code' : 'qr-code-outline'
                        // iconName = "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/qr-code-icon-18-256.png"
                  } else if(route.name === "Menu"){
                    iconName = focused ? 'fast-food' : 'fast-food-outline'
                        // iconName = "https://icon-library.com/images/food-icon-white/food-icon-white-17.jpg"
                  } else if(route.name === "Fav"){
                    iconName = focused ? 'heart' : 'heart-outline'
                        // iconName = "https://th.bing.com/th/id/R.0aed9c7a5752863d4ba49539dd072a48?rik=%2b5QnOU08U670FA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fwhite-heart-png-transparent%2fwhite-heart-png-transparent-3.png&ehk=gERPhhaF6yO68%2bKAfdwN3fjnoAo8Xu32sLY8c3vH5Y0%3d&risl=&pid=ImgRaw&r=0"
                  } else if(route.name === "Map"){
                    iconName = focused ? 'navigate-circle' : 'navigate-circle-outline'
                        // iconName = "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/world-map-icon-18-256.png"
                  }
                      
                  return <Ionicons name={iconName} size={size} color={color} />
                      return <Image source={{uri: {iconName}}} style={{width: 35, height: 35, marginTop: 20, marginHorizontal: 10}} />
                },
                tabBarActiveTintColor: '#142509',
                tabBarInactiveTintColor: 'white',
                headerShown: false
              })}>
                  <Tab.Screen name='Home' component={HomeScreen}/>
                  {/* <Tab.Screen name='QR' component={QRScreen} /> */}
                  <Tab.Screen name='Menu' component={MenuScreen} />
                  {/* <Tab.Screen name='Fav' component={FavScreen} />
                  <Tab.Screen name='Map' component={MapScreen} /> */}
                </Tab.Navigator>
              </NavigationContainer>
            </View>
            {/* <View style={{flex: 3, backgroundColor: "#729c56", flexDirection: "row", justifyContent: "space-around"}}>
              <Image source={{uri: "https://www.pinclipart.com/picdir/big/178-1785162_white-home-icon-png-vector-royalty-free-download.png"}} style={{width: 35, height: 35, marginTop: 20, marginHorizontal: 10}} />
              <Image source={{uri: "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/qr-code-icon-18-256.png"}} style={{width: 35, height: 35, marginTop: 20, marginHorizontal: 10}} />
              <Image source={{uri: "https://icon-library.com/images/food-icon-white/food-icon-white-17.jpg"}} style={{width: 35, height: 35, marginTop: 20, marginHorizontal: 10}} />
              <Image source={{uri: "https://th.bing.com/th/id/R.0aed9c7a5752863d4ba49539dd072a48?rik=%2b5QnOU08U670FA&riu=http%3a%2f%2fclipart-library.com%2fimages_k%2fwhite-heart-png-transparent%2fwhite-heart-png-transparent-3.png&ehk=gERPhhaF6yO68%2bKAfdwN3fjnoAo8Xu32sLY8c3vH5Y0%3d&risl=&pid=ImgRaw&r=0"}} style={{width: 35, height: 35, marginTop: 20, marginHorizontal: 10}} />
              <Image source={{uri: "https://iconsplace.com/wp-content/uploads/_icons/ffffff/256/png/world-map-icon-18-256.png"}} style={{width: 35, height: 35, marginTop: 20, marginHorizontal: 10}} />
            </View> */}
      </View>
    </ApolloProvider>
    // <Provider store={store}>

    // </Provider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 20
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
