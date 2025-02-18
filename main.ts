import { ApolloServer } from "@apollo/server";
import { schema } from "./schema.ts";
import { MongoClient } from "mongodb";
import { VueloModelo } from "./types.ts";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./resolvers.ts";

//const MONGO_URL = Deno.env.get("MONGO_URL");
const MONGO_URL = "MONGO_URL=mongodb+srv://nebrija:nebrija@clusteryolo.wvdnt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterYolo";

if (!MONGO_URL) {
  throw new Error("Please provide a MONGO_URL");
}

const mongoClient = new MongoClient(MONGO_URL);
await mongoClient.connect();

console.info("Connected to MongoDB");

const mongoDB = mongoClient.db("AD2");
const FlightsCollection = mongoDB.collection<VueloModelo>("Vuelos");


const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => ({ FlightsCollection }),
});

console.info(`Server ready at ${url}`);
