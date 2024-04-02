// import * as React from 'react'
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Carousel from "react-native-reanimated-carousel"

function HomeScreen(){
  const banner = [
    "https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/525911fbfd26e612ea336f2e756f193b-1675838676547",
    "https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/b5e1b40f081b3e589d5b2e396edbc22e-1675216494339",
    "https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/1c79d012363c7dd2fddac8bb0aed4726-1674616164589",
    "https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/19a067dfd0846cb1ae2497c95640ab58-1675219379495",
    "https://hokben-images.s3.ap-southeast-3.amazonaws.com/slider/711eb2845309fb5d2a30ba308c8d8a5f-1668050904645"
  ]
  const width = Dimensions.get('window').width

  return (
    <View style={styles.container}>
        <View style={{flex: 3, flexDirection: "row", justifyContent: "space-between", marginVertical: 15, marginHorizontal: 20}}>
            <Ionicons name="person-circle" size={55} color={'#c5c5c5'} style={{marginTop: 20}} />
            <Text style={{fontSize: 18, width: 170, fontWeight: "bold", marginTop: 25, marginStart: 10}}>Hi, User! Welcome Back!</Text>
            <Image source={{uri:"https://www.hokben.co.id/assets/img/logo_hokben_1.png"}} style={{width: 120, height: 120, marginHorizontal: 10}}/>
        </View>
        <View style={{flex:10}}>
          <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={banner}
                scrollAnimationDuration={1000}
                // onSnapToItem={(index) => console.log('current Image:', banner[index])}
                renderItem={({ item, index }) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                      <Image source={{uri: item}} style={{width: width, height: width/2}} alt={`Banner ${index}`}/>
                        {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index} - {item}
                        </Text> */}
                    </View>
                )}
            />
        </View>
      {/* <Text>Home</Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

export default HomeScreen