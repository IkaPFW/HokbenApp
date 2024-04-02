const axios = require('axios')
const url = 'http://users:4001'

const typeDefs = `#graphql
    type User {
        _id: ID
        username: String
        email: String
        password: String
        role: String
        phoneNumber: String
        address: String
    }

    type getUsers {
        statusCode: Int
        data: [User]
    }

    type getUserById {
        statusCode: Int
        data: [User]
    }

    type AddUserResult {
        data: User
    }

    type EditUserResult {
        message: String
    }
    
    type DeleteUserResult {
        message: String
    }

    type Query {
        fetchAllUser: getUsers
        fetchUserById(id: ID): getUserById
    }

    type Mutation {
        addNewUser(username: String, email: String, password: String, phoneNumber: String, address: String): AddUserResult
        editUserData(id: ID, username: String, email: String, password: String, phoneNumber: String, address: String): EditUserResult
        deleteUserData(id: ID): DeleteUserResult
    }
`

const resolvers = {
    Query: {
        fetchAllUser: async () => {
            try {
                const { data } = await axios.get(url+ '/users')

                return data
            } catch(err){
                // console.log(err)
                return err
            }
        },
        fetchUserById: async (_, {id}) => {
            try {
                const { data } = await axios.get(url + `/users/${id}`)

                return data
            } catch(err){
                return err
            }
        }
    },
    Mutation: {
        addNewUser: async (_, {username, email, password, phoneNumber, address}) => {
            try {
                const { data } = await axios.post(url+ '/users', {
                    username,
                    email,
                    password,
                    phoneNumber,
                    address
                })

                return data
            } catch (err) {
                return err
            }
        },
        editUserData: async (_, {id, username, email, password, phoneNumber, address}) => {
            try {
                const { data } = await axios.put(url + `/users/${id}`,{
                    username,
                    email,
                    password,
                    phoneNumber,
                    address
                })

                return data
            } catch (err) {
                return err
            }
        },
        deleteUserData: async (_, {id}) => {
            try {
                const { data } = await axios.delete(url + `/users/${id}`)

                return data
            } catch (error) {
                return err
            }
        }
    }
}


module.exports = {typeDefs, resolvers}