import Person from './Person';

const People = ({ personsToDisplay, deletePerson }) => {
	return (
		<ul>
			{personsToDisplay.map(person => (
				<Person
					key={person.name}
					name={person.name}
					number={person.number}
					deletePerson={() => deletePerson(person.id)}
				/>
			))}
		</ul>
	);
};

export default People;
