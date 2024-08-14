const Persons = ({ persons, onDeletePerson }) => {
	return (
		<ul>
			{persons.map((person) => (
				<li key={person.name}>
					{person.name} {person.number}
					<button onClick={() => onDeletePerson(person.id)}>
						Delete
					</button>
				</li>
			))}
		</ul>
	);
};

export default Persons;
