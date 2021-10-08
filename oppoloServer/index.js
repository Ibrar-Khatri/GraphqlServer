const { ApolloServer, gql } = require("apollo-server");

const students = [
	{ name: "Ali", email: "ali@gmail.com", age: 20, id: 1 },
	{ name: "Ahmed", email: "Ahmed@gmail.com", age: 25, id: 2 },
	{ name: "Mubashir", email: "mubashir@gmail.com", age: 30, id: 3 },
	{ name: "Raza", email: "raza@gmail.com", age: 35, id: 4 },
];

const resolvers = {
	Query: {
		students: () => students,
	},
	Mutation: {
		addStudent: (e, { input }) => {
			console.log(input);
			students.push(input);
			return input;
		},
	},
};

const typeDefs = gql`
	type Student {
		id: Int
		name: String
		email: String
		age: Int
	}

	input stInput {
		id: Int
		name: String
		email: String
		age: Int
	}

	type Query {
		students: [Student]
	}

	type Mutation {
		addStudent(input: stInput): Student
	}
`;

const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});
