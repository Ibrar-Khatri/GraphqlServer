import { useQuery, gql, useMutation } from "@apollo/client";
import React from "react";

const getAllStudents = gql`
	query {
		students {
			name
			age
		}
	}
`;
const addStudent = gql`
	# Increments a back-end counter and gets its resulting value
	mutation ADDSTUDENT($name: String, $email: String, $age: Int, $id: Int) {
		addStudent(input: { name: $name, email: $email, age: $age, id: $id }) {
			id
			name
			age
			email
		}
	}
`;

function StudentList() {
	let { loading, error, data } = useQuery(getAllStudents);
	if (loading) return <h1>loading</h1>;

	if (error) return <h1>{error}</h1>;
	let { students } = data;

	// const [addStu, { data, loading, error }] = useMutation(addStudent);

	// if (loading) return "Submitting...";
	// if (error) return `Submission error! ${error.message}`;
	// console.log(data);

	return (
		<div>
			<h1>Student List</h1>
			{students?.map((stu) => (
				<h3>
					{stu.name} + {stu.age}
				</h3>
			))}
			<button
			// onClick={() =>
			// 	addStu({
			// 		variable: {
			// 			name: "absar",
			// 			age: 15,
			// 			id: 7,
			// 			email: "absar@gmail.com",
			// 		},
			// 	})
			// }
			>
				Add Student
			</button>
		</div>
	);
}

export default StudentList;
