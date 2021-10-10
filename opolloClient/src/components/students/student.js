import React, { useState } from "react";
import { useQuery, gql, useMutation, useSubscription } from "@apollo/client";
import "./student.css";

const getAllStudents = gql`
	query GetAllStudents {
		students {
			name
			age
			id
		}
	}
`;
const addStudent = gql`
	mutation AddStudent($name: String, $age: Int, $id: Int) {
		addStudent(input: { name: $name, age: $age, id: $id }) {
			name
			age
			id
		}
	}
`;
const updateStudent = gql`
	mutation UpdateStudent($name: String, $age: Int, $id: Int) {
		updateStudent(input: { name: $name, age: $age, id: $id }) {
			name
			age
			id
		}
	}
`;
const deleteStudentById = gql`
	mutation DeleteStudent($id: Int) {
		deleteStudent(input: { id: $id }) {
			id
		}
	}
`;

const STUDENTADDED = gql`
	subscription {
		newStudent {
			name
			age
			id
		}
	}
`;
const STUDENTREMOVED = gql`
	subscription {
		removeStud {
			id
		}
	}
`;
// const UPDATESTUDENT = gql`
// 	subscription {
// 		updateStud {
// 			id
// 			name
// 			age
// 		}
// 	}
// `;

function StudentList() {
	const newStudent = useSubscription(STUDENTADDED);
	const stuRemoved = useSubscription(STUDENTREMOVED);
	// const updateStud = useSubscription(UPDATESTUDENT);
	const [addStu] = useMutation(addStudent);
	const [updateStu] = useMutation(updateStudent);
	const [deleteStu] = useMutation(deleteStudentById);

	let [name, setName] = useState("");
	let [age, setAge] = useState();
	let [id, setId] = useState();
	let [isEdit, setIsEdit] = useState(false);

	let queryData = useQuery(getAllStudents);

	if (queryData.loading) return <h1>loading</h1>;
	if (queryData.error) return <h1>{queryData.error}</h1>;
	let students = queryData.data.students;

	if (newStudent?.data?.newStudent.name) {
		let newStu = {
			name: newStudent?.data?.newStudent.name,
			age: newStudent?.data?.newStudent.age,
			id: newStudent?.data?.newStudent.id,
		};
		students = [...students, newStu];
	}
	if (stuRemoved?.data?.removeStud.id) {
		let index = stuRemoved?.data?.removeStud.id;
		students = students.filter((stu) => stu.id != index);
	}
	// console.log(updateStud?.data?.updateStud);
	// if (updateStud?.data?.updateStud.id) {
	// 	let updates = updateStud?.data?.updateStud;
	// 	students.forEach((stu) => {
	// 		console.log(updates.name, " ", stu.name);
	// 		if (stu.id === updates.id) {
	// 			stu.name = updates.name;
	// 			stu.age = updates.age;
	// 		}
	// 	});
	// }

	function addAndUpdate(e) {
		e.preventDefault();
		if (!isEdit) {
			addStu({
				variables: {
					name: name,
					age: Number(age),
					id: students.length + 1,
				},
			});
		} else {
			updateStu({
				variables: {
					name: name,
					age: Number(age),
					id: id,
				},
			});
		}
		setName("");
		setAge("");
		setId();
		setIsEdit(false);
	}

	function deleteStudent(id) {
		deleteStu({
			variables: {
				id: id,
			},
		});
	}

	return (
		<div>
			<form className="form" onSubmit={addAndUpdate}>
				<input
					type="text"
					name="name"
					value={name}
					onChange={(text) => setName(text.target.value)}
					required
				/>
				<input
					type="number"
					name="age"
					value={age}
					onChange={(text) => setAge(text.target.value)}
					required
				/>
				{isEdit ? (
					<button type="submit">Edit</button>
				) : (
					<button type="submit">Add</button>
				)}
			</form>
			<h1>Student List</h1>
			<table>
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Age</th>
					</tr>
				</thead>
				<tbody>
					{students?.map((item, i) => (
						<tr key={i}>
							<td>{item.id}</td>
							<td>{item.name}</td>
							<td>{item.age}</td>
							<td>
								<button
									onClick={() => {
										setName(item.name);
										setAge(item.age);
										setId(item.id);
										setIsEdit(true);
									}}
								>
									edit
								</button>
							</td>
							<td>
								<button type="submit" onClick={() => deleteStudent(item.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default StudentList;
