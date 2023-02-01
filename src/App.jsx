import { useState } from 'react';
import Filter from './Filter';
import Form from './Form';
import People from './People';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	const addPerson = e => {
		e.preventDefault();
		const newPersonObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		if (persons.some(person => person.name === newPersonObject.name)) {
			alert(`${newName} is already in the phonebook`);
			return;
		}
		setPersons(persons.concat(newPersonObject));
	};

	const handleNameInput = e => setNewName(e.target.value);
	const handleNumberInput = e => setNewNumber(e.target.value);
	const handleFilterInput = e => setFilter(e.target.value);

	const personsToDisplay = filter
		? persons.filter(person => person.name.toLowerCase().includes(filter))
		: persons;

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter filter={filter} handleFilterInput={handleFilterInput} />
			<h3>add new</h3>
			<Form
				newName={newName}
				handleNameInput={handleNameInput}
				newNumber={newNumber}
				handleNumberInput={handleNumberInput}
				addPerson={addPerson}
			/>
			<h3>Numbers</h3>
			<People personsToDisplay={personsToDisplay} />
		</div>
	);
};

export default App;
