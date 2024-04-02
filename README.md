[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10216632&assignment_repo_type=AssignmentRepo)
# P3-Challenge-2

UI Library: ...

Struktur Folder:

- client-mobile
- server
  - orchestrator (port: 4000)
  - orchestrator-express (port: 4000)
  - services
    - users - mongodb (port: 4001)
    - app - postgres (port: 4002)

## W2D2

Target:

- [x] Memahami `react-native` dan `expo`
- [x] Install `expo-cli` & `expo init` & setup project mobile
- [x] Mencoba component Text, View, Image, StyleSheet, Button, ScrollView, FlatList
- [x] Mencoba useState, useEffect dalam react-native
- [x] Hit API server yang sudah dibuat untuk mendapatkan data
- [x] Mengetahui bahwa redux & redux-thunk bisa diimplementasi di react-native
- [x] Memahami `react-native-navigation`
- [x] Memahami Stack Navigation & Tab Navigation
- [x] Membuat min 2 Screen (Home, Detail)

**Report:**

21/02/2023 - Today, I've learned the basics of React Native, a version of React that's more compatible for mobile devices. After creating a react native application, I've implemented some basic components. Among them being Text, View, StyleSheet, ScrollView, and FlatList. Several screens has been created for this application, Home screen and Item Detail screen are among those I've created. I've also attempted to use useState, useEffect and integrate redux and react-redux with varying degree of success. I've also learned about react native navigation, though at the moment only Tabe navigation worked as intended. Stack navigation still encounter a problem due to an alleged 'Another navigator is already registered for this container'. This problem regarding Stack navigation currently prevents me from accessing the Item Detail page.

UPDATE 22/02/2023 - Stack navigation problem already resolved via changing the components around. Menu detail can now be seen when a flatList item is pressed/tapped. This is possible due to passing a parameter that contains a menu item's properties when navigating to a Stack.Screen with name "Menu Detail".

## W2D3

Target:

- [x] Memahami React Native Gesture Handler
- [x] Memahami NoSQL: Mongodb
- [x] Membuat service users dengan Mongodb (Kerjakan di `server/services/users`)
- [x] Membuat action pada users: Read, Create & Delete (Update optional)

**Report:**

22/02/2023 - Today I've learned about React Native Gesture Handler and NoSQL with MongoDB. While I didn't implemented the Gesture Handler at least at the moment, I've integrated MongoDB into server side. For users folder application, it connects to the database HokBen-App which was created via MongoDB Compass. At the moment, the only actions that can be taken are getting all users data, getting a user data by specific ID, create new user data, and delete user data based on ID.

## W2D4

Target:

- [x] Membuat Server Baru, Microservices
- [x] Memisahkan service user dan app
- [x] Membuat Orchestrator-express yang bisa komunikasi ke service user dan app
- [x] Memahami cache dalam database
- [x] Install dataabase Redis dan menggunakan ioRedis sebagai cache
- [x] Menjaga relasi User dengan product pada microservice

**Report:**

23/02/2023 - Today, I learned about the concept of microservices annd its application which utilizes redis. While implementing redis to my application, instead of instaling redis directly, I have to use redislabs due to redis being incompitable with Windows OS. As for services folder, I've separated users and app, the former I've elaborated in the previous report. In services/app folder, it mainly deals with reading and manipulating product datas, in my case menu items and categories. Instead of using MongoDB like I did with services/users folder, I used PostGres and Sequelize for database. As of now, I've yet establish relations between users and product/menu.

UPDATE 24/02/2023 - Updated services/users to add edit user action. Also added relation between main entity (Menu) with Users so that when read by ID, menu detail will return both main properties and User property.
## W2D5

Target:

- [x] Memahami GraphQL dan tahu perbedaan dengan RESTful API
- [x] Membuat Orchestrator dengan menggunakan GraphQL
- [x] Memahami Typedefs, Resolvers
- [x] Mampu membuat Query dan Mutation
- [x] Menggunakan redis pada graphql untuk kebutuhan cache server
- [x] Memahami Apollo-Client & Implementasi pada mobile apps
- [x] Memahami cache pada Apollo-Client

**Report:**

...

## W3D1

Target:

- [ ] Memahami Docker
- [ ] Implementasi Docker pada aplikasi server

**Report:**

...
