const { createServer } = require("http");
const { execute, subscribe } = require("graphql");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typedefs");

(async function () {
	const app = express();
	const httpServer = createServer(app);
	const schema = makeExecutableSchema({
		typeDefs,
		resolvers,
	});
	const server = new ApolloServer({
		schema,
		plugins: [
			{
				async serverWillStart() {
					return {
						async drainServer() {
							subscriptionServer.close();
						},
					};
				},
			},
		],
	});
	const subscriptionServer = SubscriptionServer.create(
		{ schema, execute, subscribe },
		{ server: httpServer, path: server.graphqlPath },
	);
	await server.start();
	server.applyMiddleware({ app });

	const PORT = 4000;
	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}/graphql`),
	);
})();
