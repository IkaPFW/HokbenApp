const axios = require('axios')
const url = 'http://app:4002'

const typeDefs = `#graphql
    type Category {
        id: Int
        name: String
    }

    type AddCategoryResult {
        message: String
        data: Category
    }

    type EditCategoryResult {
        message: String
    }

    type DeleteCategoryResult {
        message: String
    }

    type Query {
        fetchAllCategories: [Category],
        fetchCategoryById(id: Int): Category
    }

    type Mutation {
        addNewCategory(name: String): AddCategoryResult
        editCategory(id: Int, name: String): EditCategoryResult
        deleteCategory(id: Int): DeleteCategoryResult
    }
`

const resolvers = {
    Query: {
        fetchAllCategories: async () => {
            try {
                const { data } = await axios.get( url + '/categories')

                // if(data.data){
                    return data.data
                // } else {
                //     throw data
                //     // return data.response.data.message
                // }
            } catch(err){
                // console.log(err)
                return err
            }
        },
        fetchCategoryById: async (_, {id}) => {
            try {
                const { data } = await axios.get( url +`/categories/${id}`)

                return data.data
            } catch(err){
                return err
            }
        }
    },
    Mutation: {
        addNewCategory: async (_, {name}) => {
            try {
                const { data } = await axios.post(url + '/categories',{
                    name
                })

                console.log(data)

                return data
            } catch (err) {
                return err
            }
        },
        editCategory: async (_, {id, name}) => {
            try {
                const { data } = await axios.put(url +`/categories/${id}`,{
                    name
                })

                console.log(data)

                return data
            } catch (err) {
                return err
            }
        },
        deleteCategory: async (_, {id}) => {
            try {
                const { data } = await axios.delete(url +`/categories/${id}`)

                return data
            } catch (error) {
                return err
            }
        }
    }
}


module.exports = {typeDefs, resolvers}