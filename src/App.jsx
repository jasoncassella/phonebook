import { useEffect, useState } from 'react';
import Filter from './Filter';
import Form from './Form';
import People from './People';
import phonebookService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');

	useEffect(() => {
		phonebookService.getAll().then(initialPersons => {
			setPersons(initialPersons);
		});
	}, []);

	const addPerson = e => {
		e.preventDefault();
		const newPersonObject = {
			name: newName,
			number: newNumber,
			id: persons.length + 1,
		};
		if (persons.some(person => person.name === newPersonObject.name)) {
			if (
				confirm(
					`${newName} is already in the phonebook, replace the old number with a new one?`
				)
			) {
				updateNumber(newName);
				return;
			} else {
				return;
			}
		}
		phonebookService.create(newPersonObject).then(returnedPerson => {
			setPersons(persons.concat(returnedPerson));
			setNewName('');
			setNewNumber('');
		});
	};

	const deletePerson = id => {
		phonebookService.deletePerson(id).then(person => {
			setPersons(persons.filter(p => p.id !== id));
		});
	};

	const updateNumber = name => {
		const person = persons.find(p => p.name === name);
		console.log(person);
		const changedPerson = { ...person, number: newNumber };
		phonebookService
			.update(person.id, changedPerson)
			.then(returnedPerson => {
				console.log(returnedPerson);
				setPersons(
					persons.map(person => (person.name !== name ? person : returnedPerson))
				);
			})
			.catch(error => {
				setPersons(persons.filter(p => p.name !== name));
			});
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
			<People personsToDisplay={personsToDisplay} deletePerson={deletePerson} />
		</div>
	);
};

export default App;
