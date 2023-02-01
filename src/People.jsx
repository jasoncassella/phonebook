import Person from './Person';

const People = ({ personsToDisplay }) => {
	return (
		<ul>
			{personsToDisplay.map(person => (
				<Person key={person.name} name={person.name} number={person.number} />
			))}
		</ul>
	);
};

export default People;
