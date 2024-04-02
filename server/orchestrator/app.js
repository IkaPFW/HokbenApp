const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { BaseRedisCache } = require('apollo-server-cache-redis')
const Redis = require('ioredis')

const {
    typeDefs: userTypeDefs,
    resolvers: userResolvers
} = require('./schema/user');
const {
    typeDefs: categoryTypeDefs,
    resolvers: categoryResolvers
} = require('./schema/category')
const {
    typeDefs: menuTypeDefs,
    resolvers: menuResolvers
} = require('./schema/menu');

(async () => {
    const server = new ApolloServer({
        typeDefs: [userTypeDefs, categoryTypeDefs, menuTypeDefs],
        resolvers: [userResolvers, categoryResolvers, menuResolvers],
        cache: new BaseRedisCache({
            client: new Redis({
                port: 11702,
                host: "redis-11702.c252.ap-southeast-1-1.ec2.cloud.redislabs.com",
                username: 'default',
                password: process.env.password || 'meuhS7QeKvdt2poorFuAVeYDb6tCLUBE'
            })
        })
    })

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
        introspection: true
    })

    console.log(`Server ready at ${url}`)
})()