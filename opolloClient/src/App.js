import logo from "./logo.svg";
import "./App.css";
import { ApolloProvider } from "@apollo/client";
import StudentList from "./components/students/student";
import client from "./config/graphqlConfig";

function App() {
	return (
		<ApolloProvider client={client}>
			<StudentList />
		</ApolloProvider>
	);
}
export default App;
