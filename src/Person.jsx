const Person = ({ name, number, deletePerson }) => {
	return (
		<div>
			<li>
				{name}: {number} <button onClick={deletePerson}>delete</button>
			</li>
		</div>
	);
};

export default Person;
