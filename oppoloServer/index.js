const 
{ ApolloServer, gql } = require("apollo-server");
const {PubSub}  = require("graphql-subscriptions");

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


const pubsub = new PubSub();

const NewStudentAdded ='NewStudentAdded' 

const server = new ApolloServer({ typeDefs, resolvers });
// The `listen` method launches a web server.

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url}`);
});

//how to create opollo server difined easily this youtuber Cory McAboy
