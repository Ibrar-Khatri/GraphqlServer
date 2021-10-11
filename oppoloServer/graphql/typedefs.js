const { gql } = require("apollo-server");

const typeDefs = gql`
	type Student {
		id: Int
		name: String
		age: Int
	}

	input stInput {
		id: Int
		name: String
		age:Int
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
	type Subscription {
		newStudent: Student
		removeStud: Student
		updateStud: Student
	}
`;

module.exports = typeDefs;
