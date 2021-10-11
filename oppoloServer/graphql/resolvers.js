const { PubSub } = require("graphql-subscriptions");
const pubsub = new PubSub();

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
			pubsub.publish("STUDENTADDED", { newStudent: input });
			return input;
		},
		updateStudent: (e, { input }) => {
			students.forEach((stu) => {
				if (stu.id === input.id) {
					stu.name = input.name;
					stu.age = input.age;
				}
				console.log(stu)
			});
			pubsub.publish("UPDATESTUDENT", { updateStud: input });
			return input;
		},
		deleteStudent: (e, { input }) => {
			console.log(input.id);
			students.forEach((stu, i) => {
				if (stu.id === input.id) {
					students.splice(i, 1);
				}
			});
			pubsub.publish("STUDENTREMOVED", { removeStud: input });
			return input;
		},
	},
	Subscription: {
		newStudent: {
			subscribe: () => pubsub.asyncIterator(["STUDENTADDED"]),
		},
		removeStud: {
			subscribe: () => pubsub.asyncIterator(["STUDENTREMOVED"]),
		},
		updateStud: {
			subscribe: () => pubsub.asyncIterator(["UPDATESTUDENT"]),
		},
	},
};

module.exports = resolvers;
