const axios = require('axios')
const url = 'http://app:4002'
const userUrl = 'http://users:4001'

const typeDefs = `#graphql
    type Menu {
        id: Int
        name: String,
        japaneseName: String,
        description: String,
        price: Int,
        imgUrl: String,
        authorId: Int,
        categoryId: Int,
        UserMongoId: String,
        User: User
    }

    type User {
        _id: ID
        username: String
        email: String
        password: String
        role: String
        phoneNumber: String
        address: String
    }

    type Query {
        fetchAllMenu: [Menu],
        fetchMenuById(id: Int): Menu
    }

    type AddMenuResult {
        message: String
        data: Menu
    }

    type EditMenuResult {
        message: String
    }

    type DeleteMenuResult {
        message: String
    }

    type Mutation {
        addNewMenuItem(name: String, japaneseName: String, description: String, price: Int, imgUrl: String, categoryId: Int): AddMenuResult
        editMenuItem(id: Int, name: String, japaneseName: String, description: String, price: Int, imgUrl: String, categoryId: Int): EditMenuResult
        deleteMenuItem(id: Int): DeleteMenuResult
    }
`

const resolvers = {
    Query: {
        fetchAllMenu: async () => {
            try {
                const { data } = await axios.get(url+ '/menu')
                
                for(let i in data.data){
                    let UserData = await axios.get(userUrl + `/${data.data[i].UserMongoId}`)
                    data.data[i].User = UserData.data.data[0]
                }

                return data.data
            } catch(err){
                console.log(err)
            }
        },
        fetchMenuById: async (_, {id}) => {
            try {
                const { data } = await axios.get(url + `/menu/${id}`)

                return data.data
            } catch(err){
                return err
            }
        }
    },
    Mutation: {
        addNewMenuItem: async (_, {name, japaneseName, description, price, imgUrl, categoryId}) => {
            try {
                const { data } = await axios.post(url+ '/menu',{
                    name,
                    japaneseName,
                    description,
                    price,
                    imgUrl,
                    categoryId
                })

                console.log(data)

                return data
            } catch (err) {
                return err
            }
        },
        editMenuItem: async (_, {id, name, japaneseName, description, price, imgUrl, categoryId}) => {
            try {
                const { data } = await axios.put(url + `/menu/${id}`,{
                    name,
                    japaneseName,
                    description,
                    price,
                    imgUrl,
                    categoryId
                })

                console.log(data)

                return data
            } catch (err) {
                return err
            }
        },
        deleteMenuItem: async (_, {id}) => {
            try {
                const { data } = await axios.delete(url + `/menu/${id}`)

                return data
            } catch (error) {
                return err
            }
        }
    }
}


module.exports = {typeDefs, resolvers}