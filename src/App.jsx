import { useEffect, useState } from 'react';
import Filter from './Filter';
import Form from './Form';
import Notification from './Notification';
import People from './People';
import phonebookService from './services/phonebook';

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [filter, setFilter] = useState('');
	const [notification, setNotification] = useState();

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

		setNotification(`Added ${newPersonObject.name}`);
		removeNotification();
	};

	const deletePerson = id => {
		const personToDelete = persons.find(p => p.id === id);
		phonebookService
			.deletePerson(id)
			.then(person => {
				setPersons(persons.filter(p => p.id !== id));
				setNotification(`Deleted ${personToDelete.name}`);
				removeNotification();
			})
			.catch(error => {
				setNotification(
					`Information of ${personToDelete.name} has already been removed from the server`
				);
				removeNotification();
				setPersons(persons.filter(p => p.id !== id));
			});
	};

	const updateNumber = name => {
		const person = persons.find(p => p.name === name);
		const changedPerson = { ...person, number: newNumber };
		phonebookService.update(person.id, changedPerson).then(returnedPerson => {
			setPersons(
				persons.map(person => (person.name !== name ? person : returnedPerson))
			);
		});

		setNotification(`Updated ${person.name}`);
		removeNotification();
	};

	const removeNotification = () => {
		setTimeout(() => {
			setNotification(null);
		}, 5000);
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
			{notification && <Notification notification={notification} />}
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
