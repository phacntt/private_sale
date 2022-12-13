import express, { Express } from "express"
import "reflect-metadata"
import initDatabase from "./utils/initDB"
import { ApolloServer } from "apollo-server-express"
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core"
import { buildSchema } from "type-graphql"
import { UserResolver } from "./resolvers/user.resolver"

// const graphqlUploadExpress = require("graphql-upload/graphqlUploadExpress.js")

const startServer = async () => {
    try {
        await initDatabase() // init DB
        const schema = await buildSchema({
            resolvers: [
                UserResolver
            ],
            validate: false
        })

        const server = new ApolloServer({
            schema,
            context: ({ req, res }) => ({ req, res }),
            formatError: ({ message, extensions }) => {
                return { success: false, message, extensions }
            },
            csrfPrevention: false,
            introspection: true,
            cache: "bounded",
            plugins: [ApolloServerPluginLandingPageLocalDefault],
        })
        await server.start()
        const app: Express = express()
        // app.use(graphqlUploadExpress()) // upload file
        server.applyMiddleware({ app, path: "/gql/v1" })

        app.use("/public", express.static("upload")) // change upload -> public path


        const PORT = process.env.PORT
        await new Promise<void>((r) => app.listen({ port: PORT }, r))
        console.log(`🚀 Server is ready at http://localhost:${PORT}${server.graphqlPath} 🚀`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}
startServer()
