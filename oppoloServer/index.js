const { ApolloServer, gql } = require("apollo-server");
const { createServer } = require("http");
const { SubscriptionServer } = require("subscriptions-transport-ws");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { execute, subscribe } = require("graphql");
const express = require("express");
const app = express();

const httpServer = createServer(app);

const students = [
	{ name: "Ali", age: 20, id: 1 },
	{ name: "Ahmed", age: 25, id: 2 },
	{ name: "Mubashir", age: 30, id: 3 },
	{ name: "Raza", age: 35, id: 4 },
];

const resolvers = {
	Query: {
		students: () => students,
	},
	Mutation: {
		addStudent: (e, { input }) => {
			students.push(input);
			return input;
		},
		updateStudent: (e, { input }) => {
			students.forEach((stu) => {
				if (stu.id === input.id) {
					stu.name = input.name;
					stu.age = input.age;
				}
			});
			return input;
		},
		deleteStudent: (e, { input }) => {
			console.log(input.id);
			// let abc = students.filter((stu) => stu.id != input.id);
			students.forEach((stu, i) => {
				if (stu.id === input.id) {
					students.splice(i, 1);
				}
			});

			return input;
		},
	},
};

const typeDefs = gql`
	type Student {
		id: Int
		name: String
		age: Int
	}

	input stInput {
		id: Int
		name: String
		age: Int
	}
	input updateStu {
		id: Int
		name: String
		age: Int
	}
	input deleteStu {
		id: Int
		name: String
		age: Int
	}

	type Query {
		students: [Student]
	}

	type Mutation {
		addStudent(input: stInput): Student
		updateStudent(input: updateStu): Student
		deleteStudent(input: deleteStu): Student
	}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

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
	{
		// This is the `schema` we just created.
		schema,
		// These are imported from `graphql`.
		execute,
		subscribe,
	},
	{
		// This is the `httpServer` we created in a previous step.
		server: httpServer,
		// This `server` is the instance returned from `new ApolloServer`.
		path: server.graphqlPath,
	},
);

// The `listen` method launches a web server.
// server.listen().then(({ url }) => {
// 	console.log(`🚀  Server ready at ${url}`);
// });
httpServer.listen(5000, () => {
	console.log("Server started successfully˝");
});

//how to create opollo server difined easily this youtuber Cory McAboy
